(function(){
    //需求一type选项卡的切换功能
    $('.sp_1 span').click(function(){
        //标题切换
        var index =$(this).index('span');
        //0，1
        $(this).addClass('yangshe')
        .siblings('.ma')
        .removeClass('yangshe')
        //二维码切换
        $(this).parent()
        .siblings('.content')
        .eq(index-1)
        .css('display','block')
        .siblings('.content')
        .css('display','none')
    })

//需求二点击回到首页
    $('.topLeft').click(function(){
            location.href='../pages/index.html'  
    })

//需求三点击登入按钮判断
    $('.submit').submit(function(e){
        //阻止表单的默认提交事件
        e.preventDefault();
        //点击按钮发送请求
        $.ajax({
            url:'../php/login.php',
            type:'post',
            data:{
                username:$('.text').val(),
                password:$('.pw').val()
            },
            success:function(res){
                if(res.code){
                    setCookie('usname',$('.text').val(),70000000000)
                    console.log(11)
                    location.href="../pages/index.html"
                    
                }else{
                    alert('账号或密码错误')
                }
            },
            error:function(res){
                console.log(res)
            },
            dataType:'json'
        })
    })
})()


