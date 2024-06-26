# HTTP 請求與 AJAX

AJAX 是一種非同步的技術，讓網頁不重新整理就可以跟伺服器交換資料  

## HTTP 請求
以上網瀏覽網頁為例，HTTP 請求如圖
<img src="/images/ch18/request.gif" height="400" style="margin: 10px 0;">  

### Request Line
Request Line 為請求的方式及目標網址  
常見的請求方式有：
- `GET`: 讀取資源
- `PATCH`: 更新部分資源欄位
- `PUT`: 更新全部資源欄位
- `DELETE`: 刪除資源
- `POST`: 新增資源

以上四種方式分別對應遠端伺服器資料庫的增改刪查動作，也就是 `RESTful API`  

:::danger 注意
HTML 的 form 標籤只支援 GET 和 POST
:::

### Status Line
Status Line 為請求的狀態資訊，也就是 HTTP 狀態碼  

HTTP 狀態碼大致分為下列幾種  
- `1xx` Informational 參考資訊
- `2xx` Successful 成功
- `3xx` Redirection 重新導向
- `4xx` Client Error 用戶端錯誤
- `5xx` Server Error 伺服器錯誤

常見的 HTTP 狀態碼有：
- `100`: 請求中
- `200`: 成功
- `404`: 找不到

### Header
Header 為資料的設定，比較重要的設定有：  
- `Content-Type` 資料類型
- `User-Agent` 瀏覽器識別

### Body
Body 則為資料的內容  

:::danger 注意
GET 沒有 Body，因為 GET 用 URL 傳遞資料
:::

## AJAX
AJAX 技術是在不重新整理網頁的情況下，發送 HTTP REQUEST  
與後端伺服器資料交換後，可以透過 DOM 操作更新網頁內容  
因為網頁沒有重新整理，減少了讀取時間，在瀏覽網頁時的使用者體驗會比一般網頁好  
下面是幾個 AJAX 的應用範例  

- Google 搜尋依輸入文字顯示搜尋建議
- YouTube、Facebook 不會重新載入網頁
- [訂便當](https://dinbendon.kento520.tw/) 登入後跳出成功或失敗動畫

基於安全性問題，大多數的伺服器都有設置跨網域防護 (CORS)  
想像一下，如果你在瀏覽 Facebook 時，網站內的 JavaScript 能取得你的蝦皮訂單會是怎麼樣的情況  
以下範例皆為瀏覽器 JavaScript 使用的 AJAX  
以沒有擋 CORS 的 kktix API 為範例  

### XMLHttpRequest
最早的 JavaScript AJAX 是 XMLHttpRequest (XHR)
```js
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://kktix.com/events.json')
xhr.onload = () => {
  console.log(xhr.responseText);
}
xhr.onerror = (err) => {
  console.log(err);
}
xhr.send();
```

### Fetch API
Fetch 是近年來號稱要取代XHR的新技術標準
```js
fetch('https://kktix.com/events.json', { method: 'GET' })
  .then(response => {
    // 可以透過 .blob(), .json(), .text() 轉成可用的資訊
    return response.json();
  })
  // 成功執行的 function
  .then(json => {
    console.log(json);
  })
  // 錯誤時執行的 function
  .catch(error => {
    console.log(error);
  })
  // 不管成功失敗都執行
  .finally(() => {
    console.log('final');
  })     
```

### jQuery AJAX
作為 JavaScript 函式庫的 jQuery 也有自己的 AJAX 函式
```js
$.ajax({
  url: 'https://kktix.com/events.json',
  type: 'GET',
  // 返回的檔案格式是 json
  dataType: 'json'
  // 成功執行的 function
  success: function(response) {
    console.log(response);
  }
  // 錯誤時執行的 function
  error: function(xhr, ajaxOptions, thrownError) {
    console.log(xhr.status);
    console.log(xhr.responseText);
    console.log(thrownError)
  }
  // 不管成功或失敗都會執行
  complete: function() {
    console.log("完成")
  }
})

$.ajax({
    url: 'https://kktix.com/events.json',
    type: 'GET',
  })
  // 成功執行的 function
  .done(function(response){
    console.log(response);
  })
  // 錯誤時執行的 function
  .fail(function(error){
    console.log(error.status);
    console.log(error.responseText);
  })
  // 不管成功或失敗都會執行
  .always(function(){
  console.log("完成");
  })

$.get('https://kktix.com/events.json', function(response){
  console.log(response);
}, "json")

$.get('https://kktix.com/events.json')
  .then(function(response){
    console.log(response);
  }, function(error){
    console.log(error.status);
    console.log(error.responseText);
  })
```

### axios
[axios](https://github.com/axios/axios) 是最近相當熱門的 AJAX 套件，也是 Vue 官方推薦的 AJAX 套件  
```js
axios.get('https://kktix.com/events.json')
  .then(response => {
    // 成功
    console.log(response);
  })
  .catch(error => {
    // 失敗
    console.log(error);
  })
  .then(() => {
    // 不管成功失敗都執行
    console.log('請求結束');
  });
```

:::warning 練習
以上面任一種方式連接 kktix API，並用表格顯示資料  
:::