# BOM
BOM 指的是 `Browser Object Model`，中文稱 `瀏覽器物件模型`  

## 介紹
BOM 是瀏覽器功能的核心，也就是 `window`  
所有預設的全域變數、函式、物件，都屬於 `window` 物件  

<ImageFigure
  src="/images/ch10/bom-dom.png"
  alt="BOM 結構圖"
  title="BOM 結構圖"
>BOM 結構圖</ImageFigure>

<!--
<Tree id="tree1" height="200px" :data="[{ id: 1, text_1: 'window', father: null, color:'#FF5722' },
{ id: 2, text_1: 'document', father: 1, color:'#00bcd4' }, 
{ id: 3, text_1: 'history', father: 1, color:'#00bcd4' }, 
{ id: 4, text_1: 'screen', father: 1, color:'#00bcd4' },
{ id: 5, text_1: 'navigator', father: 1, color:'#00bcd4' },
{ id: 6, text_1: 'location', father: 1, color:'#00bcd4' },
{ id: 7, text_1: 'popup', father: 1, color:'#00bcd4' }]" />
-->

## window
`window` 物件讓你可以存取和操作瀏覽器的視窗  
像是開啟頁面、關閉頁面、視窗大小等等  
- `window.open(網址, 目標, 彈出設定)` 開新網址
- `window.close()` 關閉視窗
- `window.outerWidth` 視窗外部寬度，包含工具列
- `window.outerHeight` 視窗外部高度，包含工具列
- `window.innerWidth` 視窗內部寬度，不含工具列
- `window.innerHeight` 視窗內部高度，不含工具列

```js
// 在新分頁開啟網址
window.open("https://google.com")
// 在彈出視窗開啟網址
window.open("https://google.com", "_blank", "width=500,height=500")

// 關閉視窗
window.close();

// 視窗大小，包含工具列等
window.outerWidth
window.outerHeight

// 視窗大小，不含工具列等
window.innerWidth
window.innerHeight
```

## location
`location` 是瀏覽器頁面網址  
可以透過操控這個物件來完成跳轉頁面，或獲取資訊  
- `location.href` 目前網址
- `location.reload` 重新載入頁面
- `location.hostname` 取得網域名稱
- `location.pathname` 取得網址路徑
```js
// 目前網址
console.log(`目前網址是 ${location.href}`);

// 跳頁
location.href = "https://google.com";

// 重新載入頁面
location.reload();

// 取得網域名稱
location.hostname;

// 取得網址路徑
location.pathname;
```

## history
`history` 是使用者的瀏覽紀錄  
- `history.back()` 上一頁
- `history.forward()` 下一頁
- `history.go(數字)` 移動到目前頁面的相對歷史紀錄

```js
// 上一頁
history.back();

// 下一頁
history.forward();

// 移動到目前頁面的相對歷史紀錄
// 正數代表往後幾頁，負數代表往前幾頁
history.go(-1);
```

## navigator
`navigator` 為使用者的狀態與身分  
包含了瀏覽器名稱、版本以及其他使用者資訊  
現代瀏覽器可以做到的事情非常多，可參考 [browser-2020](https://github.com/luruke/browser-2020) 說明  

::: demo [vanilla]
```html
<html>
  <p id="example-p"></p>
</html>
<script>
  const p1 = document.getElementById("example-p");
  p1.innerText = `瀏覽器語言: ${navigator.language}，作業系統: ${navigator.platform}`
</script>
```
:::

## screen
`screen` 可以獲取使用者的螢幕資訊，像是寬度和高度等  
- `screen.width` 螢幕寬度
- `screen.height` 螢幕高度
- `screen.availWidth` 可用寬度
- `screen.availHeight` 可用高度
- `screen.orientation` 螢幕方向

::: demo [vanilla]
```html
<html>
  <p id="example2-p"></p>
</html>
<script>
  const p2 = document.getElementById("example2-p")
  const width = screen.width
  const height = screen.height
  const availWidth = screen.availWidth
  const availHeight = screen.availHeight
  const orientation = screen.orientation.type
  p2.innerText = `
    螢幕寬度: ${width} / 螢幕高度: ${height} <br>
    可用寬度: ${availWidth} / 可用高度: ${availHeight} <br>
    螢幕方向: ${orientation}
  `
</script>
```
:::

## popup
`popup` 顯示瀏覽器內建的對話框  
- `alert` 顯示訊息框
- `confirm` 顯示確認框
- `prompt` 顯示輸入框

::: demo [vanilla]
```html
<html>
  <input type="button" value="prompt" id="example3-prompt">
  <input type="button" value="confirm" id="example3-confirm">
  <input type="button" value="alert" id="example3-alert">
</html>
<script>
  const promptBtn = document.getElementById("example3-prompt");
  const confirmBtn = document.getElementById("example3-confirm");
  const alertBtn = document.getElementById("example3-alert");

  promptBtn.onclick = () => {
    const input = prompt("請輸入使用者名字", "路人甲");
    console.log(input);
  }
  confirmBtn.onclick = () => {
    const result = confirm("確定要刪除嗎?");
    console.log(result);
  }
  alertBtn.onclick = () => {
    alert("Hello World");
  }
</script>
```
:::

