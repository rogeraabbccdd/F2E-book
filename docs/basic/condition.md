# 邏輯判斷式

邏輯判斷式是程式運作不可或缺的部分，它可以讓程式根據不同的情況去執行不同的程式碼

## 認識語法
當中文句型為  
  
> <span style="color:#ff6600">如果</span><span style="color:#FF1493"> ( 條件 ) </span> { 條件成立時的動作 } <span style="color:#ff6600"> 否則</span> <span>{ 條件不成立時的動作 }</span>
  
> <span style="color:#ff6600">如果</span><span style="color:#FF1493"> ( 外面下雨 ) </span> { 在家裡待著電影 } <span style="color:#ff6600"> 否則</span> <span>{ 出門和爬山 }</span>

翻譯成程式就是  
  
```js
if (條件) {
  條件成立時的程式碼
} else {
  條件不成立時的程式碼
}
```

```js
if (外面下雨) {
  在家裡待著電影
} else {
  出門
  去爬山
}
```
- `if` 代表如果，後面接判斷式，如果成立，就會裡面的執行程式碼
- `else` 代表否則，當 `if` 不成立時，就會裡面的執行程式碼

:::tip TIP
當判斷式後的 `{}` 內只有一行程式碼時，可以省略 `{}`
```js
if (條件) 執行程式碼
else  執行程式碼
```
上面的範例可以寫成
```js
if (外面下雨) 在家裡待著電影
else {
  出門
  去爬山
}
```
:::

`else` 和中文 `否則` 一樣是非必要的  
  
> <span style="color:#ff6600">如果</span><span style="color:#FF1493"> ( 可以決定交作業時間 ) </span> <span>{ 我希望永遠不必交 }</span>

```js
if (可以決定交作業時間) {
  我希望永遠不必交
}
```

## 比較運算子
比較運算子是用來比較兩個值的大小  
運算的結果會是布林值 `true` 或 `false`

:::danger 注意
請注意符號的擺放位置，例如 `a >= b` 不能寫成 `a => b`  
`=>` 代表 function 的箭頭函式，不是比較運算子
:::

| 符號 | 說明 |
|:---|:---|
| a <span style="color: #ff6600;">==</span> b | a <span style="color: #ff6600;">等於</span> b |
| a <span style="color: #ff6600;">===</span> b | a <span style="color: #ff6600;">等於</span> b （資料型態也要相同） |
| a <span style="color: #ff6600;">!=</span> b | a <span style="color: #ff6600;">不等於</span> b |
| a <span style="color: #ff6600;"><></span> b | a <span style="color: #ff6600;">不等於</span> b |
| a <span style="color: #ff6600;">!==</span> b | a <span style="color: #ff6600;">不等於</span> b （資料型態也不相等） |
| a <span style="color: #ff6600;">></span> b | a <span style="color: #ff6600;">大於</span> b （數值判斷） |
| a <span style="color: #ff6600;">＜</span> b | a <span style="color: #ff6600;">小於 </span>b （數值判斷） |
| a <span style="color: #ff6600;">>=</span> b | a <span style="color: #ff6600;">大於</span> b  <span style="color: ;#FF1493">或是</span> a <span style="color: #ff6600;">等於</span> b |
| a <span style="color: #ff6600;"><=</span> b | a <span style="color: #ff6600;">小於等於</span> b <span style="color: #FF1493;">或是</span> a <span style="color: #ff6600;">等於</span> b |

數字大小比較範例  
```js
const a = 10, b = 20
if (a > b) {
  console.log('a 大於 b')
} else {
  console.log('a 不大於 b')
}
```

資料型態比較範例  

```js
const a = 100, b = '100'
if (a == b) {
  console.log('a == b')
} else {
  console.log('a != b')
}
if (a === b) {
  console.log('a === b')
} else {
  console.log('a !== b')
}
```

若判斷的是布林值，可以直接用 `if(變數)` 來判斷  

```js
const ok = false
// if (ok) --> if (ok === true)
if (ok) {
  console.log('ok')
}
// if (!ok) --> if (ok === false)
if (!ok) {
  console.log('not ok')
}
```

## 邏輯運算子
邏輯運算子是用來組合多個比較運算子的結果  
運算的結果會是布林值 `true` 或 `false`

| 符號 | 說明 | 舉例 |
|:---|:---|:---|
| a <span style="color: #ff6600;">&&</span> b | a <span style="color: #ff6600;">與</span> b ，必須符合兩者 | 如果颱風天沒颳風也沒下雨，我就去看電影 |
| a <span style="color: #ff6600;">&#124;&#124;</span> b | a <span style="color: #ff6600;">或</span> b，符合其中一個 | A: 晚餐吃什麼？ B: 便當或麵都可以 |
| <span style="color: #ff6600;">!</span>a | 否定、相反 | A: 你假日想做什麼事？ B: 除了練習程式外，其他都可以 |

`&&` 範例
```js
const rain = false, wind = true
if (!rain && !wind) console.log('看電影')
else                console.log('在家發呆')
```
`||` 範例
```js
const dinner = '便當'
if (dinner === '炸雞' || dinner === '可樂') {
  console.log('好耶')
} else {
  console.log('不好耶')
}
```

相反式範例
```js
!(a==b)
!(a>b)
!(a>=b)
!(a<b)
```

## 三元運算子
如果是 2 選 1 的判斷式，可以運用三元運算子，節省程式碼文字  

<ImageFigure
  src="/images/ch4/meme.jpg"
  title="三元運算子"
  alt="三元運算子"
>三元運算子</ImageFigure>

語法規則為  
  
> 條件 <span style="color:#FF1493">?</span> 成立時執行的程式 <span style="color:#ff6600">:</span> 否定時執行的程式  
   
```js
const like = confirm('你喜歡 JavaScript 嗎')

// 使用三元運算子前
if (message) {
  console.log('喜歡')
} else {
  console.log('不喜歡')
}

// 使用三元運算子後，將結果放在變數
const message = like ? '喜歡' : '不喜歡'
console.log(message)

// 使用三元運算子後，直接印出結果
console.log(like ? '喜歡' : '不喜歡')
```

## 多條件式
當條件有多筆需要判斷時，你可以用 `()` 組合判斷式  
```js
const coding = confirm('你會寫 code 嗎')
const game = confirm('你有玩原神嗎')
const player = confirm('你是可莉玩家嗎')
if ((game && player) || coding) {
  console.log('酷欸')
} else {
  console.log('加油')
}
```

## 判斷式條件的延伸
前面的判斷式，都是 2 選 1  
但很多時候，遇到 3 選 1 、4 選 1 或更多的時候，就需要用到 `else if`  

@flowstart
st=>start: 開始
cond1=>condition: if
cond2=>condition: else if
cond3=>condition: else if
cond4=>condition: else
e=>end: 結果
process1=>operation: 執行區塊內程式碼
process2=>operation: 執行區塊內程式碼
process3=>operation: 執行區塊內程式碼
process4=>operation: 執行區塊內程式碼

st->cond1
cond1(yes)->process1->e
cond1(no)->cond2
cond2(yes)->process2->e
cond2(no)->cond3
cond3(yes)->process3->e
cond3(no)->cond4
cond4(yes)->process4->e
@flowend

程式寫法範例
><span style="color: #ff6600;">if( 條件一 )</span> { 符合時執行程式碼 }  
<span style="color: #008000;">else if ( 條件二 )</span> { 符合時執行程式碼 }  
<span style="color: #55bcfa;">else if ( 條件三 )</span> { 符合時執行程式碼 }  
<span style="color: #ff00ff;">else</span> <span>{ 以上都不符合時執行程式碼 }</span>  

成績標準範例
><span style="color: #ff6600;">if ( 成績 >= 95 ) </span>{ 你的成績是 S 級 }  
<span style="color: #008000;">else if ( 成績 >= 90 ) </span>{ 你的成績是 A 級 }  
<span style="color: #55bcfa;">else if ( 成績 >= 80 ) </span>{ 你的成績是 B 級 }  
<span style="color: #ff00ff;">else</span> <span>{ 你的成績是 C 級 }</span>  

年齡分級判斷範例，編寫的時候要注意判斷順序

```js
const age = prompt('請輸入年齡')

// 錯誤的判斷寫法，永遠都是普遍級
if (age >= 0) {
  document.write('普遍級')
} else if (age >= 6) {
  document.write('保護級')
} else if (age >= 12) {
  document.write('輔12級')
} else if (age >= 15) {
  document.write('輔15級')
} else if (age >= 18) {
  document.write('限制級')
}

// 正確寫法
if (age >= 18) {
    document.write('限制級')
} else if (age >= 15) {
    document.write('輔15級')
} else if (age >= 12) {
    document.write('輔12級')
} else if (age >= 6) {
    document.write('保護級')
} else if (age >= 0) {
    document.write('普遍級')
}
```

:::warning 練習
使用 `prompt()` 製作一個選擇題
:::

## switch case
`switch` 是另一種判斷式，可以用來判斷多個條件  
執行時會將 `()` 內的變數值，和 `case` 後面的值做比較  
- 從符合的 `case` 開始往下執行，直到遇到 `break` 為止，順序會影響執行  
- 如果沒有符合的 `case`，就會執行 `default` 的程式碼
  
語言判斷，使用 `if` 寫法
```js
if (lang === 'zh-tw') {
  document.write('台灣中文')
} else if (lang === 'ja-jp') {
  document.write('日本日文')
} else if (lang === 'en-us' || lang === 'en') {
  document.write('英文')
} else {
  document.write('窩不知道')
}
```
語言判斷，使用三元運算子寫法
```js
const message = 
  lang === 'zh-tw' ? '台灣中文' : 
  lang === 'ja-jp' ? '日本日文' :
  (lang === 'en-us' || lang === 'en') ? '英文' : '窩不知道'
document.write(message)
```
語言判斷，使用 `switch` 寫法
```js
switch (lang) {
  case 'zh-tw':
    document.write('台灣中文')
    break
  case 'jp':
    document.write('日本')
  case 'ja-jp':
    document.write('日本日文')
    break
  case 'en-us':
  case 'en':
    document.write('英文')
    break
  default:
    document.write('窩不知道')
    break
}
```
年齡分級判斷範例
```js
const age = 18
// 不能寫 switch (age)，只能寫 switch (true)
// 當寫 switch(age) 時
// age === (age >= 18)
// 18 === (18 >= 18)
// 18 === true
// false
switch (true) {
  case (age >= 18):
    document.write('限制級')
    break
  case (age >= 15):
    document.write('輔15級')
    break
  case (age >= 12):
    document.write('輔12級')
    break
  case (age >= 16):
    document.write('保護級')
    break
  case (age >= 0):
    document.write('普遍級')
    break
}
```

## 巢狀判斷式
判斷式裡面還可以再使用判斷式，做更詳細的判斷  
@flowstart
st=>start: 開始
cond1=>condition: if
e=>end: 結果
process1=>operation: 執行 else 程式碼
process11=>operation: 判斷式1
process12=>operation: 判斷式2
process13=>operation: 判斷式3
st->cond1
cond1(yes)->process11->process12->process13->e
cond1(no)->process1->e
@flowend

```js
const weather = 'rain'
const umbrella = false

if (weather === 'rain') {
  if (umbrella) {
    document.write('下雨，有傘，沒事')
  } else {
    document.write('下雨，沒傘，有事')
  }
} else {
  document.write('沒下雨，沒差')
}
```

## 短路求值
邏輯運算子也可以用在賦值  
- `||` 取第一個 `Boolean()` 判斷為 true 的值
- `&&` 取第一個 `Boolean()` 判斷為 false 的值
- `??` 取第一個不是 `null` 也不是 `undefined` 的值

以下為 `Boolean()` 判斷為 `false` 的狀況
- `false`
- `0`
- `""`
- `null`
- `undefined`
- `NaN`

`||` 使用範例
```js
const x = null || 0 || undefined || 123 || 'abc' || 'dfgd' || false
console.log(x)
```
`&&` 使用範例
```js
const y = 'abc' && 123 && 456 && false && 'def' && undefined
console.log(y)
```
`??` 使用範例
```js
const z = undefined ?? null ?? false ?? 'abc' ?? 123 ?? 456 ?? false ?? 'def'
console.log(z)
```
實際應用範例
```js
// 使用短路求值前，需要判斷變數是否有值
let name = prompt('請輸入名字')
if (name === '' || name === null) {
  name = '路人'
}

// 使用短路求值後
const name = prompt('請輸入名字') || '路人'
console.log(name)
```

## 綜合應用
使用判斷式製作問答題  
```js
let score = 0

const ans1 = confirm('鳳梨是食物嗎')
if (ans1) {
    score += 10
    alert('答對了')
} else {
    alert('答錯了')
}

const ans2 = confirm('披薩是食物嗎')
if (ans2) {
    score += 10
    alert('答對了')
} else {
    alert('答錯了')
}

const ans3 = confirm('鳳梨披薩是食物嗎')
if (ans3) {
    score = 0
    document.write('你輸了')
} else {
    score += 10
    document.write(`恭喜過關，你得了 ${score} 分`)
}
```

:::warning 練習
製作一個星座判斷器，進入網頁時出現三個輸入視窗，分別是姓名、出生月份和出生日期  
輸入完成後跳出訊息，格式為 `OOO 你好，你的星座是 OOO 座`  
:::

:::warning 作業
自己設計 5 道題目問答題或選擇題，遊戲結束後會顯示得分
:::
