# Nuxt.js

Nuxt 是伺服器渲染版的 Vue.js，改善了 SEO 等問題。


## Nuxt
[Nuxt](https://nuxt.com/) 使用了伺服器渲染的方式呈現網頁，相比原本的 Vue.js
- 先將網頁內容渲染好後才傳送給使用者，相比原生 Vue.js 在下載網頁檔案後還需要等待呼叫 API
- 能與 express 整合，所以能把後端的 API 一併寫在同一個專案裡面
- 能自訂各頁面的 meta，改善 SEO 問題

### 安裝
- 使用 `npm create nuxt@latest` 建立網站

:::danger
Nuxt 預設使用 TypeScript，所以會有 tsconfig.json 及 nuxt.config.ts  
若沒有要使用 TypeScript，刪除 tsconfig.json 並將 nuxt.config.ts 改為 nuxt.config.js
:::

### 引用資源
- `assets` 資料夾的內容**會**經過 Vite 處理，打包時加上 hash
- `public` 資料夾的內容**不會**經過 Vite 處理

:::danger
Nuxt 不會提供 assets 內圖片的網址如 `/assets/my-file.png`  
如果需要網址，需使用 public 資料夾
:::

使用 assets 內圖片
```html
<template>
  <img src="~/assets/your_image.png" alt="" width="100">
</template>
```
```css
body {
  background: url(~/assets/your_image.png)
}

```
使用 public 內圖片
```html
<template>
  <img src="/img/your_image.png" alt="" width="100">
  <img :src="img" alt="" width="100">
</template>
<script setup>
const img = ref('/img/your_image.png')
</script>
```
```css
body {
  /* public/img/your_image.png */
  background: url(/img/your_image.png)
}
```
### Layout
建立一個 `layouts` 資料夾，可以自己放設定的版面  
使用 `<NuxtLayout>` 元件讓頁面套用版面  
預設套用 `layouts/default.vue`，若無此檔案須自己建立

```html
<template>
  <div id="main">
    <NuxtLayout>
      頁面內容
    </NuxtLayout>
  </div>
</template>
```

也能套用自訂 layout  
建立 `layouts/版面名稱.vue` 後將名稱傳入 `NuxtLayout`
```html
<template>
  <!-- 指定 -->
  <NuxtLayout name="custom">
    <NuxtPage />
  </NuxtLayout>
  <!-- 動態 -->
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const layout = ref('custom')
</script>
```

或是在元件內各別定義
```html
<script setup>
definePageMeta({
  // 這裡也能設定 layout
  // 設定 layout: false 能停用外層定義的 layout
  layout: 'custom',
  title: 'My home page'
})

const route = useRoute()

console.log(route.meta.title) // My home page
</script>
```

### 路由
Nuxt 會自動讀取 `pages` 資料夾的檔案，自動產生路由設定  
使用 `[]` 的檔名代表路由參數變數名稱  
Nuxt 裡的 `router-view` 名為 `NuxtPage`  
Nuxt 裡的 `router-link` 名為 `NuxtLink`
```
pages/
--| user/
-----| index.vue
-----| [id].vue
--| index.vue
```
```js
routes: [
  {
    name: 'index',
    path: '/',
    component: 'pages/index.vue'
  },
  {
    name: 'user',
    path: '/user',
    component: 'pages/user/index.vue'
  },
  {
    name: 'user-id',
    path: '/user/:id',
    component: 'pages/user/[id].vue'
  }
]
```

### Pinia
- 使用 `npm install @pinia/nuxt` 安裝
- `nuxt.config.js` 寫入設定
  ```js
  export default defineNuxtConfig({
    // ... other options
    modules: [
      // ...
      '@pinia/nuxt'
    ]
  })
  ```
- 使用方式和平常一樣

### 非同步資料
非同步資料語法分下列幾種
- `useAsyncData` 載入頁面前先取得資料
- `useLazyAsyncData` 等頁面載入完後再取資料
- `useFetch` 取得資料的方法，在載入頁面前執行
- `useLazyFetch` 取得資料的方法，在載入頁面後執行，需處理沒有拿到資料的情況

useAsyncData
```html
<template>
  <pre>{{ data }}</pre>
</template>
<script setup>
// useAsyncData(key, function, options)
// key 指定不同的值讓 nuxt 正確的更新資料，沒提供的話會根據程式碼檔名和行數自動產生
// function 產生資料的 function
// $fetch 為 ohmyfetch 套件，內建在 nuxt 裡 https://github.com/unjs/ohmyfetch
// options 設定 https://v3.nuxtjs.org/api/composables/use-async-data#params
const { data, pending, error, refresh } = await useAsyncData('events', () => $fetch('https://kktix.com/events.json'))
</script>
```

useLazyAsyncData
```html
<template>
  <p v-if='pending'>載入中</p>
  <pre v-else>{{ data }}</pre>
</template>
<script setup>
// useLazyAsyncData(key, function, options)
// key 指定不同的值讓 nuxt 正確的更新資料，沒提供的話會根據程式碼檔名和行數自動產生
// function 產生資料的 function
// $fetch 為 ohmyfetch 套件，內建在 nuxt 裡 https://github.com/unjs/ohmyfetch
// options 設定 https://v3.nuxtjs.org/api/composables/use-async-data#params
// 注意 data 初始值是 null
const { data, pending, error, refresh } = useLazyAsyncData('events', () => $fetch('https://kktix.com/events.json'))

// 注意 data 初始值是 null，無法立即取得資料，但是可以 watch 偵測變更
watch(data, (newData) => {
  console.log('data 更新')
})
</script>
```

useFetch
```html
<template>
  <pre>{{ data }}</pre>
</template>
<script setup>
// useFetch 是 useAsyncData 簡化版
// 包裝了 useAsyncData 和 $fetch 並根據網址自動產生 key
const { data, pending, error, refresh } = await useFetch('https://kktix.com/events.json')
</script>
```

useLazyFetch
```html
<template>
  <p v-if='pending'>載入中</p>
  <pre v-else>{{ data }}</pre>
</template>
<script setup>
// useFetch 是 useLazyAsyncData 簡化版
// 包裝了 useLazyAsyncData 和 $fetch 並根據網址自動產生 key
const { data, pending, error, refresh } = useLazyFetch('https://kktix.com/events.json')

// 注意 data 初始值是 null，無法立即取得資料，但是可以 watch 偵測變更
watch(data, (newData) => {
  console.log('data 更新')
})
</script>
```

呼叫 refresh 重新取得資料
```html
<template>
  <input type="button" @click="showPrev" value="prev" />
  <pre>{{ data }}</pre>
  <input type="button" @click="showNext" value="next" />
</template>
<script setup>
const id = ref(1);

const { data, refresh } = await useFetch(
  // 使用 function 動態產生資料網址
  () => `https://jsonplaceholder.typicode.com/todos/${id.value}`
);

const showNext = () => {
  id.value++
  refresh()
}

const showPrev = () => {
  id.value++
  refresh()
}
</script>
```

或是使用 `refreshNuxtData` 重新取得資料
```html
<template>
  <input type="button" @click="refresh" value="更新" />
  <p v-if='pending'>載入中</p>
  <pre v-else>{{ data }}</pre>
</template>
<script setup>
const id = ref(1)
const { pending, data } = useLazyAsyncData('count', () => $fetch(`https://jsonplaceholder.typicode.com/todos/${id.value}`))

const refresh = () => {
  id.value++
  // refreshNuxtData(key)
  // 更新指定 key 的 useAsyncData 和 useLazyAsyncData 資料
  refreshNuxtData('count')

  // 若不提供 key 則是更新 useAsyncData、useLazyAsyncData、useFetch 和 useLazyAsyncData 的資料
  // refreshNuxtData()
}
</script>
```

### Plugin
Nuxt 沒有 `main.js`，所以安裝 Vue 相關套件時需要在 `plugins` 資料夾建立一個 js 檔  
- 檔案結尾是 `.server.js` 代表只在 server 執行
- 檔案結尾是 `.client.js` 代表只在瀏覽器執行
- 檔案結尾沒有 server 和 client 代表兩邊都執行

例如使用 [vue-gtag](https://github.com/MatteoGabriele/vue-gtag) 時，建立 `plugins/vue-gtag.client.js` 
```js
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'GA_MEASUREMENT_ID'
    }
  })
})
```
:::danger 注意
部分 Vue 套件僅支援瀏覽器端執行，因為 server 端沒有 DOM 相關的變數
:::

### CSS
Nuxt 沒有 main.js，所以引用自己寫的 css 或外部 css 時，必須在 `nuxt.config.js` 引用  
可以忽略副檔名，nuxt 會自動尋找檔案
```js
// nuxt.config.js
export default {
  // 在 assets/ 裡找檔名為 main 的 CSS、Stylus 或其他預處理器的檔案
  css: ['~/assets/main'],
}
```

### Meta
每個元件都可以使用 `useHead` 設定各自的 meta，或引用外部資源。  
```html
<script setup>
const description = ref('site description')
const image = ref('site image')
useHead({
  // 網站標題
  title: 'About Us',
  // 標題模板
  // title 是本頁的 title
  // 若沒設定則是使用 nuxt.config 的值
  titleTemplate: (title) => {
    console.log(title)
    return title ? `${title} - Site Title` : 'Site Title';
  },
  // Meta
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      property: 'og:title',
      content: route.meta.title
    },
    {
      property: 'og:description',
      content: description.value
    },
    {
      property: 'og:image',
      content: image.value
    }
  ],
  // 外部 JS
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
      // 放在 body
      body: true
    }
  ],
  // 外部 CSS
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
      // 放在 body
      body: true
    }
  ]
})
</script>
```

或是使用 Nuxt 內建元件設定
```html
<template>
  <Title>{{ title }}</Title>
  <Meta name="description" :content="title" />
</template>
<script setup>
const title = ref('aaa')
</script>
```

或在 `nuxt.config` 設定  

```js
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Shop',
      // 設定的 titleTemplate 只能放文字，%s 代表 title
      titleTemplate: '%s - Shop'
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        { src: 'https://awesome-lib.js' }
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        { rel: 'stylesheet', href: 'https://awesome-lib.css' }
      ],
      style: [
        // <style type="text/css">:root { color: red }</style>
        { children: ':root { color: red }', type: 'text/css' }
      ],
      noscript: [
        // <noscript>Javascript is required</noscript>
        { children: 'Javascript is required' }
      ]
    }
  }
})
```

### 打包
- 必須先執行 `npm run build` 指令打包檔案
- 執行 `node .output/server/index.mjs` 開啟伺服器
