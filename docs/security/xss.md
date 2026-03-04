# XSS
XSS (Cross-Site Scripting) 指的是攻擊者在網站植入惡意程式碼的攻擊手段

## 反射型 XSS
後端或前端將 URL 參數直接當作 HTML 渲染，攻擊者在正常的網址後面放入 JavaScript 程式碼，讓使用者點擊後觸發  
網址通常看起來不正常，所以可能會利用短網址服務偽裝  
```
// 在網址藏入 JavaScript 碼
http://example.com/?keyword=<script>alert(1);</script>

// 避免特殊符號產生問題，通常會使用 encodeURI() 轉換，變成
http://example.com/?keyword=%3Cscript%3Ealert(1);%3C/script%3E
```
網頁顯示時如果沒有經過處理，就可能會遭受攻擊
```html
<!-- {{ }} 會以文字顯示變數，script 標籤會變成文字 -->
<p>您搜尋的關鍵字是：{{ $route.query.keyword }}</p>
<!-- 直接放入 HTML，就會執行到 script -->
<div v-html="$route.query.keyword"></div>
```

## 儲存型 XSS
惡意程式碼被保存進資料庫中，就能攻擊下一位看到人使用者  
如部落格、留言板等提供 HTML 輸入的功能，攻擊者輸入帶有行內事件的程式碼  
```html
<img src="#" onerror="alert(123)">
```
使用 [sanitize-html](https://www.npmjs.com/package/sanitize-html) 處理使用者輸入的內容，就能過濾掉有問題的 HTML  
```js
import sanitizeHtml from 'sanitize-html';

console.log(sanitizeHtml("<strong>hello world</strong>"));            // ok
console.log(sanitizeHtml("<img src=x onerror=alert('img') />"));      // x
console.log(sanitizeHtml("console.log('hello world')"));              // ok
console.log(sanitizeHtml("<script>alert('hello world')</script>"));   // x
```

:::danger 注意
建議前後端都需要執行 HTML 消毒
:::
