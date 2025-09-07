# Express.js

[Express.js](https://expressjs.com/) 是一個 Node.js 網頁伺服器框架

## 安裝
```bash
npm install express
```

```js
import express from 'express'

const app = express()

// 在 3000 port 啟用
app.listen(process.env.PORT || 3000, () => {
  console.log('網頁伺服器已啟動')
  console.log('http://localhost:3000')
})
```

## MVC
<img src="/images/ch27/MVC Express.png" height="300" style="margin: 10px 0;">  

使用 MVC 架構編寫 API，將程式的結構更加直覺化，也將修改與功能擴充簡化，提高可用性  

`Model-View-Controller` 是一種設計模式，作法是將程式分割成以下三個元件  
- `Model` 模型，有存取資料庫的權利
- `View` 視圖，資料顯示，API 不需要
- `Controller` 控制器，控制程式流程，對事件做出回應，包括使用者行為和資料改變

依照 MVC 的功能區分資料夾，資料夾內再依資料種類區分檔案
```
.
├── controllers
│   └── users.js
├── models
│   └── users.js (Mongoose Model)
├── routes
│   └── users.js
├── middlewares
│   └── admin.js
├── package.json
└── index.js (執行主體)
```

## Middleware
`middleware` 是指收到請求和回應之間的各個處理邏輯  
例如登入驗證、檔案上傳、解析請求資料等  

@flowstart
st=>start: 資料傳入
first=>operation: 解析內容
second=>operation: 登入驗證
third=>operation: 處理請求
e=>end: 回應
st->first->second->third->e
@flowend

Express 以 function 參數數量來區分一般 function 和 middleware  
- `(req, res) => {}` 一般處理 function，通常是最後一個處理時才會用到
- `(req, res, next) => {}` middleware，中間處理邏輯
- `(error, req, res, next) => {}` 處理 middleware 錯誤的 middleware

:::danger 注意
middleware 一定要呼叫 `next()` 進行下一步處理  
否則請求會卡在這裡
```js
app.use((req, res, next) => {
  // ...處理邏輯

  // 呼叫 next() 進行下一步處理
  next()
})
```
:::

依照寫法可以分為全域、指定路徑或請求方式的 middleware
```js
// 全域 middleware，所有請求都會執行
app.use(() => {})

// 所有 /users 路徑的請求都會執行
app.use('/users', () => {})

// 只有 GET /users 的請求會執行
app.get('/users', () => {})
```

以解析傳入的 JSON 資料為例  
在最上方先處理傳入的資料，後續的處理邏輯都能使用 `req.body` 取得傳入的內容
```js
const app = express()

// 解析傳入 body 的 json 資料
// 放在最上方，先處理傳入的資料
// 後續的 middleware, controller 等都能使用 req.body
app.use(express.json())

// 當上方 middleware 錯誤時，會執行這個錯誤處理 middleware
app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).send('伺服器發生錯誤')
})

// ...其他內容

app.listen()
```

## Routes
建立路由檔案，依照請求的資料種類拆分處理邏輯，例如

- `users.js` 處理使用者相關請求
- `products.js` 處理商品相關請求
- `orders.js` 處理訂單相關請求  

路由會依照提供的 function 照順序執行  

@flowstart
st=>start: 資料傳入
first=>operation: index.js
second=>operation: router
third=>operation: controller
e=>end: 回應
st->first->second->third->e
@flowend

```js
import express from 'express'
import * as user from '../controllers/users.js'

const router = express.Router()

router.post('/', user.create)
router.get('/', user.getAll)

// :id 代表參數，會帶入到 req.params.id
router.get('/:id', user.getId)

export default router
```

建立後在主程式引用
```js
import userRouter from './routes/users.js'

// 所有 /users 路徑的請求都會進入 userRouter
app.use('/users', userRouter)
```

## Controller
`controller` 的功能是處理傳入的請求，使用 Model 存取資料庫，並回傳結果給使用者  
依據不同處理結果，回傳不同的 HTTP 狀態碼

:::tip TIP
建議安裝 [http-status-codes](https://www.npmjs.com/package/http-status-codes)  
這個套件可以使用名稱來取得 HTTP 狀態碼，讓程式碼更具可讀性

```js
res.status(200).json({ success: true, message: '' })
res.status(StatusCodes.OK).json({ success: true, message: '' })
```
:::

```js
import User from '../models/users.js'

// req 代表進來的請求
// res 代表回傳的回覆
export const create = async (req, res) => {
  try {
    const result = await User.create(
      {
        name: req.body.name,
        // 使用 bcrypt 加密，加鹽 10 次
        password: bcrypt.hashSync(req.body.password, 10),
        age: req.body.age,
        email: req.body.email
      }
    )
    res.status(200).json({
      success: true,
      message: '',
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // mongoose schema 驗證錯誤
      // 錯誤的訊息的 key 值為欄位名稱，不固定
      // 所以用 Object.keys(err.errors)[0] 取得第一個 key 值
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      // 錯誤代碼 11000 代表 unique 欄位資料重複
      res.status(400).send({ success: false, message: '帳號已使用' })
    } else {
      res.status(500).json({ success: false, message: '伺服器發生錯誤' })
    }
  }
}

export const getAll = async (req, res) => {
  try {
    const users = await User.find({}, '-password')
    res.status(200).json({ success: true, message: '', users })
  } catch (error) {
    res.status(500).json({ success: false, message: '伺服器發生錯誤' })
  }
}

export const getId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({
      success: true,
      message: '',
      email: result.email
    })
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式，查詢時會發生錯誤
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到資料' })
    } else {
      res.status(500).json({ success: false, message: '伺服器發生錯誤' })
    }
  }
}
```

## 其他套件
- [cors](https://www.npmjs.com/package/cors) 讓瀏覽器前端能夠跨網域請求 API
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) 限制單一 IP 在一定時間內的請求次數，防止惡意攻擊
- [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) 移除請求中的 `$` 和 `.`，防止資料庫攻擊
