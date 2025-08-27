# PWA
使用 [Vite PWA](https://vite-pwa-org.netlify.app/) 製作 PWA

## PWA
PWA (Progressive Web App) 是一種能讓網站有類似 App 的使用體驗的技術，有離線快取等功能  
:::danger 注意
PWA 有使用限制:
- 網址必須要有 `https` 或 `localhost`
- 必須要有 `manifest.json` 檔案，會在 build 時根據設定自動產生
- 必須要有 Service Worker，會在 build 時根據設定自動產生基本的底
:::

## 安裝
```bash
npm i -D vite-plugin-pwa
```

## 素材
產生 PWA 用素材，並放進 `/public` 資料夾
- 使用 [Favicon InBrowser.App](https://favicon.inbrowser.app/tools/favicon-generator) 或 [Real Favicon Generator](https://realfavicongenerator.net/) 產生 favicon
- 使用 [PWA Icons & iOS Splash Screen Generator](https://progressier.com/pwa-icons-and-ios-splash-screen-generator) 產生 iOS 啟動畫面

## 設定
- 在 `vite.config.js` 加入 [PWA 設定](https://web.dev/add-manifest/)
  ```js
  import { VitePWA } from 'vite-plugin-pwa'
  export default defineConfig({
    plugins: [
      VitePWA({
        devOptions: {
          enabled: true,
        },
        // 設定自動更新
        registerType: 'autoUpdate',
        workbox: {
          // 清除過期的快取
          cleanupOutdatedCaches: true,
          // 需要快取檔案的路徑，設定所有檔案
          globPatterns: ['**/*'],
          // 忽略網址參數，不同參數當作相同檔案
          // a.jpg = a.jpg?fbclid=1234
          ignoreURLParametersMatching: [/.*/],
        },
        // https://web.dev/add-manifest/
        manifest: {
          // APP 名稱
          name: 'Name of your app',
          short_name: 'Short name of your app',
          // APP 說明
          description: 'Description of your app',
          // APP 主題顏色
          theme_color: '#ffffff',
          // Android 啟動畫面背景顏色
          background_color: '#ffffff',
           // APP 顯示範圍
          scope: './',
          // APP 開始畫面網址
          start_url: './',
          // 顯示模式
          // browser: 瀏覽器
          // fullscreen: 全螢幕，隱藏所有瀏覽器 UI
          // standalone: 隱藏標準瀏覽器 UI ，如 URL 欄
          // minimal-ui: 有最小導覽列 UI
          // https://web.dev/articles/add-manifest?hl=zh-tw#display
          display: 'standalone',
          // icon 路徑，./ 代表 public
          icons: [
            {
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ]
  })
  ```
- 在 `index.html` 中加入 PWA 相關標籤

:::warning 作業
製作一個番茄鐘，功能包括：
- 使用者能新增、編輯、刪除待辦事項
- 能保存已完成、未完成的事項
- 使用者能選擇響鈴鈴聲
- 能保存選擇的鈴聲
- 每工作 25 分鐘，休息 5 分鐘
- 倒數時間到響鈴
- 倒數完後能自動開始倒數下一個休息時間或事項
- 能開始、暫停與跳過倒數
- 設定 GitHub Actions 自動打包部署
- 使用 vite-plugin-pwa 設定 PWA
- 設定社群分享資訊 (og meta 與 twitter meta)

<iframe width="560" height="315" src="https://www.youtube.com/embed/BdwdENBrk2c" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
:::
