# 進階 JavaScript 語法

try catch、Promise 和 async await

## try catch
try catch 可以處理程式的錯誤，讓程式不會因為錯誤而影響執行  
也可以利用這種寫法進行流程控制  

### 避免出現錯誤訊息
使用一個不存在的函式
```js
const message = () => {
  try {
    // 使用不存在的函式，觸發錯誤
    alertt("Welcome guest!");
  } catch(err) {
    // 處理錯誤
    console.log(err.message);
  }
}
message();
```

### 流程控制
輸入驗證流程範例
```js
const validate = (input) => {
  try {
    // 可以使用 throw 拋出錯誤，通常會使用 new Error
    if(input == '') throw new Error('empty');
    if(isNaN(input)) throw new Error('not a number');
    if(input < 5) throw new Error('too low');
    if(input > 10) throw new Error('too high');
    console.log('驗證成功');
  }
  catch(err) {
    console.log(`驗證失敗: ${err.message}`);
  }
}
validate(1);
```

:::warning 練習
製作註冊資料驗證 function，使用 `throw` 拋出錯誤，並用 `try catch` 處理  
驗證規則
- 帳號不能空白
- 帳號長度需為 4 ~ 20 個字
- 密碼至少需要 8 個字
- 密碼不能和帳號相同

```js
const register = (account, password) => {
  // ... 在此寫你的程式碼
}

console.log(register(prompt('帳號'), prompt('密碼')))
```

測試資料
|帳號|密碼|輸出|
|---|---|---|
|(空白)|12345678|驗證失敗: 帳號不能空白|
|abc|12345678|驗證失敗: 帳號長度需為 4 ~ 20 個字|
|abcd|1234|驗證失敗: 密碼至少需要 8 個字|
|abcd1234|abcd1234|驗證失敗: 密碼不能和帳號相同|
|abcd|12345678|註冊成功|
:::


## Promise
`Promise` 就跟單字的意思一樣，就是承諾  
當承諾達成時，執行 `.then()` 內的程式，若有錯誤則執行 `.catch()` 內的程式

假設媽媽說，如果你這禮拜考試及格，下個禮拜就給你零用錢  
現在你不知道到底會不會拿到零用錢，有可能你考試順利及格，也有可能因為沒讀書而考不好  
這就是一個 `Promise` ，且有三種狀態  
- `pending` 還沒發生或等待中，你還不知道考試結果  
- `resolved` 順利通過考試，拿到零用錢  
- `rejected` 沒讀書考不好，沒有零用錢  

以上比喻轉成 Promise 物件程式碼  
```js
const passed = true
const willGetMoney = new Promise((resolve, reject) => {
  if (passed) {
    resolve('得到零用錢')
  } else {
    reject(new Error('考試不及格'))
  }
})

willGetMoney.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})
```

也可以包成 function  
```js
const willGetMoney = passed => {
  return new Promise((resolve, reject) => {
    if (passed) {
      resolve('得到零用錢')
    } else {
      reject(new Error('考試不及格'))
    }
  })
}

willGetMoney(true).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})
```

:::warning 練習
製作抽獎程式  
```js
const draw = () => {
  return new Promise((resolve, reject) => {
    // ... 在此寫你的程式碼
  })
}
```
- 點抽獎按鈕後，等待 2 秒才公布結果
- 有 30% 的機率中獎，中獎時出現 `恭喜中獎`、沒中獎時出現錯誤 `沒有中獎`
:::

## async await
將 function 加上 `async`，就可以在 function 內使用等待程式執行完畢的 `await`，變成同步函式  
也可以透過 `await` 的幫助，改善 Promise 可讀性  
<img src="/images/ch19/sync.jpg" height="300" style="margin: 10px 0;">
<img src="/images/ch19/callbackhell.jpg" height="300" style="margin: 10px 0;">

:::danger 注意
await 只能加在 async function 內，且 await 只能加在 Promise 函式
:::

```js
const wait = time => {
  return new Promise((resolve, reject) => {
    // 只能接受數字
    if(isNaN(time)) {
      reject(new Error('不是數字'))
    }
    // 以 setTimeout 模擬長時間運算
    setTimeout(() => {
      resolve(`過了 ${time / 1000} 秒`)
    }, time)
  })
}

const asyncfunc = async () => {
  // 建議搭配 try catch 使用
  try {
    // 當 await 的 promise 成功時，可以直接用變數接 .then() 內的值
    const msg1 = await wait(3000)
    console.log('msg1' + msg1)
    const msg2 = await wait(2000)
    console.log('msg2' + msg2)
    // 當 await 的 promise 有錯誤時，會導向 下面的 catch
    // const msg3 = await wait('abc')
    // console.log('msg3' + msg3)
    console.log('finish')
    return msg1 + msg2
  } catch (e) {
    console.log('error' + e.message)
    return Promise.reject(new Error(e.message))
  }
}

// async function 回傳的資料型態是 Promise，所以要用 .then() 接
// 也可以用 Promise.reject 拋出錯誤，讓 .catch() 接
asyncfunc().then(result => {
  console.log(result)
}).catch(err => {
  console.log(err)
})
```

:::danger 注意
在使用 await 的同時，不要錯過同時執行的機會  
執行這段程式碼需要 3000 毫秒
```js
const func1 = async () => {
  const wait1 = await wait(1500);
  const wait2 = await wait(1500);
  return wait1 + wait2;
}
func1()
```
但是執行這段程式碼只需要 1500 毫秒，因為兩個 wait 同時發生
```js
const func2 = async () => {
  let wait1 = wait(1500);
  let wait2 = wait(1500);
  wait1 = await wait1;
  wait2 = await wait2;
  return wait1 + wait2;
}
func2()
```
:::

:::warning 練習
將上一題的抽獎程式，改用 async await 和 try catch 寫法顯示結果
:::

## Event Loop
JavaScript 一次只能做一件事，稱為單執行緒  
等待 `setTimeout` 或 AJAX 時網頁不會卡住，是因為有 Event Loop 在安排程式的執行順序  

- 一般程式碼會放在 `Call Stack` 依序執行
- 遇到 `setTimeout`、AJAX 這類需要等待的工作，會交給瀏覽器處理，不會卡在 `Call Stack`
- 等待完成後，要執行的 function 會放進佇列排隊
- `Event Loop` 會不斷檢查，等 `Call Stack` 空了，才從佇列拿出下一個 function 執行

佇列又分成兩種，`Promise` 的 `.then()` 會放在優先度較高的 `Microtask Queue`  
所以會比 `setTimeout` 先執行

```js
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')
// 輸出順序: 1 4 3 2
```

:::danger 注意
如果迴圈一直執行不結束，`Call Stack` 永遠不會空，其他程式和事件都沒機會執行，網頁就會卡死  
`await` 會暫停 async function 並讓出執行權，其他程式才有機會執行
:::

延伸閱讀
- [JavaScript Visualizer 9000](https://www.jsv9000.app/) 視覺化工具，可以貼上程式碼觀察執行順序
- [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) JSConf EU 2014 演講影片
- [MDN：並行模型和事件循環](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Execution_model)


## 綜合練習
:::warning 練習
製作紅綠燈  
網頁上有一個燈號，使用 async await 依序切換  
- 紅燈亮 3 秒
- 綠燈亮 2 秒
- 黃燈亮 1 秒

提示: 可以使用本章的 `wait()` function
:::
