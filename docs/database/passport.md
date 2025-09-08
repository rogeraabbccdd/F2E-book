# 身分驗證

使用 [Passport.js](https://www.passportjs.org/) 進行身分驗證

## 架構
- [Passport.js](https://www.passportjs.org/) 身分驗證套件本體
  - [passport-local](https://www.passportjs.org/packages/passport-local/) 帳號密碼驗證策略
  - [passport-jwt](https://www.passportjs.org/packages/passport-jwt/) JWT 驗證策略
- [bcrypt](https://www.npmjs.com/package/bcrypt) 密碼雜湊套件
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) JWT 簽發


近年瀏覽器對第三方 Cookie 驗證規定日趨嚴格，所以符合 RESTful 架構的 [JWT](https://jwt.io/) 漸漸興起  
JWT 是一組 Base64 字串，透過 `.` 分成三個部分
```bash
# header，JWT 的加密演算法
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
# payload，JWT 包含的資料與簽發時間、到期時間
eyJfaWQiOiI2MDI3ZTE4NjEzODk2ZjIxYzhlYjU2NzYiLCJpYXQiOjE2MTMyMzAxODcsImV4cCI6MTYxMzgzNDk4N30
# signature/encryption data，用於驗證資料
rTnKU0l0w-P3xshZ43ZpWfzTSUuEXQoUQ7O3BYSYOsQ
```

:::danger 注意
千萬不要將隱私資料存在 JWT，例如使用者的密碼，因為 JWT 的 payload 可以還原原始資料  
由於 JWT 簽發後就無法撤銷，所以必須將簽發出去的 JWT 存入資料庫
:::

## passport.js
- 安裝需要的 [驗證策略套件](https://www.passportjs.org/packages/)
- `passport.use` 依照驗證策略建立自己的驗證方式 middleware
- `passport.authenticate` 在路由呼叫驗證方式進行驗證

:::tip TIP
通常驗證方式 middleware 執行完的處理程式碼很多  
所以會獨立另外寫一個 middleware 檔案來處理
:::

```bash
npm install passport passport-local passport-jwt
```

```js
// 建立驗證方式
passport.use('驗證方式名稱', 驗證策略)

// 在路由使用驗證方式 middleware
router.post('login', passport.authenticate('驗證方式名稱', 選項, 驗證方式執行完的處理))
```

## bcrypt
bcrypt 是一個密碼雜湊套件，可以將密碼加密成一組雜湊字串

```bash
npm install bcrypt
```

```js
import bcrypt from 'bcrypt'

// 加密密碼
// 10 = 密碼加鹽次數
bcrypt.hashSync(user.password, 10)

// 比對密碼
bcrypt.compareSync(使用者輸入的密碼, 資料庫的密碼雜湊字串)
```

配合 mongoose 的 [middleware](https://mongoosejs.com/docs/middleware.html#middleware)，在儲存使用者前自動加密密碼  
先經過 schema 的資料驗證後，在保存進資料庫前，進行密碼加密

@flowstart
st=>start: 儲存資料
first=>operation: validate
second=>operation: pre-save
third=>operation: save
e=>end: 結束
st->first->second->third->e
@flowend

:::danger 注意
密碼加密後的格式和原文長度不一樣，所以密碼格式限制不能寫在 Schema 裡面  
需要使用替代方案驗證密碼格式，例如：  
- 在 controller 中驗證密碼格式
- 在 mongoose 的 middleware 中驗證密碼格式
:::

```js
// 在保存前對密碼進行處理
// 盡量用 function 不要用箭頭，因為要用到 this
// next = 讓 mongoose 繼續下一步處理
schema.pre('save', function (next) {
  // this = 現在要保存的資料
  const user = this
  // 如果密碼欄位有修改，進行加密
  if (user.isModified('password')) {
    // 驗證密碼明文格式
    if (user.password.length < 4 || user.password.length > 20) {
      // 如果密碼長度不符合要求，拋出 mongoose 的驗證錯誤
      // 用跟 mongoose 的 schema 驗證錯誤一樣的錯誤格式
      // 可以跟其他驗證錯誤一起處理
      const error = new Error.ValidationError()
      // 設定密碼欄位錯誤
      error.addError(
        'password',
        new Error.ValidatorError({ message: '密碼長度必須在 4 到 20 個字元之間' }),
      )
      // 繼續處理，把錯誤傳出去
      // mongoose 遇到錯誤就不會存資料庫
      next(error)
      return
    } else {
      // 密碼格式符合要求，使用 bcrypt 加密密碼
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  // 繼續處理
  next()
})
```

## 登入
當收到登入請求時，先使用 local 策略驗證帳號密碼  
再使用 jsonwebtoken 簽發 JWT 回傳給使用者  

:::tip TIP
登入成功後，會將簽發的 JWT 存入資料庫，方便管理有效的 token  
建議限制資料庫裡的 token 數量，例如：只保留最近的 5 個 token
```js
schema.pre('save', function (next) {
  const user = this
  if (user.isModified('tokens') && user.tokens.length > 5) {
    user.tokens.shift()
  }
  next()
})
```
:::

@flowstart
st=>start: 使用者送出登入請求
first=>operation: local 策略驗證
second=>operation: 簽發 JWT
e=>end: 結束
st->first->second->e
@flowend

使用 local 驗證策略編寫驗證方式
```js
passport.use(
  'login',
  new passportLocal.Strategy(
    {
      // 預設檢查 username 和 password 欄位
      // 可以修改檢查的欄位名稱
      usernameField: 'account',
      passwordField: 'password',
    },
    // 檢查完帳號密碼欄位有資料後的處理
    // account = 帳號欄位，password = 密碼欄位
    // done = 驗證方法執行完成，繼續並把結果帶到下一步
    // done(錯誤, 使用者資料, info)
    async (account, password, done) => {
      try {
        // 檢查帳號是否存在
        const user = await User.findOne({ $or: [{ account }, { email: account }] }).orFail(
          new Error('USER NOT FOUND'),
        )
        // 檢查密碼是否正確
        if (!bcrypt.compareSync(password, user.password)) {
          throw new Error('PASSWORD')
        }
        // 驗證成功，把使用者資料帶到下一步
        return done(null, user)
      } catch (error) {
        console.log('passport.js login')
        console.error(error)
        // 驗證失敗，把錯誤和訊息帶到下一步
        if (error.message === 'USER NOT FOUND') {
          return done(null, false, { message: '使用者不存在' })
        } else if (error.message === 'PASSWORD') {
          return done(null, false, { message: '密碼錯誤' })
        } else {
          return done(error)
        }
      }
    },
  ),
)
```

再使用 `passport.authenticate` 呼叫驗證方式  

```js
export const loginMiddleware = (req, res, next) => {
  // 使用 passport 的 login 驗證方法
  // passport.authenticate(驗證方法, 設定, 處理function)
  // session: false = 停用 cookie
  // 處理 function 的 (error, user, info) 對應 done() 的三個東西
  passport.authenticate('login', { session: false }, (error, user, info) => {
    // 如果沒有收到使用者資料，或發生錯誤
    if (!user || error) {
      // Local 驗證策略內建的錯誤，缺少帳號密碼欄位時會發生
      if (info?.message === 'Missing credentials') {
        return res.status(400).json({
          success: false,
          message: '請提供帳號密碼',
        })
      }
      // 不是發生錯誤，但是驗證失敗，例如收到 "使用者不存在" 或 "密碼錯誤" 的訊息
      else if (!error && info) {
        return res.status(400).json({
          success: false,
          message: info.message,
        })
      }
      // 其他錯誤
      else {
        return res.status(500).json({
          success: false,
          message: '伺服器內部錯誤',
        })
      }
    }
    // 如果驗證成功
    // 將查詢到的使用者資料放入 req 給後續的 middleware 或 controller 使用
    req.user = user

    // 繼續下一步
    next()
  })(req, res, next)
}
```

編寫登入 controller，簽發 JWT 回傳給使用者

```js
export const login = async (req, res) => {
  try {
    // 簽發 JWT
    // https://github.com/auth0/node-jsonwebtoken?tab=readme-ov-file#jwtsignpayload-secretorprivatekey-options-callback
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    
    // 將簽發的 JWT 存入資料庫
    req.user.tokens.push(token)
    await req.user.save()
    
    // 回傳成功訊息和使用者資料
    res.status(200).json({
      success: true,
      message: '登入成功',
      user: {
        account: req.user.account,
        token,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '伺服器內部錯誤',
    })
  }
}
```

最後在路由串接驗證方式 middleware 和 controller

```js
router.post('/login', loginMiddleware, loginController)
```

## 身分驗證
使用者登入後，若要存取需要驗證的資源，如管理員新增商品、結帳等  
使用 JWT 策略驗證使用者傳入的 JWT  

:::tip TIP
由於 JWT 有過期時間，所以需要編寫自動更新 JWT 的機制  
因此某些路由需要允許過期的 JWT，例如：換發新 token、登出等
:::

@flowstart
st=>start: 使用者送出請求
first=>operation: JWT 策略驗證身分
second=>operation: 處理請求
e=>end: 結束
st->first->second->e
@flowend

使用 jwt 驗證策略編寫驗證方式
```js
passport.use(
  'jwt',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      // 因為套件只給解編後的 jwt 內容，不會給原本的 jwt，所以需要自己從 req 裡面拿
      passReqToCallback: true,
      // 忽略過期時間，因為舊換新的時候可以允許過期的 token
      ignoreExpiration: true,
    },
    // req 參數必須要設定 passReqToCallback 才能使用
    // payload = JWT 的內容
    // done = 跟 local 策略一樣功能
    async (req, payload, done) => {
      try {
        // 從 req 的 headers 裡面拿到 token
        // req.headers.authorization 的格式是 'Bearer token'
        // const token = req.headers.authorization.split(' ')[1]
        const token = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()(req)

        // 手動檢查過期
        // 只有 refresh 和 logout 可以允許過期的 token
        // Date.now() 是現在的時間，單位是毫秒
        // payload.exp 是 JWT 的過期時間，單位是秒，所以要乘以 1000 轉成毫秒
        const expired = payload.exp * 1000 < Date.now()
        // 請求的路徑
        // http://localhost:4000/user/abcd?aaa=111&bbb=222
        // req.originUrl = /user/abcd?aaa=111&bbb=222
        // req.baseUrl = /user
        // req.path = /abcd
        // req.query = { aaa: '111', bbb: '222' }
        const url = req.baseUrl + req.path
        if (expired && url !== '/user/refresh' && url !== '/user/logout') {
          throw new Error('TOKEN EXPIRED')
        }

        // 檢查使用者是否存在，並且 tokens 裡面有這個 token
        const user = await User.findOne({ _id: payload._id, tokens: token }).orFail(
          new Error('USER NOT FOUND'),
        )
        return done(null, { user, token })
      } catch (error) {
        if (error.message === 'USER NOT FOUND') {
          return done(null, false, { message: '使用者不存在或 token 已失效' })
        } else if (error.message === 'TOKEN EXPIRED') {
          return done(null, false, { message: 'token 已過期' })
        } else {
          return done(error)
        }
      }
    },
  ),
)
```

再使用 `passport.authenticate` 呼叫驗證方式  
```js
export const tokenMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, data, info) => {
    if (!data || error) {
      // 是不是 JWT 錯誤，可能是過期、格式錯誤、SECRET 錯誤等
      if (info instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({
          success: false,
          message: '無效的 token',
        })
      }
      // 其他 info，可能是查無使用者
      else if (info) {
        return res.status(400).json({
          success: false,
          message: info.message || '無效的 token',
        })
      }
      // 沒有 info，但是有錯誤
      else {
        return res.status(500).json({
          success: false,
          message: '伺服器內部錯誤',
        })
      }
    }

    // 驗證成功，把使用者資料和 token 放入 req 給後續的 middleware 或 controller 使用
    req.user = data.user
    req.token = data.token
    
    // 繼續下一步
    next()
  })(req, res, next)
}
```

在路由串接驗證方式 middleware 和 controller

```js
router.get('/profile', tokenMiddleware, profileController)
```

## 登出
使用者登出時，經過身分驗證後，將資料庫裡的 token 移除
```js
req.user.tokens = req.user.tokens.filter((token) => token !== req.token)
await req.user.save()
```

## 換發
使用者換發新 token 時，經過身分驗證後，將資料庫裡的舊 token 移除，並簽發新 token
```js
const i = req.user.tokens.indexOf(req.token)
const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
req.user.tokens[i] = token
await req.user.save()
```

## Axios 攔截器
在前端使用 [Axios 攔截器](https://axios-http.com/docs/interceptors)，可以在送出請求時自動帶上 JWT，或是過期時自動傳送換發請求

@flowstart
st=>start: axios.get/post/put/delete
first=>operation: axios.interceptors.request
second=>operation: 送出請求
third=>operation: axios.interceptors.response
e=>end: 結束
st->first->second->third->e
@flowend

傳送請求時，自動從 Pinia 取得 JWT，並帶在請求的 headers 裡面
```js
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers.Authorization = `Bearer ${user.token}`
  return config
})
```

當收到回應時，如果是過期錯誤，傳送換發請求，並更新 Pinia 裡的 JWT，然後重新發送原本的請求
```js
// .interceptors.response.use(成功處理, 失敗處理)
apiAuth.interceptors.response.use(
  // 成功的話直接回傳結果
  res => res,
  // 失敗的話進行錯誤處理
  async error => {
    // 如果錯誤有回應，沒網路的話不會有回應
    // 而且是 400 錯誤，而且是過期錯誤，而且請求不是更新
    if (error.response
      && error.response.status === 400
      && error.response.data.message === 'token 已過期'
      && error.config.url !== '/user/refresh'
    ) {
      const user = useUserStore()
      try {
        // 傳送更新請求
        const { data } = await userService.refresh()
        // 更新 pinia 保存的 jwt
        user.token = data.token
        // 修改發生錯誤的請求設定，換成新的 token
        error.config.headers.Authorization = `Bearer ${data.token}`
        // 重新發送原本的請求
        return axios(error.config)
      } catch {
        // 如果更新失敗，清除 pinia 存的使用者 token 和資料
        user.logout()
      }
    }
    // 如果沒有回應，或是其他錯誤
    // 回傳原本的錯誤
    throw error
  }
)
```
