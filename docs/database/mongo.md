# MongoDB 的安裝與操作

MongoDB 的安裝以及增改刪查語法  

## 安裝
### 安裝版
- 下載 `.msi`
- 選 `Complete`，`Install MongoD as a Service`，`Run service as a Network Service user`
- 設定檔會在 `安裝目錄/bin/mongo.cfg`
- 設定環境變數 `path`，新增值 `C:\Program Files\MongoDB\Server\4.2\bin`
- MongoDB 會開機啟動，打開 cmd 輸入 `mongo` 就能進入終端機下資料庫指令

### 免安裝
- 安裝 Visual C++ 2015/2017/2019
  - [x86](https://aka.ms/vs/16/release/vc_redist.x86.exe)
  - [x64](https://aka.ms/vs/16/release/vc_redist.x64.exe)
- 下載 `.zip` 解壓縮
- 在根目錄建立 `data` 資料夾
- 在根目錄建立 `logs` 資料夾，裡面開一個空的 `log.txt`
- 在根目錄建立 `mongod.config` 設定檔
  ```ini
  dbpath=data
  logpath=logs\log.txt
  ```
- 建立 `data` 和 `log` 資料夾
- 建立 MongoDB 啟動檔 `start.bat`，寫入 
  ```txt
  .\bin\mongod --config .\mongod.config
  ```
- 使用時須先執行啟動檔後， cd 到 bin 資料夾內，下 `mongo` 指令進入終端機下資料庫指令

### 工具
- [Azure Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

## 使用語法

### 新增
```js
// 單筆新增
> db.collection.insertOne({"name": "aaa"})
{
  "acknowledged" : true,
  "insertedId": ObjectId("123456")
}
// 多筆新增
> db.collection.insertMany([{"name": "aaa"}, {"name": "bbb"}])
{
  "acknowledged" : true,
  "insertedIds" : [
    ObjectId("123456"),
    ObjectId("123457")
  ]
}
// 也是多筆新增，但是僅回傳比數
// ordered: 當發生錯誤時是否停止執行
> db.collection.insert([{"name": "aaa"}, {"name": "bbb"}], {ordered: false})
BulkWriteResult({
  "writeConcernErrors" : [ ],
  "nInserted" : 0,
  "nUpserted" : 0,
  "nMatched" : 0,
  "nModified" : 0,
  "nRemoved" : 0,
  "upserted" : [ ]
})
```

### 索引
建立索引，可以避免資料庫欄位出現重複資料  
```js
// 建立索引
> db.col.createIndex({"account":1}, {unique: true})

// 顯示索引
> db.admin.getIndexes()
[
  {
    "v" : 2,
    "key" : {
      "_id" : 1
    },
    "name" : "_id_",
    "ns" : "test.admin"
  },
  {
    "v" : 2,
    "unique" : true,
    "key" : {
      "account" : 1
    },
    "name" : "account_1",
    "ns" : "test.admin"
  }
]

// 刪除索引
> db.admin.dropIndex("account_1")
{ "nIndexesWas" : 2, "ok" : 1 }
```

### 查詢
- `show dbs` 顯示所有資料庫
- `use db` 進入某資料庫
- `db.collection.find().limit().skip().pretty().sort()` 查詢
  - `collection` 為資料表名稱
  - `.find(query, projection)`，`query` 為查詢 `projection` 顯示欄位
    ```js
    // db.products.find( query, projection )
    // 找出 _id 為 123 的資料，但只顯示 _id, name, price 三個欄位
    > db.products.find( { _id: "ac3" } , { name:1,price:1} )  
    ```
  - `.limit()` 為資料比數，可不加
  - `.skip()` 為略過幾筆資料，可不加
  - `.pretty()` 為是否格式化輸出，可不加
  - `.sort( { price : 1 } )` 為資料排序
- 查詢動作
  - `$gte` - 大於等於 `.find( { price: {$gte:200 } } )`
  - `$gt` - 大於 `.find( { price: {$gt:200 } } )`
  - `$lte` - 小於等於 `.find( { price: {$lte:200 } } )`
  - `$lt` - 小於 `.find( { price: {$lt:200 } } )`
  - `$in` - 包含 `.find( { type: {$in:["food"]} } )`
  - `$nin` - 不包含 `.find( { type: {$nin:["food"]} } )`
  - `$and` - 和 `.find( { $and: [ { price: { $lt: 200 } }, { name: "ABCD"} ] } )`
  - `$or` - 或 `.find( { $or: [ { price: { $lt: 200 } }, { name: "ABCD"} ] } )`
  - `$not` - 否 `.find( { price: { $not: { $gt: 200 } } } )`

### 更新
```js
// db.collection.update(query, update, {upsert, multi})
> db.collection.update({'title':'MongoDB ABCD'},{$set:{'title':'MongoDB'}}, {multi: true})
```
- `query` - 查詢條件
- `update` - 更新資料，`$set` 修改指定值，`$inc` 為加減值，`$mul` 為乘值
- `upsert` - 如果找不到資料就新增
- `multi` - 預設只找一筆資料，設定 `true` 取代多筆資料

### 刪除
```js
// 刪除一筆
> db.col.deleteOne({'name':'ABC'})
// 刪除多筆
> db.col.deleteMany({'name':'ABC'})
```

## 聚合框架 (Aggregation Framework)
MongoDB 的聚合框架能更進階的處理查詢請求  

```js
> db.collection.aggregate([])
```

可使用 [MongoDB Compass](https://www.mongodb.com/products/compass) 的聚合工具輔助編寫語法  

### [pipeline](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)
- `$project` - 選擇回傳欄位，若只要回傳姓名和 id 為 `{ "$project" : { "id" : 1, "name" : 1 }}`
- `$match` - 查詢條件，一般 `.find()` 裡面寫的語法
- `$unwind` - 拆分，能把陣列裡的資料拆成單獨的一個個資料，若要拆分訂單陣列欄位為 `{"$unwind" : "$orders"}`
- `$sort` - 排序，若要寫依照年齡排序 `{ "$sort" : { "age" : 1 }}`
- `$limit` - 限制回傳資料數，若要限制會傳 10 筆為 `{ "$limit" : 10 }`
- `$skip` - 略過幾筆資料，若要略過前 10 筆資料為 `{ "$skip" : 10 }`
- `$group` - 分組
- `$lookup` - 關聯兩個 models，如以下就是將目前資料表的 author 和 users 資料表的 _id 關聯，並取名為 author 欄位
  ```js
  {
    '$lookup': {
      'from': 'users',
      'localField': 'author',
      'foreignField': '_id',
      'as': 'author'
    }
  }
  ```
### [操作符](https://docs.mongodb.com/manual/reference/operator/aggregation/)
- `$size` - 計算數量
- `$filter` - 過濾資料，可以搭配 `$eq`
- `$add` - 接受多個值相加
- `$subtract` - 接受兩個值相減，第二個剪減第一個，如 `$subtract : [ "$price", "$count"]`
- `$multiply` - 接受兩個值相乘，如 `$multiply : [ "$price", "$count"]`
- `$divide` - 接受兩個值相除，取結果
- `$mod` - 接受兩個值相除，取餘數
- `$filter` - 過濾資料，`{ $filter: { input: 陣列, cond: 判斷條件 } }`

操作符能混搭使用，如以下語法回傳 products 陣列裡 sell 欄位值為 1 的商品總數  
```js
> db.collection.aggregate([
  {
    $project: {
      'sellproducts': {
        '$size': {
          '$filter': {
            'input': '$products',
            'cond': {
              '$eq': [
                '$$this.sell', 1
              ]
            }
          }
        }
      }
    }
  }
])
```

## 資料管理
### 資料匯出
```js
> mongoexport -d DatabaseName -c CollectionName -o fileName.json
```

### 資料匯入
```js
> mongoimport -d DatabaseName -c CollectionName fileName.json
```

## 資料庫規劃
<PDF src="/assets/ch26/uml.pdf"></PDF>
