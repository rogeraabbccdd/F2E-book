--- 
title: Ch.8 文字、陣列與數字的處理
tags:
 - JavaScript
prev: ./ch7
next: ./ch9
---

文字、陣列與數字的處理的函式  
<!-- more -->
資料處理的函示非常多，以後的課程還會介紹其他函式  
這個章節的大重點在數字的隨機，因為隨機是較常遇到且較麻煩的功能  
## 文字
一些常用的文字處理函式  
```js
let str = "  Hello World "
// 移除文字前後空白
str.trim();
// 文字轉大寫
str.toUpperCase();
// 文字轉小寫
str.toLowerCase();

// 是否有包含指定文字，回傳 true 或 false
let hello = "Hello, welcome to the world of Javascript";
// .includes(文字)
let strIncludesJS = str.includes("Javascript");
// .match(正則表達式)，回傳一個，除非正則表達式有設定 g 或分組
let strMatchJS = str.match(/Javascript/i);
// .matchAll(正則表達式)，回傳多個，正則表達式必須設定 g
let strMatchJS = str.match(/Javascript/ig);
// .indexOf(文字, 開始位置)，找出開始位置後第幾個字出現搜尋文字
let strindex = str.indexOf("Javascript");

// 取代文字
let xmas = "Xmas";
let xmasReplace = str.replace("Xmas", "Christmas");
let xmasReplaceRegex = str.replace(/xmas/ig, 'Christmas');

// 文字切割
// .substr(開始, 長度)
let greeting = "Hello my friend!";
let sub = greeting.substr(0, 5);
// .substring(開始位置, 結尾位置)
let sub2 = greeting.substring(6, 8);
// .slice(開始位置, 結尾位置)
// 可以放負數，代表倒數
let sub3 = greeting.slice(-7, -1);

// 文字轉數字或浮點
let strNumber = "123456";
let num = parseInt(strNumber);
let strFloat = "12345.67";
let float = parseFloat(strFloat);

// 如果將文字轉換成數字的話會發生什麼事?
let notNumber = "abcdefg";
let nan = parseInt(notNumber);
console.log(isNaN(nan));

// 文字轉成陣列
// .split(分割文字)
let alphabet = "a,b,c,d,e,f,g";
let alphabetArr = alphabet.split(",");
```

:::danger 注意
- `includes()` 裡面只能放文字，不能放正則表達式，如果要用正則表達式的話要用 `match()`、`matchAll()`  
- `replace()` 取代文字只會取代找到的第一個，如果要全部取代的話可以用迴圈或正則表達式  
:::

:::warning 練習
將兩個 `prompt()` 輸入的數字相加顯示在網頁上，如果輸入的不是數字，跳出錯誤訊息  
:::

:::warning 練習
這段文字有幾個英文母音?
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum tincidunt mollis. Aliquam erat volutpat. Sed mattis quam eget bibendum consequat. Duis fringilla ultrices mi, in aliquet elit molestie vel. Nulla vitae accumsan quam. Maecenas pellentesque diam sit amet maximus vestibulum. Sed porttitor at est vel tincidunt. Maecenas vel placerat nunc.
```  
:::

## 陣列
一些常用的陣列處理函式  
<img src="/F2E-book/images/ch8/array.png" height="300" style="margin: 10px 0;">

```js
// 迴圈
// value 代表處理中的值，必須
// index 代表處理中的索引
// arr 代表陣列本身
array.foreach((value, index, arr) => {
  console.log(value, index, arr)
})
// 陣列組成字串
// .join(連接文字)
let elements = ['Fire', 'Wind', 'Rain'];
elements.join("-");

// 在陣列後新增值
let days = ["星期一", "星期二"];
days.push("星期三");
// 在陣列前新增值
days.unshift("星期天");
// 移除並回傳陣列最後一個元素
days.pop()
// 移除並回傳陣列第一個元素
days.shift()

// 刪除陣列索引並加入值，新值可以不加
// .splice(開始數字, 刪除數量, 新值1, 新值2...)
let fruits = ["Apple", "Banana", "Cherry"];
fruits.splice(1, 0, "Tomato");

// 陣列連接，產生新的陣列
let array1 = ['a', 'b', 'c'];
let array2 = ['d', 'e', 'f'];
let array3 = array1.concat(array2);

// 顛倒陣列
let numbers = ["1", "2", "3"];
numbers.reverse();

// 陣列是否有包含文字
arr.includes("abc");
// 陣列是否有包含文字，回傳索引
arr.indexOf("abc");

// .map() 可以運算陣列的每個值後產生新的陣列
let numbers1 = [1,2,3,4];
numbers1 = numbers1.map(num => {
  return num*2
})

// .filter() 可以過濾陣列後產生新的陣列
// true 代表保留，false 代表刪除
let numbers2 = [100,200,300,400];
numbers2 = numbers2.filter(num => {
  return num > 200
})

// .reduce() 可以累加陣列每個元素
// .reduce(function, 初始值)
const arr = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => {
  return accumulator + currentValue
}
console.log(array1.reduce(reducer));     // 1 + 2 + 3 + 4 = 10 
console.log(array1.reduce(reducer, 5));  // 5 + 1 + 2 + 3 + 4 = 15

// 排序陣列，預設是依第一個字排，順序是數字1~9，大寫 A~Z，小寫 A~Z
let letters = ["a", "c", "b", "d"];
letters.sort();

// 數字小到大
// .sort 裡面的 function 會迴圈跑過每個值，一次兩個
// 第一次跑第 1 2 個
// 第二次跑第 2 3 個
// a 指的是後面的，b 指的是前面的
// return < 0 ，a會排在b前面
// return = 0 ，a b順序不變
// return > 0 ，a會排在b後面。
let nums = [100,400,300,500,120,90,10000];
let ascnum = nums.sort((a,b)=>{
  console.log(a,b,a-b);
  return a-b;
})

// 數字大到小
let descnum = nums.sort((a,b)=>{
  return b-a;
})

// 排序中文
let ChineseNum = ["三", "一", "四", "二"];
ChineseNum.sort((a, b)=>{
  // localeCompare 可以依語言字碼排序文字
  // 如果 a 在 b 之前為 -1，相反則為 1，相等為 0
  return a.localeCompare(b, "zh-Hant-TW");
})
```

:::danger 注意
陣列和 JSON 無法直接用 `=` 複製，必須使用產生新陣列或新 JSON 的函式複製  
```js
const array1 = [1, 4, 9, 16]
const array2 = array1
array1.push(25)
console.log(array2)

const json1 = { a:1, b:2, c:3 }
const json2 = json1
json1.d = 4
console.log(json2)
```
<img src="/F2E-book/images/ch8/array.gif" height="300" style="margin: 10px 0;">
:::

:::warning 練習
將 `prompt()` 輸入的文字移除前後空白後倒過來後顯示在網頁上  
:::

:::warning 挑戰
將 `prompt()` 輸入的英文文字大寫轉小寫，小寫轉大寫後顯示在網頁上  
:::
## 數字
數字的處理需要使用 `Math` 這個內建物件  
這個物件不需要宣告，直接用就好，下面是幾種常見的函式  

```js
// 四捨五入到整數
Math.round(4.7);
// 無條件進位
Math.ceil(4.4); 
// 無條件捨去
Math.floor(4.8);
// 次方
Math.pow(8, 2);
// 平方根
Math.sqrt(64);
// 正負數判斷，負數為 -1，0 為 0，正數為 1
Math.sign(-100);
// 數組取最小值
Math.min(0, 150, 30, 20, -8, -200);
// 陣列取最小值
let arr = [0, 150, 30, 20, -8, -200];
Math.min(...arr)
// 數組取最大值
Math.max(0, 150, 30, 20, -8, -200);
// 陣列取最大值
let arr = [0, 150, 30, 20, -8, -200];
Math.max(...arr)
// 從 0 到 1 隨機取小數
Math.random(); 
```
:::warning 練習
想想看怎麼從 0 到 100 隨機取一個整數?
:::

:::warning 練習
製作隨機數字 function，提供最小整數和最大整數，回傳一個區間內的隨機整數  
```js
const rand = (min, max) => {
  // 程式碼...
}
```
:::

:::warning 作業
用上面練習完成的 function 製作威力彩號碼產生器  
將隨機出的數字用 `document.write()` 顯示在網頁上  
威力彩規則  
- A 區 1~38 取 6 個數字
- B 區 1~8 取 1 個數字  
:::