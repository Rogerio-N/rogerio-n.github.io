function redirect(path = "./index.html"){
    window.location.href = path;
}

function post(url,data,path){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("permissions-policy","interest-cohort=()");
    request.send(JSON.stringify(data));
    request.onloadend = redirect(path);
    return request.responseText;
}

function get(url){
    let request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.send();
    return request.responseText;
};

function postImgur(url,data,clientId){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.setRequestHeader("Content-type","application/json; charset=utf-8");
    request.setRequestHeader("Authorization","Client-ID "+clientId);
    request.send(JSON.stringify(data));
    request.onloadend = function imgurResponseData(){
        let imgurRequestData = JSON.parse(request.responseText);
        let imageUrl = imgurRequestData.data.link;
        sessionStorage.setItem("imgurLink",imageUrl);
    }
    return request.responseText;
}