function loginRedirect(){
    let isLoged = sessionStorage.getItem("isLoged");
    
    if(isLoged == "True"){
        window.location.href = "./home.html";
    }else{
        window.location.href = "./index.html";
    }
}