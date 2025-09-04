# 變數
程式就像數學的代數一樣，需要給每個資料一個名字  
不管是哪一種程式語言，都會需要用 `變數` 給資料一個名字  

## 變數觀念
在一元一次方程式或一元二次方程式等代數中，會使用字母儲存數值  
而在程式裡，我們會給資料一個名字，這些代數被稱為 `變數`

數學代數範例
```
若 x＝2，則 5 × x＝ ?
```
轉換為程式後
```js
const x = 2
const result = x * 5
console.log(result)
```

## 變數命名
基本變數命名規則
- 必須以字母開頭
- 也能以 `$` 和 `_` 等特殊符號開頭，**（不推薦，除非有特殊用途）**
  - `$` 為 [jQuery](https://jquery.com/) 的語法
  - `_` 為 [lodash](https://lodash.com/) 和 [underscore.js](https://underscorejs.org/) 的語法
- 名稱對大小寫敏感（`y` 和 `Y` 是不同的變數）
- 可以用英文以外的文字 **（不推薦，可能會有文字編碼問題，且有些程式語言不支援這種做法）**
- 建議使用有意義的文字當作名稱
- 建議使用 [駝峰式大小寫](https://zh.wikipedia.org/wiki/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB) 當命名規則
- 程式語言保留字無法當作變數名稱

變數命名規範參考:
- [程式英文](https://github.com/EngTW/English-for-Programmers)
- [無瑕的程式碼 JavaScript](https://github.com/AllJointTW/clean-code-javascript)

::: demo [vanilla]
```html
<html>
  <p id="example2-p"></p>
</html>
<script>
  const ᾩ = "something";
  const ĦĔĽĻŎ = "hello";
  const 〱〱〱〱 = "too less";
  const जावास्क्रिप्ट = "javascript"; // ok that's JavaScript in hindi
  const KingGeorgeⅦ = "Roman numerals.";
  const p = document.getElementById("example2-p");
  p.innerText = ᾩ + "," + ĦĔĽĻŎ + "," + 〱〱〱〱 + "," + जावास्क्रिप्ट + "," + KingGeorgeⅦ;
</script>
```
:::

<ImageFigure
  src="/images/ch2/reserved.png"
>
  變數保留字，圖片取自 <a href='https://www.sololearn.com/' target='_blank'>SoloLearn</a>
</ImageFigure>

## 變數宣告
在 JavaScript 裡，有三種變數宣告方式  
變數宣告後，用 `=` 賦值或修改值

- `var` 是全域變數，如果重複宣告的話舊的會被蓋掉
- `let` 是區塊變數，僅作用在 `{}` 包起來的區塊，同一個 `{}` 內重複宣告會錯誤
- `const` 是常數，規則和 `let` 一樣，宣告後就不能再修改值

:::danger 注意
不宣告變數會變成全域變數，在瀏覽器會被綁在 `window` 上，不推薦這樣使用
```js
a = 1
console.log(a)          // 1
console.log(window.a)   // 1
```
:::

`var` 變數宣告範例
```js
var a = 1
console.log(a)          // 1
// 需要改值時不需要重複宣告，用 = 修改
a = 2
console.log(a)          // 2
var a = 3
console.log(a)          // 3
```
`let` 變數宣告範例
```js
// let 區域變數
// 區域內不能重複宣告，{} 為一區
let b = 1
console.log(b)          // 1
// 重複宣告會出現錯誤
// Uncaught SyntaxError: Identifier 'b' has already been declared
// let b = 2
b = 2
console.log(b)          // 2
```
`const` 常數宣告範例
```js
// const 區域常數
// 區域內不能重複宣告，{} 為一區
// 宣告後不能修改
const c = 1
console.log(c)
// 修改會出現錯誤
// Uncaught TypeError: Assignment to constant variable.
// c = 2
```

`let` 與 `const` 以 `{}` 為一個區域  
在存取變數時，會先找目前區域的變數，找不到再往上找全域變數  
```js
let a = 1
{
  let a = 2
  console.log(a)        // 2
}
console.log(a)          // 1

let b = 1
{
  b = 2
  console.log(b)        // 2
}
console.log(b)          // 2
```

## 資料型態
在程式語言裡的值都有資料型態，最基本的型態有下面幾種   

- `number` 或 `int` 代表整數數字
- `float` 代表小數，或稱作浮點
- `string` 或 `char` 代表文字字串，需要使用單引號 `'` 、雙引號 `"` 或 <code>`</code> 將文字包起來  
- `boolean` 或簡稱 `bool`，代表布林值，`true` 和 `false`
- `null` 空值
- `undefined` 未定義
- `NaN` 代表非數字 `Not a Number`
- `array` 陣列
- `object` 物件

:::danger 注意
`'` 和 `"` 內的文字不能換行，只有 <code>`</code> 可以
:::


```js
// 文字需用引號包起來
const str1 = "文字"
const str2 = '文字'
const str3 = `文字`
// ` 內的文字可以換行
const str4 = `aa
aa`

// 數字
const int = 123
const float = 123.456

// 布林值
const bool = true

// 使用 typeof 查看變數的資料型態
console.log(typeof int)
```

<ImageFigure
  src="/images/ch2/datatype.jpg"
  alt="資料型態分別"
  title="資料型態分別"
>
  資料型態分別
</ImageFigure>
