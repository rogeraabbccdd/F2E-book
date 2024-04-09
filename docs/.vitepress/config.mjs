import { defineConfig } from 'vitepress'
import { flowchartPlugin } from './plugins/flowchart/index.mjs'
import MarkdownItContainer from 'markdown-it-container'
import { demoBlockPlugin } from './plugins/demo-block/plugin.mjs'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/F2E-book',
  outDir: 'dist',
  appearance: 'dark',
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
          { text: '在開始之前', link: '/intro/before-start' },
        ]
      },
      {
        text: 'JavaScript 基礎',
        items: [
          { text: '認識 JavaScript', link: '/basic/intro' },
          { text: '變數', link: '/basic/variable' },
          { text: '運算子', link: '/basic/operator' },
          { text: '邏輯判斷式', link: '/basic/condition' },
          { text: '迴圈', link: '/basic/loop' },
          { text: '陣列與物件', link: '/basic/array-object' },
          { text: 'function', link: '/basic/function' },
          { text: '物件導向', link: '/basic/class' },
          { text: '資料處理 - 文字', link: '/basic/data-string' },
          { text: '資料處理 - 陣列', link: '/basic/data-array' },
          { text: '資料處理 - 數字', link: '/basic/data-number' },
          { text: '計時器', link: '/basic/timer' },
        ]
      },
      {
        text: 'JavaScript 網頁操作',
        items: [
          { text: 'BOM', link: '/interaction/bom' },
          { text: 'DOM', link: '/interaction/dom' },
          { text: '事件', link: '/interaction/events' },
          { text: 'Observer', link: '/interaction/observer' },
          { text: '時鐘', link: '/interaction/clock' },
        ]
      },
      {
        text: 'jQuery',
        items: [
          { text: 'jQuery - DOM', link: '/jquery/dom' },
          { text: 'jQuery - 動畫', link: '/jquery/animation' },
          { text: '打殭屍小遊戲', link: '/jquery/zombie' },
          { text: '翻牌記憶小遊戲', link: '/jquery/cards' },
        ]
      },
      {
        text: 'JavaScript 進階',
        items: [
          { text: 'HTTP 請求', link: '/advanced/ajax' },
          { text: '進階語法', link: '/advanced/advanced' },
        ]
      },
      {
        text: 'Node.js',
        items: [
          { text: '認識 Node.js', link: '/node/intro' },
          { text: 'LINE 機器人', link: '/node/line' },
        ]
      },
      {
        text: 'Vue.js',
        items: [
          { text: '基礎語法', link: '/vue/basic' },
          { text: 'Vite 與單元件檔案', link: '/vue/vite-sfc' },
          { text: '套件', link: '/vue/packages' },
          { text: '路由、狀態與 PWA', link: '/vue/router-pinia-pwa' },
        ]
      },
      {
        text: '資料庫 API',
        items: [
          { text: 'MongoDB 的安裝與操作', link: '/database/mongo' },
          { text: '基礎 API', link: '/database/api-basic' },
          { text: '進階 API', link: '/database/api-advanced' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: 'VuePress 網站', link: '/others/vuepress' },
          { text: 'Git', link: '/others/git' },
          { text: 'Pug', link: '/others/pug' },
          { text: 'Nuxt.js', link: '/others/nuxt' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rogeraabbccdd/F2E-book' }
    ],
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: '搜尋內容',
            buttonAriaLabel: '搜尋內容'
          },
          modal: {
            displayDetails: "顯示詳細結果",
            resetButtonTitle: '清除查詢條件',
            backButtonTitle: '關閉搜尋',
            noResultsText: '無法找到相關結果',
            searchBox: {
              resetButtonTitle: '清除查詢條件',
              resetButtonAriaLabel: '清除查詢條件',
              cancelButtonText: '取消',
              cancelButtonAriaLabel: '取消'
            },
            startScreen: {
              recentSearchesTitle: '搜尋記錄',
              noRecentSearchesText: '沒有搜尋記錄',
              saveRecentSearchButtonTitle: '儲存至搜尋記錄',
              removeRecentSearchButtonTitle: '從搜尋記錄中移除',
              favoriteSearchesTitle: '收藏',
              removeFavoriteSearchButtonTitle: '從收藏中移除'
            },
            errorScreen: {
              titleText: '無法擷取結果',
              helpText: '你可能需要檢查你的網路連線'
            },
            footer: {
              selectText: '選擇',
              navigateText: '切換',
              closeText: '關閉',
              searchByText: '搜尋提供者'
            },
            noResultsScreen: {
              noResultsText: '無法找到相關結果',
              suggestedQueryText: '你可以嘗試查詢',
              reportMissingResultsText: '你認為這個查詢應該有結果？',
              reportMissingResultsLinkText: '回報問題'
            }
          }
        }
      }
    },
    docFooter: {
      prev: '上一頁',
      next: '下一頁'
    },
    outline: {
      label: '頁面導覽'
    },
    lastUpdated: {
      text: '最後更新於',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    langMenuLabel: '多語言',
    returnToTopLabel: '回到頂部',
    sidebarMenuLabel: '選單',
    darkModeSwitchLabel: '主題',
    lightModeSwitchTitle: '切換到淺色模式',
    darkModeSwitchTitle: '切換到深色模式'
  },
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(flowchartPlugin)
      md.use(MarkdownItContainer, 'demo', demoBlockPlugin)
    }
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPContent\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/theme/VPContent.vue', import.meta.url)
          )
        }
      ]
    }
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "favicon.ico"
      }
    ]
  ]
})
