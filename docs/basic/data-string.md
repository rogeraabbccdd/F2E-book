# 資料處理 - 文字

各種處理文字的語法

## 基本處理
- `.trim()` 移除前後空白
- `.toUpperCase()` 轉大寫
- `.toLowerCase()` 轉小寫

:::tip TIP
JavaScript 可以串連多個語法
```js
const text = '  123 Abc Def GHI Jkl   '
const result = text.trim().toUpperCase().toLowerCase()
console.log(result)        // '123 abc def ghi jkl'
```

:::
```js
let text = '  123 Abc Def GHI Jkl   '
console.log(text)           // '  123 Abc Def GHI Jkl   '

text = text.trim()
console.log(text)           // '123 Abc Def GHI Jkl'

text = text.toUpperCase()
console.log(text)           // '123 ABC DEF GHI JKL'

text = text.toLowerCase()
console.log(text)           // '123 abc def ghi jkl'
```

## 尋找與取代
- `.includes(尋找文字, 從第幾個字開始)`
  - 檢查是否有包含尋找文字，回傳 boolean
  - 第二個參數是選填，預設是 `0`
- `.indexOf(尋找文字, 從第幾個字開始往後)`
  - 尋找陣列是否有東西符合尋找文字，回傳第一個符合的索引，`-1` 代表找不到
  - 第二個參數是選填，預設是 `0`
- `.lastIndexOf(尋找文字, 從第幾個字開始往前)`
  - 尋找陣列是否有東西符合尋找文字，回傳最後一個符合的索引，`-1` 代表找不到
  - 第二個參數是選填，預設是 `string.length - 1`
- `.match(正則表達式Regex)`
  - 符合的結果用陣列回傳
  - 沒找到回傳 `null`
- `.matchAll(正則表達式Regex)`
  - 符合的結果用 `RegExpStringIterator` 回傳
  - 只能用迴圈取資料
- `.replace(搜尋文字或 Regex, 取代文字)`
  - 搜尋文字只會取代找到的第一個
  - 正則表達式有設定 `g` 會取代全部找到的
  - 正則表達式的取代文字可以使用 `$1`, `$2`... 或 `$<群組名稱>` 代表找到的東西

正則表達式語法參考:
- [Learn Regex](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)  
- [Regexr](https://regexr.com/)
- [Regex101](https://regex101.com/)

:::danger 注意
- `includes()` 只能放文字，不能放正則表達式，如果要用正則表達式的話要用  
- `match()`、`matchAll()` 只能放正則表達式，不能放文字
- `replace()` 取代文字只會取代找到的第一個，如果要全部取代的話可以用迴圈或正則表達式  
:::

```js
const curry = '外賣 咖哩拌飯 咖哩烏冬'

const includesCurry1 = text2.includes('咖哩')
console.log(includesCurry)    // true
const includesCurry2 = text2.includes('咖哩', 3)
console.log(includesCurry2)   // false

const indexCurry = text2.indexOf('咖哩')
console.log(indexCurry)       // 3

const lastIndexCurry = text2.lastIndexOf('咖哩')
console.log(lastIndexCurry)   // 9

const matchCurry = text2.match(/咖哩/g)
console.log(matchCurry)       // [ '咖哩', '咖哩' ]

const matchAllCurry = text2.matchAll(/咖哩/g)
console.log(matchAllCurry)    // RegExpStringIterator
for (const match of matchAllCurry) {
  // [ 
  //   '咖哩',
  //   index: 3,
  //   input: '外賣 咖哩拌飯 咖哩烏冬',
  //   groups: undefined
  // ]
  console.log(match)
}

const replaceCurry1 = text2.replace('咖哩', '三色豆')
console.log(replaceCurry1)      // '外賣 三色豆拌飯 咖哩烏冬'

const replaceCurry2 = text2.replace(/咖哩/g, '三色豆')
console.log(replaceCurry2)      // '外賣 三色豆拌飯 三色豆烏冬'

const email = 'aaaa@gmail.com'
const emailMatch = email.match(/^[0-9a-z]+@[0-9a-z]+\.[0-9a-z]+$/g)
console.log(emailMatch)         // ['aaaa@gmail.com']

const emailRegexGroup = /^([0-9a-z]+)@([0-9a-z]+)\.([0-9a-z]+)$/g
const emailMatchAllGroup = email.matchAll(emailRegexGroup)
for (const match of emailMatchAllGroup) {
  // 0: "aaaa@gmail.com"
  // 1: "aaaa"
  // 2: "gmail"
  // 3: "com"
  // groups: undefined
  // index: 0
  console.log(match)
}

const emailReplaceGroup = email.replace(emailRegexGroup, '帳號是 $1，網域是 $2.$3')
console.log(emailReplaceGroup)  // '帳號是 aaaa，網域是 gmail.com'

const emailRegexGroup2 = /^(?<account>[0-9a-z]+)@(?<domain>[0-9a-z]+)\.(?<tld>[0-9a-z]+)$/g
const emailMatchAllGroup2 = email.matchAll(emailRegexGroup2)
for (const match of emailMatchAllGroup2) {
  // 0: "aaaa@gmail.com"
  // 1: "aaaa"
  // 2: "gmail"
  // 3: "com"
  // groups: {
  //   account: "aaa",
  //   domain: "gmail",
  //   tld: "com"
  // }
  // index: 0
  console.log(match)
}

const emailReplaceGroup2 = email.replace(emailRegexGroup2, '帳號是 $<account>，網域是 $<domain>.$<tld>')
console.log(emailReplaceGroup2)   // '帳號是 aaaa，網域是 gmail.com'
```

## 切割
- `.substr(開始位置, 長度)`
  - 從開始位置取指定長度的文字
  - 位置可以放負數，代表倒數，`-1` 是倒數第一個字
  - 長度不寫會直接取到結尾
- `.substring(開始位置, 結束位置)`
  - 從開始位置取到結束位置，**不包含結束位置**
  - 結束位置不寫會直接取到結尾
- `.slice(開始位置, 結束位置)`
  - 從開始位置取到結束位置，**不包含結束位置**
  - 結束位置不寫會直接取到結尾
  - 位置可以放負數

```js
const text3 = 'abcdefg'

console.log(text3.substr(3, 1))     // d

console.log(text3.substr(3))        // defg

// text3.substr(-3, 2)
// text3.length = 7
// -3 => 7 - 3 => 4
// text3.substr(4, 2)
console.log(text3.substr(-3, 2))    // ef

console.log(text3.substring(2, 6))  // cdef

console.log(text3.slice(2, 6))      // cdef

// text3.slice(-4, -2)
// text3.length = 7
// -4 => 7 - 4 => 3
// -2 => 7 - 2 => 5
// text3.slice(3, 5)
console.log(text3.slice(-4, -2))    // de

```

## 資料型態轉換

## 綜合練習
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
- 英文大寫 A-Z 的是連續的，小寫 A-Z 也是，但是英文大小寫編號間有其他字
- 需考慮密鑰超過 26 的情況
:::

