# Recaptcha
使用 Google Recaptcha 加強安全性

## 前端
使用 [vue-recaptcha-v3](https://npmx.dev/package/vue-recaptcha-v3) 進行防護  
先找到建立 Vue 實體的位置，加入設定  
```js
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY
})
```
需要進行防護的表單送出時加上  
```js
const recaptcha = useReCaptcha()

const submit = handleSubmit(async () => {
  // 等待 recaptcha 載入完成
  await recaptcha.recaptchaLoaded()

  // 執行 recaptcha 動作 login，名稱可自訂
  const token = await recaptcha.executeRecaptcha('login')

  // 送出資料到後端時加上 recaptcha 回傳的 token
  await apiProduct.create({
    // ...其他表單資料
    'g-recaptcha-response': token,
  })
})
```
也可以視情況顯示或隱藏徽章
```js
const recaptcha = useReCaptcha()
recaptcha.instance.value.showBadge()
recaptcha.instance.value.hideBadge()
```

## 後端
使用 [express-recaptcha](https://npmx.dev/package/express-recaptcha) 套件進行後端處理  
編寫成 middleware 後，在需要的路由使用  
```js
import { RecaptchaV3 } from 'express-recaptcha'

const recaptcha = new RecaptchaV3(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY)

export default async (req, res, next) => {
  recaptcha.verify(req, (error, data) => {
    // data.score，區間是 0 ~ 1，分數越低越像機器人
    if (!error && data.score >= 0.5) {
      next()
    } else {
      res.status(400).json({ success: false, message: 'Recaptcha Error' })
    }
  })
}
```