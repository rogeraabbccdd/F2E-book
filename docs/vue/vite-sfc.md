# Vite 與單元件檔案

使用 Node.js 的 Vue 開發工具 Vite

## Vite
### 安裝
[Vite](https://vitejs.dev/) 是 Node.js 的 Vue 開發工具
方法一：
- 使用 `npm create vite` 或 `npm create vite 網站名稱 -- --template vue` 建立使用 Vite 打包工具的網站，依需求選擇套件及設定
  - `Project Name` 專案名稱
  - `Select a framework` 選擇想要使用的框架
  - `Select a variant` 選擇是否使用 TypeScript
方法二:
- 使用 `npm init vue@latest` 建立使用 Vite 的 Vue 網站
  - `Project name` 專案名稱
  - `Add TypeScript` 選擇是否使用 TypeScript
  - `Add JSX Support` 選擇是否使用 JSX
  - `Add Vue Router for Single Page Application development` 選擇是否使用 Vue Router
  - `Add Pinia for state management` 選擇是否使用 Pinia 管理狀態
  - `Add Vitest for Unit testing` 選擇是否使用單元測試
  - `Add Cypress for both Unit and End-to-End testing` 選擇是否使用 E2E 單元測試
  - `Add ESLint for code quality` 選擇是否使用 ESLint
  - `Add Prettier for code formating` 選擇是否使用 Prettier

### 目錄結構
- `public` 靜態資源，編譯網站時不會編譯
- `index.html` 網站主體
- `src/assets` 動態資源，編譯網站時會一起編譯，輸出的檔案會有流水號檔名
- `src/components` 子元件資料夾
- `main.js` 網站啟動時的切入點

### 預處理器
- 安裝 `Pug` 使用 `npm i -D pug` 後使用 `<template lang="pug">`
- 安裝 `Stylus` 使用 `npm i -D stylus` 後使用 `<style lang="stylus">` 或是在 main.js 加入 `import './檔案路徑'`
- 安裝 `SASS/SCSS` 使用 `npm i -D sass` 後使用 `<style lang="scss">` `<style lang="sass">` 或是在 main.js 加入 `import './檔案路徑'`

### Eslint
若使用方法一安裝，需手動安裝 ESLint
```
npm i -D eslint eslint-plugin-vue
```
在根目錄建立 `.eslintrc.js` 檔案
```js
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ]
}
```

若使用 Standard 語法規範，需手動安裝 [@vue/eslint-config-standard](https://www.npmjs.com/package/@vue/eslint-config-standard)
```
npm i -D @vue/eslint-config-standard
```
並手動新增至 `.eslintrc.js`
```js {6,11-13}
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/standard'
  ]
}
```

若使用 `<script setup>`，需要安裝 [eslint-plugin-vue](https://eslint.vuejs.org/)
```
npm i -D eslint-plugin-vue
```
```js {5}
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/standard'
  ]
}
```
若使用 `<script setup>` 和 Pug，需要再安裝 [eslint-plugin-vue-pug](https://github.com/rashfael/eslint-plugin-vue-pug)
```
npm i -D eslint-plugin-vue-pug
```
```js {6}
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue-pug/vue3-recommended',
    'eslint:recommended',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}

```
### 路徑設定
建議在 `vite.config.js` 設定 `@/` 開頭的路徑指向 src 資料夾  
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
## 單檔案元件
Vite 開發工具可以使用單檔案元件，也就是 `.vue` 檔  
`.vue` 檔內包含三個部分

- `<template>` 為元件的 HTML，裡面只能有一個 HTML 元素
- `<style>` 為元件的 CSS，加上 `scoped` 屬性的話裡面的 CSS 只會套用到這個元件
- `<script>` 為元件的 Vue 程式碼，`data`、`methods`、`setup` 等等都放這裡，加上 `setup` 使用 Composition API 更方便

### 使用元件
- 在要引用的大元件的 `<script>` 引用
  ```js
  import Navbar from '../components/Navbar.vue'
  ```
- 在 `components` 內宣告使用，若使用 `<script setup>` 則不需要
  ```json
  components: {
    Navbar
  }
  ```
- 直接使用元件名的標籤 `<Navbar />` 就能引用了

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

使用 `src/assets` 裡面的資源時使用相對路徑  
打包時會自動將 src 的檔名轉換為加了 hash 的檔名
```html
<!-- v-bind:src 必須搭配 new URL(路徑), import.meta.url).href 寫相對檔案的路徑 -->
<img v-for='(image, idx) in images' :key='idx' :src="image">
<script setup>
const images = reactive([
  new URL('./assets/image1.png', import.meta.url).href,
  new URL('./assets/image2.png', import.meta.url).href
])
const play = () => {
  const audio = new Audio()
  audio.src = new URL('./assets/meow.mp3', import.meta.url).href
  audio.play()
}
</script>
<script>
export default {
  data () {
    return {
      images: [
        new URL('./assets/logo.png?raw', import.meta.url).href,
        new URL('./assets/edit.png', import.meta.url).href
      ]
    }
  },
  methods: {
    play () {
      const audio = new Audio()
      audio.src = new URL('./assets/meow.mp3', import.meta.url).href
      audio.play()
    }
  }
}
</script>
<!-- 一般的 src 使用相對路徑 -->
<img src="./img.jpg">
```
```css
body {
  background-image: url('./assets/image.jpg');
}
```

使用 `public` 裡面的資源
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
開發完後使用 `npm run build` 可以輸出靜態網頁  
:::danger 注意
如果沒有設定 base 的話預設路徑是根目錄  
所以需要在 `vite.config.js`，寫入設定  
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
          uses: actions/checkout@v3
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
