let searchAttempts = 0;

function userDataShow(){
    const userData = getUserData();
    document.getElementById("Name-desktop").placeholder =userData.name;
    document.getElementById("Email-desktop").placeholder = userData.email;

    document.getElementById("Name-cellphone").placeholder =  userData.name;
    document.getElementById("Email-cellphone").placeholder = userData.email;
}

userDataShow();

function complaintInsert(){
    let rawData = get(`${API_URL}/api/v2/complaint/find/userComplaint?user_id=${getUserData().id}`,token);
    let allUserComplaint = JSON.parse(rawData);
    if(allUserComplaint.length == 0){return sessionStorage.setItem("QtdComplaint",0)}

    let table = document.getElementById("History-table");
    var qtdComplaint = 0;

    allUserComplaint.forEach(complaint => {
        
        let row = document.createElement("tr");
        row.className = "allUserComplaint";
        row.id = complaint.id;

        let dateSend = document.createElement("td");
        let dataSendPrep = new Date(complaint.dataEnvio);
        let fullSendDate = `${dataSendPrep.getDate()}/${dataSendPrep.getMonth()}/${dataSendPrep.getFullYear()}`;
        dateSend.innerHTML = fullSendDate;


        let protocol = document.createElement("td");
        protocol.innerHTML =complaint.id;

        let org = document.createElement("td");
        org.innerHTML = "SISEP"

        let dateEnd = document.createElement("td");
        let dataEndPrep = new Date(complaint.dataFim);
        let fullEndDate = `${dataEndPrep.getDate()}/${dataEndPrep.getMonth()}/${dataEndPrep.getFullYear()}`;
        dateEnd.innerHTML = fullEndDate;

        let status = document.createElement("td");
        status.innerHTML = complaint.status;

        row.appendChild(dateSend);
        row.appendChild(protocol);
        row.appendChild(org);
        row.appendChild(dateEnd);
        row.appendChild(status);

        table.appendChild(row);

        qtdComplaint++;

        sessionStorage.setItem("QtdComplaint", qtdComplaint);
        
    });
    
    document.getElementById("Complaint-user-count").placeholder = sessionStorage.getItem("QtdComplaint");
    document.getElementById("Complaint-counter-text").innerHTML = sessionStorage.getItem("QtdComplaint");
    document.getElementById("Complaint-Mobile-counter").placeholder = sessionStorage.getItem("QtdComplaint");
    
}

complaintInsert();

function cleanQuery(){
    let search = document.getElementsByClassName("currentComplaint");
    for(let i = 0; i<search.length;i++){
        search[i].style.display = "none";
    }

    let oldDivs = document.getElementsByClassName("allUserComplaint");

        for(let i = 0; i<oldDivs.length;i++){
            oldDivs[i].style.display = "table-row";
        }
    
}

function searchComplaint(){
    
    let currentComplaintProtocol = document.getElementById("Protocol-text-inpt").value;
    //Campo vazio
    if(currentComplaintProtocol.trim() == ""){return alert('Preencha o campo para realizar a busca')};
    waitSearch(searchAttempts,5);
    searchAttempts++;
    if(searchAttempts>=6){return searchAttempts = 0;}
    let params = `?user_id=${getUserData().id}&complaint_id=${currentComplaintProtocol}`;
    let rawData = get(`${API_URL}/api/v2/complaint/find/userSpecificComplaint${params}`,token);
    //Nenhuma denuncia
    if (rawData.length==0){return alert("Nenhuma denuncia foi encontrada com esse numero de protocolo")}
    let Complaint = JSON.parse(rawData);
    cleanQuery();
    let table = document.getElementById("History-table");
    let oldDivs = document.getElementsByClassName("allUserComplaint");

    for(let i = 0; i<oldDivs.length;i++){
        oldDivs[i].style.display = "none";
    }
    
    let row = document.createElement("tr");
    row.className = "currentComplaint";
    let dateSend = document.createElement("td");
    let dataSendPrep = new Date(Complaint.dataEnvio);
    let fullSendDate = `${dataSendPrep.getDate()}/${dataSendPrep.getMonth()}/${dataSendPrep.getFullYear()}`;
    dateSend.innerHTML = fullSendDate;

    let protocol = document.createElement("td");
    protocol.innerHTML = Complaint.id;

    let org = document.createElement("td");
    org.innerHTML = "SISEP"

    let dateEnd = document.createElement("td");
    let dataEndPrep = new Date(Complaint.dataFim);
    let fullEndDate = `${dataEndPrep.getDate()}/${dataEndPrep.getMonth()}/${dataEndPrep.getFullYear()}`;
    dateEnd.innerHTML = fullEndDate;

    let status = document.createElement("td");
    status.innerHTML = Complaint.status;

    row.appendChild(dateSend);
    row.appendChild(protocol);
    row.appendChild(org);
    row.appendChild(dateEnd);
    row.appendChild(status);

    table.appendChild(row);
}