function getSend(url){
    // 如果后面想接.then,那么返回值必须是一个promise对象
    var p1 = new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.onload = function(){
            resolve(xhr.responseText);
        }
        xhr.send()
    })
    return p1;
    
}

function postSend(url,params){
    var p1 = new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',url);
        xhr.onload = function(){
            resolve(xhr.responseText)
        }
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(params)
    })
    return p1;   
}

