function post(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("permissions-policy","interest-cohort=()");
    request.send(JSON.stringify(data));
    return request.responseText;
}

function createUser(){
    event.preventDefault();
    let url = "http://localhost:8080/users";
    let email = document.getElementById("emaill").value;
    let name = document.getElementById("namee").value;
    
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
            "password":password,
            "name":name
            
        }
    
        post(url,dados);
    
        window.location.href = "./index.html";
    }    

}