document.addEventListener("DOMContentLoaded", () => {
  const profilePicInput = document.getElementById("profilePic");
  const profileImage = document.getElementById("profileImage");
  const navProfileImage = document.getElementById("navProfileImage"); // Imagen de perfil en la barra de navegación
  const saveProfileButton = document.getElementById("saveProfile");
  const alertContainer = document.getElementById("alertContainer"); // Referencia al contenedor de alerta

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

    showSuccessAlert();
  });

  // Cargar la imagen guardada cuando se abra la página
  loadProfileImage();
});
