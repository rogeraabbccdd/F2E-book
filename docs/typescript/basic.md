# TypeScript 基礎語法
介紹最常用的基礎語法，幫助你將專題改寫為更強健的型別化版本

## 基礎型別
在 TS 中，我們可以為變數指定型別：

:::tip TIP
TypeScript 會自動推斷型別，不需要每個都寫定義
```typescript
// 自動推斷型別為 number
let price = 100
// 錯誤
price = "hello"
```
:::

```typescript
// 基本型別
let title: string = "前端開發手冊";
let price: number = 399;
let isPublished: boolean = true;

// 陣列型別
let tags: string[] = ['Vue', 'Node', 'TS'];
let scores: number[] = [90, 85, 100];
```

:::danger 注意
小心陣列型別定義的 `[]` 位置
- `string[]` 文字陣列
- `[string]` Tuple，預先定義好的陣列型別，指定長度和每個東西的類型

其中 Tuple 寫法類似 [mongoose 陣列定義](https://mongoosejs.com/docs/schematypes.html#arrays)，小心搞混

| 技術 | 寫法 | 意義 |
|---|---|---|
| JavaScript | `['a','b']` | 陣列 |
| TypeScript | `string[]` | 文字陣列 |
| TypeScript | `[string]` | Tuple |
| Mongoose | `[String]` | schema 陣列欄位 |

```typescript
let a: string[] = ['Vue', 'Node', 'TS'];
let b: [string] = ['aaa']
```
:::

定義函式的參數與回傳值型別  
```typescript
// 定義參數為 number，回傳值也必須是 number
function add (a: number, b: number): number {
  return a + b;
}

// 箭頭函式寫法
const multiply = (a: number, b: number): number => a * b;
```

## 介面 (Interface)
`interface` 可以定義物件的欄位

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  // 加上問號代表可選欄位
  age?: number; 
}

const newUser: User = {
  id: 1,
  name: 'User',
  email: 'user@example.com',
  // age 可以不寫，因為它是可選的
};
```

當介面欄位被標記為 `?` 時，TypeScript 會提醒該值可能是 `undefined`  
如果值在執行時一定存在，可以使用 `!` 標記  

```typescript
// 錯誤：age 可能是 undefined
console.log(`年齡是${newUser.age.toString()}`);

// 使用 ! 表示一定不是 undefined
console.log(`年齡是${newUser.age!.toString()}`);

// 比較安全的寫法，使用 ?. 
// 注意：括號不能省略，確保先判斷有沒有值再跟文字相加
// 這裡選擇 ?? 的原因是 || 會把 0 替換
console.log(`年齡是${newUser.age?.toString() ?? '不知道'}`);
```

:::danger 注意
Vue 的 template 不支援 TypeScript 語法  
因此使用 `!.` 會有錯誤  
```html
<template>
  <h1>{{ newUser.age!.toFixed() }}</h1>
</template>
```
:::

## 型別別名 (Type)
`type` 與 `interface` 非常相似，但它更靈活，常用於定義 **聯集型別 (Union Types)**

```typescript
type Status = 'pending' | 'success' | 'error';

let currentStatus: Status = 'pending';
// 'finish' 不在定義的範圍內，會錯誤
currentStatus = 'finish';
```

## 列舉 (Enum)
`enum` 用於定義一組有名字的常數  
這在處理狀態變數時非常有用，能增加程式碼的可讀性

:::danger 注意
`enum` 會在 JavaScript 中實際產生物件，它不只是型別
:::

將使用者身分別定義成 enum
```typescript
// 若是不設預設值，會從 0 ，或前一個數字開始遞增
enum UserRole {
  ADMIN = 0,
  USER = 1,
  GUEST = 2
}

interface Member {
  name: string;
  role: UserRole;
}

const myUser: Member = {
  name: "Alice",
  // 比起直接寫 0，這樣更不容易寫錯
  role: UserRole.ADMIN
};

// 可以從名稱或數字取出對應的另一個
// 只有值是數字時才能這樣做
console.log(UserRole.ADMIN) // 0
console.log(UserRole[0])    // 'ADMIN'
```

將 HTTP 狀態碼定義成 enum
```typescript
enum StatusCode {
  SUCCESS = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

res.status(StatusCode.SUCCESS)
```

## 套件型別
有些套件是使用 JavaScript 編寫，因此 TypeScript 無法辨認型別  
這時可以安裝[社群定義的型別](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types)，通常套件名稱是 `@types/套件名`
```bash
npm i -D @types/lodash
```

如果沒有社群定義型別，可以簡單建立 `.d.ts` 檔案，宣告套件型別是 `any`  
```typescript
// 簡單定義有這個套件
declare module "lodash"
```
