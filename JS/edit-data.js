function put(url,data,token){
    let request = new XMLHttpRequest();
    request.open("PUT",url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Authorization",`Bearer ${token}`)
    request.send(JSON.stringify(data));
    request.onloadend = function redirect(){
        alert("Para as alterações terem efeito, por favor faça login novamente");
        window.location.href = "./index.html";
    }
    return request.responseText;
}

function updateData(){
    event.preventDefault();

    let newName = document.getElementById("namee").value;
    let newEmail = document.getElementById("emaill").value;
    
    let password = document.getElementById("senhaa").value;
    let confPassword = document.getElementById("confsenhaa").value;

    let load = document.getElementById('load-handler');
    if(password != confPassword){return alert("As senhas não coincidem")}

    const data = {
        "name":newName,
        "email":newEmail,
        "password":password
    }
    load.style.display = "block";
    put(`${API_URL}/api/v2/users/update/?id=${getUserData().id}`,data,token);
    
}