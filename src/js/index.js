(function(){
    //需求一：时钟倒计时
        //分析需求小时，分钟，秒随时间的变化在页面中显示距离倒计时还有多久
        //1.获取相关元素
        var h=document.querySelector('.hours');
        var m=document.querySelector('.minutes');
        var s=document.querySelector('.seconds');
        //2.实现需求
        distanceTime('2020-10-07 16:40');
        var timer =setInterval(function(){
            distanceTime('2020-10-7 16:40');
        },1000)
        //封装一个函数
            //传参times为：2020-10-7 16:40格式
        function distanceTime(times){
            var starTime =Date.now();//现在时间距离格林威治时间的毫秒数
            var end =new Date(times);
            var endTime =end.getTime();//截止时间距离格林威治时间的毫秒数
            var time = endTime-starTime;//两者距离格林威治时间的毫秒数
            //得到距离的天数
            var day =time/(1000*60*60*24);
            day =Math.floor(day);
            //得到的小时数
            var afterHours =time-(day*1000*60*60*24);//剩下小时的毫秒数
            var hours =afterHours/(1000*60*60);
            hours =Math.floor(hours);
            //得到的分钟数
            var afterMinutes =afterHours-(hours*1000*60*60);//剩下分钟的毫秒数
            var minutes =afterMinutes/(1000*60);
            minutes =Math.floor(minutes);
            //得到的秒数
            var afterSeconds = afterMinutes-minutes*1000*60;//剩下秒数的毫秒数
            var seconds=afterSeconds/1000;
            seconds=Math.floor(seconds);
            //得到了hours,minutes,seconds
            if(hours<10){
                h.innerHTML='0'+hours;
            }else{
                h.innerHTML=hours;
            }
            if(minutes<10){
                m.innerHTML='0'+minutes;
            }else{
                m.innerHTML=minutes;
            }
            if(seconds<10){
                s.innerHTML='0'+seconds;
            }else{
                s.innerHTML=seconds;
            }
            //判断结束的条件
            if(hours==0&&minutes==0&&seconds==0){
                clearInterval(timer);
            }
        }
//需求二：右边固定栏回到顶部功能
        //获取相关元素
        var backBtn =document.querySelector('.backTop');
        //页面滚动事件
        document.onscroll=function(){
            if(document.documentElement.scrollTop>=930){
                backBtn.style.display='block';
            }else{
                backBtn.style.display='none';
            }
        }
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
//需求八；列表边框颜色随机
        //生成一个n到m之间的随机整数
        function rand(n,m){
            return n+parseInt(Math.random()*(m-n+1));
        }
        //生成一个16进制的随机颜色
        function color(){
            var result= "#";
            for(var i=0;i<6;i++){
                result += rand(0,15).toString(16)
                // 把十进制的数字变成十六进制的字符串:0 1 ...9 a b c d f
            }
            return result;
        }
        // 获取相关元素
        var liArr =document.querySelectorAll('.ulli ul li a');
        for(var i =0;i<liArr.length;i++){
            liArr[i].style.borderColor=color();
        }
//需求九；列表点击轮换事件（轮播图功能）
        //方法一用jquery框架
            //分析需求
                 /* 
                    1每隔3秒时间ul向左移动992px
                    2
                 
                 */
        var num =0;
        var ullitimer_1 = setInterval(leftUntil,2000);
        function leftUntil(){
            num++;
            $('.leftbtn i').removeClass('gray');
            var beforeLeft =$('.ulli ul').position().left;
            if(num==1||num==2||num==3){
                $('.ulli ul').animate({
                    left:-992+beforeLeft
                },600,'linear')
                
            }else if(num==4){
                $('.ulli ul').animate({
                    left:-744+beforeLeft
                },600,'linear')
                $('.rightbtn i').toggleClass('gray')
            }else if(num==5){
                $('.ulli ul').animate({
                    left:0
                },600,'linear')
                $('.rightbtn i').toggleClass('gray')
                $('.leftbtn i').toggleClass('gray')
                num=0;
            }
        }
        //分析需求
        //1点击leftbtn按钮时候，关掉ullitimer_1定时器,ul的left向左移动992px或者248px
        //2当left=0时候，leftbtn颜色变成$('.leftbtn i')的颜色变成#dcdcdc。
        //3点击rightbtn按钮时候，关掉ullitimer_1定时器，ul的left向右移动992px或者248px
        //4当left=xxxx时候，rightbtn颜色变成$('.leftbtn i')的颜色变成#dcdcdc。
        
        /* 
            2976,3720
        */
       $('.leftbtn').click(function(){
        clearInterval(ullitimer_1);
        $('.ulli ul').animate().finish();
        var beforeLeft =$('.ulli ul').position().left;
        if(beforeLeft==0){
            $('.ulli ul').animate({
                left:0
            },600,'linear')
            
        }else if(beforeLeft==-3720.0001525878906){
            $('.ulli ul').animate({
                left:-2976
            },600,'linear')
            $('.rightbtn i').toggleClass('gray');
        }else if(beforeLeft==-992.0000305175781){
            $('.ulli ul').animate({
                left:beforeLeft+992
            },600,'linear')
            $('.leftbtn i').addClass('gray');
        }
        else{
            $('.ulli ul').animate({
                left:beforeLeft+992
            },600,'linear')
            $('.leftbtn i').removeClass('gray');
           
        }
        
    })
    $('.rightbtn').click(function(){
        clearInterval(ullitimer_1);
        $('.ulli ul').animate().finish();
        var beforeLeft =$('.ulli ul').position().left;
        if(beforeLeft==-3720.0001525878906){
            $('.ulli ul').animate({
                left:-3720
            },600,'linear')
            
        }else if(beforeLeft==-2976.0001525878906){
            $('.ulli ul').animate({
                left:-3720
            },600,'linear')
            $('.rightbtn i').toggleClass('gray');
        }else{
            $('.ulli ul').animate({
                left:beforeLeft-992
            },600,'linear')
            $('.leftbtn i').removeClass('gray');
        }   
    })

        
//需求十：小米轮播图（利用swiper自动生成轮播图）
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            effect: 'fade',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            loop: true, // 循环模式选项
            autoplay:{
                delay:3000
            }
        });
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

//需求十二：search滑动出现phonelist效果
    $('.search-cenList')
    .children('.zhangkai').on('mouseenter',function fn1(){
        $('.phone_list').stop()
        $('.phone_list').slideDown(200,'linear')
    })
    $('.search-cenList')
    .children('.zhangkai').on('mouseleave',function fn2() {
        $('.phone_list').stop()
        $('.phone_list').slideUp(200,'linear')
    })
    $('.phone_list').mousemove(function(){
        $(this).stop();
    })
    $('.phone_list').mouseout(function(){
        $(this).stop();
        $(this).slideUp(200,'linear')
    })
    //在postlist下来的时候滑动切换选项卡功能
        $('.zhangkai').mousemove(function(){
            var index =$(this).index();
            //0,1,2,3,4,5,6
            $(this).parent()
            .parent()
            .siblings()
            .eq(2)
            .find('.one')
            .eq(index)
            .css('display','block')
            .siblings()
            .css('display','none')
        })

//需求十三：main-top滑动出现phonelist效果
    //移入li中，使得它所对应的盒子显示
    $('.main-topLeft')
    .children('ul')
    .children('li')
    .mouseenter(function(){
        $('.phone_list').finish()
        var index =$(this).index();
        $('.phoneList')[index].style.display='block';
    })
    //移出li中，使得它所对应的盒子隐藏
    .mouseleave(function(){
        var index =$(this).index();
        $('.phoneList')[index].style.display='none';
    })
    //移入盒子中使得这个盒子不消失
    $('.phoneList').mouseenter(function(){
        $(this).css('display','block');
    })
    //移出盒子中使得这个盒子隐藏
    .mouseleave(function(){
        $(this).css('display','none');
    })
    //发送图片数据请求，请求indexList.JSON文件
        $.ajax({
            url:'../json/indexList.json',
            success:function(res){
                $.each(res,function(i,item){
                    if(i<23){
                        $(`.phoneList_1 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }
                    if(i<24){
                        $(`.phoneList_2 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }  
                    if(i<15){
                        $(`.phoneList_3 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }
                    if(i<24){
                        $(`.phoneList_4 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }
                    if(i<15){
                        $(`.phoneList_5 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }
                    if(i<15){
                        $(`.phoneList_6 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }
                    if(i<12){
                        $(`.phoneList_7 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }
                    if(i<15){
                        $(`.phoneList_8 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }
                    if(i<15){
                        $(`.phoneList_9 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }
                    if(i<15){
                        $(`.phoneList_10 ul`).append(`
                            <li><a href="./details.html">
                                <img src=${item.path} alt="图片加载失败">
                                <span>${item.type}</span>
                            </a></li>
                        `);
                    }
                })
            },
            error:function(res){
                console.log(res) 
            }
        })


//需求十四：板块一到板块五的滑动效果整个商品页面切换（type选项卡功能）
        //方法一用jquery
        $('.plate-cen_1 .title p span,.plate-cen_2 .title p span').mouseenter(function(){
            var index =$(this).index()
            $(this)
            .addClass('bord')
            .siblings()
            .removeClass('bord')
            .parents('.title')
            .siblings('.content')
            .children('.phone')
            .eq(index-1)
            .css('display','block')
            .siblings('.phone')
            .css('display','none')
        })
        .mouseleave(function(){
            $(this).addClass('bord')
        })

    //需求六如果已经登入了，那么获取到cooki的值放在页面上
        //setCookie(key,value,expires)
        //getCookie(usname)
        
        var myName =getCookie('usname');
        if(myName){
            $('.yuan').css('display','none')
            $('.now').css('display','block')
            $('.mingzi').html(myName)
        }else{
            $('.yuan').css('display','block')
            $('.now').css('display','none')
        }

    //需求七如果已经登入了，那么获取到cooki的值放在页面上
        //滑动出现小盒子列表
            $('.mingzi').mouseenter(function(){
                $('#personal').stop()
                $('.mingzilist').css('background','#fff')
                $('.mingzi').css('color','#ff6700')
                $('#personal').slideDown(200,'linear')
                $('#personal').mousemove(function(){
                    $('#personal').stop()
                    $('.mingzilist').css('background','#fff')
                    $('.mingzi').css('color','#ff6700')
                    $('#personal').slideDown(200,'linear')
                })
                $('#personal').mouseout(function(){
                    $('#personal').stop()
                    $('.mingzilist').css('background','#333333')
                    $('.mingzi').css('color','#b0b0b0')
                    $('#personal').slideUp(200,'linear')
                })     
            })
            $('.mingzi').mouseout(function(){
                $('#personal').stop()
                $('.mingzilist').css('background','#333333')
                $('.mingzi').css('color','#b0b0b0')
                $('#personal').slideUp(200,'linear')
            })
        //需求七点击退出登入清除cookie
            $('.outBtn').click(function(){
                    var time = new Date();
                    time.setTime(time.getTime()-8*60*60*1000-1000);
                    document.cookie = 'usname=100;expires='+time;
                    //设置上一秒以前就过期了
                    location.href="../pages/index.html"
            })

        //需求七点滑动到购物车按钮上出现列表
            $(".shopping").hover(function(){
                $(".cartList").stop()
                $(this).css('background','#fff')
                $(this).css('color','#ff6700')
                $(".cartList").slideDown(200,'linear')
            },function(){
                $(".cartList").stop()
                $(this).css('background','#424242')
                $(this).css('color','#fff')
                $(".cartList").slideUp(200,'linear')
            })
            
        

})()