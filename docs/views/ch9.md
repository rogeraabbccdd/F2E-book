--- 
title: Ch.9 計時器
tags:
 - JavaScript
---

計時器可在一段時間後執行 function
<!-- more -->

## 一般計時器
`setTimeout()` 可以在延遲一段時間後執行 function  
`()` 內先放要執行的 function，後面接延遲毫秒數，1000 代表一秒  
這裡的 function 可以使用已定義好的，或是直接寫在 `()` 內  
像這裡寫在裡面，沒有名字的 function 叫做 `匿名函式`  
如果將計時器代入變數的話，就可以用 `clearTimeout()` 將它取消  

```js
// 使用匿名函式
setTimeout(()=> {
    alert("經過 5 秒囉");
}, 5000);

// 使用已定義好的函式
const msg = () => {
    alert("經過 5 秒囉");
}
setTimeout(msg, 5000);

let delay = setTimeout(()=> {
    alert("經過 5 秒囉");
}, 5000);
clearTimeout(delay);
```

:::danger 注意
在寫秒數時要特別注意，一些特別的數字可以用 `const` 定義  
讓讀程式碼的人更容易了解你在寫什麼  
```js{5}
// 86400000 代表什麼？
setTimeout(someFunction, 86400000);

// 86400000 是一天的毫秒數
const MILLISECONDS_IN_A_DAY = 86400000;
setTimeout(someFunction, MILLISECONDS_IN_A_DAY);
```
:::

## 重複計時器
`setInterval()` 可以每隔一段時間執行指定的程式碼，使用方式和 `setTimeout()` 差不多  
清除重複計時器用的函式是 `clearInterval()`  

```js
let timer = setInterval(()=>{
    document.write("Hi");
}, 1000)

setTimeout(()=>{
    clearInterval(timer);
}, 5000)
```

:::warning 練習
製作倒數計時器，數字從 10 開始，到 0 後停止  
:::