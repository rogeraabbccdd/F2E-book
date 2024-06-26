# Vite 的套件使用

使用 Vue 版 Font Awesome 以及 UI 工具

## 套件
### UI 套件
部分套件不是使用 Vite，而是 [Vue Cli](https://cli.vuejs.org/) 或是自己的工具
- [Vuetify](https://next.vuetifyjs.com/en)
- [Quasar](https://quasar.dev/)
- [BootstrapVue3](https://www.npmjs.com/package/bootstrap-vue-3)
- [Element Plus](https://element-plus.org/)
- [PrimeVue](https://www.primefaces.org/primevue/#/)
- [Wave UI](https://antoniandre.github.io/wave-ui/)
- [BalmUI](https://next-material.balmjs.com/#/)
- [Ionic Vue](https://ionicframework.com/docs/vue/overview)
- [Equal UI](https://quatrochan.github.io/Equal/)
- [Ant Design of Vue](https://www.antdv.com/docs/vue/introduce/)
- [Oruga](https://oruga.io/)
- [Vuestic UI](https://vuestic.dev/)
- [Naive UI](https://www.naiveui.com/en-US/os-theme)
- [Varlet UI](https://varlet.gitee.io/varlet-ui/#/zh-CN/home)
- [Vant](https://vant-contrib.gitee.io/vant/#/zh-CN)

### Font Awesome
[vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome) 能以元件方式引用 svg icon  
- 安裝核心套件
  ```
  npm install @fortawesome/fontawesome-svg-core 
  npm install @fortawesome/vue-fontawesome@prerelease 
  ```
- 依需求安裝各類 icon
  ```
  npm install @fortawesome/free-solid-svg-icons
  npm install @fortawesome/free-regular-svg-icons
  npm install @fortawesome/free-brands-svg-icons
  ```
- 在 `main.js` 引用套件和要使用的 icon，個別 icon 引用節省資源
  ```js
  // 必要引用
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  // 根據 icon 的種類引用
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'
  import { faGooglePlus } from '@fortawesome/free-brands-svg-icons'
  library.add(faCoffee, faGooglePlus);

  // 註冊元件
  createApp()
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount()
  ```
- 在需要使用 icon 的地方引用元件
  ```html
  <font-awesome-icon :icon="['fas', 'coffee']" />
  ```
