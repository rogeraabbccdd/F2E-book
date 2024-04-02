# function

function 可以將一段程式碼包裝起來，可以重複使用，也方便維護，寫成物件更可以將程式碼分類。  

## 語法
function 由下列幾個部分組成  
- `名稱` 跟變數宣告一樣，給這個 function 一個名稱，建議以程式碼的功能命名
- `()` 放傳入 function 的值
- `{}` 則是要執行的程式碼
- 執行 function 時只要使用 `名稱` 和 `()` 就能執行
- 宣告時可以使用 `function declartaion` 或 `function expression` 兩種方式

:::tip TIP
使用 function expression 宣告時通常會使用 `const` 以避免 function 被覆寫
:::

```js
// 使用 function declartaion 宣告 function
function GoodMorning () {
  document.write('早上好，現在我有冰淇淋')
}

// 使用 function expression 宣告 function
const GoodMorning = function () {
  document.write('早上好，現在我有冰淇淋')
}

// 執行 function
GoodMorning()
```

## 傳入資料
將資料傳入 function 可以讓 function 有更多的彈性  
- 傳入的資料叫做 `參數`，放在 `()` 內
- 參數是 function 內的變數，只能在 function 內使用
- 參數可以有多個，用 `,` 隔開
- 能以 `arguments` 得到所有傳入參數的陣列

:::danger 注意
function 處理資料時盡量不要使用外部的變數，只針對傳入的資料做處理  
這種不會影響到外部的資料的 function 叫做 `Pure Function`
:::

```js
function GoodMorning (time, item) {
  console.log(arguments)
  document.write(`${time}好，現在我有${item}`)
}
GoodMorning('早上', '冰淇淋')
GoodMorning('中午', '桂格超大便當')
GoodMorning('晚上')
```

參數可以設定預設值，當參數沒有收到傳入值時，就會使用預設值  
```js
function GoodMorning (time = '早上', item = '冰淇淋') {
  document.write(`${time}好，現在我有${item}`)
}
GoodMorning('早上', '冰淇淋')
GoodMorning('中午', '桂格超大便當')
GoodMorning('晚上')
GoodMorning(undefined, '炸雞排')
```

## return
`return` 可以將程式處理完畢的結果傳出，讓 function 更有彈性  

:::danger 注意
- 一個 function 只能有一個 `return`
- `return` 下面的程式碼不會執行
:::

```js
function GoodMorning (time = '早上', item = '冰淇淋') {
  return `${time}好，現在我有${item}`
  // return 下面的程式碼不會執行
  console.log(123)
}

const text = GoodMorning('早上', '冰淇淋')
console.log(text)

document.write(GoodMorning('中午', '桂格超大便當'))
alert(GoodMorning('晚上', '雞排珍奶'))
```

## 箭頭函式
箭頭函式可以將 function 的宣告寫得比較簡短  

```js
const GoodMorning = (time = '早上', item = '冰淇淋') => {
  return `${time}好，現在我有${item}`
}
```
:::tip TIP
- 箭頭函式只有一個參數時，可以省略 `()`
- 箭頭函式只有一行時，可以省略 `{}` 和 `return`
- 只有一行簡寫時，如果要回傳物件，要用 `()` 包起來
  
簡寫範例
```js
// 簡寫前
const squre = (number) => {
  return number * number
}

// 簡寫後
const squre = number => number * number
```
物件回傳簡寫範例
```js
// 簡寫前
const getUserData = () => {
  return { name: 'John', age: 18 }
}

// 簡寫後
const getUserData = () => ({ name: 'John', age: 18 })
```
:::

:::danger 注意
箭頭函式無法使用 `arguments` 取得所有傳入的參數  
```js
const GoodMorning = (time = '早上', item = '冰淇淋') => {
  // Uncaught ReferenceError: arguments is not defined
  console.log(arguments)
}

```
:::

## jsDoc
使用 [jsDoc](https://jsdoc.app/) 格式編寫的 function 註解會有編輯器提示  

```js
/**
 * 早安
 */
const GoodMorning = () => {}

/**
 * 早安
 * @param time 時間
 * @param item 物品
 */
const GoodMorning = (time, item) => {}

/**
 * 早安
 * @param time {string} 時間
 * @param item {string} 物品
 */
const GoodMorning = (time, item) => {}

/**
 * 早安
 * @param [time=早上] {string} 時間
 * @param [item=冰淇淋] {string} 物品
 */
const GoodMorning = (time = '早上', item = '冰淇淋') => {}

/**
 * 早安
 * @param [time=早上] {string} 時間
 * @param [item=冰淇淋] {string} 物品
 * @returns {string} 組合完成的訊息
 */
const GoodMorning = (time = '早上', item = '冰淇淋') => {}
```

## 綜合練習
:::warning 練習
編寫一個 function，可以判斷傳入的數字是不是偶數，是的話回傳 `true`，不是則回傳 `false`
:::

:::warning 練習
小明喜歡數數  
某天媽媽請他從 n 開始數，下一個數字是 n+1，再下一個數字是 n+2，以此類推  
媽媽想知道，小明數了多少個數字後，數過的數字總和會超過 m  

請寫一個程式，使用者可以用 `prompt` 輸入 n 和 m  
請將兩個數字傳入 function 計算後將結果回傳  

```js
const calculate = (n, m) => {
  // ... 在此寫你的程式碼
}

const number1 = parseInt(prompt('n'))
const number2 = parseInt(prompt('m'))
console.log(calculate(number1, number2))
```

測試資料
|n|m|輸出|
|---|---|---|
|1|5|3|
|5|10|2|
|100|1000|10|

題目修改自 [高中生程式解題系統](https://zerojudge.tw/ShowProblem?problemid=a215)
::: 

:::warning 練習
製作易經數字卦占卜程式  
使用者輸入三個數字後，將數字以陣列方式傳進 function  
並將處理後的上卦名、下卦名、變爻用陣列回傳  

數字卦占卜方式：  
- 輸入三個三位數數字
- 將前兩個數字各除以 8，最後一個除以 6
- 如果整除，則餘數即為除數 8 或 6
- 各數字算完的餘數照八卦的順序選取卦
- 八卦順序為乾一、兌二、離三、震四、巽五、坎六、艮七、坤八
- 乾為天、兌為澤、離為火、震為雷、巽為風、坎為水、艮為山、坤為地

範例：  
- 取三個數字 435 692 734  
- 下卦為 435 除以 8 的餘數，為 3，離卦
- 上卦為 692 除以 8 的餘數，為 4，震卦
- 變爻為 734 除以 6 的餘數，為 2，第二爻
- 卜問出來的卦即是離下震上的雷火豐卦，可參考[易學網解卦](https://www.eee-learning.com/book/neweee55)

範例程式碼  
```js
const gua = (array) => {
  // ... 在此寫你的程式碼
}

const number1 = parseInt(prompt('第一個數字'))
const number2 = parseInt(prompt('第二個數字'))
const number3 = parseInt(prompt('第三個數字'))
const numbers = [number1, number2, number3]
const result = gua(numbers)
console.log(result[0]) // 輸出 離
console.log(result[1]) // 輸出 震
console.log(result[2]) // 輸出 2
```
:::

:::warning 練習
請寫一個 function 判斷輸入的文字是不是正著讀和反著讀都一樣的迴文  
`for`、`for of` 和 `for in` 可以迴圈文字  

```js
const isPalindrome = (text) => {
  // ... 在此寫你的程式碼
}
const result = isPalindrome(prompt('輸入文字'))
console.log(result)
```

測試資料
|文字|輸出|
|---|---|
|abba|true|
|abcd|false|
|abcba|true|
:::

:::warning 練習
請寫一個 function 判斷輸入的文字括號是否閉合  

```js
const isClose = (text) => {
  // ... 在此寫你的程式碼
}
const result = isClose(prompt('輸入文字'))
console.log(result)
```

測試資料
|文字|輸出|
|---|---|
|(()|false|
|()|true|
|(())|true|
|(()))|false|
|)()()|false|
:::

## 遞迴
使用遞迴函式是在函式中呼叫函式自己來重複執行動作  

累加範例，求 `1 + 2 + 3 + ... + n` 的總和  
```js
// n = 5
// sum(5) = 5 + sum(5 - 1) = 5 + sum(4) = 5 + 4 + 3 + 2 + 1 = 15
// sum(4) = 4 + sum(4 - 1) = 4 + sum(3) = 4 + 3 + 2 + 1
// sum(3) = 3 + sum(3 - 1) = 3 + sum(2) = 3 + 2 + 1
// sum(2) = 2 + sum(2 - 1) = 2 + sum(1) = 2 + 1
// sum(1) = 1
const sum = n => {
  if (n === 1) {
    return 1
  } else {
    return n + sum(n - 1)
  }
  // return n === 1 ? 1 : n + sum(n - 1)
}
console.log(sum(5))
```

計算費氏數列的第 `n` 個數字  
`0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233`
```js
const fibonacci = (n) => {
  if (n < 2) {
    return n
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2)
  }
}
// n   = 0 1 2 3 4 5 6
// 數字 = 0 1 1 2 3 5 8
// fib(3) = fib(3 - 1) + fib(3 - 2) = fib(2) + fib(1) = 1 + 1 = 2
// fib(2) = fib(2 - 1) + fib(2 - 2) = fib(1) + fib(0) = 1 + 0 = 1
// fib(1) = 1
// fib(0) = 0
console.log(fibonacci(3))
```

以輾轉相除法求最大公因數  
```js
const gcd = (a, b) => {
  if (a % b === 0) {
    return b
  } else {
    return gcd(b, a % b)
  }
}
// gcd(2002, 847) => a % b = 2002 % 847 = 308 => 308 != 0 => gcd(847, 308)
// gcd(847, 308) => a % b = 847 % 308 = 231 => 231 != 0 => gcd(308, 231)
// gcd(308, 231) => a % b = 308 % 231 = 77 => 77 != 0 => gcd(231, 77)
// gcd(231, 77) => a % b = 231 % 77 = 0 => 77
console.log(gcd(2002, 847))
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/kCooBR9xwUE?t=176" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## var 區域
`var` 其實是以 function 為區域的區域變數
```js
var a = 1
a = 100
var a = 2
console.log(a)          // 2

var b = 1
function func () {
  var b = 2
  console.log('in', b)  // 2
}
func()
console.log('out', b)   // 1
```

## 提升
`var` 和 `function` 有提升的特性，宣告的變數會被提升到最上面，可以先使用再宣告變數  

直接使用一個未宣告也未賦值的變數會出現錯誤
```js
// Uncaught ReferenceError: text is not defined
console.log(text)
```

在宣告 `let` 和 `const` 變數前使用變數會出現錯誤
```js
// Uncaught ReferenceError: Cannot access 'text' before initialization
console.log(text)
const text = 'abc'
```

`var` 宣告的變數會被提升到最上面，但是不會賦值，所以會是 `undefined`
```js
console.log(text)   // undefined
var text = 'abc'
```

`function declartaion` 會被提升
```js
hi('AAA')
function hi (name) {
  console.log('hi, ' + name)
}
```

使用 `var` 的 `function expression` 會被提升，但是不會賦值，所以會是 `undefined`
```js
// function expression
console.log(hi)  // undefined
// Uncaught TypeError: hi2 is not a function
// hi('BBB')
var hi = function (name) {
  console.log('hi, ' + name)
}
```
