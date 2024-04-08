# 事件

偵測網頁上發生的事件，像是載入狀態、使用者點滑鼠、按鍵盤等等  

## 概念
我們可以透過偵測事件，做到下面這些事  
- 頁面載入時觸發事件
- 頁面關閉時觸發事件
- 使用者點按鈕執行動作
- 驗證使用者輸入內容
- 阻止事件的發生

以下是常用的事件  
| 事件        | 說明                 |
| ----------- | -------------------- |
| click     | 滑鼠點擊             |
| keydown   | 鍵盤按鍵按下去時     |
| keyup     | 鍵盤按鍵放開時       |
| mouseover | 滑鼠移到 HTML 元素上 |
| mouseout | 滑鼠移開 HTML 元素   |
| focus     | 滑鼠點到輸入欄位     |
| blur      | 滑鼠點輸入欄位外     |
| change    | 元素改變時           |
| input     | 表單欄位輸入時       |
| submit    | 表單送出時           |
| copy      | 複製時               |

## 行內事件
HTML 元素的事件可以像 CSS 的行內樣式一樣，寫在標籤內  
只要加上事件名，就能在雙引號內寫上要執行的 JavaScript 程式碼  
事件裡的 `this` 在這裡會代表發生事件的元素  

```html
<input type="button" value="點我" onclick="alert('你點了按鈕，好棒')">
<input type="button" value="點我看時間" onclick="this.value = new Date().toLocaleString('zh-tw')">
<input type="button" value="點我看時間" onclick="time(this)">
<script>
const time = (el) => {
    el.value = new Date().toLocaleString('zh-tw');
}
</script>
```

## 事件綁定
如果一次要為 100 個元素綁定事件，且每個都寫在標籤裡，不只會影響閱讀，還會讓維護變得更麻煩  
所以我們可以使用 JavaScript 的 DOM 一次完成  

```html
<input type="button" value="按鈕" class="btns">
<input type="button" value="按鈕" class="btns">
<input type="button" value="按鈕" class="btns">
<input type="button" value="按鈕" class="btns">
<input type="button" value="按鈕" class="btns">
<script>
const btns = document.getElementsByClassName("btns");
for(const btn of btns){
  btn.onclick = () => {
    alert("你點了按鈕，你好棒");
  }
}
</script>
```

也能在 BOM 綁定事件  
```js
window.onload = () => {
  alert("網頁載入完成")
}
```

## 事件監聽
事件監聽相比事件綁定更為彈性，可以為同一個元素綁定多個事件
- `.addEventListener(function)` 增加事件監聽器至元素
- `.removeEventListener(function)` 從元素移除事件監聽器

```js
const onBtnClick1 = () => {
  alert('click1')
}
const onBtnClick2 = () => {
  alert('click2')
}
btn.addEventListener('click', onBtnClick1)
btn.addEventListener('click', onBtnClick2)

btn.removeEventListener('click', onBtnClick1)
btn.removeEventListener('click', onBtnClick2)
```

## Event 物件
`event` 包含了事件的資訊  
- 鍵盤類事件可以取得按下的按鍵 [JavaScript Key Code Event Tool](https://www.toptal.com/developers/keycode)
- 滑鼠類事件可以取得滑鼠座標  
  - `clientX`、`clientY` 滑鼠在瀏覽器視窗的座標
  - `pageX`、`pageY` 滑鼠在整個網頁的座標
  - `screenX`、`screenY` 滑鼠在螢幕的座標
  - `offsetX`、`offsetY` 滑鼠在元素內的座標

::: demo [vanilla]
```html
<html>
  看看你按哪個鍵: <span id="key"></span>
</html>
<script>
const p = document.getElementById("key");
document.onkeydown = (e) => {
  p.innerText = e.key;
}
</script>
```
:::

## 預設動作
某些網頁元素有預設動作，可以使用 `event.preventDefault()` 阻止
- 點 `a` 連結會跳頁
- 在 `form` 中按 `submit` 會送出表單至 `action` 屬性指定的網址

::: demo [vanilla]
```html
<html>
  點連結不會跳頁: <a href="https://google.com" id="mylink">連結</a>
</html>
<script>
const link = document.getElementById("mylink");
link.onclick = (e) => {
  // 阻止事件預設動作
  e.preventDefault();
  console.log(e.target);
}
</script>
```
:::

## 事件冒泡
事件冒泡指的是事件逐層往上傳遞，直到根元素的過程
  
<ImageFigure
  src="/images/ch12/bubble.png"
  alt="事件運作方式"
  title="事件運作方式"
>事件運作方式</ImageFigure>
  
::: demo [vanilla]
```html
<html>
  <p>打開 console，點點看紅色和藍色，看看會出現什麼</p>
  <div id="bubble-outer">
    outer
    <div id="bubble-inner">inner</div>
  </div>
</html>
<script>
const outer = document.querySelector('#bubble-outer')
const inner = document.querySelector('#bubble-inner')

outer.addEventListener('click', () => {
  console.log('outer')
})

inner.addEventListener('click', () => {
  console.log('inner')
})
</script>
<style>
#bubble-outer {
  position: relative;
  display: block;
  width: 300px;
  height: 300px;
  background-color: blue;
}

#bubble-inner {
  position: absolute;
  display: block;
  width: 150px;
  height: 150px;
  background-color: skyblue;
  top: 75px;
  left: 75px;
}
</style>
```
:::

## 網頁載入狀態
`document.readyState` 代表目前網頁載入狀態  
搭配 `document.onreadystatechange` 可以偵測網頁讀取進度  
進度分為三種
- `loading` 讀取中
- `interactive` 解析完檔案，圖片等資源下載中
- `complete` 完成

:::danger 注意
只能偵測狀態，無法偵測圖片等資源的載入進度  
所以需要透過其他方式製作載入進度的功能
:::

```js
document.onreadystatechange = () => {
  console.log(document.readyState)
}
```

## 應用範例
- 尋找貓咪遊戲
- 網頁捲動背景視差效果
- 網頁載入進度條

## 綜合練習
:::warning 練習
製作猜拳遊戲，網頁有三個按鈕，分別是剪刀、石頭和布  
按鈕點下去後電腦隨機出拳，將電腦出拳和勝負結果用 `alert()` 顯示  
最後在按鈕下方用 `ul` 和 `li` 清單列出勝負紀錄  
:::

:::warning 作業
製作有隨機功能的顏色選擇器  
<img src="/images/ch12/hw.png" height="300" style="margin: 10px 0;">
:::

:::warning 挑戰
延伸作業內容，製作兩色漸層顏色選擇器
:::