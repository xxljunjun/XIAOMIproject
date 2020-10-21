(function(){
    //需求一点击注册按钮，上传信息到数据库里
        $('.btn').click(function(){
            //发送一个查询请求看看用户名是否存在
            $.ajax({
                url:'../php/selectRegister.php',
                data:{
                    username:$('.myName').val()
                },
                type:'post',
                success:function(res){
                    //用户名存在时候
                    if(res.code){
                        $('.error').html('用户名已存在')
                    //用户名不存在时候，在发送一个添加数据的请求
                    }else{
                        $('.error').html('')
                        if($('.myName').val()&&$('.pw').val()){
                            $.ajax({
                                url:'../php/register.php',
                                data:{
                                    username:$('.myName').val(),
                                    password:$('.pw').val()
                                },
                                type:'post',
                                success:function(res){
                                    alert('注册成功')
                                    location.href="../pages/login.html" 
                                },
                                error:function(res){
                                    $('.error').html('注册失败')
                                },
                                dataType:'json'
                            })
                        }else{
                            $('.error').html('用户名或密码错误')
                        }
                        
                    }
                },
                error:function(res){
                    console.log(res)
                   
                },
                dataType:'json'
            })


            
        })



})()