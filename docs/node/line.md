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
環境設定檔可以在不同環境使用不同的設定，例如本機和雲端用的機器人帳號可能不一樣

:::danger 注意
- 不要將機密資訊寫在程式碼裡面
- 在 `.gitignore` 忽略 `.env` 檔，避免將機密資訊上傳到 GitHub
:::

- 建立 `.env` 檔並輸入環境設定
  ```ini
  # 機器人帳號資訊
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

:::danger 注意
設定機器人監聽 port 時，必須使用 `process.env.PORT`  
通常雲端服務會自動分配 port，並以環境變數 `PORT` 提供給程式使用  
某些雲端服務指定 port 時可能會造成程式無法啟動  
:::

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
bot.on('message', async event => {
  // 印出訊息內容
  console.log(event)
   // 回覆
  const result = await event.reply('Hello World!')
  // 印出回覆結果
  // 如果有 message，代表回覆出錯，message 為錯誤訊息
  console.log(result)
  console.log(result.message)
});

// 設定機器人監聽 port
bot.listen('/', process.env.PORT || 3000);
```

## fs
`fs` 為 Node.js 預設套件，不需要安裝，能讀寫檔案  
使用這個套件將複雜的 [Flex](https://developers.line.biz/flex-simulator/) 訊息印成檔案，方便除錯  
```js
import fs from 'fs'

fs.writeFileSync('./flex.json', JSON.stringify(flex, null, 2))
```

## ESLint & Prettier
[ESLint](https://eslint.org/) 能發現並修復程式碼中的格式問題，[Prettier](https://prettier.io/) 能統一排版風格

- 初始化 ESLint
   ```bash
   npm init @eslint/config@latest
   ```
- 安裝 [ESLint VSCode 擴充功能](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)  
- 在 VSCode 設定 `settings.json` 開啟存檔自動修復
   ```json
   "editor.codeActionsOnSave": {
     "source.fixAll.eslint": true
   },
   ```
- 安裝 [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
   ```bash
   npm i -D eslint-config-prettier eslint-plugin-prettier prettier
   ```
- 安裝 [Prettier VSCode 擴充功能](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- 建立 `.prettierrc`，依需求調整 Prettier 設定
   ```json
   {
     "$schema": "https://json.schemastore.org/prettierrc",
     "printWidth": 100,
     "semi": false,
     "singleQuote": true
   }
   ```

## 部署
- 註冊 [Render](https://render.com/) 帳號，建立新的 Web Service
- 建立時打開 `Advanced`，或建立後在 `Environment` 的 `Environment Variable` 輸入機器人 TOKEN 等環境變數，不須輸入 PORT

:::warning 期中作業
製作一個查詢公開資料的 LINE 機器人，並部署到 Render  
參考範例: [isthereanydeal 遊戲查價機器人](https://github.com/rogeraabbccdd/Linebot-Deals)  
<img src="https://raw.githubusercontent.com/rogeraabbccdd/Linebot-Deals/master/preview.png" height="400" style="margin: 10px 0;">  
:::

## AI 工具
- [LINE Bot MCP Server](https://github.com/line/line-bot-mcp-server)