# 陣列與物件
陣列是多種相似資料的集合  
物件是一個東西的多種不同屬性的集合  

## 陣列
可以想像陣列是一台火車，每節車廂就是一筆資料，火車長度沒有限制  
- 每一節車廂的號碼就是 `索引`，又稱 `index`
- 每一節車廂的乘客就是 `值`，又稱 `value`

:::tip TIP
通常在命名陣列時，會用複數名詞，如 `students`、`teachers`、`items` 等
:::

```js
// 用陣列前
const bendon1 = "雞排飯";
const bendon2 = "排骨飯";
const bendon3 = "魚排飯";

// 用陣列後
const bendons = ["雞排飯", "排骨飯", "魚排飯"];
```

如果把上面的陣列想像成一台火車
- 火車的名字叫做 `bendons`，有 `3` 節車廂
- 第 `0` 節車廂的名字叫做 `雞排飯`;
- 第 `1` 節車廂的名字叫做 `排骨飯`;
- 第 `2` 節車廂的名字叫做 `魚排飯`;
- `0`、`1`、`2` 是這個陣列的 `索引`，又稱 `index`
- `雞排飯`、`排骨飯`、`魚排飯` 是這個陣列的 `值`，又稱 `value` 

:::danger 注意
在程式裡，陣列的索引是從 `0` 開始  
:::

在存取陣列資料時
- `[]` 可以使用索引取得資料，如果索引不存在會回傳 `undefined`  
- `.length` 可以得到陣列的長度  

```js
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// .length 取長度
console.log(`有 ${alphabets.length} 個字母<br>`)

// [索引] 取指定資料
console.log(alphabets[0])     // a
console.log(alphabets[1])     // b
console.log(alphabets[1000])  // undefined

// 以變數值當索引取資料
const index = 2
console.log(alphabets[index]) // c

// 使用迴圈取得所有資料
for (let i = 0; i < alphabets.length; i++) {
  document.write(alphabets[i])
}
```

## 物件
物件保存了一個東西的不同種資料  
- 每個資料名稱叫做 `key`
- 資料的值叫做 `value`  

```js
const person = { 
  name: "王小明",
  age: 25,
  number: 24
}
```

如果把上面的物件想像成一個人
- 這個人的 `name` 為 `王小明`
- 這個人的 `age` 為 `25`
- 這個人的 `number` 為 `24`

:::danger 注意
物件無法直接使用 `.length` 取得長度，也不能用 `[第幾個]` 取得資料  
但是可以用 `["索引名"]` 取得某索引的資料  
:::

```js
const person = { 
    name: "王小明", 
    age: 25, 
    number: 24 
}
// 用 .key 取值
console.log(person.name)
// 用 ["key"] 取值
console.log(person['name'])
// 用變數當 key 取值
const key = 'name'
console.log(person[key])
```

## 解構賦值
解構賦值可以把陣列或物件中的資料解開擷取成為獨立變數  
相當於建立一個新變數，並設定為陣列或物件中的某個值  
在解構時可以使用其餘運算子 `...` 取得剩餘的資料  

:::danger 注意
其餘元素 `...` 必須放在最後一個  
`[a, ...others, c]` 是不正確的語法
:::

陣列解構範例
```js
const array = [1, 2, 3, 4]

// 原始寫法
const one = array[0]
const two = array[1]
const others = [array[2], array[3]]
console.log(one)      // 1
console.log(two)      // 2
console.log(others)   // [3, 4]

// 解構賦值
// 依照順序取值
const [one, two, ...apple] = array
console.log(one)      // 1
console.log(two)      // 2
console.log(apple)    // [3, 4]
```

物件解構範例

```js
const obj = { a: 1, b: 2, c: 3, d: 4 }

// 原始寫法
const a = obj.a
const bbb = obj.b
const others = { c: obj.c, d: obj.d }
console.log(a)        // 1
console.log(bbb)      // 2
console.log(others)   // { c: 3, d: 4 }

// 解構賦值
// 依照 key 名稱取值，可用 : 重新命名
const { a, b: bbb, ...others } = obj
console.log(a)        // 1
console.log(bbb)      // 2
console.log(banana)   // { c: 3, d: 4 }
```

## 巢狀
物件和 Array 可以依資料情況組合，儲存更複雜的資料  

由物件組成的陣列範例
```js
const people = [
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
]
```

物件內值為陣列範例
```js
const restaurant = {
    name: "好好吃便當店",
    tel: "02-21345678",
    foods: ["雞排飯", "排骨飯", "魚排飯"]
}
```

<ImageFigure
  src="/images/ch6/2array.jpg"
  title="二維陣列概念"
  alt="二維陣列概念"
>二維陣列概念，如 X 班 Y 號同學的成績</ImageFigure>

<ImageFigure
  src="/images/ch6/3array.jpg"
  title="三維陣列概念"
  alt="三維陣列概念"
>三維陣列概念，如 X 年 Y 班 Z 號同學的成績</ImageFigure>

:::tip TIP
目前網路上給開發者使用的公開資料大多是物件和陣列的結合  
所以熟悉物件和陣列的組合，對於串接 API 會有很大的幫助  
- [政府資料開放平台](https://data.gov.tw/)
- [KKTIX 活動資訊 API](https://kktix.com/events.json)
:::

## 可選串連
當要存取的陣列索引或物件屬性可能不存在時，使用 `?.` 可以避免出現錯誤  

物件範例
```js
const user = {
  name: 'AAA',
  info: {
    email: 'aaa@gmail.com'
  }
}
console.log(user.name)                // AAA
console.log(user.info.email)          // aaa@gmail.com
console.log(user.info.address)        // undefined

// Uncaught TypeError: Cannot read properties of undefined (reading 'city')
console.log(user.info.address.city)

console.log(user.info.address?.city)            // undefined
console.log(user.info.address?.city?.postcode)  // undefined
```

陣列範例
```js
const restaurant = {
  name: '好好吃便當店',
  tel: '02-21345678',
  menu: []
}

// Uncaught TypeError: Cannot read properties of undefined (reading 'price')
console.log(restaurant.menu[0].price)

// undefined
console.log(restaurant.menu?.[0]?.price)
```

可選串連搭配短路求值範例，當資料不存在時使用預設值
```js
const products = [
  { name: 'iPhone 15', price: 48900 },
  { 
    name: 'Nothing Phone(2)',
    price: 21900,
    producer: {
      name: 'Nothing',
      url: 'https://tw.nothing.tech/'
    }
  },
  { 
    name: 'Nothing Phone(1)',
    price: 14900,
    producer: {
      name: 'Nothing',
      url: 'https://tw.nothing.tech/'
    }
  }
]

for (let i = 0; i < products.length; i++) {
  document.write(`
    <p>
      ${products[i].name}，價格為 ${products[i].price}
      製造商為
      <a href="${products[i].producer?.url || '#'}">${products[i].producer?.name || '不明'}</a>
    </p>
  `)
}
```

## 迴圈
可以透過迴圈去取出陣列或物件裡的所有資料  
- `for` 適合固定次數的迴圈，陣列有固定長度，所以可以對陣列使用
- `for of` 針對陣列的值進行迴圈
- `for in` 針對物件的 key 或是陣列的 index 進行迴圈

`for` 迴圈範例
```js
const bendons = ["雞排飯", "排骨飯", "魚排飯"];
for(let i = 0; i < bendons.length; i++) {
  console.log(i, bendons[i])
}
```

`for of` 迴圈範例
```js
const bendons = ["雞排飯", "排骨飯", "魚排飯"];
for(const bendon of bendons) {
  console.log(bendon);
}
```

`for in` 陣列迴圈範例
```js
const bendons = ["雞排飯", "排骨飯", "魚排飯"];
for(const i in bendons) {
  console.log(i, bendons[i]);
}
```

`for in` 物件迴圈範例
```js
const person = { 
  name: "王小明", 
  age: 25, 
  number: 24 
}
for(const key in person) {
  console.log(person[key]);
}
```

## 傳值與傳址
傳值 (Pass by value)
- 其餘文字、數字、布林等資料型態傳遞方式
- 複製一份資料，改變其中一個不會影響另一個

```js
let test1 = 1
let test2 = test1
test2 = 100
console.log(test1)    // 1
console.log(test2)    // 100
```

傳址 (Pass by reference)
- 物件和陣列的資料傳遞方式
- 指向同一個記憶體位置，改變其中一個會影響另一個

陣列傳址範例
```js
const a = [1, 2, 3]
const b = a
b[0] = 100
console.log(a)        // [100, 2, 3]
console.log(b)        // [100, 2, 3]
console.log(a === b)  // true
```

物件傳址範例
```js
const obj1 = { 
  a: 1,
  b: 2,
  c: 3
}
const obj2 = obj1
obj1.a = 100
console.log(obj1)     // {a: 100, b: 2, c: 3}
console.log(obj2)     // {a: 100, b: 2, c: 3}
```

:::danger 注意
在編寫時，以資料的型態決定是傳值還是傳址  
  
陣列範例  
指向的是陣列內的索引為 0 的值，而不是整個陣列  
索引為 0 的值資料型態不是陣列也不是物件，所以是傳值
```js
const a = [4, 5, 6]
let b = a[0]
b = 100
console.log(a)        // [4, 5, 6]
console.log(b)        // 100
```

物件範例  
指向的是物件內的值，而不是整個物件  
物件內的值是一般資料型態，所以是傳值
```js
const obj1 = {
  a: 1,
  b: 2,
  c: 3
}
const obj2 = {
  a: obj1.a,
  b: obj1.b,
  c: obj1.c
}
obj2.a = 100
console.log(obj1)     // {a: 1, b: 2, c: 3}
console.log(obj2)     // {a: 100, b: 2, c: 3}
```
:::

## 綜合應用
:::warning 練習
宣告一個數字陣列  
```js
const numbers = [33, 75, 69, 41, 50, 19]
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

請將上表的內容設定成二維陣列，並依序完成下列各題  
- 每一個銷售員的銷售總金額
- 每一項產品的銷售總金額

```js
const data = [
  [33, 32, 56, 45, 33],
  [77, 33, 68, 45, 23],
  [43, 55, 43, 67, 65]
]
```
:::

:::warning 作業
練習二維陣列  
下表為某地星期一到星期四的時段一、時段二與時段三的氣溫  

||星期一|星期二|星期三|星期四|
|---|---|---|---|---|
|時段一|18.2|17.3|15.0|13.4|
|時段二|23.8|25.1|20.6|17.8|
|時段三|20.6|21.5|18.4|15.7|

請將上表的內容設定成二維陣列，並依序完成下列各題  

- 將陣列內容印出成表格
- 每日的平均溫度
- 時段一、時段二、時段三的平均氣溫
- 溫度最高的日子與時段
- 溫度最低的日子與時段

```js
const data = [
  [18.2, 17.3, 15.0, 13.4],
  [23.8, 25.1, 20.6, 17.8],
  [20.6, 21.5, 18.4, 15.7]
]
```
:::
