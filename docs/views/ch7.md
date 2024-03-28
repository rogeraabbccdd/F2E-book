<script setup>
import Mindmap from '../components/Mindmap.vue'
</script>

# function 與物件

function 可以將一段程式碼包裝起來，可以重複使用，也方便維護，寫成物件更可以將程式碼分類。  

## function
當你發現你的程式有很多地方使用一樣的程式碼時，就能將它們用 function 包起來  
不僅增加易讀性，也能讓程式碼看起來更精簡  

### 第一個 function
這是一個簡單的 function，function 由 `名稱`、`()` 和 `{}` 組成  

- `名稱` 跟變數宣告一樣，給這個 function 一個名稱，建議以程式碼的功能命名
- `()` 放傳入 function 的值
- `{}` 則是要執行的程式碼
- 呼叫 function 時只要使用 `名稱` 和 `()` 就能執行

```js
// 宣告 function
function sayHello() {
  alert("Hello");
}

// 也可以這樣宣告 function
const sayHello = function(){
    alert("Hello");
};

// 呼叫 function
sayHello();
```

### 傳入資料
我們改寫一下上面的 function，讓它可以對指定的人名打招呼  
在這個範例裡，function 的 `()` 裡面的 `name` 會代指呼叫時傳入的第一個值  
它是區域變數，僅在 `{}` 內有效  
function 裡可以用 `arguments` 取得所有傳進來的資料  

```js
function sayHelloName(name) {
  console.log(arguments);
  alert("Hello, " + name);
}

// 呼叫 function
sayHelloName("小明");

// 可以設定傳入的預設值
function sayHelloName2(name = '小華') {
  alert("Hello, " + name);
}

// 呼叫 function
sayHelloName();
```

### return
function 可以將程式處理完畢的結果傳出  
就像是一台計算機，將算式傳給計算機，計算機計算後將結果傳回來，顯示在螢幕上  

```js
function sayHelloString(name) {
  let r = "Hello, " + name;
  return r;
}
```

### 箭頭函式
箭頭函式可以將 function 的宣告寫得比較簡短  
```js
const sayHello = () => {
    alert("Hello");
};

```

:::danger 注意
箭頭函式無法使用 `arguments`
:::

:::danger 注意
function 處理資料時盡量不要使用外部的變數，只針對傳入的資料做處理  
這種不會影響到外部的資料的 function 叫做 **Pure Function**
:::

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
`for`、`for of` 和 `for in` 可以迴圈文字，但是迴圈時不能改文字內單個字的值  

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

### 遞迴
使用遞迴函式是在函式中呼叫函式自己來重複執行動作  

累加，求 `1+2+3+...+n` 的總和  
```js
const sum = (n) => {
  if (n === 1) {
    return 1;
  }
  else {
    return n + sum(n - 1);
  }
}
```

計算階乘，`0! = 1`，`n! = 1×2×3…(n−2)×(n−1)×n`，`n! = n×(n−1)!`
```js
const factorial = (n) => {
  if (n === 0) {
    return 1;
  }
  else {
    return n * factorial(n - 1);
  }
}
```

計算費氏數列  
`0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233`
```js
const fibonacci = (n) => {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

以輾轉相除法求最大公因數  
```js
const gcd = (a, b) => {
  if(a%b == 0){
    return b;
  }else{
    return gcd(b, a%b);
  }
}
```

## 物件
物件裡面的值除了可以是一般的文字、數字外，它的值還能是 function  
如果裡面包含 function 的話，就會是 `物件導向` 的程式設計  
若要在 function 裡使用同一個 JSON 內的其他資料，我們必須加上 `this`  

:::danger 注意
`this` 的值會因所在位置而改變
:::

```js
let Ming = {
    firstName:  "小明",
    lastName:  "王",
    sayHello() {
        alert("你好，我的名字叫 " + this.lastName + this.firstName);
    },
}

Ming.sayHello();
```

上面的程式碼可以畫成像這樣的心智圖  
<Mindmap :mindData="{
  options: {
    container:'mind1',
    theme:'primary',
    editable: false
  },
  mind: {
    meta:{
        name:'mind1',
        author:'',
        version:'',
    },
    format:'node_array',
    data:[
      {id:'root', isroot:true, topic:'person', 'background-color': 'orange'},
      {id:'sub1', parentid:'root', topic:'姓'},
      {id:'sub2', parentid:'root', topic:'名'},
      {id:'sub4', parentid:'root', topic:'sayHello', 'background-color': 'lightseagreen'},
    ]
  }
}
" />

我們可以知道，現在有個變數 `person` 它的資料是一個人，裡面放了它的姓、名和這位老兄會做的事情  
   
但如果今天我們的程式裡有不只一個 `person`，多來了一位小美，且他們會做的事情和屬性都一樣時，重複宣告這些東西會讓程式碼又臭又長  
   
所以我們要和上面定義 function 一樣，先宣告 `人` 這個東西該有的屬性和它能做的事  
之後直接呼叫，就不用重複寫差不多的程式碼  

:::danger 注意
可選串連也可以避免呼叫物件內不存在的 function 時的錯誤
```js
Ming.sayGoodBye?.() // undefined
```
:::

### 基本物件導向
這時就會需要用到物件導向寫法，先定義一個物件有哪些屬性，會做什麼事  
接著再創造物件就可以避免重複宣告差不多的東西  
就好像世界上有一種東西叫做 `人`，小明是人，小美也是人  
在程式裡， `人` 是一個類別，小明是物件，小美也是物件  
用類別和物件去分類程式碼與變數，讓大型程式能更方便的維護  

```js
// 宣告類別
class Person {
  // constructor 是物件被建立時會執行的 function
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  sayHello() {
    alert("你好，我的名字叫 " + this.lastName + this.firstName);
  }
}

let Ming = new Person("小明", "王");
let Mei = new Person("小美", "王");

Ming.sayHello();
Mei.sayHello();
```

上面的程式碼可以畫成像這樣的心智圖  
右邊是類型，左邊是物件  

<Mindmap :mindData="{
  options: {
    container:'mind2',
    theme:'primary',
    editable: false
  },
  mind: {
    meta:{
        name:'mind2',
        author:'',
        version:'',
    },
    format:'node_array',
    data:[
      {id:'root', isroot:true, topic:'person', 'background-color': 'orange'},
      {id:'sub1', parentid:'root', direction: 'right', topic:'姓'},
      {id:'sub2', parentid:'root', direction: 'right', topic:'名'},
      {id:'sub3', parentid:'root', direction: 'right', topic:'sayHello', 'background-color': 'lightseagreen'},
      {id:'Ming', parentid:'root', direction: 'left', topic:'Ming', 'background-color': 'purple'},
      {id:'Mei', parentid:'root', direction: 'left', topic:'Mei', 'background-color': 'purple'},
    ]
  }
}
" />
