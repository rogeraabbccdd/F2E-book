# 身分驗證

使用 [Passport.js](https://www.passportjs.org/) 進行身分驗證  
課程以 Token 認證為主

## 認證方式
登入認證方式主要分成 `Session` 和 `Token` 認證兩種  

Session 認證流程，讓伺服器記住使用者
- 登入成功後，後端產生一個隨機的 Session ID，並在伺服器記錄這個 ID 對應的使用者
- 後端將 Session ID 回傳給瀏覽器，存入 cookie
- 之後每次請求，瀏覽器會自動帶上 cookie
- 後端用 cookie 內的 Session ID 查詢伺服器記錄，找出是哪個使用者
- 登出時，後端刪除伺服器上的記錄，這個 Session ID 就失效了

Token 認證流程，自己攜帶登入證明
- 登入成功後，後端將使用者資訊簽章成 Token 回傳給前端
- 之後每次請求，前端在 header 帶上 Token
- 後端驗證 Token 的簽章是否正確，不需要查詢伺服器記錄就能知道是哪個使用者

| 比較項目 | Session 認證 | JWT + Refresh Token 認證 |
|:---|:---|:---|
| 狀態儲存位置 | 伺服器端 (Server Memory / Redis) | 客戶端 (瀏覽器端保存 Token) |
| 伺服器負擔 | 每次請求都要查詢 Session | 驗證 JWT 只需要運算，非必要不須需查詢資料庫 |
| 跨網域/跨伺服器 | 較麻煩（需要共享 Session 或固定伺服器） | 非常容易（適合微服務、Mobile App、不同網域） |
| 立即主動廢除 | 容易（伺服器直接刪除該 Session 即可） | AT 在到期前都有效，所以效期要設短，在用 RT 換新 AT 時才檢查是否廢除 |
| 安全隱患 | 主要防範 CSRF 攻擊 | 主要防範 XSS 攻擊（如果 Token 存 localStorage） |

:::tip TIP
課程範例在驗證 JWT 後，仍然會用 `_id` 查詢使用者資料，原因是
- 購物車等功能本來就需要使用者資料，放進 `req.user` 讓後面的 controller 使用
- 使用者資料變更（如權限調整）時可以立即生效，不用等到 AT 過期
- 使用 `_id` 查詢有索引，速度很快

如果想真正發揮 JWT 不查資料庫的優點，可以把角色等必要資訊放進 payload  
但權限變更要等到 AT 過期後才會生效
:::

## 流程
身分認證以 `access token` (AT)、`refresh token` (RT) 實作  
- 註冊帳號，密碼加密後儲存資料庫
- 帳號密碼登入
- 帳號密碼通過，後端簽發認證資訊
  - AT：有效期 15 分鐘，JWT 格式
  - RT：有效期 7 天，隨機文字，以雜湊儲存進資料庫並設定過期時間 (TTL, Time To Live)
- 前端接收認證資訊
  - AT：存入 Pinia 變數中，不與 localStorage 同步
  - RT：存入 cookie，設定 httpOnly，無法被 JS 讀取增加安全性
- 前端進行需要認證的操作時，使用 AT
- 前端使用 AT 卻收到過期回覆時，用 RT 向後端換取一組新的 AT 和 RT
- 後端重新簽發認證資訊，並刪除資料庫中舊 RT

密碼和 RT 在資料庫都不是存明文，增加安全性  
- 密碼：使用 bcrypt 加密
- RT：使用雜湊

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
import axios, { AxiosError } from 'axios'
import { useUserStore } from '@/stores/user'

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

// 使用 RT 換新的 AT
// 成功時更新使用者資料，失敗時登出
export async function refreshToken () {
  const user = useUserStore()
  try {
    const { data } = await apiAuth.post('/auth/refresh')
    user.login(data.result)
  } catch (error) {
    user.logout()
    throw error
  }
}

// 記錄更新請求的 Promise，以判斷更新是否進行中
let refreshPromise = null

// 請求攔截器
// config: 請求設定，包含網址、請求方式、body 等
apiAuth.interceptors.request.use(async config => {
  // 如果更新進行中，等待完成
  // 必須要排除更新本身，不然會卡住
  if (refreshPromise && !config.url?.includes('/auth/refresh')) {
    await refreshPromise
  }
  // 從 Pinia 取得並帶上 AT
  const user = useUserStore()
  config.headers.set('Authorization', `Bearer ${user.accessToken}`)
  // 使用更新後的請求設定發送
  return config
})

// 回應攔截器
// .use(成功處理, 失敗處理)
apiAuth.interceptors.response.use(
  res => res,
  async error => {
    // 如果錯誤是 401，且不是更新 Token 的請求本身
    if (
      error instanceof AxiosError
      && error.config
      && error.response?.status === 401
      && !error.config.url?.includes('/auth/refresh')
    ) {
      // 如果目前沒有正在進行中的更新請求，就發送一個
      if (!refreshPromise) {
        refreshPromise = refreshToken()
      }

      try {
        // 等待更新完成
        await refreshPromise
        // 重試原始請求，請求攔截器會自動帶上新的 AT
        // 不使用 axios(error.config)，否則會失去 baseURL 等設定
        return apiAuth(error.config)
      } catch {
        // 更新失敗，回傳原本的錯誤
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

AT 只存在 Pinia 變數中，重新整理網頁後就會消失  
所以第一次進入網頁時，在路由守衛使用 RT 換取新的 AT  
```js
import { START_LOCATION } from 'vue-router'
import { refreshToken } from '@/utils/api'

router.beforeEach(async (to, from) => {
  // 第一次進入網頁
  if (from === START_LOCATION) {
    // 沒有登入過或 RT 過期時會失敗，失敗就維持未登入狀態
    await refreshToken().catch(() => {})
  }
})
```
