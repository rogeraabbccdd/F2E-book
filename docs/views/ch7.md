--- 
title: Ch.7 function 與物件
categories:
 - JavaScript
---

function 可以將一段程式碼包裝起來，可以重複使用，也方便維護，寫成物件更可以將程式碼分類。  
<!-- more -->
## function
當你發現你的程式有很多地方使用一樣的程式碼時，就能將它們用 function 包起來  
不僅增加易讀性，也能讓程式碼看起來更精簡  

~~如果打字慢的話，也能用 function 將很長的程式與法包起來，解省打字量~~  
好孩子不要學，這招是考試時用的  

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
let sayHello = function(){
    alert("Hello");
};

// 呼叫 function
sayHello();
```

### 傳入資料
我們改寫一下上面的 function，讓它可以對指定的人名打招呼  
在這個範例裡，function 的 `()` 裡面的 `name` 會代指呼叫時傳入的第一個值  
它是區域變數，僅在 `{}` 內有效  

```js
function sayHelloName(name) {
  alert("Hello, " + name);
}

// 呼叫 function
sayHelloName("小明");
```

### return
function 可以將程式處理完畢的結果傳出  
就像是一台計算機，將算式傳給計算機，計算機計算後將結果傳回來，顯示在螢幕上  

```js
```

### 箭頭函式
箭頭函式可以將 function 的宣告寫得比較簡短  
```js
let sayHello = () => {
    alert("Hello");
};

```

:::warning 練習
編寫一個 function，可以判斷傳入的數字是不是偶數，是的話回傳 `true`，不是則回傳 `false`
:::

## 物件
上一章節我們介紹了 `JSON 物件` 這種很像陣列的東西  
JSON 裡面的值除了可以是一般的文字、數字外，它的值還能是 function  
如果裡面包含 function 的話，就會是 `物件導向` 的程式設計  
`物件導向` 是比較進階的程式設計觀念，同學先了解就好，之後的課程只會使用別人宣告好的物件  

### JSON 物件
我們先在一般的 JSON 裡面加入 function 試試看  
若要在 function 裡使用同一個 JSON 內的其他資料，我們必須加上 `this`  
下面示範了 JSON 內 function 的兩種寫法  

```js
let Ming = {
    firstName:  "小明",
    lastName:  "王",
    skills: [],
    sayHello: function() {
        alert("你好，我的名字叫 " + this.lastName + this.firstName);
    },
    addSkill(skill) {
        this.skills.push(skill);
    }
}

person.sayHello();
person.addSkill("javascript");
console.log(person.skills);
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
      {id:'sub3', parentid:'root', topic:'sayHello', 'background-color': 'lightseagreen'},
      {id:'sub4', parentid:'root', topic:'addSkill', 'background-color': 'lightseagreen'},
    ]
  }
}
" />

我們可以知道，現在有個變數 `person` 它的資料是一個人，裡面放了它的姓、名和這位老兄會做的事情  
   
但如果今天我們的程式裡有不只一個 `person`，多來了一位小美，且他們會做的事情和屬性都一樣時，重複宣告這些東西會讓程式碼又臭又長  
   
所以我們要和上面定義 function 一樣，先宣告 `人` 這個東西該有的屬性和它能做的事  
之後直接呼叫，就不用重複寫差不多的程式碼  

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
  addSkill(skill) {
    this.skills.push(skill);
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
      {id:'sub4', parentid:'root', direction: 'right', topic:'addSkill', 'background-color': 'lightseagreen'},
      {id:'Ming', parentid:'root', direction: 'left', topic:'Ming', 'background-color': 'purple'},
      {id:'Mei', parentid:'root', direction: 'left', topic:'Mei', 'background-color': 'purple'},
    ]
  }
}
" />
