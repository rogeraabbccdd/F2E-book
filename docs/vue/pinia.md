# Pinia
[Pinia](https://pinia.vuejs.org/) 可以儲存網頁的狀態，讓元件間的資料共享更方便  

## 安裝
輸入指令安裝，或是建立專案時選擇
```bash
npm i pinia
```

## 設定
在 `main.js` 引用
```js
import { createPinia } from 'pinia'

createApp()
  .use(createPinia())
  .mount()
```

## 建立
建立一個資料名稱為 ID 的檔案，若名稱為 user，則建立 `src/store/user.js`

:::tip TIP
Pinia Store 語法分為 Option 和 Composition  
課程以 Composition 為主
:::

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定義一個 ID 為 user 的 store
export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const email = ref('')
  const age = ref(0)

  const setAge = (value) => {
    age.value = value
  }

  const isAdult = computed(() => age.value >= 18)
  const isLoggedIn = computed(() => email.value !== '' && name.value !== '')

  // 回傳要讓外部使用的變數和 function
  return { name, email, age, setAge, isAdult, isLoggedIn }
})
```

## 使用
在元件內使用時要注意，解構狀態會失去響應性，需要搭配 `storeToRefs` 使用
```html
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from './store/user'
const user = useUserStore()

// 直接存取資料和 function
console.log(user.name, user.email, user.isAdult)

// 解構 ref, reactive, computed 時需要搭配 storeToRefs，否則資料修改時不會動態更新
const { name, email, age, isAdult } = storeToRefs(user)
// 解構 function 可以直接使用
const { setAge } = user

// 使用 $patch 修改 store 資料
user.$patch(state => {
  state.age++
})

// 直接改也可以
user.name = 100
name.value = 100

// 呼叫 function 修改
user.setAge(100)
setAge(100)

// 除了 watch 之外，也可以使用 subscribe 偵測資料變更
user.$subscribe((mutation, state) => {
  console.log(mutation, state)
})
</script>
```

元件外也可以使用，例如在路由守衛偵測使用者登入狀態
```js
import { useUserStore } from './store/user'

router.beforeEach((to) => {
  const user = useUserStore()
  if (to.meta.login && !user.isLoggedIn) return '/login'
})
```

## 持久化
Pinia 本身沒有提供持久化功能  
[pinia-plugin-persistedstate](https://npmx.dev/package/pinia-plugin-persistedstate) 可以將狀態保存至 LocalStorage 或其他地方

```bash
npm i pinia-plugin-persistedstate
```

```js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

```js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', 
  () => {
    const name = ref('')
    const age = ref(0)
    return { name }
  },
  {
    persist: {
      // localStorage 資料名稱
      key: 'user',
      // 只存 name
      pick: ['name'],
    },
  }
)
```