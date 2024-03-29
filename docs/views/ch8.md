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
正則表達式語法可參考 [Learn Regex](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)  

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
// 會得到 RegExpStringIterator {}
// 必須用迴圈或運算子取得資料
let strMatchAll = str.matchAll(/Javascript/ig)
for (let match of strMatchAll) {
  console.log(match)
}
// .indexOf(文字, 開始位置)，找出開始位置後第幾個字出現搜尋文字
let strindex = str.indexOf("Javascript");

// 取代文字
let xmas = "Xmas";
let xmasReplace = xmas.replace("Xmas", "Christmas");
let xmasReplaceRegex = xmas.replace(/xmas/ig, 'Christmas');

let email = "aaa@bbb.com";
let emailReplace = email.replace(/([A-Za-z].*)@([A-Za-z].*)\.com/g, "$1@$2.tw");

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

:::warning 挑戰
製作凱薩密碼 (Caesar Cipher) 加密工具  
使用者先輸入英文明文，再輸入數字密鑰  
請編寫一個 function 處理資料  
將明文和密鑰傳入，回傳處理完後的密文  
最後在網頁上顯示出來  

範例:
```
密鑰: 3
明文: meet me after the toga party
密文: PHHW PH DIWHU WKH WRJD SDUWB
```

提示:
- `字串.charCodeAt(索引)` 可取得指定文字的字元數字編號  
- `String.fromCharCode(數字)` 可將字元編號轉回文字  
- 英文大寫 A-Z 的編號是連續的，小寫 A-Z 也是，但是英文大小寫編號間有其他字
:::

## 陣列
一些常用的陣列處理函式  
<img src="/F2E-book/images/ch8/array.png" height="300" style="margin: 10px 0;">

:::danger 注意
`.forEach` 必須使用索引才能修改陣列內容
```js
// 無效
const array = [1, 2, 3]
array.forEach((value, index, arr) => {
  value = 4
})
console.log(array)

// 有效
array.forEach((value, index, arr) => {
  array[index] = 4
})
console.log(array)
```
:::


```js
// 迴圈
// value 代表處理中的值，必須
// index 代表處理中的索引
// arr 代表陣列本身
array.forEach((value, index, arr) => {
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

// .slice(開始位置, 結束位置)
// 將開始到結束間的所有東西複製新的陣列
const slicedFruits = arr1.slice(1, 3)

// 陣列連接，產生新的陣列
let array1 = ['a', 'b', 'c'];
let array2 = ['d', 'e', 'f'];
let array3 = array1.concat(array2);

// 顛倒陣列
let numbers = ["1", "2", "3"];
numbers.reverse();

// 陣列是否有包含指定的元素
arr.includes("abc");
// 陣列是否有包含指定的元素，回傳索引
arr.indexOf("abc");

// .some(function)
// 跟 foreach 一樣跑迴圈，function 必須要 return true 或 false
// 回傳是否有東西跑 function 時回傳 true
const hasStudent = people.some((value, index, array) => {
  return value.job === 'student'
})

// .findIndex(function)
// 跟 foreach 一樣跑迴圈，function 必須要 return true 或 false
// 回傳跑 function 時是 true 的第一個東西的索引值
const hasStudentIndex = people.some((value, index, array) => {
  return value.job === 'student'
})

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
// 淺層複製
const array1 = [1, 4, 9, 16]
const array2 = array1
array1.push(25)
console.log(array2)

const json1 = { a:1, b:2, c:3 }
const json2 = json1
json1.d = 4
console.log(json2)

// 深層複製
const arr1 = ['a', 'b', 'c', 'd']
const arr2 = arr1.map(item => {
  return item
})
const arr2 = arr1.filter(item => {
  return true
})
const arr2 = arr1.slice()
const arr2 = Array.from(arr1)
const arr2 = arr1.concat()
console.log(arr1, arr2)

const obj1 = { a:1, b:2, c:3 }
const obj2 = Object.assign({}, obj1)
obj2.a = 11
console.log(obj1, obj2)

// JSON.stringify 將陣列轉成文字
const text = JSON.stringify(arr1)
console.log(text)
// JSON.parse 將文字轉成陣列
const textarr = JSON.parse(text)
console.log(textarr)

const obj2 = JSON.parse(JSON.stringify(obj1))
obj2.a = 11
console.log(obj2)
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
// 絕對值
Math.abs(-5)
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
// 從 0 到 1 隨機取小數，包含 0，不包含1
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

:::warning 練習
請寫一個 function，判斷傳入的數字是不是質數  
並使用該 function 列出 1 ~ 100 間的所有質數  
質數特性
- 不能被大於 2 且小於自身平方根的數整除
- 只能被 1 和自身整除，不能被 2 到 (num-1) 整除
::: 

:::warning 作業
用上面練習完成的 function 製作威力彩號碼產生器  
將隨機出的數字用 `document.write()` 顯示在網頁上  
威力彩規則  
- A 區 1~38 取 6 個數字
- B 區 1~8 取 1 個數字  
:::


:::warning 挑戰
文文記性不太好，常常會忘東忘西。他也常忘記提款卡密碼，每次忘記密碼都得帶著身份證、存摺、印章親自到銀行去重設密碼，還得繳交 50 元的手續費，很是麻煩。後來他決定把密碼寫在提款卡上免得忘記，但是這樣一來，萬一提款卡掉了，存款就會被盜領。因此他決定以一個只有他看得懂的方式把密碼寫下來。  

他的密碼有 6 位數，所以他寫下了 7 個大寫字母，相鄰的每兩個字母間的「距離」就依序代表密碼中的一位數。所謂「距離」指的是從較「小」的字母要數幾個字母才能數到較「大」字母。字母的大小則是依其順序而定，越後面的字母越「大」。  

假設文文所寫的 7 個字母是 POKEMON，那麼密碼的第一位數就是字母 P 和 O 的「距離」，由於 P 就是 O 的下一個字母，因此，從 O 開始只要往下數一個字母就是 P 了，所以密碼的第一位數就是 1。密碼的第二位數則是字母 O 和 K 的「距離」，從 K 開始，往下數 4 個字母 (L, M, N, O) 就到了 O，所以第二位數是 4，以此類推。因此，POKEMON 所代表的密碼便是 146821。  

噓！你千萬別把這個密秘告訴別人哦，要不然文文的存款就不保了。  

文文可以透過 prompt 輸入文字
輸入文字後就將解密後的密碼回傳  
```js
const decrypt = (text) => {
  // ... 在此寫你的程式碼
}

const input = prompt('輸入文字')
console.log(decrypt(input))
```

測試資料
|輸入|輸出|
|---|---|
|POKEMON|146821|
|TYPHOON|598701|

題目修改自 [高中生程式解題系統](https://zerojudge.tw/ShowProblem?problemid=a065)
:::
