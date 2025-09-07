# 時鐘

透過簡易圓形時鐘熟悉 DOM 的操作

## Date
`Date` 是內建的物件，可以對時間做簡單的處理  
內建的物件功能有限，如果想要更方便的做時間處理的話，建議使用套件  
  
常見的日期處理套件
- [moment.js](https://momentjs.com/)
- [day.js](https://day.js.org/)
- [luxon](https://moment.github.io/luxon/)  

| 函式 | 說明 |
|---|---|
|getFullYear() | 西元日期 |
|getMonth() | 月份，從 0 開始 |
|getDate() | 日 |
|getDay() | 星期，從星期天 0 開始  |
|getHours() | 小時，0 到 23 |
|getMinutes() | 分鐘，0 到 59 |
|getSeconds() | 秒鐘，0 到 59|
|getMilliseconds() | 毫秒， 0 到 999 |
|getTime() | 從 1970/1/1 00:00:00 到現在的毫秒數 |
|toDateString() | 轉換成日期字串 |
|toTimeString() | 轉換成時間字串 |
|toLocaleDateString() | 依語言格式化日期 |
|toLocaleTimeString() | 依語言格式化時間 |
|toLocaleString(語言) | 依語言格式化輸出 |

:::danger 注意
大多數語言的時間戳記都是以秒為單位，但是 JavaScript 是毫秒
:::

```js
// () 內可以指定時間，不放的話就是現在
const dateStr = new Date("2024/04/02 12:00:00")
const dateNum = new Date(2024, 4, 2, 12, 0, 0)
const now = new Date()

// 可以用表內的函式取得時間後輸出
const string1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
console.log("現在時間是 " + string1)

// 也可以將時間依語言格式化輸出
const string2 = now.toLocaleString("zh-tw")
console.log("現在時間是 " + string2)
```

## 時鐘
透過簡易圓形時鐘熟悉 DOM 的操作和計時器  
::: demo [vanilla]
```html
<html>
  <link href="https://fonts.googleapis.com/css?family=Orbitron" rel="stylesheet">
  <div id="example-clock-container">
    <div id="example-clock-content">
      <div id="example-clock-main">
        <div id="example-clock-hour"></div>
        <div id="example-clock-minute"></div>
        <div id="example-clock-second"></div>
        <div id="example-clock-dot"></div>
      </div>
      <div id="example-clock-time">
        <span id="example-clock-time-hour"></span>:
        <span id="example-clock-time-minute"></span>:
        <span id="example-clock-time-second"></span>
      </div>
    </div>
  </div>
</html>
<style>
#example-clock-container {
  width: 100%;
  height: 300px;
  margin: 0 auto;
  display: table;
  vertical-align: middle;
  background-image: url(https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&dl=diego-ph-222506-unsplash.jpg);
  background-size: cover;
  background-position: center 60%;
  overflow: hidden;
}

#example-clock-content {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: table;
  vertical-align: middle;
  display: table-cell;
  animation: light 9s linear infinite;
}

#example-clock-main {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  background: transparent;
  border: white 5px solid;
  filter: drop-shadow(0px 0px 5px #ff0);
  vertical-align: middle;
  margin: 0 auto;
}

#example-clock-hour {
  position: absolute;
  top: calc(50% - 3px);
  width: 20%;
  height: 6px;
  background: #40e0d0;
  transform-origin: right center;
  transform: rotate(0deg);
  left: 30%;
  border-radius: 20px;
}

#example-clock-minute {
  position: absolute;
  top: calc(50% - 3px);
  width: 40%;
  height: 6px;
  background: #00ff7f;
  transform-origin: right center;
  transform: rotate(0deg);
  left: 10%;
  border-radius: 20px;
}

#example-clock-second {
  position: absolute;
  top: calc(50% - 3px);
  width: 40%;
  height: 6px;
  background: #ff1493;
  transform-origin: right center;
  transform: rotate(0deg);
  left: 10%;
  border-radius: 20px;
}

#example-clock-dot {
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
}

#example-clock-time {
  text-align: center;
  margin:20px auto;
  font-size: 30px;
  color:#fff;
  font-family: 'Orbitron';
}

@keyframes light {
  from {
    filter: drop-shadow(0px 0px 10px #ff0);
  }

  33% {
    filter: drop-shadow(0px 0px 10px #0ff);
  }

  66% {
    filter: drop-shadow(0px 0px 10px #f0f);
  }

  to {
    filter: drop-shadow(0px 0px 10px #ff0);
  }
}
</style>
<script>
  const hourEl = document.getElementById("example-clock-hour");
  const minuteEl = document.getElementById("example-clock-minute");
  const secEl = document.getElementById("example-clock-second");
  const hourTextEl = document.getElementById("example-clock-time-hour");
  const minuteTextEl = document.getElementById("example-clock-time-minute");
  const secTextEl = document.getElementById("example-clock-time-second");
  
  const setDate = () => {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    hourEl.style.transform = `rotate( ${h*30+90}deg )`;
    minuteEl.style.transform = `rotate( ${m*6+90}deg )`;
    secEl.style.transform = `rotate( ${s*6+90}deg )`;

    hourTextEl.innerText = h.toString().padStart(2, "0");
    minuteTextEl.innerText = m.toString().padStart(2, "0");
    secTextEl.innerText = s.toString().padStart(2, "0");
  }
  
  setInterval(setDate, 1000);
  setDate();
</script>
```
:::

:::warning 作業
美化你的時鐘，或加入更多的功能  
:::