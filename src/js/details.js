(function(){
    //需求一swiper轮播图
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            effect: 'fade',
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            // 循环模式选项
            loop: true, 
            autoplay:{
                delay:3000
            }
        });


    //需求二点击X按钮消失一个“方便你购买，请提前登入的”div
        $('.biBtn').click(function(){
            $('.xiaoxiphone').css('display','none')
        })


    //需求三活动出现手机参数
        // document.onscroll=function(){
        //     if(document.documentElement.scrollTop>=200){
        //         $('.canshu_2').css('dispaly','block')
        //         $('.canshu_2').slideDown(300,'linear')
        //     }else if(document.documentElement.scrollTop<200){
        //         $('.canshu_2').slideUp(300,'linear')
        //     }
        // }
        $(window).scroll(()=>{
            if(document.documentElement.scrollTop>=200){
                $('.canshu_2').css('dispaly','block')
                $('.canshu_2').slideDown(300,'linear')
            }else if(document.documentElement.scrollTop<200){
                $('.canshu_2').slideUp(300,'linear')
                $('.canshu_2').css('dispaly','none')
            }
        })


    //需求四点击color和version中的type选项卡功能
        $('.color li').click(function(){
            $(this).addClass('active')
            .siblings()
            .removeClass('active')
        })
        $('.version li').click(function(){
            $(this).addClass('active')
            .siblings()
            .removeClass('active')
        })


    //需求五点击加入购物车按钮，将数据加入购物车数据库中
        //红心心
        $('.loveBtn').click(function(){
            $('.loveBtn i').toggleClass('redColor')
        })
        //点击购物车事件
        $('.addBtn').click(function(){
            $.ajax({
                url:'../php/interface/addwq.php',
                data:{
                    id:'001',
                    name:'小米10至尊纪念版',
                    price:'5299',
                    img:'../images/phone.jpg',
                    num:1
                },
                success:function(res){
                    location.href="../pages/addSuccess.html"
                    console.log(res)
                },
                error:function(res){
                    console.log(res)
                },
                dataType:'json'
            })
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

            //需求八如果已经登入了，那么获取到cooki的值放在页面上
                function getCookie(key){
                    var str;
                    str = "";
        
                    var tmp = document.cookie.split('; ');
                    for(var i=0;i<tmp.length;i++){
                        var t = tmp[i].split('=');
                        if(t[0]===key){
                            str = t[1];
                        }
                    }
        
                    return str;
                    
                }
                var myName =getCookie('usname');
                if(myName){
                    $('.xiaoxiphone').css('display','none')
                }else{
                    $('.xiaoxiphone').css('display','block')
                }

                //需求八点击退出登录，清楚cookie
                    $('.outBtn').click(function(){
                        var time = new Date();
                        time.setTime(time.getTime()-8*60*60*1000-1000);
                        document.cookie = 'usname=100;expires='+time;
                        //设置上一秒以前就过期了
                        location.href="../pages/register.html"
                })





})()