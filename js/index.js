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

// Al cargar la página
window.onload = function() {
    // Verifica si el usuario está autenticado
    if (localStorage.getItem("autenticado") === "true") {
        // Si está autenticado, no hacemos nada (o podrías redirigir a la página principal)
        console.log("Usuario autenticado");
    } else {
        // Si no está autenticado, redirigir a la página de login
        window.location.href = 'login.html';
    }
}
