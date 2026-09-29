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
  - 尋找字串中是否有東西符合尋找文字，回傳第一個符合的索引，`-1` 代表找不到
  - 第二個參數是選填，預設是 `0`
- `.lastIndexOf(尋找文字, 從第幾個字開始往前)`
  - 尋找字串中是否有東西符合尋找文字，回傳最後一個符合的索引，`-1` 代表找不到
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

const includesCurry1 = curry.includes('咖哩')
console.log(includesCurry1)    // true
const includesCurry2 = curry.includes('咖哩', 9)
console.log(includesCurry2)   // false

const indexCurry = curry.indexOf('咖哩')
console.log(indexCurry)       // 3

const lastIndexCurry = curry.lastIndexOf('咖哩')
console.log(lastIndexCurry)   // 8

const matchCurry = curry.match(/咖哩/g)
console.log(matchCurry)       // [ '咖哩', '咖哩' ]

const matchAllCurry = curry.matchAll(/咖哩/g)
console.log(matchAllCurry)    // RegExpStringIterator
for (const match of matchAllCurry) {
  // [ 
  //   '咖哩',
  //   index: 3,
  //   input: '外賣 咖哩拌飯 咖哩烏冬',
  //   groups: undefined
  // ]

  // [ 
  //   '咖哩',
  //   index: 8,
  //   input: '外賣 咖哩拌飯 咖哩烏冬',
  //   groups: undefined
  // ]
  console.log(match)
}

const replaceCurry1 = curry.replace('咖哩', '三色豆')
console.log(replaceCurry1)      // '外賣 三色豆拌飯 咖哩烏冬'

const replaceCurry2 = curry.replace(/咖哩/g, '三色豆')
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
  //   account: "aaaa",
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
- `.parseInt(文字)`
- `.parseFloat(文字)`
- `.isNaN(變數)`
- `.split(文字)`

```js
// 文字轉數字或浮點
let strNumber = "123456";
let num = parseInt(strNumber);
let strFloat = "12345.67";
let float = parseFloat(strFloat);

// 如果將文字轉換成數字的話會發生什麼事?
let notNumber = "abcdefg";
let nan = parseInt(notNumber);
console.log(isNaN(nan));

// 文字轉成陣列
// .split(分割文字)
let alphabet = "a,b,c,d,e,f,g";
let alphabetArr = alphabet.split(",");
```

## 綜合練習
:::warning 練習
製作身分證字號隱藏顯示工具  
使用者輸入身分證字號後，將中間的三位數遮蔽  
```
A123456789
A123***789
```
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

:::warning 挑戰
文文記性不太好，常常會忘東忘西。他也常忘記提款卡密碼，每次忘記密碼都得帶著身份證、存摺、印章親自到銀行去重設密碼，還得繳交 50 元的手續費，很是麻煩。後來他決定把密碼寫在提款卡上免得忘記，但是這樣一來，萬一提款卡掉了，存款就會被盜領。因此他決定以一個只有他看得懂的方式把密碼寫下來。  

他的密碼有 6 位數，所以他寫下了 7 個大寫字母，相鄰的每兩個字母間的「距離」就依序代表密碼中的一位數。所謂「距離」指的是從較「小」的字母要數幾個字母才能數到較「大」字母。字母的大小則是依其順序而定，越後面的字母越「大」。  

假設文文所寫的 7 個字母是 POKEMON，那麼密碼的第一位數就是字母 P 和 O 的「距離」，由於 P 就是 O 的下一個字母，因此，從 O 開始只要往下數一個字母就是 P 了，所以密碼的第一位數就是 1。密碼的第二位數則是字母 O 和 K 的「距離」，從 K 開始，往下數 4 個字母 (L, M, N, O) 就到了 O，所以第二位數是 4，以此類推。因此，POKEMON 所代表的密碼便是 146821。  

噓！你千萬別把這個密秘告訴別人哦，要不然文文的存款就不保了。  

文文可以透過 prompt 輸入文字
輸入文字後就將解密後的密碼回傳  
```js
const decrypt = (text) => {
  // ... 在此寫你的程式碼
}

const input = prompt('輸入文字')
console.log(decrypt(input))
```

測試資料
|輸入|輸出|
|---|---|
|POKEMON|146821|
|TYPHOON|598701|

題目修改自 [高中生程式解題系統](https://zerojudge.tw/ShowProblem?problemid=a065)
:::