(function(){
 
//需求二：右边固定栏回到顶部功能
        //获取相关元素
        var backBtn =document.querySelector('.backTop');
        //页面滚动事件
        // document.onscroll=function(){
        //     if(document.documentElement.scrollTop>=930){
        //         backBtn.style.display='block';
        //     }else{
        //         backBtn.style.display='none';
        //     }
        // }
        $(window).scroll(()=>{
            if(document.documentElement.scrollTop>=930){
                backBtn.style.display='block';
            }else{
                backBtn.style.display='none';
            }
        })
        //单击事件
        backBtn.onclick=function(){
            document.documentElement.scrollTop=0;
        } 
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
//需求五；搜索框的聚焦事件
        //方法一用jquery框架
            //获取焦点时的事件
            $('.text').focus(function(){
                this.style.borderColor='#ff6700';
                $('.submit')[0].style.borderColor='#ff6700';
                $('.information')[0].style.display='block';
                $('form').mouseenter(function(){
                    $('.submit')[0].style.borderColor='#ff6700';
                    $('.text')[0].style.borderColor='#ff6700';
                })
                $('form').mouseleave(function(){
                    $('.submit')[0].style.borderColor='#ff6700';
                    $('.text')[0].style.borderColor='#ff6700';
                })
            })
            //失去焦点时的事件
            $('.text').blur(function(){
                this.style.borderColor='#e0e0e0';
                $('.submit')[0].style.borderColor='#e0e0e0';
                $('.information')[0].style.display='none';
                $('form').mouseenter(function(){
                    $('.submit')[0].style.borderColor='#c6c3c3';
                    $('.text')[0].style.borderColor='#c6c3c3';
                })
                $('form').mouseleave(function(){
                    $('.submit')[0].style.borderColor='#e0e0e0';
                    $('.text')[0].style.borderColor='#e0e0e0';
                })
            })
            //鼠标滑入和鼠标滑出事件
            $('form').mouseenter(function(){
                $('.submit')[0].style.borderColor='#c6c3c3';
                $('.text')[0].style.borderColor='#c6c3c3';
            })
            $('form').mouseleave(function(){
                $('.submit')[0].style.borderColor='#e0e0e0';
                $('.text')[0].style.borderColor='#e0e0e0';
            })    
//需求六；搜索框的随机定时事件
        //生成一个n到m之间的随机整数
        function rand(n,m){
            return n+parseInt(Math.random()*(m-n+1));
        }
        var placeHolderArr =['电视','冰箱','手机','小米10','电脑','5G手机','红米手机','小米8青春版',"小米4",'红米5'];
        setInterval(function(){
            $('.text')[0].placeholder=placeHolderArr[rand(0,placeHolderArr.length-1)]
        },3000)
//需求七；固定栏滑动出现二维码事件
        $('.phoneApp').mouseenter(function(){
            $('.newErweima')[0].style.display="block";
            $('.triangle')[0].style.display="block";
        });
        $('.phoneApp').mouseleave(function(){
            $('.newErweima')[0].style.display="none";
            $('.triangle')[0].style.display="none";
        });
        $('.newErweima').mousemove(function(){
            $('.newErweima')[0].style.display="block";
            $('.triangle')[0].style.display="block";
        })
        $('.newErweima').mouseleave(function(){
            $('.newErweima')[0].style.display="none";
            $('.triangle')[0].style.display="none";
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


})()