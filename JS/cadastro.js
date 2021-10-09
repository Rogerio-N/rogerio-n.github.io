function redirect(){
    window.location.href = "./index.html";
}

function createUser(){
    event.preventDefault();
    let url = `${API_URL}/users`;
    let email = document.getElementById("emaill").value;
    let name = document.getElementById("namee").value;
    var load = document.getElementById("load-handler");
    
    let password = document.getElementById("senhaa").value;
    let repeatPassword = document.getElementById("confsenhaa").value;

    let canCreate = false;

    if(password == repeatPassword){
        canCreate = true;
    }else{
        canCreate = false;
    }

    if(!canCreate){
        alert("Verifique as informações e as insira novamente");
    }else{
        dados={
            "email":email,
            "password": password,
            "name":name 
        }
        load.style.display = "block";
        post(url,dados,token);
    }
}