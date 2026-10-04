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
設定資料庫連線，建議使用 [dotenv](https://npmx.dev/package/dotenv) 和 `.env` 檔管理資料庫連線資訊  

```ini
DB_URL=mongodb+srv://帳號:密碼@cluster0.xxxxx.mongodb.net/資料庫名稱?retryWrites=true&w=majority
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
[Model](https://mongoosejs.com/docs/models.html) 是操作資料庫的物件，可以使用 Model 來新增、查詢、更新、刪除資料  

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

## 查詢條件
查詢條件使用的是 MongoDB 本身的語法，mongoose 會直接傳給資料庫  

```js
// 查詢價格大於等於 200 的商品
const products = await Product.find({ price: { $gte: 200 } })
```

### 比較
- `$eq` - 等於 `{ price: { $eq: 200 } }`，也可以直接寫 `{ price: 200 }`
- `$ne` - 不等於 `{ price: { $ne: 200 } }`
- `$gt` - 大於 `{ price: { $gt: 200 } }`
- `$gte` - 大於等於 `{ price: { $gte: 200 } }`
- `$lt` - 小於 `{ price: { $lt: 200 } }`
- `$lte` - 小於等於 `{ price: { $lte: 200 } }`
- `$in` - 符合陣列內任一值 `{ type: { $in: ['food', 'drink'] } }`
- `$nin` - 不符合陣列內任何值 `{ type: { $nin: ['food', 'drink'] } }`

### 邏輯
- `$and` - 和 `{ $and: [{ price: { $lt: 200 } }, { name: 'ABCD' }] }`
- `$or` - 或 `{ $or: [{ price: { $lt: 200 } }, { name: 'ABCD' }] }`
- `$not` - 否 `{ price: { $not: { $gt: 200 } } }`

:::tip TIP
同一個物件內的多個條件就是 `$and`，下面兩種寫法結果相同
```js
{ $and: [{ price: { $lt: 200 } }, { name: 'ABCD' }] }
{ price: { $lt: 200 }, name: 'ABCD' }
```
:::

### 其他
- `$regex` - 正則表達式，用於搜尋文字 `{ name: { $regex: 'abc', $options: 'i' } }`，`i` 代表不分大小寫
- `$exists` - 欄位是否存在 `{ image: { $exists: true } }`

### 排序與分頁
```js
const products = await Product
  // 查詢條件
  .find({ price: { $gte: 200 } })
  // 只回傳 name 和 price 欄位
  .select('name price')
  // 依價格排序，1 為小到大，-1 為大到小
  .sort({ price: 1 })
  // 略過前 10 筆
  .skip(10)
  // 只取 10 筆
  .limit(10)
```

## 更新運算子
更新資料時，可以使用 MongoDB 的更新運算子描述要怎麼修改資料
- `$set` - 修改指定欄位的值
- `$inc` - 數字加減，負數為減
- `$mul` - 數字相乘

```js
// 修改一筆資料，將名稱為 ABCD 的商品價格改為 300
await Product.updateOne({ name: 'ABCD' }, { $set: { price: 300 } })

// 修改多筆資料，將所有食物類商品的價格加 10
await Product.updateMany({ type: 'food' }, { $inc: { price: 10 } })
```

:::tip TIP
在 mongoose 若沒有寫更新運算子，會自動當作 `$set`，下面兩種寫法結果相同
```js
await Product.updateOne({ name: 'ABCD' }, { $set: { price: 300 } })
await Product.updateOne({ name: 'ABCD' }, { price: 300 })
```
:::

陣列欄位的資料，可以先查詢出來，用陣列語法處理後再 `save()`
```js
const user = await User.findById('12345678').orFail()
// 使用陣列語法修改購物車
user.cart.push({ product: '123', quantity: 1 })
await user.save()
```

## 索引
Schema 設定的 `unique: true` 不是驗證規則，而是資料庫的索引  
資料重複時不會出現驗證錯誤，而是資料庫回傳錯誤代碼 `11000` 的錯誤，需要另外處理  
```js
try {
  await User.create({ account: 'aaa' })
} catch (error) {
  if (error.code === 11000) {
    console.log('帳號重複')
  }
}
```

## 聚合框架
MongoDB 的[聚合框架 (Aggregation Framework)](https://www.mongodb.com/docs/manual/aggregation/) 能更進階的處理查詢  
由多個階段組成，每個階段對資料進行篩選、分組、計算、關聯等處理，並將結果傳給下一個階段  
適合用在統計報表等複雜的查詢，mongoose 使用 `Model.aggregate()`  

```js
// 依類別分組，計算每個類別的商品數量
const result = await Product.aggregate([
  { $group: { _id: '$type', count: { $sum: 1 } } }
])
```

可使用 [MongoDB Compass](https://www.mongodb.com/products/compass) 的聚合工具輔助編寫語法  
