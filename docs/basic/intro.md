# 認識 JavaScript

JavaScript 是網頁開發者必學的三種語言之一，也是最流行的腳本語言

## 前端功能
- 能夠改變 HTML 內容
- 能夠改變 HTML 屬性
- 能夠改變 CSS 樣式
- 能夠偵測使用者對網頁的操作 (滑鼠點擊、鍵盤按鍵等)

改變 HTML 內容範例
::: demo [vanilla]
```html
<html>
  <h1 id="example1-h1">我是一段文字</h1>
  <input type="button" id="example1-btn" value="點我修改文字">
</html>
<script>
  const h1 = document.getElementById("example1-h1");
  const btn = document.getElementById("example1-btn");
  btn.onclick = () => {
      h1.innerText = "文字被修改囉";
  }
</script>
```
:::

改變 HTML 屬性範例
::: demo [vanilla]
```html
<html>
  <a href="https://google.com" id="example2-a" target="_blank">點我去 Google</a><br><br>
  <input type="button" id="example2-btn" value="點我改變連結網址">
</html>
<script>
  const link = document.getElementById("example2-a");
  const btn = document.getElementById("example2-btn");
  btn.onclick = () => {
      link.setAttribute("href", "https://fb.com");
      link.innerText = "點我去 Facebook";
  }
</script>
```
:::

改變 CSS 樣式範例
::: demo [vanilla]
```html
<html>
  <h1 id="example3-h1">我是一段文字</h1>
  <input type="button" id="example3-btn" value="點我改變文字顏色">
</html>
<script>
  const h1 = document.getElementById("example3-h1");
  const btn = document.getElementById("example3-btn");
  btn.onclick = () => {
      h1.style.color = "red";
  }
</script>
```
:::

偵測使用者操作範例
::: demo [vanilla]
```html
<html>
  <img id="example4-img" src="/F2E-book/images/ch1/light_off.gif" width="100" height="180">
  點擊燈泡來開關這盞燈
</html>
<script>
  const img = document.getElementById("example4-img");
  img.onclick = () => {
      if(img.src.match("on")) img.src = "/F2E-book/images/ch1/light_off.gif";
      else img.src = "/F2E-book/images/ch1/light_on.gif";
  }
</script>
```
:::

## 後端功能
- 能以 `Node.js` 開發網頁後端
- 能使用和前端一樣的語言進行開發
- `Node.js` 以 Google 的 V8 引擎打造，非常快速
- 有相當多的套件可以使用，擴充性高

## 其他功能
- 能以 [Electron](https://electronjs.org/)、[Tauri](https://v2.tauri.app/)、[React Native](https://reactnative.dev/)、[NativeScript](https://nativescript.org/) 等開發跨平台應用程式
- 在遊戲引擎 Unity 中以類似 HTML、CSS 的 [UI Toolkit](https://docs.unity3d.com/6000.2/Documentation/Manual/ui-systems/introduction-ui-toolkit.html) 開發遊戲介面
- 能以 [UserScript](https://greasyfork.org/zh-TW) 修改網頁

## 缺點
- 在網頁前端以明碼顯示，安全性不高
- 規範標準不一，有 `CommonJS` 和 `ECMAScript` 等
- JavaScript 程式結尾可以不加 `;`，程式在執行時會自動補上，但是會發生補錯位置的情況
- `+` 號不只可以做數學運算，還可以連接文字
- 以 Node.js 開發的專案套件佔了空間一大半
- 語法更新頻繁，需要透過 [Babel](https://babeljs.io/) 等工具將新語法轉換成舊瀏覽器支援的語法
- 弱型別語言，所以才會有 [TypeScript](https://www.typescriptlang.org/) 出現

## 前端的使用方式
網頁上的 JavaScript 程式碼必須要搭配 `<script>` 標籤使用
- 可以將程式碼放在標籤裡面
- 或是將程式碼放在單獨的 `.js` 檔案裡，用 `src` 屬性引入
- `<script>` 標籤通常位在 `<head>` 或 `<body>` 結尾標籤前面
- 可以使用屬性調整載入時機  
  - 預設遇到 `<script>` 時停止載入網頁，下載執行完後才繼續
  - `defer`：繼續處理網頁，在背景下載，等網頁解析完後才依擺放順序執行
  - `async`：繼續處理網頁，在背景下載下載完後立刻執行，用於獨立且不依賴網站運作的程式，例如廣告

:::danger 注意
載入時機錯誤可能會導致程式無效  
例如在使用抓取網站元素的程式碼時，如果程式在網頁內容解析前執行，會找不到元素而出錯  
所以通常會將程式碼放在 `<body>` 結尾標籤前面，確保網頁內容已經解析完畢
:::

```html {8-11}
<html>
   <head> </head>
   <body>
     <!-- 你的 HTML 網頁內容 -->
     <h1>標題</h1>
     <p>文字文字文字</p>
     <!-- 你的 JavaScript 應該放在這裡 -->
     <script>
       // alert() 可以跳出一個警告訊息視窗，括號裡面放的是訊息文字
       alert("Hello World!");
     </script>
   </body>
</html> 
```
