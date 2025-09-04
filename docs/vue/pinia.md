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
語法分為 Options 和 Composition 兩種
```js
import { defineStore } from 'pinia'
// 定義一個 ID 為 user 的 store
export const useUserStore = defineStore('user', {
  // 狀態資料，使用箭頭函式定義，類似 data
  state: () => {
    return {
      name: '',
      email: '',
      age: 0,
      isLoggedIn: false
    }
  },
  // 修改狀態用的 function
  actions: {
    setAge (value) {
      this.age = value
    }
  },
  // 可以先將資料處理好用傳出，類似 computed
  getters: {
    // 單純處理
    isAdult () {
      return this.age >= 18
    }
  }
})
```

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// 定義一個 ID 為 user 的 store
export const useUserStore = defineStore('user', () => {
  // state 狀態，使用 ref、reactive 定義
  const name = ref('')
  const email = ref('')
  const age = ref(0)
  const isLoggedIn = ref(false)

  // actions 修改狀態用一般的 function
  const setAge = (value) => {
    age.value = value
  }

  // getters 用 computed 定義
  const isAdult = computed(() => age.value >= 18)

  // 回傳要讓外部使用的資料和方法
  return { name, email, age, setAge, isAdult }
})
```

## 使用
在元件內使用時要注意，解構狀態會失去響應性，需要搭配 `storeToRefs` 使用
```html
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from './store/user'
const user = useUserStore()

// 直接存取 store、getter 值
console.log(user.name, user.email, user.isAdult)

// 解構 state 需要搭配 storeToRefs，否則資料修改時不會動態更新
const { name, email, age, isAdult } = storeToRefs(user)
// 解構 action 直接解構即可，預先定義好的 function 不會改變
const { setAge } = user

// 使用 $patch 修改 store 資料
user.$patch(state => {
  state.age++
})

// 直接改也可以
user.name = 100
name.value = 100

// 呼叫 action 修改
user.setAge(100)
setAge(100)
</script>
```

元件外使用
```js
import { useUserStore } from './store/user'

router.beforeEach((to) => {
  const user = useUserStore()
  if (to.meta.login && !user.isLoggedIn) return '/login'
})
```

## 持久化
Pinia 本身沒有提供持久化功能，可以使用套件 [pinia-plugin-persistedstate](https://www.npmjs.com/package/pinia-plugin-persistedstate) 將狀態保存至 LocalStorage

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

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: '',
      age: 0
    }
  },
  persist: {
    // localStorage 資料名稱
    key: 'user',
    // 只存 name
    pick: ['name'],
  },
})

export const useUserStore = defineStore('user', 
  () => {
    const name = ref('')
    const age = ref(0)
    return { name }
  },
  {
    persist: {
      key: 'user',
      pick: ['name'],
    },
  }
)
```