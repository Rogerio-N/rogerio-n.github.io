import * as get from './index.js'

function getUserData(name,email,password){

    const userData = {
        "userName": name,
        "userEmail":email,
        "userPassword":password
    };

    return userData;

};

function loginChecker(){
    let rawData = get("http://localhost:8080/users");
    let users = JSON.parse(rawData);
    
    let currentUserMail = document.getElementById("desktop-email").value;
    let currentUserPassword = document.getElementById("desktop-password").value;

    let canLogin = false;

    users.forEach(element => {
        if(currentUserMail == element.email && currentUserPassword == element.password){
            getUserData(element.name,element.email,element.password);
            canLogin = true;
        }
    });

    if(canLogin){
        window.location.href = "./home.html";
    }else{
        alert("Usuário não encontrado, reensira as informações");
    }

};