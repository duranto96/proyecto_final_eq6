let form = document.getElementById("loginForm");
form.addEventListener("submit", function(e){
    let name= document.getElementById("username").value;
    let password= document.getElementById("password").value;
    document.getElementById("errorMsg").style.display = "none";
    if (!form.checkValidity()){

    if (name==""){
        document.getElementById("errorMsg").style.display = "block";
    }

    if (password==""){
        document.getElementById("errorMsg").style.display = "block";
    }
}
    if (name!="" & password!=""){
        localStorage.setItem('autenticado', 'true');
        localStorage.setItem('username', name);
        window.location="index.html"
    }
    e.preventDefault();
})



