# 資料處理 - 陣列
一些常用的陣列處理函式

## 基本處理
- `.forEach(function)` 迴圈陣列，每個東西都執行提供的 function，有三個參數可以使用
  - `value` 現在在執行 function 的東西值
  - `index` 現在在執行 function 的東西索引
  - `array` 陣列本身
- `.join(連接文字)` 將陣列用連接文字串成文字
- `.push(資料1, 資料2...)` 把資料放進陣列後面
- `.unshift(資料1, 資料2...)` 把資料放進陣列前面
- `.pop()` 移除最後一個並回傳
- `.shift()` 移除第一個並回傳
- `.splice(開始位置, 刪除數量, 插入資料1, 插入資料2...)` 插入、刪除、取代陣列中的元素
- `.slice(開始位置, 結束位置)` 切割陣列，產生新陣列，**不會修改原始陣列**
- `.concat(陣列)` 連接陣列，**不會修改原始陣列**
- `.reverse()` 顛倒陣列

:::danger 注意
當參數為 function 時，需要注意變數型態
```js
const func = (value) => {
  console.log(value)
}

// 正確，func 是 function
array.forEach(func)
// 錯誤，func() 是 function 的回傳值
// 會立即執行 func()，並將回傳值放入 forEach
// 但 func() 沒有回傳值，所以會放入 undefined
array.forEach(func())
```
:::

`.forEach()` 範例
```js
const numbers = [1, 2, 3, 4, 5]

// .forEach() 使用匿名函式
numbers.forEach((value, index, array) => {
  console.log(value, index, array)
})

// .forEach() 使用已定義的函式
const each = (value, index, array) => {
  console.log(value, index, array)
}
numbers.forEach(each)
```

`.join()` 範例
```js
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.join('-'))  // 1-2-3-4-5
```

增加、刪除範例
```js
const fruits = ['蘋果', '香蕉', '西瓜']

fruits.push('橘子')
// ['蘋果', '香蕉', '西瓜', '橘子']
console.log(fruits)

fruits.push('葡萄', '藍莓')
// ['蘋果', '香蕉', '西瓜', '橘子', '葡萄', '藍莓']
console.log(fruits)

const fruits2 = ['草莓', '芭樂', '柳丁']
fruits.push(...fruits2)
// ['蘋果', '香蕉', '西瓜', '橘子', '葡萄', '藍莓', '草莓', '芭樂', '柳丁']
console.log(fruits)

fruits.unshift('榴槤')
// ['榴槤', '蘋果', '香蕉', '西瓜', '橘子', '葡萄', '藍莓', '草莓', '芭樂', '柳丁']
console.log(fruits)

const lastFruit = fruits.pop()
console.log(lastFruit)  // 柳丁
// ['榴槤', '蘋果', '香蕉', '西瓜', '橘子', '葡萄', '藍莓', '草莓', '芭樂']
console.log(fruits)     

const firstFruit = fruits.shift()
console.log(firstFruit) // 榴槤
// ['蘋果', '香蕉', '西瓜', '橘子', '葡萄', '藍莓', '草莓', '芭樂']
console.log(fruits)

const otherFruits = ['櫻桃', '火龍果']
fruits.splice(1, 2, ...otherFruits)
// ['蘋果', '櫻桃', '火龍果', '橘子', '葡萄', '藍莓', '草莓', '芭樂']
console.log(fruits)

const newFruits = fruits.slice(1, 5)
// newFruits = ['櫻桃', '火龍果', '橘子', '葡萄']
// fruits = ['蘋果', '櫻桃', '火龍果', '橘子', '葡萄', '藍莓', '草莓', '芭樂']
console.log(newFruits, fruits)

const concatFruits = fruits.concat(['荔枝', '龍眼'])
// concatFruits = ['蘋果', '櫻桃', '火龍果', '橘子', '葡萄', '藍莓', '草莓', '芭樂', '荔枝', '龍眼']
// fruits = ['蘋果', '櫻桃', '火龍果', '橘子', '葡萄', '藍莓', '草莓', '芭樂']
console.log(concatFruits, fruits)

fruits.reverse()
// ['芭樂', '草莓', '藍莓', '葡萄', '橘子', '火龍果', '櫻桃', '蘋果']
console.log(fruits)
```

## 尋找與取代
- `.includes(搜尋內容)`
  - 尋找陣列是否有東西符合搜尋內容，回傳 boolean
- `.indexOf(搜尋內容, 從第幾個開始往後)`
  - 尋找陣列是否有東西符合搜尋內容，回傳第一個符合的索引，`-1` 代表找不到 (從前面開始往後找)
  - 第二個參數是選填，預設是 `0`
- `.lastIndexOf(搜尋內容, 從第幾個開始往前)` 
  - 尋找陣列是否有東西符合搜尋內容，回傳最後一個符合的索引，`-1` 代表找不到 (從後面開始往前找)
  - 第二個參數是選填，預設是 `array.length - 1`
- `.some(function)` 
  - 迴圈陣列，每個東西都執行提供的 function
  - 判斷陣列有沒有東西執行 function 後 return true，回傳 boolean
- `.every(function)`
  - 迴圈陣列，每個東西都執行提供的 function
  - 判斷陣列所有東西執行 function 後 return true，回傳 boolean
- `.find(function)`
  - 迴圈陣列，每個東西都執行提供的 function
  - 回傳第一個執行 function 結果為 true 的值
- `.findLast(function)`
  - 迴圈陣列，每個東西都執行提供的 function
  - 回傳最後一個執行 function 結果為 true 的值
- `.findIndex(function)`
  - 迴圈陣列，每個東西都執行提供的 function
  - 回傳第一個執行 function 結果為 true 的索引
- `.findLastIndex(function)`
  - 迴圈陣列，每個東西都執行提供的 function
  - 回傳最後一個執行 function 結果為 true 的索引
- `.filter(function)`
  - 迴圈陣列，每個東西都執行提供的 function
  - 將所有執行結果為 true 的值產生為新陣列

:::danger 注意

```js
const arr = [{ a: 1 }]
console.log(arr.includes({ a: 1 }))           // false
const obj = { b: 2 }
const arr2 = [obj]
console.log(arr2.includes(obj))               // true
```
:::

```js
const numbers = [100, 200, 300, 400, 500]
console.log(numbers.includes(200))            // true
console.log(numbers.indexOf(100, 2))          // -1
console.log(numbers.lastIndexOf(100, 2))      // 0

const some = numbers.some((value) => {
  return value > 300
})
console.log(some)                             // true

const every = numbers.every((value) => {
  return value > 300
})
console.log('every', every)                   // false

const find = numbers.find((value) => {
  return value > 300
})
console.log('find', find)                     // 400

const findLast = numbers.findLast((value) => {
  return value > 300
})
console.log('findLast', findLast)             // 500

const findIndex = numbers.findIndex((value) => {
  return value > 300
})
console.log('findIndex', findIndex)           // 3

const findLastIndex = numbers.findLastIndex((value) => {
  return value > 300
})
console.log('findLastIndex', findLastIndex)   // 4

const filter = numbers.filter((value) => {
  return value > 300
})
console.log(filter)                           // [400, 500]
```

## 其他
- `.map(function)`
  - 迴圈陣列，每個東西都執行提供的 function
  - 將每個東西執行 function 的 return 值變成新的陣列
- `.reduce(function, 初始值)`
  - 迴圈陣列，每個東西都執行提供的 function
  - 將每個東西執行 function 的 return 值累加
  - 初始值可不設，預設是陣列第一個值
- `.sort(function)`
  - 兩兩比較，a 代表後面的值，b 代表前面的值
  - `return 0` 順序不變
  - `return < 0` a 在前
  - `return > 0` b 在前
  - `return a - b` 正序
  - `return b - a` 倒序
  - 搭配 `a.localeCompare(b)` 依照字元編碼排序文字
- 其他陣列處理套件
  - [lodash](https://lodash.com/)
  - [underscore.js](https://underscorejs.org/)

```js
const numbers1 = [100, 200, 300]
const numbers1Double = numbers1.map(value => {
  return value * 2
})
console.log(numbers1Double)  // [200, 400, 600]

const numbers2 = [100, 200, 300, 400, 500]
const numbers2Total = numbers2.reduce((total, value) => {
  console.log(total, value)
  return total + value
})
console.log(numbers2Total)  //  1500

const numbers3 = [100, 1561, 154613, 1231, 564635, 15641310]
numbers3.sort((a, b) => {
  console.log(a, b)
  return a - b
})
console.log(numbers3)       // [100, 1231, 1561, 154613, 564635, 15641310]

const cn = ['零', '一', '二', '三', '四', '五']
cn.sort((a, b) => a.localeCompare(b))
console.log(cn)             // ['一', '三', '二', '五', '四', '零']

const en = ['aaa', 'bbb', 'zzz', 'ccc', 'fff', 'ddd']
en.sort((a, b) => a.localeCompare(b))
console.log(en)             // ['aaa', 'bbb', 'ccc', 'ddd', 'fff', 'zzz']
```

## 綜合練習
:::warning 練習
將 `prompt()` 輸入的文字移除前後空白後倒過來後顯示在網頁上  
:::

:::warning 挑戰
將 `prompt()` 輸入的英文文字大寫轉小寫，小寫轉大寫後顯示在網頁上  
:::