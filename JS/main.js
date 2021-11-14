//https://obras-publicas.herokuapp.com
//http://localhost:8080
const API_URL = "https://obras-publicas.herokuapp.com";
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
    return JSON.parse(get(`${API_URL}/api/v2/users/find?email=${userEmail}`,token));
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

function sendComplaint(url,data,path){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("permissions-policy","interest-cohort=()");
    request.setRequestHeader("Authorization",`Bearer ${token}`);
    request.send(JSON.stringify(data));
    request.onloadend = redirect(path);
    return request.responseText;
}

function login(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.send(JSON.stringify(data));  
    return request.responseText;
}

function postImgur(url,data,clientId){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.setRequestHeader("Content-type","application/json; charset=utf-8");
    request.setRequestHeader("Authorization","Client-ID "+clientId);
    request.send(JSON.stringify(data));
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

function buttonDisable(ButtonId, disable = true){
    let button = document.getElementById(ButtonId);
    button.disabled = disable
}

function sleep(ms){
    const date = Date.now();
    let currentDate = null;
    do{
        currentDate = Date.now();
    }while(currentDate - date < ms)
}

function waitSearch(attemptVar,maxAttempts){

    if(attemptVar >= maxAttempts){
        alert("Você fez várias tentativas! Espere 5 segundos para tentar novamente")
        attemptVar = 0;
        sleep(5000);
        return alert("Você já pode tentar novamente")
    }

}

function back(){
    event.preventDefault();
    window.history.back()
}