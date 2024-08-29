document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

});

window.onload = function() {
    // Verifica si el usuario está autenticado
    if (localStorage.getItem("autenticado") === "true") {
        let userName = localStorage.getItem('username');
        if (userName) {
            document.getElementById("user-email").textContent = userName;
        }
    } else {
        // Si no está autenticado, redirigir a la página de login
        window.location.href = 'login.html';
    }
}

