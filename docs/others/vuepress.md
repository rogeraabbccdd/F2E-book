# VuePress 網站
使用 VuePress ，將 Markdown 筆記做成網站

## 安裝
使用 `npm crreate vuepress 網站名稱` 建立網站，依序選擇設定  
- `Select the boilerplate type` 網站類型，`docs` 或是 `blog`
- `What's the name of your project?` 網站名稱
- `What's the description of your project? ` 網站說明
- `What's your email?` 信箱
- `What's your name?` 作者名
- `What's the repo of your project.` GitHub Repo

## 檔案結構
主要檔案結構  
```
.
├── docs
│   ├── .vuepress (VuePress 相關檔案)
│   │   ├── components (自訂元件)
│   │   ├── theme (主題檔案)
│   │   │   └── ...
│   │   ├── public (靜態資源)
│   │   ├── styles (樣式)
│   │   │   ├── index.styl (自動引入樣式)
│   │   │   └── palette.styl (主題顏色樣式)
│   │   ├── config.js (網站設定)
│   │   └── enhanceApp.js (自訂網站 JS)
│   │ 
│   └── README.md (首頁)
│
├── package.json
├── .gitignore
└── README.md
```

## 網站設定
:::danger 注意
設定可能會因主題而異
:::
`docs/.vuepress/config.js` 設定 VuePress 網站
```js
module.exports = {
  // 網站標題
  title: 'Vuepress Docs Boilerplate',
  // 網站說明
  description: description,
  // HEAD 設定
  head: [
    // [ 標籤名, { 屬性: 值, ... }]
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  // 主題設定，可能因網站主題而異
  themeConfig: {
    // 導覽列
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Config',
        link: '/config/'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    // 側邊欄
    sidebar: [
      // 群組
      {
        // 標題
        title: 'Group 1',
        // docs 內的資料夾
        path: '/foo/',
        // 可否摺疊
        collapsable: false,
        // 內頁檔名，/ 代表 README.md
        children: [
          '/'
        ]
      },
      
    ]
  },
  // 插件，可以在 npm 使用 vuepress-plugin 尋找
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
```

## 文章設定
:::danger 注意
設定可能會因主題而異
:::
在每個文章最前面可以設定文章的標籤、分類等等  
首頁可能會有其他設定  
```markdown
---
date: 2020-07-06
tag: 
  - vue
  - vuepress
author: Kento
---
```
