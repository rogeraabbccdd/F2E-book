# jQuery - 動畫

使用 jQuery 編寫動畫效果

## 語法
jQuery 所有的動畫都是基於 `.animate()`語法  
原理是在指定的時間內將 CSS 的值改為指定的數值

- `.animate(CSS, slow/fast/毫秒, 'linear', 完成時的 function )` 動畫
  - `CSS` 要改變的 CSS 屬性，可以用 `+=` 和 `-=` 去做相對的動畫，必填
  - `slow/fast/毫秒` 動畫時間，預設為 `400`
  - `linear` 動畫效果，預設為 `swing`
  - `完成時的 function` 動畫完成後要執行的 function
- `.stop(是否停止之後的動畫, 是否跳到動畫結束)` 停止動畫
- `.fadeOut(slow/fast/毫秒, 'linear', 完成時的 function)` 淡出
- `.fadeIn(slow/fast/毫秒, 'linear', 完成時的 function)` 淡入
- `.fadeTo(slow/fast/毫秒, 透明度, 'linear', 完成時的 function)` 淡出或淡入至指定透明度
- `.fadeToggle(slow/fast/毫秒, 'linear', 完成時的 function)` 切換淡入或淡出
- `.slideDown(slow/fast/毫秒, 'linear', 完成時的 function)` 滑入，遞增 height 至原本高度
- `.slideUp(slow/fast/毫秒, 'linear', 完成時的 function)` 滑出，遞減 height 至 0
- `.slideToggle(slow/fast/毫秒, 'linear', 完成時的 function)` 切換滑入或滑出

:::danger 注意
- `.fadeOut()` 的淡出效果在透明度變為 0 後會加上 `display: none`
- `.animate()` 僅能修改值為數字的 CSS，若需修改顏色，需使用 [jQuery UI](https://jqueryui.com/animate/)
:::

:::tip TIP
jQuery 動畫預設只有 `swing` 和 `linear` 兩種效果  
若要使用其他效果，需引入 [jQuery UI](https://jqueryui.com/easing/)
:::

::: demo [vanilla]
```html
<html>
  <img src="/F2E-book/images/ch15/0104.jpg" alt="" id="principal">
  <br>
  <input type="button" value="變大動畫" id="animate">
  <input type="button" value="停止" id="stop">  
  <input type="button" value="淡出" id="fadeOut">
  <input type="button" value="淡入" id="fadeIn">
  <input type="button" value="半透明" id="fadeTo">
  <input type="button" value="滑入" id="slideDown">
  <input type="button" value="滑出" id="slideUp">
</html>
<script>
  $(function(){
    const principal = $("#principal");

    $("#animate").on("click", function(){
      // 動畫
      principal.animate({
        width: "+=10px",
        height: "+=10px"
      }, 2000, function(){
        console.log("變大了")
      })
    })

    $("#stop").on("click", function(){
      // 停止動畫
      principal.stop(true);
    })

    $("#fadeOut").on("click", function(){
      // 淡出
      principal.fadeOut(2000, function(){
        console.log("淡出了")
      })
    })

    $("#fadeIn").on("click", function(){
      // 淡入
      principal.fadeIn(2000, function(){
        console.log("淡入了")
      })
    })

    $("#fadeTo").on("click", function(){
      // 至指定透明度
      principal.fadeTo(2000, 0.5, function(){
        console.log("半透明")
      })
    })
    
    $("#slideDown").on("click", function(){
      // 滑入，遞增 height 至原本高度
      principal.slideDown(2000, function(){
        console.log("滑入了")
      })
    })

    $("#slideUp").on("click", function(){
      // 滑出，遞減 height 至 0
      principal.slideUp(2000, function(){
        console.log("滑出了")
      })
    })
  })
</script>
```
:::

## 應用範例
圖片輪播範例
::: demo [vanilla]
```html
<html>
  <div id="gallery">
    <div id="imgs">
      <img src="/F2E-book/images/ch15/0551.jpg" alt="">
      <img src="/F2E-book/images/ch15/0552.jpg" alt="">
      <img src="/F2E-book/images/ch15/0553.jpg" alt="">
      <img src="/F2E-book/images/ch15/0554.jpg" alt="">
      <img src="/F2E-book/images/ch15/0555.jpg" alt="">
    </div>
  </div>
  <input type="button" value="&lt;" id="left">
  <input type="button" value="&gt;" id="right">
</html>
<script>
$(function(){
  let now = 0;
  const total = $("#imgs img").length;
  $("#imgs").css("width", total*400);

  $("#right").click(function(){
    if(now < total - 1) {
      now++;
      const move = now*400;
      $("#imgs").stop(true, true)
      $("#imgs").animate({left: `-${move+25}px`}, 1000).animate({left: `-${move}px`}, 100)
    }
  })

  $("#left").click(function(){
    if(now > 0) {
      now--;
      const move = now*400;
      $("#imgs").stop(true, true)
      if(move == 0) {
        $("#imgs").animate({left: `${move+25}px`}, 1000).animate({left: `-${move}px`}, 100)
      }
      else {
        $("#imgs").animate({left: `-${move-25}px`}, 1000).animate({left: `-${move}px`}, 100)
      }
    }
  })
})
</script>
<style>
#gallery {
  width: 400px;
  height: 300px;
  overflow: hidden;
  position: relative;
}

#imgs {
  position: absolute;
  height: 300px;
}

#imgs > img {
  width: 400px;
  height: 300px;
  float: left;
}
</style>
```
:::

卡片範例  
::: demo [vanilla]
```html
<html>
  <div id="imgs2">
    <div><img src="/F2E-book/images/ch15/0551.jpg" alt=""></div>
    <div><img src="/F2E-book/images/ch15/0552.jpg" alt=""></div>
    <div><img src="/F2E-book/images/ch15/0553.jpg" alt=""></div>
    <div><img src="/F2E-book/images/ch15/0554.jpg" alt=""></div>
    <div><img src="/F2E-book/images/ch15/0555.jpg" alt=""></div>
  </div>
</html>
<script>
$('#imgs2 div').hover(function(){
  $(this).stop(true, false).animate({marginTop: 0}, 500)
  $(this).next().stop(true, false).animate({marginTop: 25}, 400)
  $(this).prev().stop(true, false).animate({marginTop: 25}, 400)
},function(){
  $(this).stop(true, false).animate({marginTop: 50}, 500)
  $(this).next().stop(true, false).animate({marginTop: 50}, 400)
  $(this).prev().stop(true, false).animate({marginTop: 50}, 400)
})
</script>
<style>
#imgs2 {
  height: 100px;
  overflow: hidden;
}
#imgs2 div {
  margin-top: 50px;
  float:left
}
#imgs2 img {
  height: 100px;
  width: 100px;
}
</style>
```
:::
