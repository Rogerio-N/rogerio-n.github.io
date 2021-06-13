function get(url){
    let request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.send();
    return request.responseText;    
};

function userDataShow(){
    let userName = sessionStorage.getItem("Name");
    let userEmail = sessionStorage.getItem("Email");

    document.getElementById("Name-desktop").placeholder = userName;
    document.getElementById("Email-desktop").placeholder = userEmail;

    document.getElementById("Name-cellphone").placeholder = userName;
    document.getElementById("Email-cellphone").placeholder = userEmail;
}

userDataShow();

function complaintInsert(){
    let rawData = get("http://localhost:8080/complaint");
    let allComplaint = JSON.parse(rawData);

    let table = document.getElementById("History-table");
    var qtdComplaint = 0;

    let currentUser = parseInt(sessionStorage.getItem("Id"));

    allComplaint.forEach(element => {
        
        if(element.user.id == currentUser){
            let row = document.createElement("tr");

            let dateSend = document.createElement("td");
            let dataSendPrep = new Date(element.dataEnvio);
            let dataSendDay = dataSendPrep.getDate().toString();
            let dataSendMonth = dataSendPrep.getMonth().toString();
            let dataSendYear = dataSendPrep.getFullYear().toString();
            let fullSendDate = dataSendDay+"/"+dataSendMonth+"/"+dataSendYear;
            dateSend.innerHTML = fullSendDate;
    
    
            let protocol = document.createElement("td");
            protocol.innerHTML = element.protocol;
    
            let org = document.createElement("td");
            org.innerHTML = "SISEP"
    
            let dateEnd = document.createElement("td");
            let dataEndPrep = new Date(element.dataFim);
            let dataEndDay = dataEndPrep.getDate().toString();
            let dataEndMonth = dataEndPrep.getMonth().toString();
            let dataEndYear = dataEndPrep.getFullYear().toString();
            let fullEndDate = dataEndDay+"/"+dataEndMonth+"/"+dataEndYear;
            dateEnd.innerHTML = fullEndDate;
    
            let status = document.createElement("td");
            status.innerHTML = element.status;
    
            row.appendChild(dateSend);
            row.appendChild(protocol);
            row.appendChild(org);
            row.appendChild(dateEnd);
            row.appendChild(status);
    
            table.appendChild(row);
    
            qtdComplaint++;
   
        }
            sessionStorage.setItem("QtdComplaint", qtdComplaint);
            document.getElementById("Complaint-user-count").placeholder = sessionStorage.getItem("QtdComplaint");
            document.getElementById("Complaint-counter-text").innerHTML = sessionStorage.getItem("QtdComplaint");
        
    });

   

}


complaintInsert();