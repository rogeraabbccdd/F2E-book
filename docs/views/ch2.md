--- 
title: Ch.2 變數
tags:
 - JavaScript
---

程式就像數學的代數一樣，需要給每個資料一個名字  
<!-- more -->
不管是哪一種程式語言，都會需要用 `變數` 來給資料一個名字  
變數的命名和幫小孩子取名一樣，也有很大的學問  

## 變數觀念

下面是一道數學代數題目  

> 若 x＝2，則 5 × x＝ ?

下面是一段變數宣告的程式碼  

::: demo [vanilla]
```html
<html>
  <p id="example1-p"></p>
</html>
<script>
  let x = 2;
  let p = document.getElementById("example1-p");
  p.innerText = 5*x;
</script>
```
:::


在代數中，我們使用字母來儲存值，而在程式裡，我們會給資料一個名字，這些代數被稱為 `變數`。

## 變數命名
在程式裡的變數命名是有規則的，像是:
- 變數必須以字母開頭
- 變數也能以 `$` 和 `_` 等特殊符號開頭（不推薦這麼做，除非有特殊用途）
- 變數名稱對大小寫敏感（y 和 Y 是不同的變數）
- 變數可以用英文以外的文字（不推薦這麼做，可能會有文字編碼問題，且有些程式語言不支援這種做法）
- 建議使用有意義的文字當作變數名稱
- 建議使用 [駝峰式大小寫](https://zh.wikipedia.org/wiki/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB) 當命名規則
- 程式語言保留字無法當作變數名稱，圖片取自 [SoloLearn](https://www.sololearn.com/)
  <img src="/F2E-book/images/ch2/reserved.png" style="margin: 10px 0;">  


下面這個範例以特殊字元當變數名稱  
雖然在執行上沒有問題，卻會讓閱讀程式碼的人無法理解  
::: demo [vanilla]
```html
<html>
  <p id="example2-p"></p>
</html>
<script>
  let ᾩ = "something";
  let ĦĔĽĻŎ = "hello";
  let 〱〱〱〱 = "too less";
  let जावास्क्रिप्ट = "javascript"; // ok that's JavaScript in hindi
  let KingGeorgeⅦ = "Roman numerals.";
  let p = document.getElementById("example2-p");
  p.innerText = ᾩ + "," + ĦĔĽĻŎ + "," + 〱〱〱〱 + "," + जावास्क्रिप्ट + "," + KingGeorgeⅦ;
</script>
```
:::

## 變數宣告
在 JavaScript 裡，有三種變數宣告方式
- `var` 是全域變數，如果重複宣告的話舊的會被蓋掉，使用上要非常小心
- `let` 是區塊變數，僅作用在 `{}` 包起來的區塊，在同一個 `{}` 內重複宣告會出現錯誤
- `const` 是常數，規則和 `let` 一樣，不過宣告後就不能再修改值，除非值為物件或陣列

這裡我們使用 `console.log()` 來在瀏覽器控制台輸出變數

```js
// var 變數測試
var x = 1;
if (true) {
  var x = 2;    // 一樣的名字，會覆蓋掉舊的
  console.log(x);   // 2
}
console.log(x);   // 2

// let 變數測試
let x = 1;
if (true) {
  let x = 2;    // 一樣的名字，不會覆蓋掉舊的，這行的 x 只作用在 if　的 {} 內
  console.log(x);   // 2
}
console.log(x);   // 1

// const 變數測試
const gravity = 9.8;
gravity = 1234;    // 錯誤，const 宣告後就不能修改值
```

## 變數資料型態
在程式語言裡的值都有資料型態，最基本的型態有下面幾種   

- `number` 或 `int` 代表整數數字
- `float` 代表小數，或稱作浮點
- `string` 或 `char` 代表文字字串，需要使用單引號 `'` 、雙引號 `"` 或 <code>`</code> 將文字包起來  
- `boolean` 或簡稱 `bool`，代表布林值，只有 `true` 和 `false` 兩種

另外還有陣列 `array` 和 `json` ，在之後的章節會搭配迴圈做介紹  

:::danger 注意
單引號和雙引號內的文字不能換行，只有 <code>`</code> 可以
:::

我們可以用 `typeof` 這個指令來讓程式告訴我們這個變數目前的型態是什麼  

```js
// 字串
let str = "文字";
let str2 = '文字';
let str3 = `文字`;
let str4 = `aa
aa`;

let int = 123;
let float = 123.456;
let bool = true;

console.log(typeof int);
```
