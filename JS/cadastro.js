function post(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));

    request.onload = function (){
        console.log(this.responseText);
    }

    return request.responseText;
}

function createUser(){
    event.preventDefault();
    let url = "http://127.0.0.1:8080/users";
    let email = document.getElementById("emaill").value;
    let name = document.getElementById("namee").value;
    
    let password = document.getElementById("senhaa").value;

    dados={
        "email":email,
        "password":password,
        "name":name
        
    }

    console.log(dados);

    post(url,dados);

}