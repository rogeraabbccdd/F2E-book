# 翻牌記憶小遊戲

製作翻牌記憶小遊戲，練習 jQuery 以及 CSS 3D  

## 範例
::: demo [vanilla]
```html
<html>
    <div id="game-cards"></div>
</html>
<style>
#game-cards {
    width: 300px;
}

.card {
    width: 50px;
    height: 90px;
    position: relative;
    float: left;
    margin: 10px;
    /* 設定子元素在 3D 空間內 */
    transform-style: preserve-3d;
    transition: transform 1s;
}
.card-front {
    width: 100%;
    height: 100%;
    background-image: url(/F2E-book/images/ch17/1S.jpg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    /* 隱藏背面 */
    backface-visibility: hidden;
}
.card-back {
    width: 100%;
    height: 100%;
    background-image: url(/F2E-book/images/ch17/Red_back.jpg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    transform: rotateY(180deg);
    backface-visibility: hidden;
}
.card-close {
    transform: rotateY(180deg);
}
</style>
<script>
    for (let i = 0; i < 16; i++) {
      $('#game-cards').append(`
        <div class="card card-close">
          <div class="card-front"></div>
          <div class="card-back"></div>
        </div>
      `)
    }

    // 決定每張的數字
    $('.card').each(function (index) {
      const number = index % 8 + 1
      $(this).find('.card-front').css('background-image', `url(/F2E-book/images/ch17/${number}S.jpg)`)
      $(this).attr('data-number', number)
    })

    // 打亂
    for (let i = 0; i < 20; i++) {
      const randomA = Math.round(Math.random() * 15)
      const randomB = Math.round(Math.random() * 15)
      $('.card').eq(randomA).insertAfter( $('.card').eq(randomB) )
    }

    // 翻牌
    $('#game-cards').on('click', '.card', function () {
      if (
        // .card 沒有 .card-close 代表被翻開
        // 如果已翻開數小於兩張
        $('.card:not(.card-close)').length < 2 &&
        // 且這張牌還沒翻開
        $(this).hasClass('card-close') &&
        // 這張牌還沒配對
        !$(this).hasClass('card-ok')
      ) {
        $(this).removeClass('card-close')
      }

      // 如果翻開兩張了
      if ($('.card:not(.card-close)').length === 2) {
        // 如果兩張一樣
        if (
          $('.card:not(.card-close)').eq(0).attr('data-number') ===
          $('.card:not(.card-close)').eq(1).attr('data-number')
        ) {
          $('.card:not(.card-close)').addClass('card-ok')
          $('.card:not(.card-close)').fadeTo(1000, 0)
        }

        setTimeout(function () {
          // 翻回來
          $('.card:not(.card-close)').addClass('card-close')
          // 過關判斷
          if ( $('.card-ok').length === $('.card').length ) {
            alert('過關')
          }
        }, 1000)
      }
    })
</script>
```
:::  

:::warning 作業
美化你的遊戲，或加入更多的功能  
:::