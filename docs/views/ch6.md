--- 
title: Ch.6 陣列與 JSON
tags:
 - JavaScript
---

陣列是一種結構性的資料儲存空間，可以在一個變數裡儲存多筆資料  
<!-- more -->
## 陣列
可以想像陣列是一台火車，每節車廂就是一筆資料，火車長度沒有限制，所以可以依需求連結好幾節車廂  
JavaScript 的陣列有兩種，一種是 `[]` 包起來的 `Array`，另一種是 `{}` 包起來的 `JSON 物件`  
`JSON 物件` 的詳細運用之後會介紹，這裡就先把它當作是進階版的陣列就好    

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
<img src="/F2E-book/images/ch6/meme.png" height="300" style="margin: 10px 0;">
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

### JSON
有時候陣列的內容不是像上面的 Array 那樣是同一系列的，這個時候就會需要用到 `JSON`  
使用 `JSON` 的話，索引能放文字，能更清楚的區分每個資料  
```js
let person = { 
    name: "王小明", 
    age: 25, 
    number: 24 
}
```

如果把上面的 JSON 想像成一台火車，那麼這台火車...
- 火車的名字叫做 `person`，有 `3` 節車廂
- 第 `name` 節車廂的名字叫做 `雞排飯`;
- 第 `age` 節車廂的名字叫做 `排骨飯`;
- 第 `number` 節車廂的名字叫做 `魚排飯`;

:::danger 注意
JSON 無法直接使用 `.length` 取得長度，也不能用 `[第幾個]` 取得資料  
但是可以用 `["索引名"]` 取得某索引的資料  
:::

在 JSON 變數名後加上 `.索引名` ，就可以取得該索引的資料  
使用 `Object.keys(變數).length` 就能得知這個 JSON 有多大  
`Object` 是程式內建變數，後面接 `.keys()`，就會把指定的 JSON 索引名組成陣列，後面再接 `.length` 就能取的長度了  

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

### 巢狀
JSON 和 Array 可以依資料情況組合  
可以想像成火車的車廂裡又放了一台火車  
```js
// Array 內放 JSON
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

// JSON 內放 Array
let restaurant = {
    name: "好好吃便當店",
    tel: "02-21345678",
    foods: ["雞排飯", "排骨飯", "魚排飯"]
}
```

## 迴圈
我們可以透過迴圈去取出陣列裡的所有資料  
這裡多了兩個迴圈，`for of` 和 `for in`，它們個別針對陣列和 JSON 使用的迴圈  
:::danger 注意
`for of` 迴圈無法使用對 JSON 使用  
:::

### for
這種迴圈僅適用 Array，因為 JSON 無法用數字索引取值  
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

## 綜合應用
到目前為止都是使用自己建立的陣列，所以格式很簡單，但如果是使用別人的資料就不同了  
現在網路上有很多開放資料，如 [政府資料開放平台](https://data.gov.tw/) ，它們提供的資料格式以 JSON 為大宗  
例如 [口罩地圖資料](https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json)，就是 Array 結合 JSON  

:::warning 作業
宣告一個變數為前五筆口罩地圖的資料，將資料用迴圈和 `document.write()` 繪製成表格  
只取 `name`、`address`、`phone`、`mask_adult` 和 `mask_child` 五個欄位
:::
