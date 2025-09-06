# 認識 Node.js

認識 Node.js

## 介紹
[Node.js](https://nodejs.org/zh-tw) 是一個可以讓 JavaScript 伺服器執行環境  
其他類似的有  
- [Deno](https://deno.com/) Node.js 創始人開發的新環境，以改善 Node.js 的缺點
- [Bun](https://bun.sh/) 目前性能最好的 JavaScript 伺服器環境

:::tip TIP
課程使用目前仍是主流的 Node.js，但未來可能會改用 Bun
:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/M3BM9TB-8yA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## nvm
nvm 是 Node.js 的管理工具，可以在一台電腦安裝許多個 Node.js 版本  
這樣可以避免不同專案使用不同版本的 Node.js 時，造成的相容性問題  
- [Mac/Linux](https://github.com/nvm-sh/nvm) 
- [Windows](https://github.com/coreybutler/nvm-windows)

## npm
npm 是 Node.js 的預設的套件管理工具，可以用來安裝、管理、移除 Node.js 的套件  
以下是常用的指令
- `npm init` 初始化專案，產生 `package.json` 和 `package-lock.json`
- `npm i` 安裝專案的所有套件
- `npm i <套件名稱>` 安裝指定套件
- `npm un <套件名稱>` 移除指定套件
- `npm run <指令>` 執行 `package.json` 裡面的指令

:::tip TIP
課程使用目前較普及的 npm，還有其他的套件管理工具，每個工具的指令都不太一樣
- [yarn](https://yarnpkg.com/) 由 Facebook 開發的套件管理工具，Node.js 環境以 `corepack enable` 啟用
- [pnpm](https://pnpm.io/zh-TW/) 速度快、節省空間的套件管理工具，Node.js 環境以 `corepack enable` 啟用
- [bun](https://bun.sh/) Bun 內建套件管理功能
:::

## 檔案結構
- `node_modules` 資料夾存放這個專案用到的所有套件，必使用 `.gitignore` 忽略
- `package.json` 記錄了這個 Node.js 專案的資訊，版本、使用套件等

:::tip TIP
每個套件管理工具都有一個 lock 檔案，記錄使用套件的所有相依套件和版本，確保每次安裝的套件版本都一樣
- npm 會產生 `package-lock.json`
- yarn 會產生 `yarn.lock`
- pnpm 會產生 `pnpm-lock.yaml`
- bun 會產生 `bun.lockb` (1.2 以前) 或 `bun.lock`
:::

```json
{
  // 專案使用 ECMAScript 語法
  "type": "module",
  // 專案名稱
  "name": "test",
  // 版本
  "version": "1.0.0",
  // 說明
  "description": "",
  // 切入點，編寫套件給別人引用時才需要
  "main": "index.js",
  // npm 指令
  "scripts": {
    "start": "node index.js"
  },
  // 作者
  "author": "",
  // 版權
  "license": "ISC",
  // 使用套件
  "dependencies": {
  },
  // 開發環境使用套件
  "devDependencies": {
  }
}
```
在專案的資料夾使用 `npm init` 初始化專案時會自動產生  

## 執行
```bash
node test.js
```