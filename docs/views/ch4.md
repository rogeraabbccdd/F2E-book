--- 
title: Ch.4 JavaScript 的邏輯判斷式
categories:
 - JavaScript
---

邏輯判斷式是程式運作不可或缺的部分，它可以讓程式根據不同的情況去執行不同的程式碼
<!-- more -->
## 基礎判斷式
我們先從中文句子以及基本運算子來認識判斷式  

### 從中文句子認識語法
一個簡單的一個條件判斷式會長這樣  
```js
if(條件){
    條件成立時的程式碼
} else{
    條件不成立時的程式碼
}
```
這段程式碼翻譯成中文會式這樣子  
   
<span style="color:#ff6600">如果</span><span style="color:#FF1493"> ( 條件 ) </span> { 條件成立時的動作 } <span style="color:#ff6600"> 否則</span> { 條件不成立時的動作 }
   
其實這段邏輯大家都應該經常使用到，只是不知道轉換成程式的語法怎麼寫而已  
以下面這句話舉例  

> 如果外面下雨，我們就去看電影，否則我們就去爬山

整個句子的邏輯就會是

<span style="color:#ff6600">如果</span><span style="color:#FF1493"> ( 外面下雨 ) </span> { 我們就去看電影 } <span style="color:#ff6600"> 否則</span> { 我們就去爬山 }

`else` 是非必要的，要看狀況使用，例如  
   
<span style="color:#ff6600">如果</span><span style="color:#FF1493"> ( 可以決定交作業時間 ) </span> { 我希望永遠不必交 }

### 比較運算子
:::danger 注意
請注意符號的擺放位置  比如 `a >= b`  不能寫成  `a => b` 這樣就代表另外的意思了
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
| a <span style="color: #ff6600;">=<</span> b | a <span style="color: #ff6600;">小於等於</span> b <span style="color: #FF1493;">或是</span> a <span style="color: #ff6600;">等於</span> b |


### 邏輯運算子
| 符號 | 說明 | 舉例 |
|:---|:---|:---|
| a <span style="color: #ff6600;">&&</span> b | a <span style="color: #ff6600;">與</span> b ，必須符合兩者 | 如果颱風天沒颳風也沒下雨，我就去看電影 |
| a <span style="color: #ff6600;">&#124;&#124;</span> b | a <span style="color: #ff6600;">或</span> b，符合其中一個 | A: 晚餐吃什麼？ B: 便當或麵都可以 |
| <span style="color: #ff6600;">!</span>a | 否定、相反 | A: 你假日想做什麼事？ B: 除了練習程式外，其他都可以 |

相反式的幾個程式範例，使用 `!` 前綴並將內容用 `()` 包起來，想想看以下判斷式的結果是什麼  
- `!(a==b)`
- `!(a>b)`
- `!(a>=b)`
- `!(a<b)`

數字大小比較的範例  
```js
let a = 10;
if($a <= 10){
    console.log("a 小於等於 10");
}
else {
    console.log("a 大於 10");
}
```

資料型態比較的範例
```js
let a = 10;
let b = "10"
if(a === b){
    console.log("a 和 b 的型態一樣且值相等");
}
else {
    console.log("a 和 b 的型態不一樣，且值不相等");
}
```

:::warning 練習
試試看把數字 `10` 也修改成變數  
再修改一下數字大小、把數字用引號包起來，或把 `==` 換成 `===` 看看會發生什麼事
:::


## 進階判斷式
### 三元運算子
如果是 2 選 1 的判斷式，可以運用三元運算子，節省程式碼文字  
   
> 條件 <span style="color:#FF1493">?</span> 成立時執行的程式 <span style="color:#ff6600">:</span> 否定時執行的程式  
   
```js
let cool = confirm("你覺得你很 帥/美 嗎?");
let msg = cool ? "你好 帥哥/美女" : "別看不起自己，你其實很 帥/美";
alert(msg);
```

### 多條件式
當條件有多筆需要判斷時，你可以用 `()` 組合判斷式  
想想看下面的判斷式的意思  
```js
let isRich = true;
let isFat = true;
let isGoodAtCoding = true;
if( (!isFat && isGoodAtCoding) || isRich ) {
    alert("交到女朋友!");
}
```

### 判斷式條件的延伸
前面的判斷式，都是 2 選 1，但很多時候，遇到 3 選 1 、4 選 1 或更多的時候，就需要用到 `else if`  
程式執行的流程會是這個樣子  

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

-----  

用程式的寫法的話就是

<span style="color: #ff6600;">if( 條件一 )</span> { 符合時執行程式碼 }  
<span style="color: #008000;">else if ( 條件二 )</span> { 符合時執行程式碼 }  
<span style="color: #55bcfa;">else if ( 條件三 )</span> { 符合時執行程式碼 }  
<span style="color: #ff00ff;">else</span>{ 以上都不符合時執行程式碼 }  
  
-----

轉換成中文的話就如下面的範例  
  
<span style="color: #ff6600;">if ( '高' && '帥' && '富' && '最好能夠會煮飯') </span>{ 找了五年沒遇到 ;}  
<span style="color: #008000;">elseif ( '高' && '帥' && '富' ) </span>{ 又找了五年....還是沒找到 (現年已30) }  
<span style="color: #55bcfa;">elseif ( '高'  && '體貼' && '生活過的去不必太有錢' ) </span>{ 又過了 5 年 ...仍然沒有 ( 現年已35 )...}  
<span style="color: #ff00ff;">elseif ( '只要能疼惜我就好了' ) </span>{ 仍然槓龜.....}  
<span style="color: #849b87;">else </span>{ 老娘不嫁了 ..... }

-----

實際應用在程式裡面  
這裡使用了一個新涵式 `prompt()` ，它會跳出一個輸入視窗，使用者可以輸入文字，變數接收到的資料型態為文字  
```js
let answer = prompt("請輸入答案數字: \n東漢末年，劉備、關羽與何人互有盟約，史稱\n1. 宜蘭三結義\n2. 桃園三結義\n3. 新竹三結義\n4. 苗栗三結義");
if(answer === "2") {
    alert("恭喜答對囉");
}
else if(answer === "1" || answer === "3"  || answer === "4" ){
    alert("答錯囉");
}
else {
    alert("沒有這個選項喔");
}
```

:::warning 練習
使用 `prompt()` 製作一個選擇題
:::

### switch case
像上面的範例，都是比較同一個變數的不同值的話，可以用 `switch` 和 `case`，程式碼比較精簡  

:::danger 注意
switch case 雖然比 if 還好閱讀，但僅限等於的判斷
:::

```js
let lang = "tw"; //試著抽換其他國家代碼
switch (lang) {
	case "jp":
		console.log("愛洗爹路唷");
		break;
	case "kr":
		console.log("沙拉黑唷");
		break;
	case "tw":
		console.log("我好喜歡你唷");
		break;
	default:
		console.log("sorry,你的語言我不會");
		break;
}
```

:::warning 練習
將你剛才的選擇題用 switch case 改寫
:::

### 巢狀判斷式
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

## 綜合應用
`prompt()` 會跳出一個輸入視窗，使用者可以輸入文字，資料型態為文字  
`confirm()` 會跳出一個確認視窗，使用者可以點是或否，資料型態為布林值  
以上兩個函式 `()` 內都是放視窗文字  

下面是運用上面兩個涵式製作的問答題的範例  
```js
// 一開始 100 分
let score = 100;.

let q1 = prompt("1 + 1 = ?");
if(q1 === "2"){
    alert("恭喜你答對!");
}
else {
    alert("答錯囉，扣你 10 分!");
    score -= 10;
}

let q2 = confirm("鳳梨披薩是不是食物?");
if(q2) {
    alert("對，鳳梨披薩不是食物");
}
else {
    alert("答錯囉，扣你 10 分!");
    score -= 10;
}

alert(`遊戲結束，你得到了 ${score} 分!`);
```

:::warning 練習
製作一個星座判斷器，進入網頁時出現三個輸入視窗，分別是姓名、出生月份和出生日期  
輸入完成後跳出訊息，格式為 `OOO 你好，你的星座是 OOO 座`  
:::

:::warning 作業
改寫上面的問答範例，自己設計 5 道題目，遊戲結束後會顯示得分
:::
