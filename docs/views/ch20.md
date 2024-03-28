# 認識 Node.js

認識 Node.js 的結構

## 結構

### package.json
`package.json` 和 `package-lock.json` 記錄了這個 Node.js 專案的資訊  
```json
{
  // 專案使用 ECMAScript 語法
  "type": "module",
  // 專案名稱
  "name": "test",
  // 版本
  "version": "1.0.0",
  // 說明
  "description": "",
  // 切入點，編寫套件給別人引用時才需要
  "main": "index.js",
  // npm 指令
  "scripts": {
    "start": "node index.js"
  },
  // 作者
  "author": "",
  // 版權
  "license": "ISC",
  // 使用套件
  "dependencies": {
  },
  // 開發環境使用套件
  "devDependencies": {
  }
}
```
在專案的資料夾使用 `npm init` 初始化專案時會自動產生  

### node_modules
`node_modules` 資料夾存放這個專案用到的所有套件  
使用指令 `npm install` 會自動讀取 `package.json` 安裝所有套件  

## 模組化
:::danger 注意
JavaScript 語法標準分為 **CommonJS** 和 **ECMAScript**  
CommonJS 是 Node.js 使用的語法標準，在匯出匯入使用的語法是 `require` / `module.exports`  
ECMAScript 是瀏覽器使用的語法標準，在匯出匯入使用的語法是 `import` / `export`  
若要在 Node.js 專案使用 ECMAScript，必須要另外做設定，或是安裝套件
瀏覽器在模組化開發也有一些限制，不是隨便就能用 `import` / `export`  
:::

模組化開發的概念，就像是組電腦一樣
```js
import I牌CPU
import 主機板
import N牌顯示卡
import 記憶體
import 硬碟
import 電源供應器

PC.build(I牌CPU, 主機板, N牌顯示卡, 記憶體, 硬碟, 電源供應器)
```

模組化好處就是方便抽換，如果想換別家的東西，只需要把想換的地方改掉就好，其他地方不用動
```js
import A牌CPU
import 主機板
import A牌顯示卡
import 記憶體
import 硬碟
import 電源供應器

PC.build(A牌CPU, 主機板, A牌顯示卡, 記憶體, 硬碟, 電源供應器)
```

:::danger 注意
- 一個檔案裡面只能有一個預設匯出  
- 具名匯出時必須使用宣告變數的寫法
- 匯入時寫相對路徑 `./`、`../` 等代表匯入檔案，直接寫名字則是匯入套件
- 匯入的變數是 `const`，不能修改值  
:::

### 預設匯出/匯入
export.js
```js
const num1 = 1
const num2 = 2
const add = (num1, num2) => {
  return num1 + num2
}

export default {
  num1, num2, add
}
```
import.js
```js
import numbers from './export.js'
console.log(numbers.num1) // 1
console.log(numbers.num2) // 2
const addnum = numbers.add(1, 2)
console.log(addnum) // 3
```

### 具名匯出/匯入
export.js
```js
const number1 = 10
const number2 = 20
export const a = "a"
export const b = "b"
export const c = number1 + number2
```
import.js
```js
// 具名個別匯入
// import {} from 
// {} 放要引用的變數
// 如果怕變數名稱跟檔案內的重複，可以使用 as 重命名
import { a as aa, b } from './export.js'
console.log(aa) // a
console.log(b)  // b

// 具名一次匯入
// import * from
// 也可以使用 as 重命名
import * as apple from './export.js'
console.log(apple.a)  // a
console.log(apple.b)  // b

// 也可以同時引用具名和預設
// import 預設, 具名 from 檔案
import apple, {a} from './export.js'
console.log(apple.num1) // 1
console.log(a)          // a
```

## 簡易網頁伺服器
```js
// 引用 node.js 的內建 http 套件
import http from 'http'
// 建立網頁伺服器
const server = http.createServer((req, res) => {
  // 回應狀態碼 200
  res.writeHead(200)
  // 寫入回應內容
  res.write('hello')
  // 回應結束
  res.end()
})
// 在 8080 埠啟動伺服器
server.listen(8080, () => {
  console.log('http://localhost:8080')
})
```

輸入指令執行
```js
// 使用 node 指令
node index.js
// 或使用在 package.json 定義的指令
npm run start
```
