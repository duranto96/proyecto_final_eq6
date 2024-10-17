document.addEventListener("DOMContentLoaded", () => {
  const profilePicInput = document.getElementById("profilePic");
  const profileImage = document.getElementById("profileImage");
  const navProfileImage = document.getElementById("navProfileImage"); // Imagen de perfil en la barra de navegación
  const saveProfileButton = document.getElementById("saveProfile");
  const alertContainer = document.getElementById("alertContainer"); // Referencia al contenedor de alerta
  
  function loadProfileData(){
let email=localStorage.getItem("username");
let userInfo=localStorage.getItem("datosFormulario");
if (userInfo){
  let userInfoUserObject=json.parse(userInfo);
 document.getElementById("nombre").value = userInfoUserObject.nombre;
  document.getElementById("segundo_nombre").value= userInfoUserObject.segundo_nombre;
  // document.getElementById("apellido").value;
  // document.getElementById("segundo_apellido").value;
  // document.getElementById("email").value;
  // document.getElementById("telefono").value;

}
  }

  

  // Tamaño máximo permitido para la imagen (en bytes), por ejemplo, 2 MB
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB en bytes

  // Función para cargar la imagen de localStorage si existe
  function loadProfileImage() {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      profileImage.src = storedImage; // Cargar imagen en el perfil
      navProfileImage.src = storedImage; // Cargar imagen en la barra de navegación
    }
  }

  // Validación del archivo cargado
  function validateFile(file) {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Por favor, selecciona un archivo de imagen válido (JPEG, PNG).");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("El archivo es demasiado grande. El tamaño máximo es de 2 MB.");
      return false;
    }

    return true;
  }

  // Función para mostrar la alerta de éxito
  function showSuccessAlert() {
    alertContainer.style.display = "block";
    setTimeout(() => {
      alertContainer.style.display = "none";
    }, 3000);
  }

  // Escuchar el cambio en el input de archivo
  profilePicInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = function () {
        profileImage.src = reader.result; // Mostrar la imagen en el perfil
        navProfileImage.src = reader.result; // Mostrar la imagen en la barra de navegación
      };
      reader.readAsDataURL(file);
    } else {
      profilePicInput.value = "";
    }
  });

  // Guardar la imagen y otros datos cuando se pulsa el botón
  saveProfileButton.addEventListener("click", function () {
    if (profileImage.src && profileImage.src.startsWith("data:image")) {
      const imageData = profileImage.src;
      localStorage.setItem("profileImage", imageData);
    }
    guardarDatos();
    showSuccessAlert();
  });

  // Cargar la imagen guardada cuando se abra la página
  loadProfileImage();
 loadProfileData();
});



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

function guardarDatos() {
  // Obtener los valores de los campos (suponiendo que tienes campos con ID "nombre", "email" y "mensaje")
  const nombre = document.getElementById("nombre").value;
  const segundo_nombre = document.getElementById("segundo_nombre").value;
  const apellido = document.getElementById("apellido").value;
  const segundo_apellido = document.getElementById("segundo_apellido").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;



  // Crear un objeto con los datos
  const datosFormulario = {
    nombre: nombre,
    segundo_nombre: segundo_nombre,
    apellido: apellido,
    segundo_apellido: segundo_apellido,
    email: email,
    telefono: telefono,
    

    
  };


  
  // Convertir el objeto a JSON y almacenarlo en Local Storage
  localStorage.setItem("datosFormulario", JSON.stringify(datosFormulario));
}

