# 表單驗證
使用 [VeeValidate](https://vee-validate.logaretm.com/v4/) 和 [yup](https://npmx.dev/package/yup) 進行表單驗證

## 表單驗證規則
使用 yup 定義表單驗證規則  
建議搭配套件 [validator](https://npmx.dev/package/validator)，有更豐富的驗證能使用

```js
import * as yup from 'yup'
import validator from 'validator'

const schema = yup.object({
  account: yup
    // 資料型態
    .string()
    // 必填
    .required('帳號必填')
    // 最短長度
    .min(4, '帳號最少 4 個字')
    // 最長長度
    .max(20, '帳號最多 20 個字')
    // 自訂驗證規則(自訂名稱, 錯誤訊息, function)
    .test('isAlphanumeric', '帳號只能是英數字', (value) => validator.isAlphanumeric(value || '')),
  password: yup
    .string()
    .required('密碼必填')
    .min(4, '密碼最少 4 個字')
    .max(20, '密碼最多 20 個字')
    .test('isAscii', '密碼只能是英數字', (value) => validator.isAscii(value || '')),
  confirmPassword: yup
    .string()
    .required('密碼必填')
    .min(4, '密碼最少 4 個字')
    .max(20, '密碼最多 20 個字')
    .test('isAscii', '密碼只能是英數字', (value) => validator.isAscii(value || ''))
    // 限制值必須是陣列中的其中一個
    // .oneOf(陣列, 錯誤訊息)
    // 取得其他欄位的值當參照
    // yup.ref(欄位名稱)
    .oneOf([yup.ref('password')], '密碼不一致'),
})
```

## 建立表單
使用 `useForm` 建立表單，並綁定 yup 驗證
```js
import { useForm } from 'vee-validate'

// 建立表單
const { defineField, handleSubmit, isSubmitting, errors } = useForm({
  // 設定表單的驗證規則
  validationSchema: schema,
  // 設定表單的欄位預設值
  initialValues: {
    account: '',
    password: '',
    confirmPassword: '',
  },
})
```

使用 `defineField` 建立表單欄位
```js
// 建立表單欄位
const [account] = defineField('account')
const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')
```

處理表單送出
```js
const onFormSubmit = handleSubmit(async () => {
  // ...送出表單
})
```

完成後綁定到 HTML 元素上
```html
<form @submit.prevent="onFormSubmit">
  <input type="text" v-model="account" />
  <p>{{ errors.account }}</p>
  <input type="submit" value="送出" :disabled="isSubmitting">
</form>
```
