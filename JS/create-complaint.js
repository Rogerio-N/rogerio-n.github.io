var imgurResponse;

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
    imgurResponse = postImgur("https://api.imgur.com/3/image",imgurData,"6938311787a8442");
    imgurResponse = JSON.parse(imgurResponse)
    console.log("ImgurLink "+ imgurResponse.data.link)
    let imgLink = imgurResponse.data.link
    let currentUser = getUserData().id;
    const complaintData = {
        "themes": complaintType,
        "status": "Aguardando resposta",
        "descricao": description,
        "numero": addressNumber,
        "endereco": `${street}, ${neighborhood}`,
        "dataEnvio": sendDate,
        "dataFim": endDate,
        "cep":cep,
        "user": currentUser,
        "imageUrl": imgLink
    }
    
    console.log(complaintData)

    if(cep == " " || street == " " || neighborhood == " " || addressNumber == " " || description == " " || !haveComplaint){
        canCreate = false;
        console.log("If em branco")
    }else{
        canCreate =true;
    }
    
    if(canCreate){
        sendComplaint(`${API_URL}/complaint`,complaintData);
        window.location.href = "./home.html";
    }else{
        alert("Verifique os dados e preenche todos os campos");
    }
    
    canCreate = true;
    }  
        
function userDataShow(){
    document.getElementById("Name-desktop").placeholder = getUserData().name;
    document.getElementById("Email-desktop").placeholder = getUserData().email;

    document.getElementById("Name-cellphone").placeholder =  getUserData().name;
    document.getElementById("Email-cellphone").placeholder = getUserData().email;

    document.getElementById("Complaint-counter-desktop").placeholder = sessionStorage.getItem("QtdComplaint");
    document.getElementById("Complaint-counter-cellphone").placeholder = sessionStorage.getItem("QtdComplaint");
}

userDataShow();