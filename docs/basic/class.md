# 物件導向
物件裡面的值除了可以是一般的文字、數字外，它的值也可以是 function  
如果物件裡面包含 function 的話，就會是 `物件導向` 的程式設計  

## 物件中的 function
- 物件裡面可以用 function 作為值
- 以 `this` 來代表這個物件，可以用來取得物件裡的其他屬性

```js
const person = {
  firstName: '小明',
  lastName: '王',
  // 物件內 function 定義方式
  fullName: function () {
    return this.firstName + this.lastName
  },
  // 物件內 function 定義方式簡寫
  sayHi () {
    return '你好，我是' + this.fullName()
  },
  // 物件內箭頭函式定義方式
  // this 會指向 window 而不是物件
  sayHi2: () => {
    return '你好，我是' + this.fullName()
  }
}
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
      {id:'sub1', parentid:'root', topic:'firstName'},
      {id:'sub2', parentid:'root', topic:'lastName'},
      {id:'sub3', parentid:'root', topic:'fullName', 'background-color': 'lightseagreen'},
      {id:'sub4', parentid:'root', topic:'sayHi', 'background-color': 'lightseagreen'},
    ]
  }
}
" />

:::tip TIP
可選串連也可以避免呼叫物件內不存在的 function 時的錯誤
```js
person.sayGoodBye?.()
```
:::

:::danger 注意
`this` 在不同地方有不同意思，使用時需要特別注意  
以下為瀏覽器常見的使用情況
- 在物件的 function 裡，`this` 代表這個物件
- 在一般 function 裡，`this` 代表 `window`
- 在箭頭函式裡，`this` 代表 `window`
:::

## 類別
類別是物件導向的基本概念，宣告一個模板後，用它來建立物件  
使用 `class` 來宣告類別，並用 `new` 來建立物件  

```js
// 宣告類別
class Person {
  // constructor 是物件建立時會執行的 function
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  fullName () {
    return this.firstName + this.lastName
  }
  sayHi () {
    return '你好，我是' + this.fullName()
  }
}

// 建立物件
const Ming = new Person("小明", "王");
const Mei = new Person("小美", "王");

// 使用建立的物件
document.write(Ming.sayHi())
document.write(Mei.sayHi())
```

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
      {id:'root', isroot:true, topic:'Person', 'background-color': 'orange'},
      {id:'sub1', parentid:'root', direction: 'right', topic:'姓'},
      {id:'sub2', parentid:'root', direction: 'right', topic:'名'},
      {id:'sub3', parentid:'root', direction: 'right', topic:'fullName', 'background-color': 'lightseagreen'},
      {id:'sub4', parentid:'root', direction: 'right', topic:'sayHi', 'background-color': 'lightseagreen'},
      {id:'Ming', parentid:'root', direction: 'left', topic:'Ming', 'background-color': 'purple'},
      {id:'Mei', parentid:'root', direction: 'left', topic:'Mei', 'background-color': 'purple'},
    ]
  }
}
" />

## 綜合練習
:::warning 練習
製作銀行帳戶類別 `BankAccount`  
- 建立帳戶時，傳入戶名和初始餘額
- `deposit(金額)` 存款，回傳 `存款 OOO 元，餘額 OOO 元`
- `withdraw(金額)` 提款，回傳 `提款 OOO 元，餘額 OOO 元`
- 餘額不足時不能提款，回傳 `餘額不足，目前餘額 OOO 元`
- `info()` 回傳 `OOO 的帳戶餘額為 OOO 元`

```js
class BankAccount {
  // ... 在此寫你的程式碼
}

const account = new BankAccount('小明', 1000)
console.log(account.deposit(500))   // 存款 500 元，餘額 1500 元
console.log(account.withdraw(2000)) // 餘額不足，目前餘額 1500 元
console.log(account.withdraw(300))  // 提款 300 元，餘額 1200 元
console.log(account.info())         // 小明的帳戶餘額為 1200 元
```
:::
