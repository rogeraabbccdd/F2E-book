# 迴圈

迴圈則可以讓程式重複的執行一樣的動作，達到指定條件才會結束  
常用的迴圈有 `for` 、 `while` 和 `do while` 三種  
我們需要依照程式的情況來選擇使用不同的迴圈  

## for
`for` 迴圈通常會用在有固定執行次數的迴圈   
@flowstart
st=>start: 開始
start=>operation: i = 初始值
cond=>condition: 符合執行條件
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
for(let i = start; i < max; i = i + 1) {
	// code
}

// i=i+1 可以簡寫成 i++
for(let i = start; i < max; i++) {
	// code
}
```

`()` 內宣告了迴圈執行的三種動作，以 `;` 分隔
- 宣告變數：宣告了一個變數 `i`，意思是索引 `index`
- 執行條件: 迴圈執行的條件
- 離開動作：`{}` 內的程式碼處理完後，會執行這個動作

```js
for(let i = 0; i < 10; i++) {
  document.write(i)
}
```

:::tip TIP
當回圈內的 `{}` 只有一行程式碼時，可以省略 `{}`
```js
for(let i = 0; i < 10; i++) document.write(i)
```
:::

:::warning 練習
試試看自己寫一個迴圈，輸出這四個數字: 1, 4, 7, 10
:::

:::warning 挑戰
在網頁上產生一排 52 個顏色漸變的 ★，第一個星的顏色為 `rgb(0,0,255)`，最後一個 ★ 色碼為 `rgb(255,0,0)`，綠色值都是0  
:::

## 巢狀 for
如果 `for` 迴圈裡面又有一個 `for` 迴圈，可以處理更複雜的二維資料  

::: warning 練習
製作一個九九乘法表
- 一行一行的算式
- 製作成表格
:::

## while
這種迴圈結構較簡單，只有一個執行條件  
先判斷是否符合條件，符合的話才執行程式碼，執行後後再判斷要不要執行下一次  
用於不確定執行次數的迴圈  

<ImageFigure
  src="/images/ch5/while_alive.png"
  alt="while 迴圈範例"
  title="while 迴圈範例"
>while 迴圈範例</ImageFigure>

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
let input = ''
let count = 0
while (input !== '123') {
  input = prompt('123')
  count++
}
document.write(`輸入了${count}次`)
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

```js
let input = ''
let count = 0
do {
  input = prompt('123')
  count++
} while (input !== '123')
```

## 比較
- `for` 適合固定次數的迴圈
- `while` 適合不確定次數的迴圈
- `do while` 適合不確定次數，且至少執行一次的迴圈

<ImageFigure
  src="/images/ch5/while.jpg"
  alt="while 與 do while 差異"
  title="while 與 do while 差異"
>while 與 do while 差異</ImageFigure>

## break 與 continue
- `break` 打斷迴圈的執行
- `continue` 略過一次執行  

```js
// 當 i 等於 5 時，跳過這次迴圈
for(let i = 0; i < 10; i++) {
  if(i === 5) {
    continue;
  }
  document.write(i);
}
```
```js
for (let i = 1; i < 10; i++) {
  if (i === 5) break
  document.write(i + '<br>')
}
```

:::danger 注意
多層迴圈時，`break` 與 `continue` 只會影響出現語法的那層迴圈  
需要對迴圈命名，才能控制到指定的迴圈
```js
for (let i = 1; i <= 5; i++) {
  for (let j = 1; j <= 5; j++) {
    // 多層迴圈時 continue 只會影響出現語法的那層迴圈
    // continue 會直接跳到 j++ 後進下一次 j 迴圈
    if (i === 2) continue
    document.write(`${i}x${j}=${i*j}<br>`)
  }
}

// 將外層迴圈命名為 loop1
// 將內層迴圈命名為 loop2
loop1: for (let i = 1; i <= 5; i++) {
  loop2: for (let j = 1; j <= 5; j++) {
    // 指定對 loop1 迴圈 continue
    // continue 會直接跳到 i++ 後進下一次 i 迴圈
    if (i === 2) continue loop1
    console.log(`${i}, ${j}`)
  }
}
```
:::

## 綜合練習
:::warning 練習
試試看自己寫一個猜數字遊戲，並加入太大、太小等提示訊息
:::

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

:::warning 練習
有四個數字，分別為 1、2、3、4  
請使用這四個數字組成數字不重複的三位數  

```
1 2 3
1 2 4
1 3 2
1 3 4
1 4 2
1 4 3
...
```
:::

:::warning 練習
使用者能用 `prompt()` 輸入層數  
印出下面格式的數字圖案
```
1
2 4
3 6 9
4 8 12 16
5 10 15 20 25
6 12 18 24 30 36
7 14 21 28 35 42 49
8 16 24 32 40 48 56 64
9 18 27 36 45 54 63 72 81
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
使用者能用 `prompt()` 輸入一個數字  
印出到該數字的費氏數列
```js
// 如果輸入 22
0 1 1 2 3 5 8 13 21
```
:::
