# 事件

偵測網頁上發生的事件，像是載入狀態、使用者點滑鼠、按鍵盤等等  

## 概念
我們可以透過偵測事件，做到下面這些事  
- 頁面載入時觸發事件
- 頁面關閉時觸發事件
- 使用者點按鈕執行動作
- 驗證使用者輸入內容
- 阻止事件的發生

以下是幾個常用的事件  
| 事件        | 說明                 |
| ----------- | -------------------- |
| onclick     | 滑鼠點擊             |
| onkeydown   | 鍵盤按鍵按下去時     |
| onkeyup     | 鍵盤按鍵放開時       |
| onmouseover | 滑鼠移到 HTML 元素上 |
| onmouseout | 滑鼠移開 HTML 元素   |
| onfocus     | 滑鼠點到輸入欄位     |
| onblur      | 滑鼠點輸入欄位外     |
| onchange    | 元素改變時           |
| oninput     | 表單欄位輸入時       |
| onsubmit    | 表單送出時           |
| oncopy      | 複製時               |

## 行內事件
HTML 元素的事件可以像 CSS 的行內樣式一樣，寫在標籤內  
只要加上事件名，就能在雙引號內寫上要執行的 JavaScript 程式碼  
事件裡的 `this` 在這裡會代表發生事件的元素  

::: demo [vanilla]
```html
<html>
    <input type="button" value="點我" onclick="alert('你點了按鈕，好棒')">
    <input type="button" value="點我看時間" onclick="this.value = new Date().toLocaleString('zh-tw')">
</html>
```
:::

如果像上面的第二個例子，雙引號內的程式碼太長的話會影響閱讀  
所以我們可以將雙引號內的程式碼改寫成 function  

```html
<input type="button" value="點我看時間" onclick="time(this)">
<script>
const time = (elem) => {
    elem.value = new Date().toLocaleString('zh-tw');
}
</script>
```

## 事件綁定
如果一次要為 100 個元素綁定事件，且每個都寫在標籤裡，不只會影響閱讀，還會讓維護變得更麻煩  
所以我們可以使用 JavaScript 的 DOM 一次完成  

:::danger 注意
如果是使用 `getElementsByClassName()` 這類結果是陣列的函式抓取 DOM 的話  
需要使用迴圈為每個東西添加事件綁定
::: 

::: demo [vanilla]
```html
<html>
    <input type="button" value="按鈕" class="btns">
    <input type="button" value="按鈕" class="btns">
    <input type="button" value="按鈕" class="btns">
    <input type="button" value="按鈕" class="btns">
    <input type="button" value="按鈕" class="btns">
</html>
<script>
const btns = document.getElementsByClassName("btns");
for(let btn of btns){
    btn.onclick = () => {
        alert("你點了按鈕，你好棒");
    }
}
</script>
```
:::

也能在 BOM 綁定事件  
```js
window.onload = () => {
    alert("網頁載入完成");
}
```

## event 物件
`event` 包含了事件的資訊  
像是使用者的鍵盤事件按了哪個按鍵、事件目標，也能阻止事情發生  
可以將它帶入 function 內，以取得事件的相關資訊  

::: demo [vanilla]
```html
<html>
    點連結不會跳頁: <a href="https://google.com" id="mylink">連結</a> <br>
    看看你按哪個鍵: <span id="key"></span>
</html>
<script>
const link = document.getElementById("mylink");
const p = document.getElementById("key");
link.onclick = (e) => {
    // 阻止事件預設動作
    e.preventDefault();
    console.log(e.target);
}
document.onkeydown = (e) => {
    p.innerText = e.key;
}
</script>
```
:::

## 事件冒泡
事件冒泡指的是「從啟動事件的元素節點開始，逐層往上傳遞」，直到整個網頁的根節點 `document`  
事件冒泡問題可以透過 `event.stopPropagation()` 解決
  
<img src="/images/ch12/bubble.png" height="300" style="margin: 10px 0;">
  
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
  background-color: #f00;
}

#bubble-inner {
  position: absolute;
  display: block;
  width: 150px;
  height: 150px;
  background-color: #00f;
  top: 75px;
  left: 75px;
}
</style>
```
:::

## 網頁讀取進度
可以用下列事件偵測網頁讀取進度  
```js
// 當準備狀態變更時
// loading 讀取中
// interactive 解析完檔案了，不過圖片等資源下載中
// complete 完成
document.onreadystatechange = () => {
  console.log(document.readyState)
}
```

## 尋找看不見的貓咪
按下開始按鈕後，在藍色區域裡尋找看不見的貓咪，滑鼠離貓越近聲音越大  
::: demo [vanilla]
```html
<html>
  <input type="button" value="開始" id="start">
  <div id="gamearea">
    <img src="/images/ch12/cat.jpg" alt="" width="100" id="cat">
  </div>
  <audio src="/assets/ch12/meow.mp3" volume="0.0" id="audio"></audio>
</html>
<script>
const gamearea = document.getElementById('gamearea')
const btnStart = document.getElementById('start')
const cat = document.getElementById('cat')
const audio = document.getElementById('audio')
let start = false
let timer = 0
let seconds = 0

const catX = Math.round(Math.random()* (gamearea.offsetWidth-300))
const catY = Math.round(Math.random()* (gamearea.offsetHeight-200))

cat.style.left = catX + 'px'
cat.style.top = catY + 'px'

// 頁面最長距離^2 = 寬^2 + 高^2
const max = Math.round(Math.sqrt(Math.pow(gamearea.offsetWidth, 2) + Math.pow(gamearea.offsetHeight, 2)))

gamearea.onmousemove = (event) => {
  const mouseX = event.offsetX
  const mouseY = event.offsetY
  
  const disX = Math.abs(mouseX - catX)
  const disY = Math.abs(mouseY - catY)

  const dis = Math.round(Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2)))

  audio.volume = 1 - (dis / max)
}

btnStart.onclick = () => {
  btnStart.style.display = 'none'
  start = true
  timer = setInterval(() => {
    seconds++
    if (seconds % 5 == 0) {
      audio.play()
    }
  }, 100)
}

cat.onclick = () => {
  if (!start) return
  clearInterval(timer)
  cat.style.opacity = 1
  cat.onclick = null
  alert(`你花了 ${seconds/10} 秒`)
}
</script>
<style>
#cat {
  position: absolute;
  user-select: none;
  -webkit-user-drag: none;
  opacity: 0;
}
#gamearea {
  width: 100%;
  height: 300px;
  position: relative;
  border: 1px solid blue;
}
</style>
```
:::

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