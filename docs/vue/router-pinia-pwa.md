# Vue 的路由、狀態與 PWA

熟悉 Router 以及 Vuex，以及 PWA 設定

## Router
Router 可以在使用者訪問指定路徑時載入指定的網頁元件，是開發 SPA 網站的套件  
- 輸入 `npm i vue-router` 安裝，或是 `npm init vue@latest` 時選擇
- 設定路由，`src/router/index.js` 為路由設定檔
  ```js
  import { createRouter, createWebHashHistory } from 'vue-router'
  import Home from '@/pages/Home.vue'

  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        // 路徑為根目錄，使用 home 元件
        path: '/',
        name: 'home',
        component: Home
      },
      {
        // 路徑為 /about，進入網址時才載入 about 元件
        // 打包時另存為 about.xxx.js，需要時才讀取
        path: '/about',
        name: 'about',
        component: () => import('@/pages/About.vue')
      }
    ]
  })

  export default router
  ```
- 在 `main.js` 引用
  ```js
  import router from './router'
  createApp()
    .use(router)
    .mount()
  ```
- 在 HTML 部分使用元件
  ```html
  <!-- 路由連結 -->
  <router-link to="/">Home</router-link>
  <!-- 顯示路由元件 -->
  <router-view></router-view>
  ```
- 路由變數
  ```js
  // Option API 使用 $route 和 $router
  // $router 可以操作路由，$route 為路由資訊，只能讀取
  // 指定網址
  this.$router.push('home')
  this.$router.push({ path: 'home' })
  // 指定路由名稱
  this.$router.push({ name: 'user'})
  // 路由 query，register?plan=private
  this.$router.push({ path: 'register', query: { plan: 'private' }})
  // 取得路由資訊
  console.log(this.$route)

  // Composition API 使用 useRouter 和 useRoute
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  // 指定網址
  router.push('home')
  router.push({ path: 'home' })
  // 指定路由名稱
  router.push({ name: 'user'})
  // 路由 query，register?plan=private
  router.push({ path: 'register', query: { plan: 'private' }})
  // 取得路由資訊
  console.log(route)
  ```
  ```

## Pinia
[Pinia](https://pinia.vuejs.org/) 可以儲存網頁的狀態，讓元件間的資料共享更方便  
- 輸入 `npm i pinia` 安裝，或是 `npm init vue@latest` 時選擇
- 在 `main.js` 引用
  ```js
  import { createPinia } from 'pinia'
  createApp()
    .use(createPinia())
    .mount()
  ```
- 建立一個資料名稱為 ID 的檔案，若名稱為 user，則建立 `src/store/user.js`
  ```js
  import { defineStore } from 'pinia'
  // 定義一個 ID 為 user 的 store
  export const useUserStore = defineStore('user', {
    // 初始狀態，使用箭頭函式
    state: () => {
      return {
        name: '',
        email: '',
        age: 0
      }
    },
    // 修改狀態用的 function
    actions: {
      setAge (value) {
        this.age = value
      }
    },
    // 可以先將資料處理好用傳出
    getters: {
      // 單純處理
      isAdult () {
        return this.age >= 18
      }
      // 從外部傳入資料處裡
      isOlderThan () {
        return age => {
          return this.age >= age
        }
      }
    }
  })
  ```
- 在元件內使用
  ```html
  <script setup>
  import { storeToRefs } from 'pinia'
  // 引用 user store，可以直接對 user
  import { useUserStore } from './store/user'
  const user = useUserStore()
  // 存取 store、getter 值
  console.log(user.name, user.email, user.isOlderThan(100))
  // 或是解構配 storeToRefs 幫助，否則資料修改時不會動態更新
  const { name, email, age, isAdult, isOlderThan } = storeToRefs(user)
  // 使用 $patch 修改 store 資料
  user.$patch(state => {
    state.age++
  })
  // 呼叫 action
  user.setAge(100)
  // 或是解構 action 後呼叫
  const { setAge } = user
  setAge(100)
  // 直接改也可以
  user.name = 100
  name = 100
  </script>
  ```
- 元件外使用
  ```js
  import { useUserStore } from './store/user'

  router.beforeEach((to) => {
    const user = useUserStore()
    if (to.meta.login && !user.isLoggedIn) return '/login'
  })
  ```

## PWA
:::danger 注意
PWA 有使用限制:
- 網址必須要有 `https` 
- 必須要有 `manifest.json` 檔案，會在 build 時根據設定自動產生
- 必須要有 Service Worker，會在 build 時根據設定自動產生基本的底
:::
- 使用 `npm i -D vite-plugin-pwa` 安裝
- 使用 [Real Favicon Generator](https://realfavicongenerator.net/) 或 [Vue PWA asset generator](https://www.npmjs.com/package/vue-pwa-asset-generator) 產生各種大小的 icon，放入 public
  ```
  vue-asset-generate -a 512px圖片路徑 -o ./public/img/icons
  ```
- 在 `vite.config.js` 加入 [PWA 設定](https://web.dev/add-manifest/)
  ```js
  import { VitePWA } from 'vite-plugin-pwa'
  export default defineConfig({
    plugins: [
      VitePWA({
        // https://web.dev/add-manifest/
        manifest: {
          // APP 名稱
          name: 'Name of your app',
          short_name: 'Short name of your app',
          // APP 說明
          description: 'Description of your app',
          // APP 主題顏色
          theme_color: '#ffffff',
           // APP 顯示範圍
          scope: './',
          // APP 開始畫面網址
          start_url: './',
          // 顯示模式
          // browser: 瀏覽器
          // fullscreen: 全螢幕，隱藏所有瀏覽器 UI
          // standalone: 隱藏標準瀏覽器 UI ，如 URL 欄
          // minimal-ui: 有最小導覽列 UI
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
- 在 `index.html` 中加入 PWA 設定
  ```html
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Your app title</title>
    <meta name="description" content="Your app description">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="alternate icon" href="/favicon.ico" type="image/png" sizes="16x16">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
    <link rel="mask-icon" href="/favicon.svg" color="#FFFFFF">
    <meta name="theme-color" content="#ffffff">
  </head>
  ```
- 在 `main.js` 註冊 service worker
  ```js
  import { registerSW } from 'virtual:pwa-register'
  registerSW({
    onNeedRefresh () {},
    onOfflineReady () {}
  })()
  ```


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
