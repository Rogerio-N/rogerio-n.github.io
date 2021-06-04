function get(url){
    let request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.send();
    return request.responseText;    
}

function Runner(){
    
    let rawData = get("http://localhost:8080/themes");
    let themes = JSON.parse(rawData);

    let themeDisplay = document.getElementById("Theme-display")

    if (themes.length == 0){
        var empty = document.createElement("h3");
        empty.innerHTML="Nenhuma categoria cadastrada";
        empty.style.textAlign = "center";
        empty.style.color = "#fff";

        themeDisplay.appendChild(empty);
    }

    themes.forEach(element => {
        
        themeDiv = document.createElement("div");
        themeDiv.className = "Theme";

        imgDiv = document.createElement("div");
        imgDiv.className = "imgDiv";

        themeImg = document.createElement("img");
        themeImg.src = "http://127.0.0.1:8887/"+element.photo;

        nameDiv = document.createElement("div");
        nameDiv.className = "nameDiv";

        themeName = document.createElement("h3");
        themeName.innerHTML = element.name;

        imgDiv.appendChild(themeImg);
        nameDiv.appendChild(themeName);

        themeDiv.appendChild(imgDiv);
        themeDiv.appendChild(nameDiv);

        themeDisplay.appendChild(themeDiv);

    });   

}

Runner();

function loginChecker(){
    event.preventDefault();
    let rawData = get("http://localhost:8080/users");
    let users = JSON.parse(rawData);
    
    let currentUserMail = document.getElementById("desktop-email").value;
    let currentUserPassword = document.getElementById("desktop-password").value;

    let canLogin = false;

    users.forEach(element => {
        if(currentUserMail == element.email && currentUserPassword == element.password){
            canLogin = true;
        }
    });

    if(canLogin){
        window.location.href = "./home.html";
    }else{
        alert("Usuário não encontrado, reensira as informações");
    }

}