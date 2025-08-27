# 模組化

模組化開發的概念，就像是組電腦一樣，把程式碼拆分成一個個小模組，再組合在一起

## 語法規範
JavaScript 語法標準分為 `CommonJS` 和 `ECMAScript`，兩種規範的模組化語法不同  
- `CommonJS` 是 Node.js 預設的語法
  - 使用 `require` / `module.exports`  
  - Node.js 可以使用 `__dirname` 取得目前檔案的路徑
- `ECMAScript` 是瀏覽器的語法
  - 使用 `import` / `export`  
  - Node.js 可以使用 `import.meta.url` 取得目前檔案的路徑

若要在 Node.js 專案使用 `ECMAScript`，必須做以下一種設定
- 在 `package.json` 加上 `"type": "module"`
- 檔案副檔名改為 `.mjs`

:::tip TIP
由於開發 Vue.js 使用的是 `ECMAScript`，為避免混淆，課程所以統一使用 `ECMAScript`
:::

:::danger 注意
Node.js 無法混用兩種語法
:::

## 概念
模組化開發的概念，就像是組電腦一樣
```js
import CPU from intel
import 主機板 from asus
import 顯示卡 from nvidia
import 記憶體 from kingston
import 硬碟 from wd
import 電源供應器 from coolerMaster

PC.build(CPU, 主機板, 顯示卡, 記憶體, 硬碟, 電源供應器)
```

如果想換其他廠商的零件，只需要把想換的地方改掉就好
```js {1,3}
import CPU from amd
import 主機板 from asus
import 顯示卡 from amd
import 記憶體 from kingston
import 硬碟 from wd
import 電源供應器 from coolerMaster

PC.build(CPU, 主機板, 顯示卡, 記憶體, 硬碟, 電源供應器)
```

:::danger 注意
- 一個檔案裡面只能有一個預設匯出  
- 具名匯出時必須使用宣告變數的寫法
- 匯入時寫相對路徑 `./`、`../` 等代表匯入檔案，直接寫名字則是匯入套件
- 引用必須放在最上面，除非使用 `import()` 動態引用
```js {2}
const func = async () => {
  const test = await import('./test.js')
  console.log(test)
}
```
:::

## 預設引用
- 使用 `export default` 匯出
- 使用 `import 名稱 from 檔案` 匯入
```js
export default {
  number: 123,
  text: 'abc'
}
```

```js
import test from './test.js'
console.log(test.number)
console.log(test.text)
```

## 具名引用
- 使用 `export` 和宣告變數匯出
- 使用 `import { 變數名稱 } from 檔案` 各別匯入，能用 `as` 重新命名
- 使用 `import * as 名稱 from 檔案` 一次匯入
```js
export const number = 123
export const text = "abc"
```
```js
import { number as num, text } from './test.js'
console.log(num)
console.log(text)

import * as test from './test.js'
console.log(test.num)
console.log(test.text)
```

## 瀏覽器模組化
使用 `<script type="module">`
```js
export default {
  number: 123,
  text: 'hello'
}
```
```html
<script type="module">
  import dayjs from 'https://cdn.skypack.dev/dayjs@1.10.7';
  import test from './test.js';

  console.log(dayjs().format())
  console.log(test)
</script>
```

使用 `importMap` 管理使用的套件
```html
<script type="importmap">
{
  "imports": {
    "test": "./test.js",
    "dayjs": "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"
  }
}
</script>
<script type="module">
  import test from 'test'
  import dayjs from 'dayjs'
  console.log(dayjs().format())
  console.log(test)
</script>
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
