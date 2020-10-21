<?php

header('content-type:text/html;charset=utf-8;');
// include './base.php';解决中文乱码问题

$uname =$_POST['username'];//获取前端传递的用户名

$conn = mysqli_connect('127.0.0.1','root','root','user');
$sql = "SELECT * FROM `info` WHERE `username`='$uname'";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($res);
mysqli_close($conn);
if($row){
    //有数据就返回一个code=1
    echo json_encode(array("code"=>1));
}else{
    //没有数据就返回一个code=0
    echo json_encode(array("code"=>0));
}

?>