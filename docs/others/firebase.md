# Firebase
Firebase 是 Google 提供的後端服務平台，提供了資料庫、身份驗證等功能

## 安裝
- [firebase](https://npmx.dev/package/firebase) Firebase 官方 SDK
- [vuefire](https://vuefire.vuejs.org/) Vue 3 的 Firebase 整合套件
```bash
npm i vuefire firebase
```

## 設定
到 Firebase 控制台新增應用程式後，複製 apiKey 等設定資訊
```js
import { initializeApp } from 'firebase/app'
import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'

// 貼上 Firebase 控制台提供的設定
const firebaseApp = initializeApp({
  apiKey: 'xxx',
  authDomain: 'xxx',
  projectId: 'xxx',
  appId: 'xxx',
})

const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.mount('#app')
```

## 資料庫
使用 `Firestore`，儲存資料
- `集合 (Collection)`: 類似資料表，多筆文件的集合
- `文件 (Document)`: 一筆資料
- `欄位 (Field)`: 文件內的資料欄位

在元件內使用 VueFire 提供的 `useFirestore()` 取得資料庫

新增資料
- `addDoc` 單筆新增，自動產生文件 ID
```js
import { addDoc, collection } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()
const productsRef = collection(db, 'products')

await addDoc(productsRef, {
  name: 'test',
  price: 100
})
```

查詢資料，利用 VueFire 提供的 Composables，資料會即時更新
- `useCollection` 取得整個集合
- `useDocument` 取得指定文件

```js
import { collection, doc } from 'firebase/firestore'
import { useCollection, useDocument, useFirestore } from 'vuefire'

const db = useFirestore()
const productsRef = collection(db, 'products')

// 取得整個商品集合
const products = useCollection(productsRef)
// 取得 id 為 123 的商品
const product = useDocument(doc(productsRef, '123'))
```

:::tip TIP
`useCollection` 和 `useDocument` 有提供 `pending` 和 `promise`，能判斷資料是否載入完成  
`promise` 是 ref，等待時要加上 `.value`
```js
const { data: products, pending, promise } = useCollection(productsRef)
await promise.value
```
:::

更新資料
- `updateDoc` 更新指定欄位
- `increment` 數字欄位遞增
```js
import { collection, doc, increment, updateDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()
const productsRef = collection(db, 'products')

await updateDoc(doc(productsRef, '123'), {
  price: increment(100),
  name: 'test-test'
})
```

設定資料
- `setDoc` 單筆新增或覆蓋，需指定文件 ID；使用 `merge: true` 可只更新指定欄位
```js
import { collection, doc, setDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()
const productsRef = collection(db, 'products')

await setDoc(doc(productsRef, '123'), {
  name: 'test',
}, { merge: true })
```

刪除資料
```js
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()
const productsRef = collection(db, 'products')

await deleteDoc(doc(productsRef, '123'))
```

## 安全規則
Firestore 的資料是由前端直接讀寫，所以必須在 Firebase 控制台設定安全規則  
限制誰可以讀寫哪些資料，否則任何人都能修改資料庫的所有資料  

:::danger 注意
建立資料庫時選擇的「測試模式」會開放所有人讀寫，且有期限，正式使用前一定要修改規則
:::

以每個使用者只能讀寫自己的資料為例，資料儲存在 `users/使用者ID/` 底下
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // users/使用者ID 底下的所有文件
    match /users/{userId}/{document=**} {
      // 必須登入，且登入的使用者 ID 和路徑的使用者 ID 相同
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 身份驗證
Firebase Authentication 提供多種身份驗證方式，以信箱登入為例

註冊
```js
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth()

const user = await createUserWithEmailAndPassword(
  auth,
  'test@test.com',
  'abcd1234',
)
```

登入
```js
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth()

await signInWithEmailAndPassword(
  auth,
  'test@test.com',
  'abcd1234',
)
```

登出
```js
import { signOut } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth()

await signOut(auth)
```

取得登入狀態
```js
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
```

等待使用者載入完成  
:::danger 注意
`useCurrentUser` 在載入完成前是 `undefined`，載入後會是使用者資料或是 `null`  
因此在進行一些操作時需要等待使用者載入完成，例如路由導航
:::
```js
import { getCurrentUser } from 'vuefire'

router.beforeEach(async (to) => {
  // 等待使用者載入完成，未登入時會是 null
  const user = await getCurrentUser()
  // 未登入卻去登入限定頁，回登入頁
  if (to.meta.login && !user) {
    return '/login'
  }
})
```
