# CSRF
CSRF (Cross-Site Request Forgery) 是欺騙使用者在信任網站進行非預期操作

## 攻擊方式
:::tip TIP
CSRF 是針對 cookie 和 session 的攻擊方式  
課程範例架構是前後端分離 + JWT 認證，所以不需要進行 CSRF 防護
:::
1. 使用者進入登入的安全網站 `bank.com`
2. 瀏覽器保存 cookie 驗證資訊，下次來不用重新登入，且之後瀏覽時都會帶上
3. 在未登出的狀況下，進入在惡意網站
4. 惡意網站可能有一張圖片
   ```html
   <img src="bank.com/transfer?to=hacker&amount=10000" style="display:none">
   ```
5. 瀏覽器讀取圖片，發送請求
6. 由於目標是 `bank.com`，所以點連結時會瀏覽器會自動帶入 cookie
7. 轉帳成功

## 防護措施
- Origin: 後端檢查 origin，判斷是不是從自己的網站發出的請求，使用 [cors](https://npmx.dev/package/cors)
  ```js
  import cors from 'cors'
  app.use(
    cors({
      // ogirin: 來源
      // ocallback(錯誤, 是否允許通過)
      origin: (origin, callback) => {
        if (!origin || ['http://localhost:3000', 'http://127.0.0.1:3000'].includes(origin)) {
          callback(null, true)
          return
        }
        callback(new Error('NOT ALLOWED'))
      },
      // 前後端不同網域時，需要允許在跨網域請求攜帶 cookie
      credentials: true,
    }),
  )
  ```
- SameSite=Strict: 設定 cookie 自動帶入方式，只有從第一方網站瀏覽時才自動帶入
- CSRF Token 表單驗證:
  1. 使用者登入後，後端產生 session
  2. 進入表單頁面時，後端產生一個 token，存入 session
  3. 伺服器將 token 傳給前端，通常會放在 `<input type="hidden">`
  4. 送出表單時，前端將 token 傳送給後端
  5. 後端驗證 session 保存的 token 是否和前端傳入的一致
