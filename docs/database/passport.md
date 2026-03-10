# 身分驗證

使用 [Passport.js](https://www.passportjs.org/) 進行身分驗證

## 流程
身分認證以 `access token` (AT)、`refresh token` (RT) 實作  
- 註冊帳號，密碼加密後儲存資料庫
- 帳號密碼登入
- 帳號密碼通過，後端簽發認證資訊
  - AT: 有效期 15 分鐘，JWT 格式
  - RT: 有效期 7 天，隨機文字，儲存進資料庫並設定時間到過期，資料庫以雜湊儲存
- 前端接收認證資訊
  - AT: 存入 Pinia 變數中，不與 localStorage 同步
  - RT: 存入 cookie
- 前端進行需要認證的操作時，使用 AT
- 前端 AT 過期時，使用 RT 向後端換取新的 AT 和 RT
- 後端重新簽發認證資訊，並刪除資料庫中舊 RT

密碼和 RT 在資料庫都不是存明文，

| 特性 | 密碼 | Refresh Token |
|:---|:---|:---|
| 來源 | 人類輸入 | 程式隨機 |
| 主要威脅 | 暴力破解、字典攻擊 | 資料庫外洩 |
| 防護目的 | 防止攻擊者猜出密碼 | 防止攻擊者直接使用資料庫的值 |

## 套件
- [Passport.js](https://www.passportjs.org/) 身分驗證套件本體
  - [passport-local](https://www.passportjs.org/packages/passport-local/) 帳號密碼驗證策略
  - [passport-jwt](https://www.passportjs.org/packages/passport-jwt/) JWT 驗證策略
- [bcrypt](https://npmx.dev/package/bcrypt) 密碼加密套件
- [jsonwebtoken](https://npmx.dev/package/jsonwebtoken) JWT 簽發

```bash
npm i passport passport-local passport-jwt bcrypt jsonwebtoken
```

## 密碼加密
使用 bcrypt 套件加密密碼
```js
import bcrypt from 'bcrypt'

// 加密，相同明文加密後的結果每次都不同
// $2b$10$gACVGCrlfTjfETwREOp8R.18L.79lL7G9dyLqtc/.inZLA.7zV4Sa
await bcrypt.hash('abcd1234', 10)

// 比較是否相同
await bcrypt.compare('abcd1234', '$2b$10$gACVGCrlfTjfETwREOp8R.18L.79lL7G9dyLqtc/.inZLA.7zV4Sa')
```

## Passport
- 使用驗證策略 (Strategy) 套件編寫自己的驗證方式
- 呼叫驗證方式進行驗證

### 驗證方式 
使用帳號密碼策略編寫驗證方式 `login`
```js
passport.use(
  'login',
  new passportLocal.Strategy(
    // 設定檢查的欄位名稱，預設是 username 和 password
    {
      usernameField: 'account',
      passwordField: 'password',
    },
    // 檢查完後的處理
    // account = 帳號欄位值
    // password = 密碼欄位值
    // done = 驗證方法執行完成，把結果帶到下一步
    // done(錯誤, 驗證結果, 訊息)
    async (account, password, done) => {
      try {
        // 檢查帳號是否存在
        const user = await User.findOne({ account }).orFail(new Error('USER'))
        // 檢查密碼是否正確
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          throw new Error('USER')
        }
        // 驗證成功，下一步
        done(null, user)
      } catch (error) {
        // 驗證失敗，錯誤帶到下一步
        done(error)
      }
    },
  ),
)
```

使用 JWT 策略編寫驗證方式 `jwt`，用於驗證 AT
```js
passport.use(
  'jwt',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    // payload = jwt 解譯出的內容
    async (payload, done) => {
      try {
        // 檢查解譯出的使用者是否存在
        const user = await User.findById(payload._id).orFail(new Error('USER'))

        // 驗證成功，下一步
        done(null, user)
      } catch (error) {
        // 驗證失敗，錯誤帶到下一步
        done(error)
      }
    },
  ),
)
```

### 進行驗證
使用 `login` 驗證方式編寫 Express Middleware
```js
export const login = (req, res, next) => {
  // (error, user, info) 對應的是 done() 的三個參數資料
  // 當傳入的資料缺少帳號密碼欄位時會有 info.message，'Missing credentials'
  passport.authenticate('login', { session: false }, (error, user, info) => {
    // 如果有錯誤或沒有使用者資料，直接當作失敗
    // 將錯誤放進 next 裡，express 偵測到錯誤後會尋找錯誤處理 middleware
    if (error || !user || info) {
      return next(new Error('LOGIN'))
    }
    // 驗證成功
    else {
      // 將查詢到的使用者放入 req 內給後面的 controller 或 middleware 使用
      req.user = user
      // 繼續 express 的下一個動作
      next()
    }
  })(req, res, next)
}
```

使用 `jwt` 驗證方式編寫 Express Middleware
```js
export const token = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (error, user, info) => {
      // 如果有錯誤或沒有資料
      // 可能是格式錯誤、Secret 檢查錯誤、過期等等
      if (error || !user || info) {
        // jwt 錯誤時 info 會有訊息
        // 將錯誤放進 next 裡，express 偵測到錯誤後會尋找錯誤處理 middleware
        return next(new Error('TOKEN'))
      }
      // 驗證成功
      else {
        // 將查詢到的使用者放入 req 內給後面的 controller 或 middleware 使用
        req.user = user
        // 繼續 express 的下一個動作
        next()
      }
    },
  )(req, res, next)
}
```

## 認證資訊
產生認證資訊後將資料回應給前端

### Access Token
使用 jsonwebtoken 套件簽發 AT
```js
import jsonwebtoken from 'jsonwebtoken'
const accessToken = jsonwebtoken.sign({ _id: user._id }, process.env.JWT_SECRET, {
  expiresIn: '15m',
})
```

### Refresh Token
使用 node.js 內建的 crypto 產生隨機文字
```js
import crypto from 'node:crypto'

// 隨機產生文字
const refreshToken = crypto.randomBytes(64).toString('hex')
// 進行雜湊，相同明文雜湊後結果都相同
const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex')
```

### 回應
將資料回應給前端
```js
res
  .status(StatusCodes.OK)
  .cookie('refresh', refreshToken, {
    // 前後端不同網域，必須設定
    sameSite: 'none',
    // 只有 https 請求才會使用 cookie
    secure: true,
    // 無法被前端 JavaScript 存取
    httpOnly: true,
    // 只能在認證 api 路徑使用
    path: '/auth',
  })
  .json({
    success: true,
    message: '登入成功',
    result: {
      accessToken
    },
  })
```

## Axios 攔截器
前端設定 Axios 攔截器  
送出請求前自動加上 AT，如果過期自動使用 RT 更新認證資訊  

@flowstart
st=>start: axios.get() axios.post 等地方
first=>operation: 請求攔截器 interceptors.request
second=>operation: 送出
third=>operation: 回應攔截器 interceptors.response
e=>end: await axios.get 等地方
st->first->second->third->e
@flowend

因為有更新請求，所以每次使用 AT 時都需要判斷是不是更新中  
避免重複傳送更新請求  

@flowstart
stA=>start: Request A 發送
cond401=>condition: 回傳 401?
e_ok_a=>end: A 結束
op_refresh=>operation: 啟動 Refresh Token
io_bc=>inputoutput: Request B, C 陸續發送
cond_refreshing=>condition: 正在 Refresh?
e_ok_bc=>end: B C 結束
sub_wait=>subroutine: B C 暫存請求並進入等待
op_done=>operation: Refresh 完成
e_retry=>end: A, B, C 重新發送 Request
stA->cond401
cond401(yes)->op_refresh
cond401(no)->e_ok_a
op_refresh->io_bc
io_bc->cond_refreshing
cond_refreshing(yes)->sub_wait
cond_refreshing(no)->e_ok_bc
sub_wait->op_done
op_done->e_retry
@flowend

```js
import { useUserStore } from '@/stores/user'
import axios from 'axios'

// 記錄更新請求的 Promise
let refreshPromise: null

// withCredentials: 請求自動攜帶 cookie
// baseURL: 請求基礎網址
// baseURL = http://localhost:4000
// axios.get('/user')
// baseURL = x
// axios.get('http://localhost:4000/user')
export const apiAuth = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
})

// 請求攔截器
// config: 請求設定，包含網址、請求方式、body 等
apiAuth.interceptors.request.use(async (config) => {
  // 如果刷新進行中，等待完成
  // 必須要排除刷新本身，不然會卡住
  if (refreshPromise && config.url !== '/auth/refresh') {
    try{
      await refreshPromise
    } catch {
      // 錯誤由回應攔截器處理
      // 這裡還是要寫 catch，避免在這裡出現更新錯誤
    }
  }
  // 從 Pinia 取得並帶上 AT
  const userStore = useUserStore()
  if (userStore.accessToken) {
    config.headers.set('Authorization', `Bearer ${userStore.accessToken}`)
  }
  // 使用更新後的請求設定發送
  return config
})

// 回應攔截器
// res: 回應
// error: 發生的錯誤
apiAuth.interceptors.response.use(
  (res) => res,
  async (error) => {
    const userStore = useUserStore()
    const originalRequest = error.config

    // 如果錯誤是 401，且不是刷新 Token 的請求本身
    if (
      error instanceof AxiosError &&
      error.response?.status === 401 &&
      originalRequest?.url !== '/auth/refresh'
    ) {

      // 如果目前沒有正在進行中的刷新請求，就發送一個
      if (!refreshPromise) {
        refreshPromise = useRefreshMutation().mutateAsync()
      }

      try {
        const refreshResponse = await refreshPromise
        // 更新 Pinia 中的 token
        userStore.accessToken = refreshResponse.data.result
        // 修改發生錯誤的原請求設定，換上新的 token
        originalRequest.headers.set('Authorization', `Bearer ${refreshResponse.data.result.token}`)
        // 重試原始請求
        // 不使用 axios(originalRequest)，否則會失去 baseURL 等設定
        return apiAuth(originalRequest)
      } catch {
        // 刷新失敗，登出
        userStore.accessToken = ''
        // 回傳原錯誤
        throw error
      } finally {
        // 清空 refreshPromise
        refreshPromise = null
      }
    }
    // 其他錯誤，回傳原本的錯誤
    throw error
  },
)
```
