# Git

學習版本控管觀念、GitHub 及 GitKraken 工具

## 介紹
<img src="/images/ch30/git.png" height="200" style="margin: 10px 0;">  

Git 是一種分散式的版本控制系統，有免費、體積小、分散式的優點 
- 只有保存檔案的差異，而不是整個檔案，所以儲存的體積比較小  
- Git 版本控管就像時光機，能隨時將目錄切換到某個版本時的狀態
- 分散式系統不必隨時和伺服器溝通，所以就算沒有網路也能使用  

使用 Git 之前的檔案可能會是這樣子  
<img src="/images/ch30/gitbefore.jpg" height="400" style="margin: 10px 0;">  

使用 Git 之後，能清楚看到什麼時候修改了什麼檔案  
<img src="/images/ch30/gitafter.png" height="350" style="margin: 10px 0;">  

:::danger 注意
Git 無法檢視 PSD、AI 等非文字檔案修改了哪些東西
:::
### 專有名詞
- `Repository`: 儲存庫
- `Stage`: 暫存檔案，等待提交
- `Commit`: 提交，保存修改紀錄
- `Init`: 初始，用在建立Repo，Repo建立後必須要有第一次commit (First commit 或 Init commit)
- `Clone`: 複製，從遠端複製一份到電腦
- `Pull`: 拉，把資料從遠端下載到電腦
- `Push`: 推，把資料從電腦上傳到遠端
- `Branch`: 分支
- `Merge`: 合併分支
- `Checkout`: 切換分支
- `Local`: 本機
- `Remote`: 遠端伺服器

## GitHub
<img src="/images/ch30/github.png" height="200" style="margin: 10px 0;">  

[GitHub](https://github.com/) 是一個提供 Git 服務的平台，有許多的開源專案
除了 GitHub 外，還有其他提供 Git 服務的平台，如 [GitLab](https://about.gitlab.com/) 與 [Bitbucket](https://bitbucket.org/)  
比較特別的是 GitLab，因為它連整個平台都開源，所以你可以架設一個自己的 GitLab  
:::danger 注意
並不是所有儲存在 Git 服務平台的資料都安全，還是要養成定期備份的習慣   
[搶修反而錯刪！GitLab損失300GB正式環境資料，5千專案遭波及](https://www.ithome.com.tw/news/111634)
:::

### 專有名詞
- `Pull Request`: 分支合併請求
- `Issue`: 議題，回報問題、提出建議與討論
- `Watch`: 關注，接收儲存庫的通知、在首頁顯示動態
- `Fork`: 複製一份別人的 Repo 到自己的帳號

## GitKraken
GitKraken 是一個基本使用免費的 Git GUI 軟體，但若要在不公開的儲存庫使用則需要付費  
<img src="/images/ch30/gitkraken.png" height="300" style="margin: 10px 0;">  

除了這個以外，還有其他的 GUI 軟體，如  
- [Sourcetree](https://www.sourcetreeapp.com/)
- [Fork](https://git-fork.com/)
- [GitHub Desktop](https://desktop.github.com/)

:::warning 注意
將指定作業上傳至 GitHub Classroom，學習 Git 與 GitHub 的操作
:::
