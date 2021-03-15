--- 
title: Ch.5 迴圈
tags:
 - JavaScript
prev: ./ch4
next: ./ch6
---

迴圈則可以讓程式重複的執行一樣的動作，達到指定條件才會結束  
<!-- more -->
常用的迴圈有 `for` 、 `while` 和 `do while` 三種  
下一章節還有兩種陣列用的迴圈  
我們需要依照程式的情況來選擇使用不同的迴圈  
## for
`for` 迴圈通常會用在有固定執行次數的迴圈   
@flowstart
st=>start: 開始
start=>operation: i = start
cond=>condition: i < max
code=>inputoutput: 執行
plus=>operation: i++
e=>end: 結束

st->start
start->cond
cond(yes)->code->plus
plus(left)->cond
cond(no)->e
@flowend

迴圈的程式寫法如下面範例
```js
for(let i=start;i<max;i=i+1){
	// code
}

// i=i+1 可以簡寫成 i++
for(let i=start;i<max;i++){
	// code
}
```

`()` 內宣告了這個迴圈執行的三種動作，以 `;` 分隔
- 宣告變數：宣告了一個變數 `i` ，這裡的 `i` 的意思是索引 `index`
- 執行條件: 迴圈執行的條件
- 離開動作：`{}` 內的程式碼處理完後，會執行這個動作

再看看實際應用的程式碼，想想看這段程式碼會輸出什麼  
`document.write()` 可以在網頁上寫上內容，`()` 裡面如果是放 HTML 文字的話就能輸出 HTML 元素  

```js
for(let i=0;i<10;i++) {
	document.write(i);
}
```

:::warning 練習
試試看自己寫一個迴圈，輸出這四個數字: 1, 4, 7, 10
:::

:::warning 挑戰
在網頁上產生一排 51 個顏色漸變的 ★，第一個星的顏色為 `rgb(0,0,255)`，最後一個 ★ 色碼為 `rgb(255,0,0)`，綠色值都是0  
:::

## 巢狀 for
如果 `for(A)` 迴圈裡面又有一個 `for(B)` 迴圈，可以處理更複雜的二維資料  
::: warning 練習
想一想，怎麼用兩個 for 迴圈製作一個九九乘法表。  
以下兩種練習，請同學依照順序挑戰  
- 一行一行的算式
- 製作成表格
:::

:::warning 挑戰
上面兩種都完成的同學，試著結合剛剛的顏色漸變星星，將九九乘法表表格加上顏色漸變背景
:::
## while
這種迴圈結構較簡單，只有一個執行條件  
先判斷是否符合條件，符合的話才執行程式碼，執行後後再判斷要不要執行下一次  
用於不確定執行次數的迴圈  

<img src="/F2E-book/images/ch5/while_alive.png" height="300" style="margin: 10px 0;">

@flowstart
st=>start: 開始
cond=>condition: 檢查條件
code=>inputoutput: 執行
e=>end: 結束

st->cond
cond(yes)->code
code(left)->cond
cond(no)->e
@flowend

下面這個範例，使用者輸入 `end` 才會結束  
```js
let input = "";
while(input !== "end"){
  input = prompt("輸入 end 結束，不然煩死你");
}
```

`while` 也可以模仿 `for` 的動作  
```js
let i = 0;
while(i <= 10) {
  document.write(i);
  i++;
}
```

## do while
`do while` 迴圈其實就只是把 `while` 迴圈倒過來寫  
先執行程式碼後才判斷要不要執行下一次  

@flowstart
st=>start: 開始
cond=>condition: 檢查條件
code=>inputoutput: 執行
e=>end: 結束

st->code
code->cond
cond(yes)->code
cond(no, left)->e
@flowend

下面這個範例試將上面的 `while` 用 `do while` 改寫  
```js
let input = "";
do {
  input = prompt("輸入 end 結束，不然煩死你");
} while(input !== "end")
```

## 比較
- `for` 一行就清楚表示遊戲規則，思緒上會比較清晰，適合簡單的迴圈控制變數增加減少行為
- `while` 只有條件，適合自訂遊戲規則，做比較彈性，只要你有能力控制迴圈結束都可以用
- `do while` 跟 `while` 一樣適合自訂遊戲規則，只差別於第一次進入檢查條件

<img src="/F2E-book/images/ch5/while.jpg" height="300" style="margin: 10px 0;">

## break 與 continue
`break` 可以打斷迴圈的執行，`continue` 可以略一次執行  
這兩個涵式在所有迴圈內都可以使用  
```js
// 當 i 等於 5 時，跳過這次迴圈
for(let i=0;i<10;i++) {
  if(i === 5) {
    continue;
  }
	document.write(i);
}

// 猜猜神秘數字，讓使用者猜測神秘數字是多少，猜對才打斷迴圈
let count = 1;
let num = 123;
while(true) {
  let answer = prompt(`第 ${count} 次猜測，猜猜看秘密數字是多少`);
  if(answer == num){
    break;
  }
  count++;
}
```
:::warning 練習
試試看自己寫一個猜數字遊戲，並加入太大、太小等提示訊息
:::
## 綜合應用
:::warning 練習
一球從 100 公尺高度自由落下，每次落地後反跳回原高度的一半再落下，請問  
- 第 10 次落地時，共經過多少公尺？
- 第 10 次反彈多高？
:::

:::warning 練習
印星星塔，結構如下圖  
使用者能用 `prompt()` 輸入星星塔層數
```
★
★★
★★★
★★★★
★★★★★
```
:::

:::warning 練習
印星星塔，結構如下圖  
使用者能用 `prompt()` 輸入星星塔層數
```
☆☆☆☆★☆☆☆☆
☆☆☆★★★☆☆☆
☆☆★★★★★☆☆
☆★★★★★★★☆
★★★★★★★★★
```
:::

:::warning 作業
使用者可以輸入西元年、月、日，三個 `prompt()`  
顯示使用者輸入的是該年的第幾天  
- 以 3/5 為例，將前兩個月的天數加起來，再加上 5 天即可
- 需考慮閏年 +1
- 某些月份的天數是 30，某些月份的天數是 31
- `parseInt(變數或是數字的文字)` 可以把文字轉數字
:::

:::warning 挑戰
挑戰印出更多種的星星  
<img src="/F2E-book/images/ch5/java-star-pattern.png" height="300" style="margin: 10px 0;">
:::
