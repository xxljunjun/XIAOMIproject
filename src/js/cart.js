(function(){
    //需求一发送ajax请求获取数据商品信息，把信息渲染到页面中去
        showTbodty();
        function showTbodty(){
            $.ajax({
                url:"../json/cart.json",
                type:'post',
                success:function(res){
                    //对请求到的数据进行遍历
                    $.each(res,function(i,item){
                        //将其渲染到页面上去
                        $('.lastshop').append(`
                        <li class="list_0" id="${item.id}"><a href="./details.html">
                            <img src=${item.path} alt="图片加载失败">
                            <h1>${item.type}</h1>
                            <h2>${item.price}</h2>
                            <p>4077人好评</p>
                            <div class="listAddBtn_box">
                                <a href="javascript:;" class="listAddBtn">
                                    加入购物车
                                </a>
                            </div>
                        </a></li>`);
                    })
                },
                error:function(res){
                    console.log(res) 
                }
            })
        }

    //需求二点击加入页面中的按钮添加购物车按钮，把商品信息添加到页面中
        //因为直接点击的话，页面上是没有按钮的，所以要用事件委托
        $('.lastshop').click(function(e){
            var target =e.target;
            //当点击的是添加按钮时候，向数据库添加该商品
            if(target.className=="listAddBtn"){
                $.ajax({
                    url:"../php/interface/addwq.php",
                    data:{
                        id:$(target).parents('li').attr('id'),
                        name:$(target).parent().siblings('a').children('h1').html(),
                        price:$(target).parent().siblings('a').children('h2').html(),
                        img:$(target).parent().siblings('a').children('img').attr("src"),
                        num:1
                    },
                    success:function(res){
                        location.href="../pages/cart.html"
                    },
                    error:function(res){
                        console.log(res)
                    }
                })
            }
            
        })

    //需求三打开购物车页面展示购物车里面的商品
        //打开页面先展示一次
        showCode();
        //渲染商品到页面的方法
        function showCode(){
            $.ajax({
                url:'../php/interface/showlist.php',
                success:function(res){
                    //后端反馈的信息code=1成功，code=0失败
                    if(res.code){
                        var arr =res.data;
                        $('.shopNumber').html(arr.length)//显示购物车有几件商品
                        $('.checkBOx').html(arr.length)  
                        //后端返回的数据
                        if(res.data){
                            //如果数据库里有商品的话
                            $('.shopCartList').show();//购物车显示
                            $('.main_1').hide();//空购物车隐藏
                            $('.list-body').empty();//清空容器 
                            $('.no-select-tip').hide()
                            $('.goshopping').css('background','#ff6700')     
                            $('.goshopping').css('color','#fff')
                                
                            //对数据遍历，渲染到页面上
                            var numArr =[];
                            $.each(arr,function(index,item){
                                    var num =item.product_price*item.product_num;
                                    numArr.push(num)
                                    if(index==arr.length-1){
                                        //数组求和的方法
                                        function sum(arr) {
                                            var s = 0;
                                            for (var i=arr.length-1; i>=0; i--) {
                                              s += arr[i];
                                            }
                                            return s;
                                        }
                                        sum(numArr);
                                        $('.shopmany').html(sum(numArr));
                                    } 
                                    
                                //向盒子里添加信息   
                                $('.list-body').append(`
                                <div class="item-box" id="${item.product_id}">
                                    <div class="item-row clearfix">
                                        <div class="col col-check">
                                            <i class="colorBox">√</i>
                                        </div>
                                        <div class="col col-img"><img src="${item.product_img}" alt="图片加载失败"></div>
                                        <div class="col col-name">${item.product_name}</div>
                                        <div class="col col-price">${item.product_price}</div>
                                        <div class="col col-num ">
                                            <div class="change-goods-num clearfix">
                                                <a href="javascript:;" class="jian">-</a>
                                                <input type="text" value="${item.product_num}">
                                                <a href="javascript:;" class="add">+</a>
                                            </div>
                                        </div>
                                        <div class="col col-total colornum">${item.product_price*item.product_num}元</div>
                                        <div class="col col-action">
                                            <a href="#">
                                                <em class="iconfont del">&#xe60d;</em>
                                            </a>
                                        </div>
                                    </div>
                                </div>`)           
                            })
                            //如果有数据的话，处于勾选状态
                                $('.colorBox').css('background','#ff6700')
                                $('.colorBox_0').css('background','#ff6700')
                                

                        }
                    //code=0失败,空购物车
                    }else{
                        $('.shopCartList').hide()
                        $('.main_1').show()
                    }
                },
                error:function(res){
                    console.log(res)
                },
                dataType:'json',
                cache:false
            })
        }

    //需求四点击页面的加减功能使得数据库增加和减少，删除数据行
        $('.list-body').click(function(e){
            var target =e.target;
            //点击出现删除询问栏
            if(target.className=='iconfont del'){
                $('.zhezhao').css('display','block');
                $('.middleBox').css('display','block');
            //点击减按钮添加商品和减少商品数量
            }else if(target.className=='add'||target.className=='jian'){
                $.ajax({
                    url:'../php/interface/updatewq.php',
                    data:{
                        type:target.className,
                        id:$(target).parents('.item-box').attr('id')
                    },
                    success:function(res){
                        if(res.code){
                            showCode()
                        }
                    },
                    dataType:'json'
                })
            }
        })
        //点击按钮删除一个商品数据
        $('.middleBox').click(function(e){
            var target =e.target;
            if(target.className=='iconfont deli'||target.className=='quxiao'){
                $('.zhezhao').css('display','none');
                $('.middleBox').css('display','none');
            //点击删除商品行
            }else if(target.className=='queren'){
                $('.zhezhao').css('display','none');
                $('.middleBox').css('display','none');
                $.ajax({
                    url:'../php/interface/delwq.php',
                    data:{
                        id:$(target).parents('.middleBox').siblings('.list-body').children('.item-box').attr('id')
                    },
                    success:function(res){
                        if(res.code){
                            //删除一个数据成功后重新渲染到页面上
                            showCode()
                        }
                    },
                    dataType:'json'
                    
                })
            }
        })

    //需求五获取cookei值，设置名字getCookie('')
        var myName =getCookie('usname');
        if(myName){
            $('.yuan').css('display','none')
            $('.now').css('display','block')
            $('.mingzi').html(myName)
            $('.loginBtn').css('display','none')
            $('.shopBtn').css('background','#ff6700')
            $('.shopBtn a').css('color','#fff')
        }else{
            $('.yuan').css('display','block')
            $('.now').css('display','none')
            $('.loginBtn').css('display','block')
        }
        //点击退出登入清除cookie
        $('.outBtn').click(function(){
            console.log(11)
            var time = new Date();
            time.setTime(time.getTime()-8*60*60*1000-1000);
            document.cookie = 'usname=100;expires='+time;
            //设置上一秒以前就过期了
            location.href="../pages/cart.html"
        })
        //如果已经登入了，有cookie值时候就能实现滑入出现列表
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

    //需求六点击变橙色事件
        /$('.colorBox').click(function(){
            $('.colorBox').css('background','#fff')
            $('.colorBox_0').css('background','#fff')
            $('.shopmany').html(0);
        })
    //需求六点击变橙色事件
        

        


})()