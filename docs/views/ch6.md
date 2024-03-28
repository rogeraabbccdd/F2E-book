# 陣列與物件
陣列是多種相似資料的集合  
物件是一個東西的多種不同屬性的集合  

## 陣列
可以想像陣列是一台火車，每節車廂就是一筆資料，火車長度沒有限制，所以可以依需求連結好幾節車廂  
JavaScript 的陣列有兩種，一種是 `[]` 包起來的 `Array`，另一種是 `{}` 包起來的 `物件`  
`物件` 的詳細運用之後會介紹，這裡就先把它當作是進階版的陣列就好    

### Array
下面是一個簡單的陣列，把好幾種便當放到陣列裡  
可以發現大大的節省了程式碼的變數  
通常陣列的變數命名會用英文的複數  
```js
// 用陣列前
let bendon1 = "雞排飯";
let bendon2 = "排骨飯";
let bendon3 = "魚排飯";

// 用陣列後
let bendons = ["雞排飯", "排骨飯", "魚排飯"];
```

如果把上面的陣列想像成一台火車，那麼這台火車...
- 火車的名字叫做 `bendons`，有 `3` 節車廂
- 第 `0` 節車廂的名字叫做 `雞排飯`;
- 第 `1` 節車廂的名字叫做 `排骨飯`;
- 第 `2` 節車廂的名字叫做 `魚排飯`;

其中 `0`、`1`、`2` 是這個陣列的 `索引`，又稱 `index` 或 `key`  
`各種便當` 就是各索引的 `值`  

:::danger 注意
在程式裡，陣列的索引是從 `0` 開始！  
:::

在陣列變數名後加上 `[]` ，裡面放入索引數字可以該索引的資料  
在變數名字後加上 `.length` 可以得到陣列的長度  

```js
let bendons = ["雞排飯", "排骨飯", "魚排飯"];
console.log("便當總數: " + bendons.length);
console.log("第 0 個便當是" + bendons[0]);
```

:::warning 練習
試試將 `0` 改成其他數字，看看輸出的資料是什麼?  
既然我們可以知道陣列的長度，而且每個索引值都是從 0 開始的數字  
好像可以用上一章節的某東西一次輸出所有資料...?
:::

### 物件
有時候陣列的內容不是像上面的 Array 那樣是同一系列的，這個時候就會需要用到 `JSON` 物件  
使用 `JSON` 物件的話，索引能放文字，能更清楚的區分每個資料  
```js
let person = { 
    name: "王小明", 
    age: 25, 
    number: 24 
}
```

如果把上面的 物件想像成一台火車，那麼這台火車...
- 火車的名字叫做 `person`，有 `3` 節車廂
- 第 `name` 節車廂的東西為 `王小明`;
- 第 `age` 節車廂的東西為 `25`;
- 第 `number` 節車廂的東西為 `24`;

:::danger 注意
物件無法直接使用 `.length` 取得長度，也不能用 `[第幾個]` 取得資料  
但是可以用 `["索引名"]` 取得某索引的資料  
:::

在 物件變數名後加上 `.索引名` ，就可以取得該索引的資料  
使用 `Object.keys(變數).length` 就能得知這個 物件有多大  
`Object` 是程式內建變數，後面接 `.keys()`，就會把指定的 物件索引名組成陣列，後面再接 `.length` 就能取的長度了  

```js
let person = { 
    name: "王小明", 
    age: 25, 
    number: 24 
}
console.log("這位老兄的名字叫做: " + person.name);
console.log("這位老兄的名字叫做: " + person["name"]);
console.log("這位老兄的資料種數: " + Object.keys(person).length);
```

### 解構賦值
解構賦值是一種 JavaScript 運算式，可以把陣列或物件中的資料解開擷取成為獨立變數。
```js
const array = [1, 2, 3, 4, 5];
const [a, b, ...c] = array;
console.log(a); // 1
console.log(b); // 2
console.log(c); // [3, 4, 5]

const object = {a: 1, b:2, c:3, d: 4};
const {a, b: newValue, ...others} = object;
console.log(a); // 1
console.log(newValue); // 2，將 b 重新命名為 newValue
console.log(others); // {c: 3, d: 4}
```

:::danger 注意
其餘元素 `...` 必須放在最後一個  
所以 `[a, ...others, c]` 會出現錯誤
:::

### 巢狀
物件和 Array 可以依資料情況組合  
可以想像成火車的車廂裡又放了一台火車  
```js
// Array 內放 物件
let people = [
    { 
        name: "小明", 
        age: 25, 
        number: 24 
    },
    { 
        name: "小美", 
        age: 24, 
        number: 25 
    }
];

// 物件內放 Array
let restaurant = {
    name: "好好吃便當店",
    tel: "02-21345678",
    foods: ["雞排飯", "排骨飯", "魚排飯"]
}
```

二維陣列概念如圖，可以存放兩個面的資料，如 X 班 Y 號同學的數學成績  
<img src="/images/ch6/2array.jpg" height="300" style="margin: 10px 0;">
  
三維陣列概念如圖，可以存放三個面的資料，如 X 年 Y 班 Z 號同學的數學成績  
<img src="/images/ch6/3array.jpg" height="300" style="margin: 10px 0;">

:::danger 注意
目前網路上給開發者使用的公開資料大多是 物件和陣列的結合，如 [政府資料開放平台](https://data.gov.tw/) 和 [KKTIX 活動資訊 API](https://kktix.com/events.json)
:::

### 可選串連 (Optional_chaining)
當要存取的陣列索引或物件屬性不存在時，使用可選串連 `?.` 可以避免出現錯誤
```js
const user = {}
console.log(user.data.account) // Uncaught TypeError: Cannot read property 'account' of undefined
console.log(user.data?.account) // undefined
console.log(user.data?.['account']) // undefined

const arr = []
console.log(arr[0].data) // Uncaught TypeError: Cannot read property 'data' of undefined
console.log(arr[0]?.data) // undefined
```

## 迴圈
我們可以透過迴圈去取出陣列裡的所有資料  
這裡多了兩個迴圈，`for of` 和 `for in`，它們個別針對陣列和 物件使用的迴圈  
:::danger 注意
`for of` 迴圈無法使用對 物件使用  
:::

### for
這種迴圈僅適用 Array，因為 物件無法用數字索引取值  
```js
let bendons = ["雞排飯", "排骨飯", "魚排飯"];
for(let i=0;i<bendons.length;i++) {
    document.write(`第 ${i+1} 個便當是 ${ bendons[i] } <br>`)
}
```
### for of
`for of` 迴圈可以跑過每個值，陣列有幾個值就跑幾次  
```js
let bendons = ["雞排飯", "排骨飯", "魚排飯"];
for(let bendon of bendons) {
    document.write(bendon + "<br>");
}
```
這個迴圈除了能跑陣列之外，還能跑文字  
因為在程式的世界裡，文字也算是一個陣列，每個字就是一個值  
在其他的程式語言在宣告文字變數時需要同時宣告文字的長度，多出來的部分會被截斷，從這點就能看出文字也算廣義的陣列  
```js
let string = "Hello";
for(let s of string) {
    document.write(s + "<br>");
}
```
### for in
`for in` 迴圈則是跑每個索引，陣列有幾個索引就跑幾次  
```js
let person = { 
    name: "王小明", 
    age: 25, 
    number: 24 
}
for(let p in person) {
    document.write(person[p] + "<br>");
}
```

:::danger 注意
`for of` 迴圈不能修改陣列內個別值
```js
let string = "Hello";
for(let s of string) {
  s = 'a'
}
console.log(string) // 仍然是 Hello
```
:::

## 綜合應用
:::warning 練習
宣告一個數字陣列  
```js
let numbers = [33, 75, 69, 41, 50, 19]
```

- 印出陣列 `第 x 個數字為 y`
- 求 `41` 是第幾個數字
- 有幾個奇數和幾個偶數
- 最大數字和最小數字
:::

:::warning 練習
某國家發生通貨膨脹  
饅頭第一天 1 元，第二天 2 元，第三天 3 元，以此類推  
小明他從第一天起，連續買了 10 天的饅頭  
每天買的饅頭數依序為 1, 8, 3, 4, 5, 6, 7, 2, 9, 10  
求小明買饅頭花費的總金額

題目修改自 [高中生程式解題系統](https://zerojudge.tw/ShowProblem?problemid=b294)
:::

:::warning 練習
假設某一公司有五種產品 A、B、C、D、E  
其單價分別為 12、16、10、14、15 元  
而該公司共有三位銷售員，他們在某個月份的銷售量如下所示  

||產品 A|產品 B|產品 C|產品 D|產品 E|
|---|---|---|---|---|---|
|銷售員 1|33|32|56|45|33|
|銷售員 2|77|33|68|45|23|
|銷售員 3|43|55|43|67|65|

請將上表的內容設定成二維陣列，變數數量和陣列格式不限，並依序完成下列各題  
- 每一個銷售員的銷售總金額
- 每一項產品的銷售總金額
:::

:::warning 作業
練習二維陣列  
下表為某地星期一到星期四的時段一、時段二與時段三的氣溫  

||星期一|星期二|星期三|星期四|
|---|---|---|---|---|
|時段一|18.2|17.3|15.0|13.4|
|時段二|23.8|25.1|20.6|17.8|
|時段三|20.6|21.5|18.4|15.7|

請將上表的內容設定成二維陣列，變數數量和陣列格式不限，並依序完成下列各題  

- 將陣列內容印出成表格
- 每日的平均溫度
- 時段一、時段二、時段三的平均氣溫
- 溫度最高的日子與時段
- 溫度最低的日子與時段
:::
