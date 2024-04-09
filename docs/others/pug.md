# Pug

[Pug](https://pugjs.org/api/getting-started.html) 是 HTML 的預處理器  
以縮排簡寫 HTML，減少程式碼數量

## 安裝
- 使用 `npm install -g pug-cli` 全域安裝
- 建立 `.pug` 檔案
- 使用 `pug 路徑` 指令就能編譯出 HTML，路徑可以是檔案或資料夾
  - 加上 `-w` 會自動偵測變更重新產生 HTML
  - 加上 `-P` 會自動格式化輸出的 HTML
  - 加上 `-o 路徑` 可以指定輸出位置

## 基本語法
Pug 使用縮排代表標籤層級，所以編寫時必須注意排版
```pug
//- 這是多行註解，使用時須注意縮排
  這是多行註解，使用時須注意縮排
  這是多行註解，使用時須注意縮排
// 這是編譯後會顯示出來的註解，使用時須注意縮排
  這是編譯後會顯示出來的註解，使用時須注意縮排
  這是編譯後會顯示出來的註解，使用時須注意縮排
//- 標籤只剩名字，class 和 id 直接用 . 和 # 加在標籤後
//- 空一格放內文
h1#title.text-white aaa
//- 若是有 class 或 id 的 div 則可不必加標籤名稱
.myclass#id
  //- 以縮排代表層級
  p hello
  //- 屬性包在標籤後的 () 內
  a.text-danger(href="https://google.com") Google
  //- 屬性太多時可以換行，但要注意縮排
  input(
    type="text"
    name="account"
  )
  //- div 內的純文字以 | 代表同一層
  | abc123
```
```html
<!-- 這是編譯後會顯示出來的註解，使用時須注意縮排
這是編譯後會顯示出來的註解，使用時須注意縮排
這是編譯後會顯示出來的註解，使用時須注意縮排
-->
<h1 class="text-white" id="title">aaa</h1>
<div class="myclass" id="id">
  <p>hello</p><a class="text-danger" href="https://google.com">Google</a>
  <input type="text" name="account"/>
  abc123
</div>
```

## Vite
在 Vite 使用則是要多安裝 `pug`
```
npm install -D pug
```
就能在 `<template>` 中使用 Pug
```html
<template lang="pug">
div
  p Hello World
</template>
```
