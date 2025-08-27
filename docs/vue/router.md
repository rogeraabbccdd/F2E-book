# 路由

[Vue Router](https://router.vuejs.org/) 可以在使用者訪問指定路徑時載入指定的網頁元件

## 安裝
輸入指令安裝，或是建立專案時選擇
```bash
npm i vue-router
```

## 設定
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
  history: createWebHashHistory(),
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
      // 路徑為 /about，進入網址時才載入 about 元件
      // 打包時另存為 about.xxx.js，需要時才讀取
      path: '/about',
      name: 'about',
      component: () => import('@/pages/About.vue'),
      meta: {
        title: '關於我們'
      }
    },
    {
      // 使用 children 建立子路由
      // 製作 layout 元件，裡面有 <router-view> 顯示子路由元件
      path: '/admin',
      component: () => import('@/layout/Admin.vue'),
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

## 使用
HTML 部分使用路由相關元件
- `router-link` 為路由連結，點擊後會切換路由，`to` 可指定路徑或物件
- `router-view` 為顯示路由元件的地方

```html
<!-- 路由連結 -->
<router-link to="/">Home</router-link>
<router-link :to="{ name: 'Home' }">Home</router-link>
<!-- 顯示路由元件 -->
<router-view></router-view>
```

JS 使用 `useRouter` 和 `useRoute`
```js
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