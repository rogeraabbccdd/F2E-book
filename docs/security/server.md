# 後端防護
Express.js 相關防護措施

## Rate Limit
使用 [express-rate-limit](https://express-rate-limit.mintlify.app/overview)，進行流量管制
```js
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 時間區間，15 分鐘
  limit: 100,               // 時間區間內最大請求次數
})

// 由於 render 伺服器的機制，需要設定這個才能取得請求的實際 IP
app.set('trust proxy', 1)

app.use(limiter)
```

## Helmet
使用 [Helmet](https://helmetjs.github.io/)，進行簡易防護  
- 預設阻擋許多攻擊種類和漏洞
- 防止暴露 `X-Powered-By`，Express 預設會顯示，讓攻擊者能針對這個套件的漏洞攻擊

<ImageFigure
  src="/images/x-power-by-express.png"
  title="二維陣列概念"
  alt="二維陣列概念"
>X-Powered-By: Express</ImageFigure>

```js
import helmet from 'helmet'

app.use(helmet())
```
