# 打殭屍小遊戲

製作打殭屍小遊戲，練習 jQuery 的 DOM 操作和動畫  

## 範例
::: demo [vanilla]
```html
<html>
    <div id="game-zombie"></div>
    <input type="button" value="開始遊戲" id="start">
    <p> 分數: <span id="score">0</span> 分</p>
    <p> 剩餘 <span id="sec">30</span> 秒</p>
</html>
<style>
    #game-zombie {
        width: 400px;
        height: 400px;
        background: black;
        cursor: url(/F2E-book/images/ch16/cursor.png) 50 50, auto;
        overflow: hidden;
        position: relative;
    }
    #game-zombie img {
        height: 150px;
        position: absolute;
    }
</style>
<script>
    $(function(){
        // 分數
        let score = 0;
        // 遊戲時間
        let sec = 30;

        // 遊戲倒數計時
        let gametimer = 0;

        // // 殭屍流水號
        let zbid = 0;

        // 隨機
        const rand = (num) => {
            return Math.round(Math.random()*num);
        }

        // 移動殭屍
        const movezb = (id) => {
            $(`#zb${id}`).animate({ 
                left: rand(70)+"%", 
                top: rand(70)+"%"
            }, 3000, function(){
                movezb(id);
            })
        }

        // 點開始按鈕時
        $("#start").on("click", function(){
            // 將按鈕停用
            $(this).attr("disabled", true);

            // 重設時間及分數
            sec = 30;
            $("#sec").text(sec);
            score = 0;
            $("#score").text(score);

            // 開始倒數
            gametimer = setInterval(()=> {
                // 秒數減 1，修改文字
                sec--;
                $("#sec").text(sec);

                // 如果到 0
                if(sec == 0){
                    clearInterval(gametimer);
                    $(this).attr("disabled", false);
                    setTimeout(()=>{
                        alert("時間到");
                        $("#game-zombie img").remove();
                    }, 100)
                }

                let num = rand(10);
                if(num > 5) {
                    $("#game-zombie").append(`<img src="/F2E-book/images/ch16/kodai_sacabambaspis.png" id="zb${zbid}">`);
                    $(`#zb${zbid}`).css({ 
                        left: rand(70)+"%", 
                        top: rand(70)+"%"
                    });
                    movezb(zbid);
                    zbid++;
                }
            }, 1000)
        })

        $("#game-zombie").on("click", "img", function(){
            $(this).attr("src", "/F2E-book/images/ch16/blood.png");
            $(this).stop();
            $(this).css("pointer-events", "none");
            score++;
            $("#score").text(score);
        })
    })
</script>
```
:::

:::warning 作業
美化你的遊戲，或加入更多的功能  
:::
