function post(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
    return request.responseText;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function createComplaint(){
    event.preventDefault();
    let url = "http://localhost:8080/complaint"

    let canCreate = true;
    let haveComplaint = true;
    let complaintType = document.getElementById("Type-selector").value;

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
    let adressNumber = document.getElementById("input-number-adress").value;
    let description = document.getElementById("Complaint-description").value;
    adressNumber = parseInt(adressNumber);

    //let protocol = getRndInteger(0,2000000).toString();
    let sendDate = new Date();

    let year = sendDate.getFullYear().toString();
    let month = (sendDate.getMonth()+1).toString();
    let day = sendDate.getDate().toString();
    let code = sendDate.getTime().toString().toString().substr(0,4);// getRndInteger(0,999).toString();

    let protocol = year + month + day + "." + code;

    console.log(protocol);

    const data = {
        "protocol": protocol,
        "themes": complaintType,
        "status": "Aguardando resposta",
        "descricao": description,
        "numero": adressNumber,
        "endereco": street + ", "+  neighborhood,
        "dataEnvio": sendDate,
        "cep":cep
    }

    if(cep == " " || street == " " || neighborhood == " " || adressNumber == " " || description == " " || !haveComplaint){
        canCreate = false;
    }else{
        canCreate =true;
    }

    //TODO add image

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
}

userDataShow();