const API_URL = "http://localhost:8080/api/v2";
var token = sessionStorage.getItem("Token")

if( (window.location.pathname != "/index.html" && window.location.pathname != "/cadastro.html") && token == null){
    alert('Você não está logado para acessar a página')
    redirect()
}

function redirect(path = "./index.html"){
    window.location.href = path;
}

function getUserData(){
    let userEmail = parseJwt(token).sub;
    return JSON.parse(get(`${API_URL}/users/find?email=${userEmail}`,token));
}

function parseJwt(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);

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

function login(url,data,path){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.send(JSON.stringify(data));  
    request.onloadend = redirect(path);
    return request.responseText;
}

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

function getThemes(url){
    let request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.send();
    return request.responseText;
};

function get(url,token = ""){
    let request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.setRequestHeader("Authorization",`Bearer ${token}`);
    request.send();
    return request.responseText;
};