# mongoose
[mongoose](https://mongoosejs.com/) 可以使用類似操作物件的方式來操作 MongoDB 資料庫

## 架構
- Schema 定義資料結構
- Model 操作資料庫的物件
- 使用 Model 來新增、查詢、更新、刪除資料

## 安裝
```bash
npm install mongoose
```

## 連線
設定資料庫連線，建議使用 [dotenv](https://www.npmjs.com/package/dotenv) 和 `.env` 檔管理資料庫連線資訊  

```ini
DB_URL=mongodb://xxx/xxx
```

```js
import 'dotenv/config'
import mongoose from 'mongoose'

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('資料庫連線成功')
  })
  .catch((error) => {
    console.error('資料庫連線失敗', error)
  })
```

## Schema
[Schema](https://mongoosejs.com/docs/guide.html) 是資料庫的結構，可以設定欄位、資料型態、預設值  
也能在新增或更新資料時進行驗證  
定義好 Schema 後，才能依照 Schema 建立 Model 來操作資料庫  

```js
const Schema = mongoose.Schema

const cartSchema = new Schema({
  product: {
    // Aggregation 聚合
    // 儲存的資料型態是 MongoDB 的 id
    // 使用 ref 定義 id 來源是 products 資料表
    // 查詢時可以使用 .populate() 一起帶出對應的商品資料
    type: mongoose.ObjectId,
    ref: 'products'
  },
  quantity: {
    type: Number
  }
})

const schema = new Schema(
  {
    // 欄位名稱
    account: {
      // 資料型態
      // https://mongoosejs.com/docs/schematypes.html#what-is-a-schematype
      type: String,
      // 使用內建驗證規則並自訂錯誤
      // https://mongoosejs.com/docs/validation.html#built-in-validators
      // https://mongoosejs.com/docs/validation.html#custom-error-messages
      required: [true, '帳號是必填的'],
      minLength: [3, '帳號至少需要 3 個字元'],
      maxLength: [20, '帳號最多 20 個字元'],
      match: [/^[a-zA-Z0-9]+$/, '帳號只能包含字母、數字'],
      // 自動使用 .trim() 方法去除前後空白
      // https://mongoosejs.com/docs/schematypes.html#string-validators
      trim: true,
      // 建立索引，避免重複帳號
      // https://mongoosejs.com/docs/schematypes.html#indexes
      // https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
      unique: true,
    },
    email: {
      type: String,
      required: [true, '電子郵件是必填的'],
      unique: true,
      // 自訂驗證
      // https://mongoosejs.com/docs/validation.html#custom-validators
      validate: {
        validator: (value) => validator.isEmail(value),
        message: '電子郵件格式不正確',
      },
    },
    cart: {
      // Composition 組合
      // 訂單為陣列，每筆資料使用 cartSchema 定義的結構
      type: [cartSchema]
    }
  },
  {
    // 自動新增 createdAt 和 updatedAt 欄位
    // https://mongoosejs.com/docs/guide.html#timestamps
    timestamps: true,
  },
)

// 建立 Model
// mongoose.model('資料表名稱', Schema)
// 資料表名稱必須為複數，結尾加 s
export default mongoose.model('users', usersSchema)
```

## Model
[Model]((https://mongoosejs.com/docs/index.html)) 是操作資料庫的物件，可以使用 Model 來新增、查詢、更新、刪除資料  

```js
import User from './models/user.js'

// 新增
const user = await User.create({
  account: 'aaaa',
  email: 'aaaa@gmail.com'
})

// 查詢
const users = await User.find()
const user = await User.findOne({ account: 'aaaa' }).orFail()
const user = await User.findById('12345678').orFail()

// 更新 (Update)
const user = await User.findByIdAndUpdate(
  '12345678',
  { email: 'bbbb@gmail.com' },
  { new: true }
)

// 更新 (Save)
const user = await User.findById('12345678').orFail()
user.email = 'bbbb@gmail.com'
await user.save()

// 刪除
const user = await User.findByIdAndDelete('123456789')

// 帶出關聯資料
const user = await User.findById('12345678').populate('cart.product')
```

## 安全性
由於 MongoDB 的資料庫操作都是使用 `$` 開頭的字串來表示指令，如果直接將使用者輸入的資料存進資料庫，可能有[安全性問題](https://thecodebarbarian.com/2014/09/04/defending-against-query-selector-injection-attacks.html)  
`sanitizeFilter` 可以將所有查詢指令中的 `$` 開頭欄位值用 `$eq` 包起來，避免被當成指令執行

```js
mongoose.set('sanitizeFilter', true)
```

如果某些欄位需要使用查詢指令，使用 [trusted](https://mongoosejs.com/docs/6.x/docs/api/mongoose.html#mongoose_Mongoose-trusted) 標記，就不會被包起來
```js
Product.find({ price: trusted({ $gt: 100 }) })
```
