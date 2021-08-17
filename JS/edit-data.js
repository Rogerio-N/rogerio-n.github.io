function put(url,data){
    let request = new XMLHttpRequest();
    request.open("PUT",url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
    request.onloadend = function redirect(){
        alert("Para as alterações terem efeito, por favor faça login novamente");
        window.location.href = "./index.html";
    }
    return request.responseText;
}

function updateData(){
    event.preventDefault();
    let currentUserId = sessionStorage.getItem("Id");
    let url = "http://localhost:8080/api/v2/users/"+currentUserId;

    let newName = document.getElementById("namee").value;
    let newEmail = document.getElementById("emaill").value;
    
    let password = document.getElementById("senhaa").value;
    let confPassword = document.getElementById("confsenhaa").value;

    let load = document.getElementById('load-handler');

    var canCreate = false;

    if(password == confPassword){
        canCreate = true;
    }

    if (canCreate){
        const data = {
            "name":newName,
            "email":newEmail,
            "password":password
        }
        load.style.display = "block";
        put(url,data);
    }else{
        alert("Algo deu errado com sua requisicao");
    }

    
}