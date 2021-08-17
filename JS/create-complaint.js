function post(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
    return request.responseText;
}

var imgurResponse;

function postImgur(url,data,clientId){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.setRequestHeader("Content-type","application/json; charset=utf-8");
    request.setRequestHeader("Authorization","Client-ID "+clientId);
    request.send(JSON.stringify(data));
    imgurResponse = JSON.parse(request.responseText);
    return imgurResponse;
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
            let addressNumber = parseInt(document.getElementById("input-number-adress").value);
            let description = document.getElementById("Complaint-description").value;
            addressNumber = parseInt(addressNumber);
            
            let sendDate = new Date();
            let endDate = new Date();
            
            let endMonth = (sendDate.getMonth()+1);
            endDate.setMonth(endMonth);
            
            const imgurData = {
                "image": base64String,
                "type": "base64"
            }
            loader.style.display = "block";
            postImgur("https://api.imgur.com/3/image",imgurData,"6938311787a8442");
            let imgLink = imgurResponse.data.link
            let currentUser = parseInt(sessionStorage.getItem("Id"));
            
            const data = {
                "themes": complaintType,
                "status": "Aguardando resposta",
                "descricao": description,
                "numero": addressNumber,
                "endereco": street + ", "+  neighborhood,
                "dataEnvio": sendDate,
                "dataFim": endDate,
                "cep":cep,
                "user": currentUser,
                "imageUrl": imgLink
            }
            
            if(cep == " " || street == " " || neighborhood == " " || addressNumber == " " || description == " " || !haveComplaint){
                canCreate = false;
            }else{
                canCreate =true;
            }
            
            if(canCreate){
                post(url,data);
                window.location.href = "./home.html";
            }else{
                alert("Verifique os dados e preenche todos os campos");
            }
            
            canCreate = true;
        }  
        
        function userDataShow(){
            document.getElementById("Name-desktop").placeholder = userData.name;
            document.getElementById("Email-desktop").placeholder = userData.email;
        
            document.getElementById("Name-cellphone").placeholder =  userData.name;
            document.getElementById("Email-cellphone").placeholder = userData.email;
        
            document.getElementById("Complaint-counter-desktop").placeholder = sessionStorage.getItem("QtdComplaint");
            document.getElementById("Complaint-counter-cellphone").placeholder = sessionStorage.getItem("QtdComplaint");
        }

        userDataShow();