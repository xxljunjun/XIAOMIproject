(function () {
    //需求一发送ajax请求获取数据商品信息，把信息渲染到页面中去
    showTbodty();
    function showTbodty() {
        $.ajax({
            url: "../json/cart.json",
            type: 'post',
            success: function (res) {
                //对请求到的数据进行遍历
                $.each(res, function (i, item) {
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
            error: function (res) {
                console.log(res)
            }
        })
    }

    //需求二打开购物车页面展示购物车里面的商品
    //打开页面先展示一次
    showCode();
    //渲染商品到页面的方法
    function showCode() {
        $.ajax({
            url: '../php/interface/showlist.php',
            success: function (res) {
                //后端反馈的信息code=1成功，code=0失败
                if (res.code) {
                    var arr = res.data;
                    $('.checkBOx').html(arr.length)//有几件商品
                    //后端返回的数据
                    if (res.data) {
                        //如果数据库里有商品的话
                        $('.shopCartList').show();//购物车显示
                        $('.main_1').hide();//空购物车隐藏
                        $('.list-body').empty();//清空容器
                        shoppingcheng();
                        //对数据遍历，渲染到页面上
                        var numArr = [];//求总价的数组
                        var shopnumberArr = [];//求总商品的数组
                        $.each(arr, function (index, item) {
                            //求总价和商品总数
                            var num = item.product_price * item.product_num;
                            numArr.push(num);
                            var num_1 = Number(item.product_num);
                            shopnumberArr.push(num_1);
                            if (index == arr.length - 1) {
                                //数组求和的方法
                                function sum(arr) {
                                    var s = 0;
                                    for (var i = arr.length - 1; i >= 0; i--) {
                                        s += arr[i];
                                    }
                                    return s;
                                }
                                sum(shopnumberArr);
                                sum(numArr);
                                $('.shopNumber').html(sum(shopnumberArr));
                                $('.shopmany').html(sum(numArr));
                            }
                            //向盒子里添加信息   
                            $('.list-body').append(`
                                <div class="item-box" id="${item.product_id}">
                                    <div class="item-row clearfix">
                                        <div class="col col-check">
                                            <i class="colorBox h_color">√</i>
                                        </div>
                                        <div class="col col-img"><img src="${item.product_img}" alt="图片加载失败"></div>
                                        <div class="col col-name">${item.product_name}</div>
                                        <div class="col col-price">${item.product_price}</div>
                                        <div class="col col-num ">
                                            <div class="change-goods-num clearfix">
                                                <a href="javascript:;" class="jian">-</a>
                                                <input type="text" class="numberInput" value="${item.product_num}">
                                                <a href="javascript:;" class="add">+</a>
                                            </div>
                                        </div>
                                        <div class="col col-total colornum">${item.product_price * item.product_num}</div>
                                        <div class="col col-action">
                                            <a href="#">
                                                <em class="iconfont del">&#xe60d;</em>
                                            </a>
                                        </div>
                                    </div>
                                </div>`)
                        })
                    }
                    //code=0失败,空购物车
                } else {
                    $('.shopCartList').hide();
                    $('.main_1').show();
                }
            },
            error: function (res) {
                console.log(res)
            },
            dataType: 'json',
            cache: false
        })
    }

    //需求三点击加入页面中的按钮添加购物车按钮，把商品信息添加到页面中
    //因为直接点击的话，页面上是没有按钮的，所以要用事件委托
    $('.lastshop').click(function (e) {
        var target = e.target;
        var distanceTop = $('body').scrollTop() + $('html').scrollTop();
        //当点击的是添加按钮时候，向数据库添加该商品
        if (target.className == "listAddBtn") {
            $.ajax({
                url: "../php/interface/addwq.php",
                data: {
                    id: $(target).parents('li').attr('id'),
                    name: $(target).parent().siblings('a').children('h1').html(),
                    price: $(target).parent().siblings('a').children('h2').html(),
                    img: $(target).parent().siblings('a').children('img').attr("src"),
                    num: 1
                },
                success: function (res) {
                    location.href = "../pages/cart.html";
                },
                error: function (res) {
                    console.log(res)
                }
            })
        }

    })

    //需求四点击页面的加减功能使得数据库增加和减少，删除数据行
    $('.list-body').click(function (e) {
        var target = e.target;
        //点击出现删除询问栏
        if (target.className == 'iconfont del') {
            $('.zhezhao').css('display', 'block');
            $('.middleBox').css('display', 'block');
            //点击减按钮添加商品和减少商品数量
        } else if (target.className == 'add' || target.className == 'jian') {
            $.ajax({
                url: '../php/interface/updatewq.php',
                data: {
                    type: target.className,
                    id: $(target).parents('.item-box').attr('id')
                },
                success: function (res) {
                    if (res.code) {
                        showCode();
                        $('.colorBox_0').addClass('h_color')
                    }
                },
                dataType: 'json'
            })
        }
    })
    //点击按钮删除一个商品数据
    $('.middleBox').click(function (e) {
        var target = e.target;
        if (target.className == 'iconfont deli' || target.className == 'quxiao') {
            $('.zhezhao').css('display', 'none');
            $('.middleBox').css('display', 'none');
            //点击删除商品行
        } else if (target.className == 'queren') {
            $('.zhezhao').css('display', 'none');
            $('.middleBox').css('display', 'none');
            $.ajax({
                url: '../php/interface/delwq.php',
                data: {
                    id: $(target).parents('.middleBox').siblings('.list-body').children('.item-box').attr('id')
                },
                success: function (res) {
                    if (res.code) {
                        //删除一个数据成功后重新渲染到页面上
                        showCode()
                    }
                },
                dataType: 'json'

            })
        }
    })



    //需求五点击变橙色事件
    //阻止事件冒泡的方法event.stopPropagation(); 
    //有商品时结算按钮的css变化方法
    function shoppingcheng() {
        $('.goshopping').css('background', '#ff6700');
        $('.goshopping').css('color', '#fff');
        $('.no-select-tip').css('display', 'none');
    }
    //无商品时结算按钮的css变化方法
    function shoppingbai() {
        $('.goshopping').css('background', '#e0e0e0');
        $('.goshopping').css('color', '#b0b0b0');
        $('.no-select-tip').css('display', 'block');
    }
    $('.shopCartList').click(function (e) {
        var target = e.target;
        var numberColor = $('.list-body').find('.colorBox').length;//获取购物车上有几个商品
        //第一次判断是否点击的是有colorBox这个类名的（√）才能执行
        if ($(target).hasClass('colorBox')) {
            //第二次判断是否拥有h_color类名
            if ($(target).hasClass('h_color')) {
                //1（有则移除）
                $(target).removeClass('h_color');
                //2(结算按钮的变化)
                shoppingcheng();
                //3把改商品的价格从总数中减去
                var shuzi_0 = Number($(target).parents('.item-box').find('.colornum').html());
                var shuzi_zong = Number($(target).parents('.shopCartList').find('.shopmany').html());
                $(target).parents('.shopCartList').find('.shopmany').html(shuzi_zong - shuzi_0);
                //4第三次判断总开关按钮变化的条件（最后一个变成无色非选中状态时）
                if ($('.list-body').find('.h_color').length == 0) {
                    shoppingbai();
                    $('.colorBox_0').removeClass('h_color');
                } else if ($('.list-body').find('.h_color').length < numberColor) {
                    $('.colorBox_0').removeClass('h_color');
                }
                //5已选中商品的数量渲染到页面上
                $('.list-body').find('.h_color').length;
                $('.checkBOx').html($('.list-body').find('.h_color').length);
                //第二次判断是否拥有h_color类名（无则添加）
            } else {
                //1（无则添加）
                $(target).addClass('h_color');
                //2(结算按钮的变化)
                shoppingcheng();
                //3把改商品的价格从总数中减去
                var shuzi_0 = Number($(target).parents('.item-box').find('.colornum').html());
                var shuzi_zong = Number($(target).parents('.shopCartList').find('.shopmany').html());
                $(target).parents('.shopCartList').find('.shopmany').html(shuzi_zong + shuzi_0);
                //4第三次判断总开关按钮变化的条件（最后一个变成橙色选中状态时）
                var numberColor_1 = $('.list-body').find('.h_color').length;
                if (numberColor_1 == numberColor) {
                    $('.colorBox_0').addClass('h_color');
                    shoppingcheng();
                    showCode();
                }
                //5已选中商品的数量
                $('.list-body').find('.h_color').length;
                $('.checkBOx').html($('.list-body').find('.h_color').length);
            }
        }
        //第一次判断如果点击的是有colorBox_0这个类名的才能执行
        if ($(target).hasClass('colorBox_0')) {
            //第二次判断有无h_color类名(有)
            if ($(target).hasClass('h_color')) {
                //1移除类名h_color
                $(target).removeClass('h_color')
                //2选中数量和价格都为0
                $('.shopmany').empty();
                $('.shopmany').html(0);
                $('.checkBOx').empty();
                $('.checkBOx').html(0)
                //3(结算按钮的变化)
                shoppingbai();
                //4移除购物车上所有的h_color类名
                $(target).parents('.shopCartList').find('.colorBox').removeClass('h_color')
                //第二次判断有无h_color类名（无）
            } else if (!($(target).hasClass('h_color'))) {
                //1添加类名h_color
                $(target).addClass('h_color')
                //2选中数量和价格都为
                showCode();
                //3(结算按钮的变化)
                shoppingcheng();
                //4添加购物车上所有的h_color类名
                $(target).parents('.shopCartList').find('.colorBox').addClass('h_color')
            }
        }
    })

    //需求六获取cookei值，设置名字getCookie('')
    var myName = getCookie('usname');
    if (myName) {
        $('.yuan').css('display', 'none')
        $('.now').css('display', 'block')
        $('.mingzi').html(myName)
        $('.loginBtn').css('display', 'none')
        $('.shopBtn').css('background', '#ff6700')
        $('.shopBtn a').css('color', '#fff')
        $('.shopBtn').css('left', '0')
    } else {
        $('.yuan').css('display', 'block')
        $('.now').css('display', 'none')
        $('.loginBtn').css('display', 'block')
        $('.shopBtn').css('left', '190px')
    }
    //点击退出登入清除cookie
    $('.outBtn').click(function () {
        console.log(11)
        var time = new Date();
        time.setTime(time.getTime() - 8 * 60 * 60 * 1000 - 1000);
        document.cookie = 'usname=100;expires=' + time;
        //设置上一秒以前就过期了
        location.href = "../pages/cart.html"
    })
    //如果已经登入了，有cookie值时候就能实现滑入出现列表
    $('.mingzi').mouseenter(function () {
        $('#personal').stop()
        $('.mingzilist').css('background', '#fff')
        $('.mingzi').css('color', '#ff6700')
        $('#personal').slideDown(200, 'linear')
        $('#personal').mousemove(function () {
            $('#personal').stop()
            $('.mingzilist').css('background', '#fff')
            $('.mingzi').css('color', '#ff6700')
            $('#personal').slideDown(200, 'linear')
        })
        $('#personal').mouseout(function () {
            $('#personal').stop()
            $('.mingzilist').css('background', '#333333')
            $('.mingzi').css('color', '#b0b0b0')
            $('#personal').slideUp(200, 'linear')
        })
    })
    $('.mingzi').mouseout(function () {
        $('#personal').stop()
        $('.mingzilist').css('background', '#333333')
        $('.mingzi').css('color', '#b0b0b0')
        $('#personal').slideUp(200, 'linear')
    })






})()