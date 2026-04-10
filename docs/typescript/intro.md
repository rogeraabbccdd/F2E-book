# TypeScript 介紹
TypeScript 是加上型別定義後的 JavaScript

## 安裝
使用指令安裝 TypeScript
```bash
npm install -D typescript
```
使用指令產生設定檔 tsconfig.json
```bash
npx tsc --init
```

## 一般設定
初始化完成後，會有非常多預設設定，也有一些預設是註解掉的，可以依需求開啟  
更多設定說明參考: [TypeScript 編譯配置 tsconfig.json compilerOptions 全解析](https://notes.boshkuo.com/docs/TypeScript/compilerOptions)
```json
{
  // 編譯設定
  "compilerOptions": {
    // 程式碼根目錄
    "rootDir": "./src",
    // 編譯輸出目錄
    "outDir": "./dist",

    // 模組設定，參考下方說明
    "module": "nodenext", 
    "target": "esnext", 
    // 使 TypeScript 能夠更好地與 CommonJS 模組兼容, 允許以 ES 模組方式導入 CommonJS 模組
    "esModuleInterop": true,
    // 包含的型別定義檔，預設自動包含所有 @types 開頭的套件
    "types": [],
    // 應該包含哪些內建的型別定義，如 dom 為網頁用的 document 型別
    "lib": [],

    // 產生對應的 .map 檔案，能將編譯後的 JavaScript 對應回 TypeScript 程式碼
    "sourceMap": true,
    // 產生 .d.ts 類型定義檔案
    "declaration": true,
    // 產生 .d.ts.map 檔案
    "declarationMap": true,

    // 是否會給不確定的索引取值加上 undefined
    // 舉例參考: https://github.com/hacker0limbo/my-blog/issues/21
    "noUncheckedIndexedAccess": true,
    // 是否允許給可選屬性 undefined 值，設定為 true 為不允許
    "exactOptionalPropertyTypes": true,

    // Style Options
    // 是否在 function 的碼路徑未明確返回值時報錯。
    "noImplicitReturns": true,
    // 設定是否要求在覆蓋基類方法時必須明確使用 override 關鍵字。
    "noImplicitOverride": true,
    // 有未使用的變數時是否出錯
    "noUnusedLocals": true,
    // 有未使用的 function 參數時是否出錯
    "noUnusedParameters": true,
    // 是否不允許 switch case 穿透
    "noFallthroughCasesInSwitch": true,
    // 控制物件 key 的存取方式
    "noPropertyAccessFromIndexSignature": true,
    // 嚴格模式，建議開啟
    "strict": true,
    // 控制 TypeScript 編譯前後 module 語法是否保持一致
    "verbatimModuleSyntax": false,
    // 每個檔案將被獨立編譯
    "isolatedModules": true,
    // 只有 "import xxx" 沒給值的副作用會檢查是否有效，無效時拋出錯誤
    // https://www.51cto.com/article/793699.html
    "noUncheckedSideEffectImports": true,
    // 控制 TypeScript 如何判斷檔案是純程式碼腳本還是模組
    // 設置為 force 使 TypeScript 將所有檔案視為模組, 避免了使用全域變數引起的錯誤
    "moduleDetection": "force",
    // 跳過對 .d.ts 的型別檢查
    "skipLibCheck": true,
  },
  // 編譯 src 資料夾內的檔案
  "include": ["src"],
  // 排除 node_modules
  "exclude": ["node_modules"],
}
```

## 模組設定
TypeScript 編譯的模組設定大致分為幾種:
- `module`: 編譯後 JS 的模組系統
  - `commonjs`: require
  - `esnext`: import/export
  - `nodenext`: 根據 package.json 內的 type 自動決定
- `target`: 產生出的 JS 語法版本，與模組系統無關
  - 決定是否保留箭頭函數等 JS 新語法
  - 常用 `esnext`
- `verbatimModuleSyntax`: 控制 TypeScript 編譯前後 module 語法是否保持一致
  - `true`: import/export 不會被 TypeScript 轉成 require
  - `false`: 預設，允許轉換

:::tip TIP
CommonJS 仍然是基於 ECMAScript 語法，只是匯入匯出不一樣  
所以才會出現 module 是 commonjs，target 卻是 esnext 的情況
:::

Node.js 開發環境設定範例
```json
"compilerOptions": {
  "module": "nodenext",
  "target": "esnext",
  "verbatimModuleSyntax": false
}
```

## 執行
Node.js 沒有完整支援 TypeScript，需要依賴 [ts-node](https://typestrong.org/ts-node/) 或 [tsx](https://tsx.is/) 等套件執行

:::tip TIP
Node.js v22.18.0 後的版本，加入了執行 TypeScript 的實驗性功能
- [Running TypeScript Natively](https://nodejs.org/zh-tw/learn/typescript/run-natively)
- [The --erasableSyntaxOnly Option](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/#the---erasablesyntaxonly-option)
:::

:::tip TIP
[Bun](https://bun.sh/) 可以直接執行 TypeScript
:::

如果需要檔案存檔時自動重啟，一樣可以使用 [nodemon](https://npmx.dev/package/nodemon)  
nodemon 預設以 ts-node 執行 TypeScript  

```bash
npm i -D ts-node nodemon
```

指定 nodemon 執行 `.ts` 檔
```json
"scripts": {
  "dev": "nodemon src/index.ts",
}
```

:::danger 注意
ts-node 只會解析被 import 的檔案，如果是 `.d.ts` 等不需要引用的型別宣告會被忽略  
需要在 `tsconfig.json` 加上設定才不會出現型別錯誤
- [files 選項說明](https://typestrong.org/ts-node/docs/options/#files)
- [型別錯誤說明](https://typestrong.org/ts-node/docs/troubleshooting/#missing-types)
```json
{
  "compilerOptions": {
    // TypeScript 設定
  },
  "ts-node": {
    "files": true
  }
}
```
:::

## 編譯部署
使用 `tsc` 指令，將 TypeScript 編譯成 JavaScript 後部署執行  
```json
{
  "scripts": {
    // 先編譯成 JavaScript
    "build": "tsc",
    // 編譯完成後，執行編譯出的檔案
    "start": "node dist/index.js"
  }
}
```
