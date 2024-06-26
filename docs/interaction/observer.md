# Observer

Observer 監視器，可以觀察 DOM 元素的變化，當元素變化時執行指定的 function  

## Mutation Observer
當觀察的 DOM 元素變動時會執行指定的 function  
不會立即執行，會先儲存變動記錄，等到所有變動都完成後再執行  
- 使用 `new MutationObserver(function)` 建立
  - function 內的 `mutations` 參數是一個陣列，裡面包含所有變動的紀錄
  - 變動的記錄包含的資訊
    - `type` 變動類型
    - `target` 變動的元素
    - `addedNodes` 被新增的節點
    - `removedNodes` 被移除的節點
    - `attributeName` 變動的屬性
    - `oldValue` 變動前的值
- `.observe(元素, 設定)` 使用設定觀察指定的元素
  - `childList` 是否觀察下一層元素的增減
  - `subtree` 是否觀察所有內層元素
  - `attributes` 是否觀察屬性變動
  - `characterData` 是否觀察內容變動
  - `attributeOldValue` 是否紀錄舊屬性
  - `characterDataOldValue` 是否紀錄舊內容
  - `attributeFilter` 指定觀察的屬性名稱，沒設定就是全部
- `.takeRecords()` 取得並移除已經發生但尚未處理記錄
- `.disconnect()` 停止觀察

::: demo [vanilla]
```html
<html>
  <input type="button" id="btn-mutation" value="點按鈕修改 div">
  <div id="div-mutation"></div>
</html>
<style>
  #div-mutation{
    width: 100px;
    height: 100px;
    background: black;
    color: white;
  }
</style>
<script>
  const div = document.getElementById('div-mutation')

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      // type - 變動類型
      // target - 變動的元素
      // addedNodes - 被新增的節點
      // removedNodes - 被移除的節點
      // attributeName - 變動的屬性
      // oldValue - 變動前的值
      console.log(mutation)
    }
  })

  // 設定觀察元素
  observer.observe(div, {
    // 是否觀察下一層元素
    childList: true,
    // 是否觀察所有內層
    subtree: true,
    // 是否觀察屬性變動
    attributes: true,
    // 是否觀察內容變動
    characterData: true,
    // 是否紀錄舊屬性
    attributeOldValue: true,
    // 是否紀錄舊內容
    characterDataOldValue: true,
    // 指定觀察的屬性名稱，沒設定就是全部
    // attributeFilter: ['href']
  })

  // observer.disconnect()

  const btn = document.getElementById('btn-mutation')
  btn.addEventListener('click', () => {
    div.innerText += 'a'
  })
</script>
```
:::

## Resize Observer
當觀察的 DOM 元素縮放時會觸發  
- 使用 `new ResizeObserver(function)` 建立
  - function 的 `mutations` 參數陣列，裡面包含所有變動的紀錄
    - `target` 變動的元素
    - `contentRect` 元素的寬高與座標
    - `borderBoxSize.blockSize` 元素的高度
    - `borderBoxSize.inlineSize` 元素的寬度
    - `contentBoxSize.blockSize` 元素的高度
    - `contentBoxSize.inlineSize` 元素的寬度
- `.observe(元素, 設定)` 使用設定觀察指定的元素
  - 設定以 `box` 調整觀察元素的寬高計算方式
    - `content-box` 元素的寬高不包含邊框
    - `border-box` 元素的寬高包含邊框
- `.disconnect()` 停止觀察
- `.unobserve(元素)` 停止觀察某元素

::: demo [vanilla]
```html
<html>
  <input type="button" id="btn-resize" value="點按鈕修改 div 邊框">
  <div class="div-resize" id="div-resize1"></div>
  <div class="div-resize" id="div-resize2"></div>
</html>
<style>
  .div-resize{
    width: 100px;
    height: 100px;
    background: gray;
    margin: 10px;
  }
</style>
<script>
  // 取得要觀察的元素
  const div1 = document.getElementById('div-resize1')
  const div2 = document.getElementById('div-resize2')

  // 建立一個觀察者
  // new ResizeObserver(觀察到變更時執行的 function)
  const observer = new ResizeObserver(mutations => {
    for (const mutation of mutations) {
      // target - 變動的元素
      // contentRect - 元素的寬高與座標
      // borderBoxSize.blockSize - 元素的高度
      // borderBoxSize.inlineSize - 元素的寬度
      // contentBoxSize.blockSize - 元素的高度
      // contentBoxSize.inlineSize - 元素的寬度
      console.log(mutation)
    }
  })

  // 設定觀察元素
  observer.observe(div1, {
    // 設定觀察元素的寬高計算方式 
    // content-box: 元素的寬高不包含邊框
    // border-box: 元素的寬高包含邊框
    box: 'border-box'
  })
  observer.observe(div2, {
    box: 'content-box'
  })

  // 停止觀察
  // observer.disconnect()
  // 停止觀察某元素
  // observer.unobserve(div1)

  // 修改元素，檢查是否觸發觀察者
  // 如果有一連串尺寸變動，會合併成一次紀錄，且只記錄最終結果
  const btn = document.getElementById('btn-resize')
  btn.addEventListener('click', () => {
    // 修改元素，檢查是否觸發觀察者
    div1.style.border = '10px solid black'
    div1.style.border = '10px solid black'
    div2.style.border = '10px solid black'
    div2.style.border = '10px solid black'
  })
</script>
```
:::

## Intersection Observer
當元素相交時會觸發
- 使用 `new IntersectionObserver(function, 設定)` 建立
  - function 參數
    - `entries` 是一個陣列，裡面包含所有相交的元素
    - `owner` 是 `IntersectionObserver` 的設定
  - 設定參數
    - `root` 以哪個元素為依據，預設為 null，表示以瀏覽器的可視窗口作為依據
    - `rootMargin` 計算相交時的偏移量
    - `threshold` 設定觸發的比例門檻，若設定為 0.5，則元素 50% 出現和離開就會觸發，也可以設定為陣列
- `.observe(元素)` 觀察元素
- `.disconnect()` 停止觀察
- `.unobserve(元素)` 停止觀察某元素

::: demo [vanilla]
```html
<html>
  <p id="intersection-info">isIntersecting = false</p>
  <div id="intersection-container">
    <div class="intersection-pad"></div>
    <div id="intersection-target"></div>
    <div class="intersection-pad"></div>
  </div>
</html>
<style>
  #intersection-container {
    height: 300px;
    width: 100%;
    position: relative;
    overflow-y: scroll;
    background: white;
  }
  .intersection-pad {
    height: 1500px;
    width: 100%;
  }
  #intersection-target {
    background: rgb(237, 28, 36);
    height: 100px;
    outline: 50px solid rgba(0, 0, 0, 0.2);
  }
</style>
<script>
  // 取得要觀察的元素
  const div = document.getElementById('intersection-target')
  const info = document.getElementById('intersection-info')

  // 建立一個觀察者
  // entries - 相交的元素
  // owner - IntersectionObserver 設定
  const observer = new IntersectionObserver((entries, owner) => {
    console.log(owner)
    for (const entry of entries) {
      // target - 變動的元素
      // isIntersecting - 是否與可視範圍相交
      // intersectionRatio - 相交比例，相交面積 / 目標元素面積
      // boundingClientRect - 目標元素的尺寸與座標
      // rootBounds - root 的尺寸與座標
      // intersectionRect - 相交的範圍
      // time - 相交的時間，從 IntersectionObserver 被建立的時間開始計算，單位為毫秒
      console.log(entry)
      info.innerText = 'isIntersecting = ' + entry.isIntersecting
    }
  }, {
    // 以哪個元素為依據，預設為 null，表示以瀏覽器的可視窗口作為依據
    root: null,
    // 計算相交時的偏移量
    rootMargin: "50px",
    // 設定觸發的比例門檻，若設定為 0.5，則元素 50% 出現和離開就會觸發，也可以設定為陣列
    threshold: 0.5,
  })

  // observer.disconnect()
  // observer.unobserve(div1)

  observer.observe(div)
</script>
```
:::

## 應用範例
圖片 Lazy load
::: demo [vanilla]
```html
<html>
  <div id="lazyload-container">
    <div class="lazyload-pad"></div>
    <img id="lazyload-target" src="">
    <div class="lazyload-pad"></div>
  </div>
</html>
<style>
  #lazyload-container {
    height: 300px;
    width: 100%;
    position: relative;
    overflow-y: scroll;
    background: white;
    text-align: center;
  }
  .lazyload-pad {
    height: 1500px;
    width: 100%;
  }
  #lazyload-target {
    width: 200px;
    height: 200px;
    border: 1px solid black;
  }
</style>
<script>
  const imgTarget = document.getElementById('lazyload-target')
  const observer = new IntersectionObserver((entries, owner) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        imgTarget.src = 'https://picsum.photos/200/200'
      } else {
        imgTarget.src = ''
      }
    }
  }, {
    root: null,
    rootMargin: "50px 0px 50px 0px",
    threshold: 0,
  })
  observer.observe(imgTarget)
</script>
```
:::

無限滾動 Infinite scroll
::: demo [vanilla]
```html
<html>
  <div id="infinite-container">
    <ul>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi voluptatem voluptate magni, sunt itaque assumenda ipsa odit porro, nobis ratione, quibusdam repellendus molestiae odio ipsam eum suscipit quos provident!</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi voluptatem voluptate magni, sunt itaque assumenda ipsa odit porro, nobis ratione, quibusdam repellendus molestiae odio ipsam eum suscipit quos provident!</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi voluptatem voluptate magni, sunt itaque assumenda ipsa odit porro, nobis ratione, quibusdam repellendus molestiae odio ipsam eum suscipit quos provident!</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi voluptatem voluptate magni, sunt itaque assumenda ipsa odit porro, nobis ratione, quibusdam repellendus molestiae odio ipsam eum suscipit quos provident!</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi voluptatem voluptate magni, sunt itaque assumenda ipsa odit porro, nobis ratione, quibusdam repellendus molestiae odio ipsam eum suscipit quos provident!</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi voluptatem voluptate magni, sunt itaque assumenda ipsa odit porro, nobis ratione, quibusdam repellendus molestiae odio ipsam eum suscipit quos provident!</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi voluptatem voluptate magni, sunt itaque assumenda ipsa odit porro, nobis ratione, quibusdam repellendus molestiae odio ipsam eum suscipit quos provident!</li>
    </ul>
  </div>
</html>
<style>
  #infinite-container {
    height: 300px;
    width: 100%;
    position: relative;
    overflow-y: scroll;
    background: white;
    background: gray;
    color: black;
  }
</style>
<script>
  const observer = new IntersectionObserver((entries, owner) => {
    if (entries[0].isIntersecting) {
      const html = '<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi voluptatem voluptate magni, sunt itaque assumenda ipsa odit porro, nobis ratione, quibusdam repellendus molestiae odio ipsam eum suscipit quos provident!</li>'
      document.querySelector("#infinite-container ul").innerHTML += Array(10).fill(html).join('');
      observer.unobserve(entries[0].target);
      observer.observe(document.querySelector("#infinite-container li:nth-last-child(2)"));
    }
  })
  observer.observe(document.querySelector('#infinite-container li:nth-last-child(2)'))
</script>
```
:::