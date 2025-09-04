# 資料庫 API

製作能增改刪查資料庫的網頁 API，並熟悉 export 和 import

## MVC 架構圖
<img src="/images/ch27/MVC Express.png" height="300" style="margin: 10px 0;">  

使用 MVC 架構編寫 API，將程式的結構更加直覺化，也將修改與功能擴充簡化，提高可用性  

`Model-View-Controller` 是一種設計模式，作法是將程式分割成以下三個元件  
- `Model` 模型，有存取資料庫的權利
- `View` 視圖，資料顯示
- `Controller` 控制器，控制程式流程，對事件做出回應，包括使用者行為和資料改變

## 前置作業
### 安裝套件
  ```js
  // MongoDB 操作套件
  npm install mongoose
  // 驗證
  npm install validator
  // 網頁伺服器
  npm install express
  // express 允許跨域請求
  npm install cors
  // 讀取環境設定檔
  npm install dotenv
  // 加密套件
  npm install bcrypt
  ```

### 檔案結構
依照 MVC 的功能區分資料夾，資料夾內再依資料區分檔案
```
.
├── controllers
│   └── users.js
├── models
│   └── users.js
├── routes
│   └── users.js
├── package.json
├── index.js (執行主體)
└── db.js (資料庫連接)
```

## 編寫 API
### 主體
建立 `index.js` 內容為 API 主體
```js
import express from 'express'
// 跨域套件
import cors from 'cors'
// users 資料的路由
import userRoutes from './routes/users.js'
// 資料庫連線檔
import './db.js'

const app = express()

// 解析傳入的資料
app.use(express.json())

// 設定跨域套件
app.use(cors({
  // origin 為請求來源網域, callback 為是否允許的回應
  origin (origin, callback) {
    // 允許任何來源網域的請求
    callback(null, true)
    // 若要拒絕請求則是
    // callback(new Error('cors error'), false)
  },
  // 允許跨域認證
  credentials: true
}))

// 將路由分類，所有進到 /users 路徑的請求使用 users 的路由
app.use('/users', userRoutes)

// 在 3000 port 啟用
app.listen(3000, () => {
  console.log('網頁伺服器已啟動')
  console.log('http://localhost:3000')
})
```

### 設定資料庫
建立 `db.js`，內容為資料庫設定  

```js
// 引用 mongoose
import mongoose from 'mongoose'
// 引用 dotenv
import 'dotenv/config'

// 連接資料庫
mongoose.connect(process.env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

// 引用插件
mongoose.plugin(idPlugin)
```

### Model
`models` 資料夾內各種資料一個 js 檔，內容為資料表綱要  
使用 Mongoose 時必須要建立資料庫綱要 Schema  
Mongoose 的資料庫綱要除了能保持資料格式一致，也可以做資料驗證  

```js
const Schema = mongoose.Schema

const cartSchema = new Schema({
  p_id: {
    // Aggregation 聚合
    // 使用 products 資料表的 _id 為欄位值
    // 查詢時可以一起帶出對應的商品資料
    type: mongoose.ObjectId,
    ref: 'products'
  },
  quantity: {
    type: Number
  }
})

// 編寫資料表綱要
const userSchema = new Schema(
  {
    // 欄位名稱
    name: { 
      // 資料類型是文字
      type: String,
      // 最小長度，自訂錯誤訊息 
      minlength: [4, '使用者名稱最小 4 個字'],
      // 最大長度，自訂錯誤訊息
      maxlength: [12, '使用者名稱最大 12 個字'],
      // 必填欄位，自訂錯誤訊息
      required: [true, '使用者名稱必填'],
      // 避免重複
      unique: true
    },
    password: { 
      type: String, 
      required: [true, '密碼必填'],
    },
    age: {
      type: Number,
      // 最小值，自訂錯誤訊息
      min: [18, '必須大於 18 歲'],
      // 最大值，自訂錯誤訊息
      max: [99, '請輸入有效年齡'],
      required: [true, '年齡必填'],
    },
    email: {
      type: String,
      required: [true, '信箱必填'],
      unique: '信箱已使用',
      // 自訂驗證規則
      validate: {
        // 驗證 function
        validator (value) {
          return validator.isEmail(value)
        },
        // 錯誤訊息
        message: '信箱格式錯誤'
      }
    },
    cart: {
      // Composition 組合
      // 訂單為陣列，每筆資料使用 orderSchema 定義的結構
      type: [cartSchema]
    }
  }, 
  {
    // 不要紀錄資料修改次數
    versionKey: false
  }
)

// 資建立 Model
// mongoose.model('資料表名稱', Schema)
// 資料表名稱必須為複數，結尾加 s
const users = mongoose.model('users', userSchema)

// 匯出 Model
export default users
```

### Route
`routes` 資料夾內各種資料一個 js 檔，內容為路由設定  

```js
import express from 'express'
// 從 controller 引用 function
import { createUser, getUser, getUsers, updateUser, deleteUser } from '../controllers/users.js'

// 建立 router
const router = express.Router()

// 這裡最後的路徑會是 /users，進來這裡的 POST 請求會執行 createUser
router.post('/', createUser)

// 這裡最後的路徑會是 /users/:id，進來這裡的 GET 請求會執行 getUser
router.get('/:id', getUser)

// 這裡最後的路徑會是 /users，進來這裡的 GET 請求會執行 getUsers
router.get('/', getUsers)

// 這裡最後的路徑會是 /users/:id，進來這裡的 PATCH 請求會執行 updateUser
router.patch('/:id', updateUser)

// 這裡最後的路徑會是 /users/:id，進來這裡的 DELETE 請求會執行 deleteUser
router.delete('/:id', deleteUser)

// 訂單相關
router.post('/:id/orders', createUserOrder)
router.get('/:id/orders', getUserOrder)
router.patch('/:id/orders/:oid/:pid', updateUserOrder)
router.delete('/:id/orders', deleteUserOrder)

// 匯出路由設定
export default router
```

### Controller
`controller` 資料夾內各種資料一個 js 檔，內容為處理資料的 function  

```js
// 引用使用者資料庫
import users from '../models/users.js'

// 匯出各 function
export const createUser = () => {}
export const createUserOrder = () => {}
export const getUsers = () => {}
export const getUserOrder = () => {}
export const updateUser = () => {}
export const updateUserOrder = () => {}
export const deleteUser = () => {}
export const deleteUserOrder = () => {}
```

### 新增
新增使用者資料  
```js
// req 代表進來的請求
// res 代表回傳的請求
export const createUser = async (req, res) => {
  // 拒絕不是 json 的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 回傳錯誤狀態碼
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  // 新增資料
  try {
    const result = await users.create(
      {
        name: req.body.name,
        // 使用 bcrypt 加密，加鹽 10 次
        password: bcrypt.hashSync(req.body.password, 10),
        age: req.body.age,
        email: req.body.email
      }
    )
    res.status(200)
    res.send({
      success: true,
      message: '',
      id: result.id,
      name: result.name,
      age: result.age,
      email: result.email
    })
  } catch (error) {
    // 資料格式錯誤
    if (error.name === 'ValidationError') {
      // 錯誤的訊息的 key 值為欄位名稱，不固定
      // 所以用 Object.keys(err.errors)[0] 取得第一個 key 值
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已使用' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
      console.log(error)
    }
  }
}
```

新增訂單
```js
export const createUserOrder = async (req, res) => {
  // 拒絕不是 json 的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 回傳錯誤狀態碼
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  // 新增資料
  try {
    const result = await users.findByIdAndUpdate(req.params.id,
      {
        // 新增到使用者的訂單陣列
        $push: {
          orders: {
            date: new Date(),
            paid: false,
            products: req.body.products
          }
        }
      }, {new: true}
    )
    res.status(200)
    res.send({ success: true, message: '' })
  } catch (error) {
    // 資料格式錯誤
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
      console.log(error)
    }
  }
}
```

### 查詢
查詢所有使用者  
```js
export const getUsers = async (req, res) => {
  try {
    const result = await users.find({}, '-password')
    res.status(200)
    res.send({ success: true, message: '', users: result })
  } catch (error) {
    console.log(error.message)
    res.status(500)
    res.send({ success: false, message: '伺服器發生錯誤' })
  }
}
```

以 ID 查詢單個使用者  
```js
export const getUser = async (req, res) => {
  try {
    // 使用 id 尋找資料，只取 account，去掉 id
    const result = await users.findById(req.params.id)
    res.status(200)
    res.send({
      success: true,
      message: '',
      id: result.id,
      name: result.name,
      age: result.age,
      email: result.email
    })
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    }
    console.log(error)
  }
}
```

聚合查詢使用者訂單，一起帶出商品資料
```js
export const getUserOrder = async (req, res) => {
  try {
    // 使用 id 尋找資料，只取 account，去掉 id
    const result = await users.findById(req.params.id, 'orders').populate('orders.products.p_id')
    res.status(200)
    res.send({
      success: true,
      message: '',
      id: result.id,
      name: result.name,
      age: result.age,
      email: result.email
    })
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    }
    console.log(error)
  }
}
```

### 修改
修改使用者資料  
```js
export const updateUser = async (req, res) => {
  // 拒絕不是 json 的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 回傳錯誤狀態碼
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  try {
    // findByIdAndUpdate 預設回來的 result 是更新前的資料
    // 加上 new true 後可以回來新的資料
    const result = await users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    delete result.password
    res.status(200)
    res.send({
      success: true,
      message: '',
      id: result.id,
      name: result.name,
      account: result.account,
      email: result.email
    })
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    }
  }
}
```

修改訂單內商品數量
```js
export const updateUserOrder = async (req, res) => { // 拒絕不是 json 的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 回傳錯誤狀態碼
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  try {
    // findByIdAndUpdate 預設回來的 result 是更新前的資料
    // 加上 new true 後可以回來新的資料
    const result = await users.findOneAndUpdate(
      {'orders._id': req.params.oid, 'orders.products.p_id': req.params.pid},
      {
        $set: {
          'orders.0.products.0.quantity': req.body.quantity
        }
      },
      {new: true}
    )
    delete result.password
    res.status(200)
    res.send({ success: true, message: '' })
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    }
  }
}
```

### 刪除
刪除使用者
```js
export const deleteUser = async (req, res) => {
  try {
    const result = await users.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '' })
    }
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    }
  }
}
```

以訂單 ID 刪除訂單
```js
export const deleteUserOrder = async (req, res) => {
  try {
    const result = await users.findOneAndUpdate(
      // 以訂單 ID 查詢使用者資料
      {'orders._id': req.params.id},
      {
        // 刪除一個陣列元素
        $pull: {
          // 陣列欄位名稱
          orders: {
            // 刪除條件
            _id:  req.params.id
          }
        }
      },
      {new: true}
    )
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '' })
    }
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    }
  }
}
```

:::warning 作業
規劃並建立一個商品庫存 RESTful API
- 資料欄位
  - `name` 商品名稱
  - `price` 商品價格
  - `description` 商品說明
  - `count` 商品庫存量

- 新增
  - 請求方式為 **POST**
  - 路徑為 `/products`
  - 只接受 `application/json` 格式
    ```js
    {
      "name": "",
      "price": 0,
      "description": "",
      "count": 0
    }
    ```
  - 回傳相應狀態碼、是否成功、失敗訊息及商品資料，資料格式為 JSON
    ```js
    {
      "success": true,
      "message": "",
      "result": {
        "id": "",
        "name": "",
        "price": 0,
        "description": "",
        "count": 0
      }
    }
    ```

- 修改
  - 請求方式為 **PATCH**
  - 能以 ID 修改庫存量、名稱、說明及價格
  - 路徑為 `/products/id`，以 param 判斷要修改的項目
  - 只接受 `application/json` 格式，JSON 的欄位是要修改的欄位，值是要修改的資料
    ```js
    {
      "name": ""
    }
    ```
  - 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
    ```js
    {
      "success": true,
      "message": "",
    }
    ```

- 刪除
  - 請求方式為 **DELETE**
  - 路徑為 `/products/id`
  - 只接受 `application/json` 格式，`id` 是商品 ID
  - 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
    ```js
    {
      "success": true,
      "message": "",
    }
    ```

- 查詢單個商品
  - 請求方式為 **GET**
  - 路徑為 `/products/id`
  - 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
    ```js
    {
      "success": true,
      "message": "",
      "result": {
        "id": ""
        "name": "",
        "price": 0,
        "description": "",
        "count": 0
      }
    }
    ```

- 查詢所有商品
  - 請求方式為 **GET**
  - 路徑為 `/products`
  - 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
    ```js
    {
      "success": true,
      "message": "",
      "results": [
        {
          "name": "",
          "price": 0,
          "description": "",
          "count": 0
        }
        // 其他商品...
      ]
    }
    ```

- 搜尋商品
  - 請求方式為 **GET**
  - 路徑為 `/products`
  - 以 `query` 來查詢商品，提供 `price_gte` (價格大於等於) 和 `price_lte` (價格小於等於) 兩種
  - 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
    ```js
    {
      "success": true,
      "message": "",
      "results": [
        {
          "name": "",
          "price": 0,
          "description": "",
          "count": 0
        }
        // 其他商品...
      ]
    }
    ```
:::
