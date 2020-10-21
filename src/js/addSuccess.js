(function(){
 

    //需求三：滑动下载App出现二维码功能
           //方法一
               // var app=document.querySelector(".app");
               // var downApp=document.querySelector(".downApp");
               // var erweima=document.querySelector("#erweima");
               // app.onmouseenter=function(){
               //     downApp.style.display='block';
               //     erweima.style.display='block';
               // }
               // app.onmouseleave=function(){
               //     downApp.style.display='none';
               //     erweima.style.display='none';
               // }
           //方法二用jquery框架
               $('.app').mouseenter(function(){  
                   $('.downApp').finish();//完成动画
                   $('#erweima').finish();
                   $('.downApp').slideDown(200,'linear')//显示
                   $('#erweima').slideDown(200,'linear')
               })
               $('.app').mouseleave(function(){  
                   $('.downApp').finish();
                   $('#erweima').finish();
                   $('.downApp').slideUp(200,'linear')//隐藏
                   $('#erweima').slideUp(200,'linear')
               })  
   //需求四：小米logo的切换效果
           //方法一用jquery框架
           $('.animateLogo').mouseenter(function(){
               $('.LOGO').animate({
                   left:55
               },100,'linear')
               $('.house').animate({
                   left:14
               },100,'linear')
           })
           $('.animateLogo').mouseleave(function(){
               $('.LOGO').animate({
                   left:14
               },100,'linear')
               $('.house').animate({
                   left:-28
               },100,'linear')
           })       
   
   
           
   
   //需求十一：footer下面的小需求滑动微信有二维码图片
           $('.weixing').mouseenter(function(){
               $('.weixingImg').css('display','block');
           })
           $('.weixing').mouseleave(function(){
               $('.weixingImg').css('display','none');
           })
   //需求十二：copy下面的小需求图片切换
       var timer_1=setInterval(function qiehuan_1(){
           $('.anquanimg_1').css('display','none')
       },3000)
       var timer_2=setInterval(function qiehuan_2(){
           $('.anquanimg_1').css('display','inline-block')
       },6000)
   
       document.onvisibilitychange = function () {
           //浏览器窗口不显示的时候就停止定时器
           if (document.visibilityState == "hidden") {
               clearInterval(timer_1)
               clearInterval(timer_2)
           }
           //浏览器窗口显示的时候重新开始定时器
           if (document.visibilityState == "visible") {
               timer_1=setInterval(function qiehuan_1(){
                   $('.anquanimg_1').css('display','none')
               },3000)
               timer_2=setInterval(function qiehuan_2(){
                   $('.anquanimg_1').css('display','inline-block')
               },6000)
           }
       }


       //上面的是index首页的js文件
            //需求一:
           
   
   
   })()