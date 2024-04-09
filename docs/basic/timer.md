# 計時器

計時器可在一段時間後執行 function

## 一般計時器
`setTimeout` 延遲一段時間後執行一次 function 內的程式碼  
- 語法為 `setTimeout(function, 延遲)`
- 延遲單位為毫秒，1000 代表 1 秒
- 使用 `clearTimeout()` 取消

:::danger 注意
在使用已定義好的 function 時，需要注意變數型態
```js
const msg = () => {
  alert('經過 5 秒囉')
}

// 正確，msg 是 function
setTimeout(msg, 5000)

// 錯誤，msg() 是 function 的回傳值
// 會立即執行 msg()，並將回傳值放入 setTimeout
// 但 msg() 沒有回傳值，所以會放入 undefined
setTimeout(msg(), 5000)
```
:::

使用已定義好的 function
```js
const msg = () => {
  alert('經過 5 秒囉')
}
setTimeout(msg, 5000)
```
使用匿名函式
```js
setTimeout(()=> {
  alert('經過 5 秒囉')
}, 5000)
```
清除計時器範例
```js
const delay = setTimeout(() => {
  alert('經過 5 秒囉')
}, 5000)
clearTimeout(delay)
```

:::tip Tip
在寫秒數時要特別注意，一些特別的數字可以用 `const` 定義  
讓讀程式碼的人更容易了解你在寫什麼  
```js{5}
// 86400000 代表什麼？
setTimeout(() => {}, 86400000)

// 86400000 是一天的毫秒數
const MILLISECONDS_IN_A_DAY = 86400000
setTimeout(() => {}, MILLISECONDS_IN_A_DAY)
```
:::

## 重複計時器
`setInterval()` 可以每隔一段時間執行指定的程式碼  
基本語法和 `setTimeout()` 一樣，使用 `clearInterval()` 清除  

```js
const timer = setInterval(() => {
  console.log('Hi')
}, 1000)

setTimeout(() => {
  clearInterval(timer)
}, 5000)
```

## 綜合練習
:::warning 練習
使用者輸入毫秒數，經過該時間後在網頁上顯示 `時間到`  
:::

:::warning 練習
製作計時器，從 10 開始倒數到 0，每秒在網頁上印出一個數字  
:::