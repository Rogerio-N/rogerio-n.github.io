function put(url,data){
    let request = new XMLHttpRequest();
    request.open("PUT",url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
    return request.responseText;
}

function updateData(){
    event.preventDefault();
    let currentUserId = parseInt(sessionStorage.getItem("Id"));
    let url = "http://localhost:8080/users/"+currentUserId;

    let newName = document.getElementById("namee").value;
    let newEmail = document.getElementById("emaill").value;
    
    let password = document.getElementById("senhaa").value;
    let confPassword = document.getElementById("confsenhaa").value;

    var canCreate = false;
    var newPassword = "";

    if(password == confPassword){
        console.log("Aqui")
        canCreate = true;
        newPassword = confPassword;
    }

    if (canCreate){
        const data = {
            "name":newName,
            "email":newEmail,
            "password":newPassword
        }
        put(url,data);
        alert("Para as alterações terem efeito, por favor faça login novamente");
        window.location.href = "./index.html"
    }else{
        alert("Algo deu errado com sua requisicao");
    }

    
}