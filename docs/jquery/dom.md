# jQuery - DOM

## 抓取
使用 `$(選擇器)` 抓取元素
- `.length` 取到的元素數量
- `.eq(索引)` 指定取到的第幾個元素
- `.index()` 取得元素是同一層的第幾個
- `.each(function)` 迴圈每個元素
  - `index` 迴圈到的索引
  - `element` 迴圈到的元素，也可以用 `this` 代表
- `.filter(選擇器)` 篩選符合條件的元素
- `.not(選擇器)` 篩選不符合條件的元素
- `.find(選擇器)` 在所有下層找符合指定選擇器的元素
- `.children(選擇器)` 在下一層找符合指定選擇器的元素，不填就是所有
- `.prev(選擇器)` 同一層前一個，可以用選擇器過濾，不填就是所有
- `.prevAll(選擇器)` 同一層前面所有，可以用選擇器過濾，不填就是所有
- `.prevUntil(選擇器)` 同一層前面直到選擇器間的東西，不含頭尾
- `.next(選擇器)` 同一層後一個，可以用選擇器過濾，不填就是所有
- `.nextAll(選擇器)` 同一層後面所有，可以用選擇器過濾，不填就是所有
- `.nextUntil(選擇器)` 同一層後面直到選擇器間的東西，不含頭尾
- `.siblings()` 同一層的其他東西
- `.parent()` 上一層，可以用選擇器過濾
- `.parents()` 所有上層，可以用選擇器過濾
- `.parentsUntil(選擇器)` 往上層找直到選擇器間的東西
- `.closest(選擇器)` 上層第一個符合選擇器的元素

:::danger 注意
指定第幾個元素一定要使用 `.eq()`，不要直接用 `[索引]`  
使用 `[索引]` 會變成原生 JS 的 DOM 元素
```js
console.log($('div')[0].innerText)
console.log($('div').eq(0).text())
```
:::

:::danger 注意
jquery 函式內的 function 盡量不要使用箭頭函式  
因為可以使用 `$(this)` 代表迴圈到的元素或發生事件的元素
:::

```js
// 第三個 h1
$("h1").eq(2)

// 第一個 .class
$(".class").eq(0)

// #id
$("#id")

// .index() 取得元素是同一層的第幾個
$('.card').index()

// .each() 迴圈每個元素
$('div').each(function(index, element){
  console.log(index, element, $(this))
})

// .filter() 篩選符合條件的元素
$('div').filter('.card')

// .not() 篩選不符合條件的元素
$('a').not('.nav')

// .find() 在裡面找符合指定選擇器的元素
$("#target").find("div").eq(2)

// .children() 在下一層找符合指定選擇器的元素
$("#target").children(".card")

// .prev() 同一層前一個
$('#target').prev()
// .prevAll() 同一層前面所有
$('#target').prevAll()
// .prevUntil() 同一層前面直到選擇器間的東西
$('#target').prevUntil('#target2')

// .next() 同一層後一個
$('#target').next()
// .nextAll() 同一層後面所有
$('#target').nextAll()
// .nextUntil() 同一層後面直到選擇器間的東西
$('#target').nextUntil('#target2')

// .siblings() 同一層的其他東西
$('#target').siblings()

// .parent() 上一層
$("#target").parent()
// .parents() 所有上層
$("#target").parents()
// .parentsUntil() 往上層找直到選擇器間的東西
$("#target").parentsUntil("#target2")
// .closest() 選擇器篩選出來最近的一個
$("#target").closest("div")
```

## 修改
- `.text()` 文字
- `.html()` HTML
- `.val()` 輸入欄位的值
- `.attr()` 標籤屬性
- `.css()` 行內樣式
- `.addClass()` 新增 class
- `.removeClass()` 移除 class
- `.hasClass()` 是否有 class
- `.prepend()` 裡面的第一個東西前插入 html
- `.append()` 裡面的最後一個東西後插入 html
- `.insertBefore(元素或HTML)` 把東西放到指定的前面，填現有的元素是移動，HTML 是新增
- `.insertAfter(元素或HTML)` 把東西放到指定的後面，填現有的元素是移動，HTML 是新增
- `.remove()` 刪除元素

:::tip TIP
jQuery 可以一次對選擇到的元素做修改，不需要使用迴圈
```js
$('li').each(function() {
  $(this).addClass('text-red');
});

$('li').addClass('text-red');
```
:::

```js
// .text() 取得文字
console.log( $('h1').eq(0).text() )
// .text() 修改文字
$('h1').eq(1).text('Hi');

// .html() 取得 HTML
console.log( $('h1').eq(2).html() )
// .html() 修改 HTML
$('h1').eq(2).html('<a href="https://google.com">Google</a>');

// .val() 取得輸入欄位的值
console.log( $('#input-password').val() )
// .val() 修改輸入欄位的值
$('#input-password').val('Hello')

// .attr() 取得標籤屬性
console.log( $('#img').attr('src') )
// .attr() 修改標籤屬性
$('#img').attr('src', 'picsum.jpg')

// .css() 取得行內樣式
console.log( $('h1').css('color') )
// .css() 修改行內樣式
$('h1').css('color', 'red')
// .css() 修改多個行內樣式
$('h1').css({ 'color': 'red', 'font-size': '50px' })

// .addClass() 新增 class
$('h1').eq(0).addClass('blue big');
// .removeClass() 移除 class
$('h1').eq(0).removeClass('blue');
// .hasClass() 是否有 class
$('h1').eq(0).hasClass('blue big');

// .prepend() 裡面的第一個東西前插入 html
$("#target").prepend("<p>前面新的</p>")
// .append() 裡面的最後一個東西後插入 html
$("#target").append("<p>後面新的</p>")
// .insertBefore() 把東西放到指定的前面
$('<p>前面</p>').insertBefore('#target')
// .insertAfter() 把東西放到指定的後面
$('<p>後面</p>').insertAfter('#target')

// .remove() 刪除元素
$('#target').remove()
```

## 事件
- 部分常用事件已經有對應的函式
  - `.click()`
  - `.submit()`
  - `.mouseenter()`
  - `.mouseleave()`
  - `.mousemove()`
- 其他事件需使用 `.on()` 綁定

:::danger 注意
jQuery 3.0 以後，[load event](https://api.jquery.com/load-event/) 移除了直接使用 `load()` 函式的形式

新的 [`load()`](https://api.jquery.com/load/) 函式改成載入一段 HTML 並插入到指定元素中
:::

```js
// 使用事件的函式
// .事件名稱(function(){})
// 有 function 是事件處理，沒有則是觸發事件 
// 只有部分常用事件有這種寫法
$('#mybtn').click(function(){});

// 使用 .on()
// .on(事件名稱, function(){})
$('#mybtn').on('click', function(){
  alert('你好棒');
})
```

## 綜合練習
:::warning 練習
點按鈕換圖片
- 原本圖片是科技高中校長
- 點按鈕後換成書曼
- 再點一下換成校長
:::

:::warning 練習
製作待辦清單
- 一個文字輸入欄位，一個新增按鈕和一個清單
- 在欄位輸入文字後，點按鈕會將輸入欄位的字新增到清單
- 每一項都有刪除按鈕，點擊時可以刪除那個按鈕的項目
:::

:::warning 練習  
製作丙級第二題健康天地標籤面板，點按鈕時切換顯示內容  
可能會用到函式:
- `.show()` 顯示div
- `.hide()` 隱藏div

兩種做法:
1. 點按鈕換文字
2. 四個div，點按鈕換顯示的div
:::