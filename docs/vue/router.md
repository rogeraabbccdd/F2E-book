# 路由

[Vue Router](https://router.vuejs.org/) 可以在使用者訪問指定路徑時載入指定的網頁元件

## 安裝
輸入指令安裝，或是建立專案時選擇
```bash
npm i vue-router
```

## 基本設定
路由設定檔通常放在 `src/router/index.js`  

:::danger 注意
路由模式分為兩種

- `createWebHashHistory` 使用 `#` 處理路由，不需要後端設定
- `createWebHistory` 需要後端配合設定，將所有路徑的請求導向至 `index.html`

將網頁部署至 GitHub Pages 時，只能使用 `createWebHashHistory`
:::

```js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 路由
  routes: []
})

export default router
```

在 `main.js` 引用
```js
import router from './router'
createApp()
  .use(router)
  .mount()
```

## 路由設定
路由設定方式分為兩種
- 陣列路由: 通用設定方式
- 檔案路由: 從 Vue Router 5.x 開始，整合了 [Unplugin Vue Router](https://uvr.esm.is/)  

### 陣列路由
使用陣列定義路由  
- `path`: 頁面路徑
- `name`: 頁面名稱
- `component`: 頁面元件
- `meta`: 儲存頁面標題、是否需要登入等自訂資訊
```js
{
  routes: [
    {
      // 路徑為根目錄，使用 home 元件
      path: '/',
      name: 'home',
      component: Home,
      // 自訂路由資訊
      meta: {
        title: '首頁'
      }
    },
    {
      // 路徑為 /about
      path: '/about',
      name: 'about',
      // 進入頁面時才載入元件
      // 打包時另存為 about.xxx.js，需要時才讀取
      component: () => import('@/pages/About.vue'),
      meta: {
        title: '關於我們'
      }
    },
    {
      // 使用 children 建立子路由
      // 通常用於製作 layout 元件，裡面有 <router-view> 用於顯示子路由
      path: '/admin',
      component: () => import('@/layout/Admin.vue'),
      // 子路由設定
      // 會在 layout/Admin.vue 中的 router-view 元件顯示
      children: [
        {
          path: 'user',
          name: 'AdminUser',
          component: () => import('@/pages/admin/User.vue'),
          meta: {
            title: '使用者管理'
          }
        },
      ]
    }
  ]
}
```

### 檔案路由
依照檔案擺放的位置自動產生路由設定  
```
src/pages/
├── index.vue
├── about.vue
├── users.vue
└── users/
    ├── index.vue
    └── [id].vue
```
- `index.vue` 路徑轉換成 `/`
- `about.vue` 路徑轉換成 `/about`
- `users.vue` 變成 `/users` 內頁面的外層
- `users/index.vue` 路徑轉換成 `/users`，在 `users.vue`的 `<router-view>` 中顯示
- `users/[id].vue` 路徑轉換成 `/users/:id`，在 `users.vue`的 `<router-view>` 中顯示

調整路由設定檔案
```js
import {
  routes,
  handleHotUpdate, 
} from 'vue-router/auto-routes'

export const router = createRouter({
  // ...其他路由設定
  routes,
})

// 在執行時不用重開就能更新路由
if (import.meta.hot) { 
  handleHotUpdate(router) 
} 
```

調整 `vite.config.js` 加入設定
```js
export default defineConfig({
  plugins: [
    VueRouter(),
    // Vue 必須要在 VueRouter 後面
    Vue(),
  ],
})
```

在元件內用 `definePage()` 或 `<route>` 定義 meta 等資訊
```html
<script setup>
definePage({
  meta: {
    title: '首頁',
  },
})
</script>
```

```html
<template></template>
<script setup></script>
<!-- 新增的 route 標籤 -->
<route lang="yaml">
meta:
  title: 首頁
</route>
```


## 元件
路由相關元件
- `router-link` 路由連結，點擊後會切換路由，`to` 可指定路徑或物件
- `router-view` 顯示路由元件的地方

:::danger 注意
路由之間的跳頁不應該使用 `a` 標籤
:::

```html
<!-- 路由連結 -->
<router-link to="/">Home</router-link>
<router-link :to="{ name: 'Home' }">Home</router-link>
<!-- 顯示路由元件 -->
<router-view></router-view>
```

## Composable
- `useRouter` 跳轉頁面動作
- `useRoute` 取得路由資訊
```js
import { useRouter, useRoute } from 'vue-router'
// Composition API 使用 useRouter 和 useRoute
const router = useRouter()
const route = useRoute()
// 指定網址跳頁
router.push('/home')
router.push({ path: '/home' })
// 指定路由名稱跳頁
router.push({ name: 'user'})
// 指定路由 query 跳頁，/register?plan=private
router.push({ path: '/register', query: { plan: 'private' }})
// 取得路由資訊
console.log(route)
```
