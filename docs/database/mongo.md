# MongoDB

MongoDB Atlas 雲端資料庫的設定與工具  

## MongoDB Atlas
課程使用 [MongoDB Atlas](https://www.mongodb.com/atlas) 免費雲端資料庫，不需要在電腦安裝 MongoDB  
在不同電腦上都能連到同一個資料庫

1. 註冊 MongoDB Atlas 帳號
2. 建立 Cluster，方案選擇免費的 `Free`，地區選擇離台灣較近的地區
3. 在 Database Access 建立資料庫使用者，設定帳號密碼
4. 在 Network Access 加入 `0.0.0.0/0`，允許所有 IP 連線
5. 在 Cluster 點選 Connect，選擇 Drivers，複製連線字串

:::danger 注意
- 開放所有 IP 後，任何人只要有帳號密碼就能連線，連線字串不能上傳到 GitHub
- 密碼建議只使用英文和數字，特殊符號會讓連線字串解析錯誤
:::

複製的連線字串沒有資料庫名稱，需要自己加在 `.net/` 和 `?` 之間  
沒有加的話，資料會存到預設的 `test` 資料庫
```ini
DB_URL=mongodb+srv://帳號:密碼@cluster0.xxxxx.mongodb.net/資料庫名稱?retryWrites=true&w=majority
```

:::tip TIP
如果想在自己的電腦安裝 MongoDB，可以參考[官方安裝說明](https://www.mongodb.com/docs/manual/installation/)  
:::

## 工具
可以使用下列工具檢視、編輯資料庫內容，Atlas 網站上的 Data Explorer 也有相同的功能
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

## 資料管理
使用 Compass 可以匯入、匯出資料，支援 JSON 和 CSV 格式  
- 匯出：進入資料表後，點選 Export Data
- 匯入：進入資料表後，點選 Add Data，選擇 Import JSON or CSV file

## 資料庫規劃
<PDF src="/F2E-book/assets/ch26/uml.pdf"></PDF>
