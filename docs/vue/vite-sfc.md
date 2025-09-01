# Vite 與單檔案元件

在 Node.js 環境，以打包工具 [Vite](https://vitejs.dev/) 開發 Vue 網站

## 安裝
使用 `npm create vue@latest` 建立使用 Vite 的 Vue 網站

## 目錄結構
- `public` 靜態資源，編譯網站時不會編譯
- `index.html` 網站主體
- `src/assets` 動態資源，編譯網站時會一起編譯，輸出的檔案會有流水號檔名
- `src/components` 子元件資料夾
- `src/main.js` 網站啟動時的切入點
- `vite.config.js` Vite 設定檔

## Pug
使用 [Pug](https://pugjs.org/) 撰寫 HTML 時需要安裝套件
- 安裝套件
 ```bash
  npm i -D pug @vue/language-plugin-pug
 ```
- 設定 `jsconfig.json`
 ```json
"vueCompilerOptions": {
  "plugins": ["@vue/language-plugin-pug"]
}
 ```
- 使用 `<template lang="pug">`

## SASS/SCSS
使用 [SASS/SCSS](https://sass-lang.com/) 撰寫 CSS 時需要安裝套件
- 安裝套件
 ```bash
  npm i -D sass
 ```
- 使用 `<style lang="scss">` `<style lang="sass">`
- 也可以在 js 使用 import 引用，例如 `import "@/styles/style.scss"`

## ESLint
若使用 `<script setup>` 和 Pug，需要安裝 [eslint-plugin-vue-pug](https://github.com/rashfael/eslint-plugin-vue-pug)
```
npm i -D eslint-plugin-vue-pug@flat
```
```js
import pluginVuePug from 'eslint-plugin-vue-pug'

export default defineConfig([
    ...pluginVuePug.configs['flat/essential'],
])

```

## 路徑設定
`vite.config.js` 中預設將 `@/` 指向 src 資料夾  
可以依照需求調整
這樣在引用資源時比較好管理路徑  
```js
import path from "path";
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {'@/': `${path.resolve(__dirname, 'src')}/`}
  }
})
```
```js
import MyComponent from "@/components/MyComponent.vue";
```

## 單檔案元件
單檔案元件 (Single File Component, SFC) 是 Vue 的特色  
在 Vite 開發環境下，使用單檔案元件 `.vue` 檔案，包含三個部分
```html
<template>
  <h1>{{ text }}</h1>
</template>

<script>
export default {
  data () {
    return {
      text: 'Hello Vue'
    }
  },
  methods: {}
}
</script>

<style>
  h1 {
    color: red;
  }
</style>
```
- `<template>` 為元件的 HTML，裡面只能有一個 HTML 元素
- `<style>` 為元件的 CSS，加上 `scoped` 屬性的話裡面的 CSS 只會套用到這個元件
- `<script>` 為元件的 Vue 程式碼，`data`、`methods`、`setup` 等等都放這裡

## script setup
在 `<script setup>` 裡面可以直接使用 Composition API 的語法  
不需要寫 return，但是會有一些語法差異
- `props` 變成 `defineProps`
- `emit` 變成 `defineEmits`
- `expose` 變成 `defineExpose`
```html
<script setup>
import { ref } from 'vue'
const count = ref(0)

// 使用 defineProps 定義 props
// 這是特別的語法，不需要 import
const props = defineProps({
  title: String
})
console.log(props.title)

// 使用 defineEmits 定義 emit
// 這是特別的語法，不需要 import
const emit = defineEmits(['customEvent'])
emit('customEvent', 'someValue')

// 使用 defineExpose 定義 expose
// 這是特別的語法，不需要 import
defineExpose({
  count
})
</script>
```

## 引用資源
圖片、音效等資源有 `src/assets/` 和 `public` 可以放  
- `src/assets` 裡面的東西打包時會為檔名加上 hash，避免瀏覽器快取  
- `public` 裡面的東西打包時僅是將檔案複製貼上，檔名相同  

:::danger 注意
資源盡量放在 `src/assets/` 裡面，除非遇到下列情況
- 你需要在打包後指定特定檔案的名字
- 你有上千個圖片，需要動態引用路徑
- 有些套件可能不相容，需要有獨立的 `<script>` 標籤引用
:::

使用 `src/assets` 裡面的資源，使用相對路徑  
打包時會自動將 src 的檔名轉換為加了 hash 的檔名  
```html
<!-- v-bind:src 必須搭配 new URL(路徑), import.meta.url).href 寫相對檔案的路徑 -->
<img v-for='(image, idx) in images' :key='idx' :src="image">
<script setup>
const images = reactive([
  new URL('@/assets/image1.png', import.meta.url).href,
  new URL('@/assets/image2.png', import.meta.url).href
])
const play = () => {
  const audio = new Audio()
  audio.src = new URL('@/assets/meow.mp3', import.meta.url).href
  audio.play()
}
</script>
```
```html
<!-- 一般的 src 使用相對路徑 -->
<img src="@/assets/img.jpg">
```
```css
body {
  background-image: url('@/assets/image.jpg');
}
```

使用 `public` 裡面的資源，路徑以 `/` 開頭  
```html
<!-- / 開頭代表 public 資料夾 -->
<img :src="'/img.jpg'">
<img src="/img.jpg'">
```
```css
body {
  /* / 開頭代表 public 資料夾 */
  background-image: url('/image.jpg');
}
```
```js
mounted () {
  const audio = new Audio()
  audio.src = './sound.mp3'
  audio.play()
}
```

## 部署
### 編譯
使用指令打包成靜態網頁，輸出到 `dist` 資料夾  
```bash
npm run build
```
打包完後使用指令可以在本機預覽打包後的網站
```bash
npm run preview
```

:::danger 注意
如果沒有設定 base 的話預設路徑是根目錄  
所以需要在 `vite.config.js`，寫入設定  
才能正常在 GitHub Pages 執行
```js
export default defineConfig({
  plugins: [vue()],
  base: './'
})
```
:::

### GitHub Actions
使用 [GitHub Actions](https://github.com/features/actions) 自動編譯部署到 `gh-pages` 分支  
- 在 `master` 分支的根目錄建立 `.github/workflows/deploy.yml`，編寫設定
  ```yml
  # Action 名稱
  name: Deploy
  # 觸發時機，當推送到分支 master 時
  on:
    push:
      branches: [ master ]
  # 執行的工作
  jobs:
    # 工作名稱
    deploy:
      # 執行工作的虛擬機作業系統
      runs-on: ubuntu-latest
      # 工作步驟
      steps:
        # 步驟一：複製程式碼
        - name: checkout
          # 使用的 actions/checkout 複製程式碼
          uses: actions/checkout@v5
        # 步驟二：編譯
        - name: Install and Build
          run: |
            npm install
            npm run build
        # 步驟三：部署
        - name: Deploy
          uses: JamesIves/github-pages-deploy-action@v4
          with:
            branch: gh-pages
            folder: dist
  ```

:::warning 作業
熟悉 Vite 環境及預處理器，製作網頁丙級第一題
- 網站整體為 `App.vue`
- 標題區、跑馬燈區、選單區、內容區、日期區和版權區需要製作成元件
- 內容區做校長的話頁就好
:::
