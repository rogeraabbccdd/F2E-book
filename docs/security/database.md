# 資料庫防護
資料庫攻擊相關防護措施

## 注入攻擊
由於 MongoDB 的資料庫操作都是使用 `$` 開頭的字串來表示指令，如果直接將使用者輸入的資料存進資料庫，可能有安全性問題  
當資料庫操作語法為
```js
User.findOne({ username: req.body.username })
```
且傳入的 body 資料為  
```js
{ username: { $gt: "" } }
```
就可以在查詢請求時以這個方式取得隨機一位使用者，因為最後的查詢結果是
```js
User.findOne({ username: { $gt: "" } })
```

## 消毒
使用工具，將所有 `$` 開頭的欄位進行處理，防止執行惡意查詢  
- mongoose 內建 `sanitizeFilter`，將 `$` 開頭的欄位值轉換成文字
- [express-mongo-sanitize](https://npmx.dev/package/express-mongo-sanitize) 可以將 req.body 中所有 `$` 開頭的欄位刪除或取代

:::danger 注意
使用 `sanitizeFilter` 時，如果某些欄位需要使用查詢指令，需要使用 `trusted` 標記
```js
mongoose.set('sanitizeFilter', true)
Product.find({ price: trusted({ $gt: 100 }) })
```
:::

## 驗證
在對資料庫進行操作前，先使用 [yup](https://npmx.dev/package/yup) 等驗證套件對傳入資料進行處理
```js
import * as yup from 'yup'
const schema = yup.object({
  username: yup.string()
    .required('帳號是必填項')
    .min(3, '帳號至少需要 3 個字元'),
});
// 加上 strict 設定，同時比對型別，如 '123' 和 123，相當於 ===
const parsed = schema.validate(req.body, { strict: true })
User.findOne({ username: parsed.username })
```