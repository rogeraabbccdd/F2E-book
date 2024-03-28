import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端班課程講義",
  description: "進入 JavaScript 的世界",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '課程報名', link: 'https://wdaweb.github.io' },
    ],
    sidebar: [
      {
        text: '前言',
        items: [
          { text: '在開始之前', link: '/views/ch0' },
        ]
      },
      {
        text: '基礎 JavaScript',
        items: [
          { text: '認識 JavaScript', link: '/views/ch1' },
          { text: '變數', link: '/views/ch2' },
          { text: '運算子', link: '/views/ch3' },
          { text: '邏輯判斷式', link: '/views/ch4' },
          { text: '迴圈', link: '/views/ch5' },
          { text: '陣列與物件', link: '/views/ch6' },
          { text: 'function 與物件', link: '/views/ch7' },
          { text: '文字、陣列與數字的處理', link: '/views/ch8' },
          { text: '計時器', link: '/views/ch9' },
        ]
      },
      {
        text: 'JavaScript 網頁互動',
        items: [
          { text: '操作 BOM 與 DOM', link: '/views/ch10' },
          { text: '日期和時鐘', link: '/views/ch11' },
          { text: '事件', link: '/views/ch12' },
          { text: 'Observer', link: '/views/ch13' },
        ]
      },
      {
        text: 'jQuery',
        items: [
          { text: 'jQuery 的 DOM 操作', link: '/views/ch14' },
          { text: 'jQuery 的動畫', link: '/views/ch15' },
          { text: '打殭屍小遊戲', link: '/views/ch16' },
          { text: '翻牌記憶小遊戲', link: '/views/ch17' },
        ]
      },
      {
        text: '進階 JavaScript',
        items: [
          { text: 'HTTP 請求與 AJAX', link: '/views/ch18' },
          { text: '進階 JavaScript 語法', link: '/views/ch19' },
        ]
      },
      {
        text: 'Node.js',
        items: [
          { text: '認識 Node.js', link: '/views/ch20' },
          { text: '開放資料 LINE 機器人', link: '/views/ch21' },
        ]
      },
      {
        text: 'Vue.js',
        items: [
          { text: '基礎 Vue.js', link: '/views/ch22' },
          { text: 'Vite 與單元件檔案', link: '/views/ch23' },
          { text: 'Vite 的套件使用', link: '/views/ch24' },
          { text: 'Vue 的路由、狀態與 PWA', link: '/views/ch25' },
        ]
      },
      {
        text: '資料庫 API',
        items: [
          { text: 'MongoDB 的安裝與操作', link: '/views/ch26' },
          { text: '資料庫 API', link: '/views/ch27' },
          { text: '進階 API', link: '/views/ch28' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: 'VuePress 網站', link: '/views/ch29' },
          { text: 'Git 版本控管', link: '/views/ch30' },
          { text: '預處理器', link: '/views/ch31' },
          { text: 'Nuxt.js', link: '/views/ch32' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rogeraabbccdd/F2E-book' }
    ]
  }
})
