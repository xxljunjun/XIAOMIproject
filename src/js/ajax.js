//封装一个js发动一个GET的ajax请求
function getSend(url,cb){
    var xhr =new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload=function(){
        cb(xhr.responseText);
    }
    xhr.send();
}
// getSend('./ajax.php?a=100&b=200',function(data){
//     console.log(data);
// })

//封装一个js发动一个POST的ajax请求
function postSend(url,cb,poss){
    var xhr =new XMLHttpRequest();
    xhr.open('POST',url);
    xhr.send(poss);
    xhr.onload=function(){
        cb(xhr.responseText);
    }
}
// postSend('./ajax.php',function(data){
//     for(var i =0;i<65;i++){
//         console.log(data)
//     }
// },'a=100&b=200')