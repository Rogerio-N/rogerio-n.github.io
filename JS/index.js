    function get(url){
        let request = new XMLHttpRequest();
        request.open("GET",url,false);
        request.send();
        return request.responseText;    
    };

    function Runner(){
        
        sessionStorage.setItem("isLoged",false);
        let rawData = get("http://localhost:8080/api/v2/themes");
        let themes = JSON.parse(rawData);

        let themeDisplay = document.getElementById("Theme-display");

        themes.forEach(element => {
            
            let themeDiv = document.createElement("div");
            themeDiv.className = "Theme";

            let imgDiv = document.createElement("div");
            imgDiv.className = "imgDiv";

            let themeImg = document.createElement("img");
            themeImg.src = element.photo;
            //themeImg.src = element.photo;

            let nameDiv = document.createElement("div");
            nameDiv.className = "nameDiv";

            let themeName = document.createElement("h3");
            themeName.innerHTML = element.name;

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
        let rawData = get("http://localhost:8080/api/v2/users");
        let users = JSON.parse(rawData);
        
        let currentUserMail = document.getElementById("desktop-email").value;
        let currentUserPassword = document.getElementById("desktop-password").value;

        let currentUserMailCell = document.getElementById("desktop-email").value;
        let currentUserPasswordCell = document.getElementById("desktop-password").value;
        
    
        let canLogin = false;
    
        users.forEach(element => {

            //Verificar se o campo de email no desktop esta preenchido
            //Caso esteja vazio, usa-se o valor dos campos de celular
            //Caso esteja com alguma valor preenchido entra no else
            //E pega os dados dos campos do pc
            if(currentUserMail == " " || currentUserPassword== " "){

                if(currentUserMailCell == element.email && currentUserPasswordCell == element.password){

                    sessionStorage.setItem("Name",element.name);
                    sessionStorage.setItem("Email",element.email);
                    sessionStorage.setItem("Id",element.id);

                    canLogin = true;
                }

            }else{
                if(currentUserMail == element.email && currentUserPassword == element.password){

                    sessionStorage.setItem("Name",element.name);
                    sessionStorage.setItem("Email",element.email);
                    sessionStorage.setItem("Id",element.id);

                    canLogin = true;
                }   
            }


            
        });
    
        if(canLogin){
            sessionStorage.setItem("isLoged",true);
            window.location.href = "./home.html";
        }else{
            alert("Usuário não encontrado, reensira as informações");
        }
    
    };