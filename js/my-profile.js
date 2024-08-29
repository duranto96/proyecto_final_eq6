window.onload = function() {
    if (localStorage.getItem("autenticado") === "true") {
        let userName = localStorage.getItem('username');
        if (userName) {
            document.getElementById("user-email").textContent = userName;
        } 
    } else {
            window.location.href = 'login.html';
        }
}