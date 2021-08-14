function post(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
    request.onloadend = function redirect(){
        window.location.href = "./home.html";
    };
    return request.responseText;
}

function postImgur(url,data,clientId){
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
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

let base64String = "";
  
function imageUploaded() {
    var file = document.querySelector('input[type=file]')['files'][0];
  
    var reader = new FileReader();
      
    reader.onload = function () {
        base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    }
    reader.readAsDataURL(file);
}

function createComplaint(){
    event.preventDefault();
    let url = "http://localhost:8080/api/v2/complaint"

    let canCreate = true;
    let haveComplaint = true;
    let complaintType = document.getElementById("Type-selector").value;
    let loader = document.getElementById("load-handler");

    switch(complaintType){
        case "Iluminação publica":
            complaintType = 1;
        break;

        default:
            alert("Insira o tipo de denuncia novamente");
            haveComplaint = false;
        break;
    }

    let cep = document.getElementById("CEP").value;
    let street = document.getElementById("Street").value;
    let neighborhood = document.getElementById("neighborhood").value;
    let adressNumber = parseInt(document.getElementById("input-number-adress").value);
    let description = document.getElementById("Complaint-description").value;
    adressNumber = parseInt(adressNumber);

    let sendDate = new Date();
    let endDate = new Date();

    let endMonth = (sendDate.getMonth()+1);
    endDate.setMonth(endMonth);

    const imgurData = {
        "image": base64String,
        "type": "base64"
    }

    postImgur("https://api.imgur.com/3/image",imgurData,"6938311787a8442");

    let currentUser = parseInt(sessionStorage.getItem("Id"));

    const data = {
        "themes": complaintType,
        "status": "Aguardando resposta",
        "descricao": description,
        "numero": adressNumber,
        "endereco": street + ", "+  neighborhood,
        "dataEnvio": sendDate,
        "dataFim": endDate,
        "cep":cep,
        "user": currentUser,
        "imageUrl":sessionStorage.getItem("imgurLink")
    }

    if(cep == " " || street == " " || neighborhood == " " || adressNumber == " " || description == " " || !haveComplaint){
        canCreate = false;
    }else{
        canCreate =true;
    }

    if(canCreate){
        loader.style.display = "block";
        post(url,data);
    }else{
        alert("Verifique os dados e preenche todos os campos");
    }

    canCreate = true;
}

function userDataShow(){
    let userName = sessionStorage.getItem("Name");
    let userEmail = sessionStorage.getItem("Email");

    document.getElementById("Name-desktop").placeholder = userName;
    document.getElementById("Email-desktop").placeholder = userEmail;

    document.getElementById("Name-cellphone").placeholder = userName;
    document.getElementById("Email-cellphone").placeholder = userEmail;

    document.getElementById("Complaint-counter-desktop").placeholder = sessionStorage.getItem("QtdComplaint");
    document.getElementById("Complaint-counter-cellphone").placeholder = sessionStorage.getItem("QtdComplaint");
}

userDataShow();