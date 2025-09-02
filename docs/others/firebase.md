# Firebase
Firebase 是 Google 提供的後端服務平台，提供了資料庫、身份驗證等功能

## 安裝
- [firebase](https://www.npmjs.com/package/firebase) Firebase 官方 SDK
- [vuefire](https://vuefire.vuejs.org/) Vue 3 的 Firebase 整合套件
```bash
npm i vuefire firebase
```

## 設定
到 Firebase 控制台新增應用程式後取得 apiKey 等資訊
```js
import { VueFire, VueFireAuth } from 'vuefire'

const firebaseApp = initializeApp({
  apiKey: 'xxx'
})

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})
```

## 資料庫
使用 `Firestore`，儲存資料
- `集合 (Collection)`:` 類似資料表，多筆文件的集合
- `文件 (Document)`:` 一筆資料
- `欄位 (Field)`:` 文件內的資料欄位

新增資料
- `addDoc` 單筆新增
```js
import { collection, getFirestore } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'

const db = getFirestore(firebaseApp)
const productsRef = collection(db, 'products')

await addDoc(productsRef, {
  name: 'test',
  price: 100
})
```

查詢資料，利用 VueFire 提供的 Composables，資料會即時更新
- `useCollection` 取得整個集合
- `useDocument` 取得指定文件

:::tip
`useCollection` 和 `useDocument` 有提供 Promise，能判斷資料是否載入完成
```js
const { data: products, promise } = useCollection(productsRef)
await promise
```
:::


```js
import { collection, getFirestore } from 'firebase/firestore'
import { useCollection, useDocument } from 'vuefire'

const db = getFirestore(firebaseApp)
const productsRef = collection(db, 'products')

// 取得整個商品集合
const products = useCollection(productsRef)
// 取得 id 為 123 的商品
const product = useDocument(doc(productsRef, '123'))
```

更新資料
- `updateDoc` 更新指定欄位
- `increment` 數字欄位遞增
```js
import { collection, getFirestore, updateDoc, increment } from 'firebase/firestore'
import { useCollection, useDocument } from 'vuefire'

const db = getFirestore(firebaseApp)
const productsRef = collection(db, 'products')

await updateDoc(doc(productsRef, '123'), {
  price: increment(100),
  name: 'test-test'
})
```

設定資料
- `setDoc` 單筆新增或覆蓋，需指定文件 ID；使用 `merge: true` 可只更新指定欄位
```js
import { collection, getFirestore, setDoc } from 'firebase/firestore'
import { useCollection, useDocument } from 'vuefire'

const db = getFirestore(firebaseApp)
const productsRef = collection(db, 'products')

await setDoc(doc(productsRef, '123'), {
  name: 'test',
}, { merge: true })
```

刪除資料
```js
import { collection, getFirestore, deleteDoc } from 'firebase/firestore'
import { useCollection, useDocument } from 'vuefire'

const db = getFirestore(firebaseApp)
const productsRef = collection(db, 'products')

await deleteDoc(doc(productsRef, '123'))
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
  values.email,
  values.password,
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

const current = useCurrentUser()
```

等待使用者載入完成  
:::danger 注意
`useCurrentUser` 在載入完成前是 `undefined`，載入後會是使用者資料或是 `null`  
因此在進行一些操作時需要等待使用者載入完成，例如路由導航
:::
```js
router.beforeEach(async (to, from, next) => {
  const current = await getCurrentUser()
})
```
