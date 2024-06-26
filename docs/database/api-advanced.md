# 進階 API

檔案上傳、登入驗證

## 登入
使用 JSON Web Token (JWT) 製作登入功能  

### JWT 介紹
近年瀏覽器對第三方 Cookie 驗證規定日趨嚴格，所以符合 RESTful 架構的 JWT 漸漸興起  
[JWT](https://jwt.io/) 是一組 Base64 字串，透過 `.` 分成三個部分
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

### 安裝套件
```
npm install jsonwebtoken
npm install passport
npm install passport-jwt
npm install passport-local
```

### 設定 passport.js
建立一個 `passport.js`，使用驗證策略編寫自己的驗證方式  
```js
import passport from 'passport'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'
import users from './models/users'

const JWTStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

// 新增一個名為 jwt 的驗證方式，使用 JWT 策略
passport.use('jwt', new JWTStrategy({
  // 從 headers 提取 Bearer Token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // JWT 驗證 secret
  secretOrKey: process.env.JWT_SECRET
}, (jwtPayload, done) => {
  // jwtPayload 為 jwt 解碼後的資料
  // done 標記驗證完成，done(錯誤, user的資料, authenticate的info)
  users.findOne({ _id: jwtPayload._id }, (err, user) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
}))

// LocalStrategy 也可以自訂欄位名稱
// new LocalStrategy({
//   usernameField: 帳號資料欄位名稱,
//   passwordField: 密碼資料欄位名稱,
// }, (username, password, done) => {})
passport.use('login', new LocalStrategy(async (username, password, done) => {
  const user = await users.findOne({ username })
  if (!user) {
    return done(null, false, { message: 'User not found' })
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return done(null, false, { message: 'Wrong password' })
  }
  return done(null, user, { message: 'Logged in successfully' })
}))
```

在 `index.js` 初始化 passport.js
```js
import passport from 'passport'
import './passport.js'

app.use(passport.initialize())
```

就能在路由使用驗證方式
```js
import passport from 'passport'
router.post('/login', passport.authenticate('login', { session: false }), login)
```

### 編寫 middleware
express 的 middleware 可以當作處理資料的層層關卡
@flowstart
st=>start: 資料傳入
first=>operation: bodyParser
second=>operation: 登入驗證
third=>operation: 處理請求
e=>end: 結束

st->first->second->third->e
@flowend

由於 passport 自訂驗證錯誤訊息需要寫成 callback  
為避免程式碼混亂所以編寫 `middleware/auth.js` 統一呼叫  
```js
import passport from 'passport'

export default (strategy) => {
  return (req, res, next) => {
    // 這裡的 user 和 info 是從 done 傳入的資料
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).send({ success: false, message: info.message })
      }
      req.user = user
      next()
    })(req, res, next)
  }
}
```

最後改寫路由引用
```js
// 引用 middleware
import auth from '../middleware/auth.js'

// 請求先進去登入驗證的 middleware 再繼續處理資料
router.post('/login', auth('login'), login)
```

### 登入
編寫使用者的 controller
```js
export const login = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  const token = jwt.sign({ _id: req.user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days' })
  req.user.tokens.push(token)
  await req.user.save()
  res.status(200).send({ success: true, message: '', token })
}
```

### 登出
```js
export const logout = async (req, res) => {
  try {
    // 將這次請求的 JWT 從使用者資料移除
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
```

## 檔案上傳
將檔案上傳至免費空間 [Cloudinary](https://cloudinary.com/)
### 安裝套件
  ```js
  npm install multer
  npm install cloudinary
  npm install multer-storage-cloudinary
  ```
### 編寫 middleware
將上傳檔案寫成 middleware  
和登入一樣在需要上傳檔案的路由引用，就能接收檔案  
```js
import multer from 'multer'
import path from 'path'
import 'dotenv/config'
import { v2 as cloudinary} from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// cloudinary 設定
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

// multer 套件設定
const upload = multer({
  // 指定上傳的檔案儲存到 cloudinary
  storage: new CloudinaryStorage({
    cloudinary
  }),
  // 過濾檔案類型
  fileFilter (req, file, callback) {
    if (!file.mimetype.includes('image')) {
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  // 限制檔案大小為 1MB
  limits: {
    fileSize: 1024 * 1024
  }
})

export default async (req, res, next) => {
  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 如果是 multer 的上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        message = '上傳錯誤'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      // 其他錯誤
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      next()
    }
  })
}
```

## 購物網
以 Vue、Node.js 與 MongoDB 實作一個線上購物網站  
- 能註冊帳號、登入、登出
- 有購物車功能
- 有管理後台能上下架商品
