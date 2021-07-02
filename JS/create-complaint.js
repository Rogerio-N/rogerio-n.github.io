function post(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader("Content-type", "application/json","mime-type", "multipart/form-data");
    request.send(JSON.stringify(data));
    return request.responseText;
}

let base64String = "";
  
function imageUploaded() {
    var file = document.querySelector('input[type=file]')['files'][0];
  
    var reader = new FileReader();
      
    reader.onload = function () {
        base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
  
        console.log(base64String);
    }
    reader.readAsDataURL(file);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function createComplaint(){
    event.preventDefault();
    let url = "http:localhost:8080/complaint"

    let canCreate = true;
    let haveComplaint = true;
    let complaintType = document.getElementById("Type-selector").value;

    switch(complaintType){
        case "Iluminação publica":
            complaintType = 2;
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

    let year = sendDate.getFullYear().toString();
    let month = (sendDate.getMonth()+1).toString();
    let day = sendDate.getDate().toString();
    let code = getRndInteger(0,999).toString();

    let endMonth = (sendDate.getMonth()+1);
    endDate.setMonth(endMonth);
    let protocol = year + month + day + "." + code;

    let imageUrl = document.getElementById("image-send").value;
    let currentUser = parseInt(sessionStorage.getItem("Id"));

    const data = {
        "protocol": protocol,
        "themes": complaintType,
        "status": "Aguardando resposta",
        "descricao": description,
        "numero": adressNumber,
        "endereco": street + ", "+  neighborhood,
        "dataEnvio": sendDate,
        "dataFim": endDate,
        "cep":cep,
        "user": currentUser,
        "imageUrl":imageUrl
    }

    if(cep == " " || street == " " || neighborhood == " " || adressNumber == " " || description == " " || !haveComplaint){
        canCreate = false;
    }else{
        canCreate =true;
    }
    if(canCreate){
        alert("Anote seu numero de protocolo : "+ protocol)
        post(url,data);
        window.location.href = "./home.html";
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