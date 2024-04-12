# LINE 機器人

使用 Node.js 製作一個查詢開放資料的 LINE 機器人  

## 架構
<img src="/images/ch21/webhook.png" height="400" style="margin: 10px 0;">

## 前置作業
- 到 [LINE Developers](https://developers.line.me/) 註冊開發帳號
- 建立 Provider，CHANNEL 選擇 `Messaging API`
- 填寫機器人帳號資訊
- 關閉自動回覆訊息

## nodemon
[nodemon](https://www.npmjs.com/package/nodemon) 套件能在檔案存檔時自動重啟  
只需要在 `package.json` 將啟動的 node 改成 nodemon 就好  
```json
"scripts": {
  // 開發用指令，自動重新啟動
  "dev": "nodemon index.js",
  // 正式環境用指令，雲端服務不需要自動重新啟動
  "start": "node index.js"
}
```

## dotenv
使用 [dotenv](https://www.npmjs.com/package/dotenv) 套件能讓 Node.js 讀取環境設定檔 `.env`  
將 LINE 機器人的 ID 等資訊寫入環境設定檔，避免上傳 Github 時洩漏資訊  

- 建立 `.env` 檔並輸入環境設定
  ```ini
  CHANNEL_ID=""
  CHANNEL_SECRET=""
  CHANNEL_ACCESS_TOKEN=""
  ```
- 在 Node.js 內引用套件
  ```js
  import 'dotenv/config'
  ```
- 以 `process.env.變數名稱` 使用環境變數

## linebot
[linebot](https://www.npmjs.com/package/linebot) 能以比官方工具簡單的語法製作 LINE 機器人  
詳細的訊息事件可以參考 [LINE 文件](https://developers.line.biz/en/reference/messaging-api/#message-event)
```js
// 引用套件
import linebot from 'linebot'

// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 當收到訊息時，event 包含了訊息的類型、文字等
bot.on('message', event => {
  // event.message.text 為使用者傳送的文字
  let text = event.message.text
  // event.reply 為回覆訊息
  event.reply(event.message.text)
});

// 設定機器人監聽 port
bot.listen('/', process.env.PORT || 3000);
```

## fs
`fs` 為 Node.js 預設套件，不需要安裝，能讀寫檔案  
使用這個套件將複雜的訊息印成檔案，方便除錯  
```js
import fs from 'fs'

fs.writeFileSync('./flex.json', JSON.stringify(flex, null, 2))
```

## ESLint
[ESLint](https://eslint.org/) 程式碼分析工具，能發現並修復程式碼中的問題，還能強制規範程式碼風格  
安裝套件後再安裝 [VSCode 擴充功能](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)，可以存檔時自動格式化程式碼  
```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```

## 部署
- 註冊 [Render](https://render.com/) 帳號，建立新的 Web Service
- 建立時打開 `Advanced`，或建立後在 `Environment` 的 `Environment Variable` 輸入機器人 TOKEN 等環境變數，不須輸入 PORT

:::warning 期中作業
製作一個查詢公開資料的 LINE 機器人，並部署到 Render  
參考範例: [isthereanydeal 遊戲查價機器人](https://github.com/rogeraabbccdd/Linebot-Deals)  
<img src="https://raw.githubusercontent.com/rogeraabbccdd/Linebot-Deals/master/preview.png" height="400" style="margin: 10px 0;">  
:::