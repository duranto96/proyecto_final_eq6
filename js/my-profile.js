

// Ejemplo de validación con JavaScript
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');   

    }
});

function validarEmail(email) {
    // Expresión regular para validar un correo electrónico (no es 100% precisa, pero cubre muchos casos)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Obtener el elemento del input
const inputEmail = document.getElementById('email');

// Agregar un evento al enviar el formulario
inputEmail.addEventListener('blur', () => {
    const email = inputEmail.value;
    if (!validarEmail(email)) {
        alert('Por favor, ingresa una dirección de correo electrónico válida.');
    }
});

