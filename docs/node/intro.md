# 認識 Node.js

認識 Node.js

## 介紹
Node.js 是一個可以讓 JavaScript 伺服器執行環境  
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
- `npm install` 安裝專案的所有套件
- `npm install <套件名稱>` 安裝指定套件
- `npm uninstall <套件名稱>` 移除指定套件
- `npm run <指令>` 執行 `package.json` 裡面的指令

Node.js 還有其他的套件管理工具，使用指令 `corepeack enable` 就可以啟用
- [yarn](https://yarnpkg.com/) 由 Facebook 開發的套件管理工具
- [pnpm](https://pnpm.io/zh-TW/) 速度快、節省空間的套件管理工具

:::tip TIP
課程使用目前較普及的 npm，如果同學想使用其他套件管理工具也可以，但指令可能會有些許不同  
:::

## 檔案結構
- `node_modules` 資料夾存放這個專案用到的所有套件
- `package.json` 記錄了這個 Node.js 專案的資訊
- `package-lock.json` 記錄了所有套件的版本資訊，確保每次安裝的版本都是一樣的  

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

:::tip TIP
`package-lock.json` 是 npm 專用檔案，使用其他套件管理工具時會產生不同的檔案
- yarn 會產生 `yarn.lock` 檔案
- pnpm 會產生 `pnpm-lock.yaml` 檔案
- bun 會產生 `bun.lockb` 檔案
:::

## 執行
使用 `node 檔案` 執行
```bash
node test.js
```