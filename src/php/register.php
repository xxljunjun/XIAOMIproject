<?php
/* 
    如果要用register.php处理登陆
    传入用户名必须使用username这个键
    传入密码必须使用password这个键
*/
include './base.php';

$uname = $_POST['username'];//获取前端传递的用户名
$upass = $_POST['password'];//获取前端传递的密码
$conn = mysqli_connect('127.0.0.1','root','root','user');
$sql = "INSERT INTO `info` VALUES ('$uname','$upass')";
$res = mysqli_query($conn,$sql);
mysqli_close($conn);

if($res){
   //有数据就返回一个code=1
   echo json_encode(array("code"=>1));
}else{
    //没有数据就返回一个code=0
    echo json_encode(array("code"=>0));
}

?>