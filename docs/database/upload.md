# 檔案上傳
將檔案上傳至免費空間 [Cloudinary](https://cloudinary.com/)

## 安裝套件
  ```bash
  npm install multer
  npm install cloudinary
  npm install multer-storage-cloudinary
  ```

## middleware
將上傳檔案寫成 middleware  
和登入一樣，在需要上傳檔案的路由引用，就能接收檔案  

:::tip TIP
`multer` 除了可以處理上傳檔案，也能解析 `multipart/form-data` 格式的請求
:::

```js
import multer from 'multer'
import path from 'path'
import 'dotenv/config'
import { v2 as cloudinary} from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// cloudinary 設定
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

// multer 套件設定
const upload = multer({
  // 指定上傳的檔案儲存到 cloudinary
  storage: new CloudinaryStorage({
    cloudinary
  }),
  // 過濾檔案類型
  fileFilter (req, file, callback) {
    if (!file.mimetype.includes('image')) {
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  // 限制檔案大小為 1MB
  limits: {
    fileSize: 1024 * 1024
  }
})

export default async (req, res, next) => {
  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 如果是 multer 的上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        message = '上傳錯誤'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      // 其他錯誤
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      next()
    }
  })
}
```
