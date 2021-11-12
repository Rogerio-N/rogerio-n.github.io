let loginAttempts = 0;
let canLogin = true;
    
function Runner(){
    
    sessionStorage.setItem("isLoged",false);
    let rawData = getThemes("http://localhost:8080/api/v2/themes");
    let themes = JSON.parse(rawData);

    let themeDisplay = document.getElementById("Theme-display");

    themes.forEach(theme => {
        
        let themeDiv = document.createElement("div");
        themeDiv.className = "Theme";

        let imgDiv = document.createElement("div");
        imgDiv.className = "imgDiv";

        let themeImg = document.createElement("img");
        themeImg.src = theme.photo;

        let nameDiv = document.createElement("div");
        nameDiv.className = "nameDiv";

        let themeName = document.createElement("h3");
        themeName.innerHTML = theme.name;

        imgDiv.appendChild(themeImg);
        nameDiv.appendChild(themeName);

        themeDiv.appendChild(imgDiv);
        themeDiv.appendChild(nameDiv);

        themeDisplay.appendChild(themeDiv);

    });   

};

Runner();

function loginChecker(){
    event.preventDefault();
    
    let currentUserMail = document.getElementById("desktop-email").value || document.getElementById("cellphone-email").value;
    let currentUserPassword = document.getElementById("desktop-password").value || document.getElementById("cellphone-password").value;

    let data = {
        "email": currentUserMail,
        "password": currentUserPassword
    }

    let token = login("http://localhost:8080/login",data);
    if(token.length==0){
        loginAttempts++;
        return alert("Usuário não encontrado, insira novamente as informações");
    }
    redirect("./home.html");
    sessionStorage.setItem("Token",token)
    sessionStorage.setItem("isLoged",true)
    waitSearch(loginAttempts, 4)
    loginAttempts ++;
};