document.getElementById("btnIngresar").addEventListener("click", function(){
    let name= document.getElementById("username").value;
    let password= document.getElementById("password").value;
    document.getElementById("errorMsg").style.display = "none";

    if (name==""){
        document.getElementById("errorMsg").style.display = "block";
    }

    if (password==""){
        document.getElementById("errorMsg").style.display = "block";
    }

    if (name!="" & password!=""){
        localStorage.setItem('autenticado', 'true');
        localStorage.setItem('username', name);
        window.location="index.html"
    }

})



