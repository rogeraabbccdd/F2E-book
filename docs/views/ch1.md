--- 
title: Ch.1 認識 JavaScript
tags:
 - JavaScript
---

JavaScript 是網頁開發者必學的三種語言之一，也是最流行的腳本語言

<!-- more -->

## JavaScript 的用途

網頁開發者必學的三種語言，分別是 `HTML` 、 `CSS` 和 `JavaScript`  
- `HTML` 定義網頁的內容，網頁包含了什麼文字、什麼表格、什麼圖片等等
- `CSS` 規定網頁的樣式，文字應該是什麼顏色、圖片應該要多大、版面的排列等等
- `JavaScript` 運用在網頁上可以對使用者行為進行程式設計，或製作動畫效果等等

`JavaScript` 也可以運行在 `Node.js` 的伺服器環境，進行後端資料處理等功能。

### 網頁前端
- 能夠改變 HTML 內容
::: demo [vanilla]
```html
<html>
  <h1 id="example1-h1">我是一段文字</h1>
  <input type="button" id="example1-btn" value="點我修改文字">
</html>
<script>
  let h1 = document.getElementById("example1-h1");
  let btn = document.getElementById("example1-btn");
  btn.onclick = () => {
      h1.innerText = "文字被修改囉";
  }
</script>
```
:::
- 能夠改變 HTML 屬性
::: demo [vanilla]
```html
<html>
  <a href="https://google.com" id="example2-a" target="_blank">點我去 Google</a><br><br>
  <input type="button" id="example2-btn" value="點我改變連結網址">
</html>
<script>
  let link = document.getElementById("example2-a");
  let btn = document.getElementById("example2-btn");
  btn.onclick = () => {
      link.setAttribute("href", "https://fb.com");
      link.innerText = "點我去 Facebook";
  }
</script>
```
:::
- 能夠改變 HTML 樣式 (CSS)
::: demo [vanilla]
```html
<html>
  <h1 id="example3-h1">我是一段文字</h1>
  <input type="button" id="example3-btn" value="點我改變文字顏色">
</html>
<script>
  let h1 = document.getElementById("example3-h1");
  let btn = document.getElementById("example3-btn");
  btn.onclick = () => {
      h1.style.color = "red";
  }
</script>
```
:::
- 能夠偵測使用者對網頁的操作 (滑鼠點擊、鍵盤按鍵等)
::: demo [vanilla]
```html
<html>
  <img id="example4-img" src="https://www.runoob.com/images/pic_bulboff.gif" width="100" height="180">
  點擊燈泡來開關這盞燈
</html>
<script>
  let img = document.getElementById("example4-img");
  img.onclick = () => {
      if(img.src.match("bulbon")) img.src = "https://www.runoob.com/images/pic_bulboff.gif";
      else img.src = "https://www.runoob.com/images/pic_bulbon.gif";
  }
</script>
```
:::

### 網頁後端
- 能以 Node.js 開發網頁後端
- 能使用和前端一樣的語言進行開發
- Node.js 以 Google 的 V8 引擎打造，非常快速
- 有相當多的套件可以使用，擴充性高

### 其他
- 能以 [Electron](https://electronjs.org/) 開發跨平台應用程式
- 能以 [UserScript](https://greasyfork.org/zh-TW) 修改網頁，改善瀏覽體驗，~~或做壞壞的事~~

## JavaScript 的缺點
- 在網頁前端以明碼顯示，安全性不高
- 規範標準不一，有 `CommonJS` 和 `ECMAScript` 等
- JavaScript 程式結尾可以不加 `;`，程式在執行時會自動補上，但是會發生補錯位置的情況
- `+` 號不只可以做數學運算，還可以連接文字  
  <img src="/images/ch1/meme_js.jpeg" height="400" style="margin: 10px 0;">  
- 以 Node.js 開發的專案套件佔了空間一大半  
  <img src="/images/ch1/meme_node1.png" height="300" style="margin: 10px 0;">  
  <img src="/images/ch1/meme_node2.png" height="300" style="margin: 10px 0;">

## 第一個 JavaScript 程式
JavaScript 需要用 `<script>` 標籤包起來  
通常會將所有 `<script>` 標籤放在 `body` 結尾標籤後面  

```html {5-8}
<html>
   <head> </head>
   <body>
     <!-- 你的 HTML 的位置 -->
     <script>
       // 你的 JavaScript 應該放在這裡
       alert("Hello World!");
     </script>
   </body>
</html> 
```

恭喜你完成了你的第一個 JavaScript 程式!  
`alert()` 可以跳出一個警告訊息視窗，括號裡面放的是訊息文字  
`//` 和 `/* */` 可以註解，寫筆記或是程式碼的說明，讓自己或別人能更容易的理解程式的用途  

