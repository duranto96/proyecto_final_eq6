const CATEGORIES_URL = "http://localhost:3000/categories";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell";
const PRODUCTS_URL = "http://localhost:3000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments/";
const CART_INFO_URL = "http://localhost:3000/user_cart/";
const CART_BUY_URL = "http://localhost:3000/cart/buy";
const EXT_TYPE = ".json";
//se reemplazaron las URLs remotas por las locales del backend.

let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

function mostrarUsuarioEnNavegacion() {
  if (localStorage.getItem("autenticado") === "true") {
    let userName = localStorage.getItem("username");
    if (userName) {
      document.getElementById("user-email").textContent = userName;
    } else {
      window.location.href = "login.html";
    }
  } else {
    window.location.href = "login.html";
  }

  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("autenticado");
    localStorage.removeItem("username");
    window.location.href = "login.html";
  });
}

window.onload = function () {
  mostrarUsuarioEnNavegacion();
};

document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("checkbox");
  const body = document.body;

  // Verificar si hay una preferencia almacenada en el LocalStorage
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    body.classList.add(currentTheme);
    toggleSwitch.checked = currentTheme === "dark-mode";
  }

  // Cambiar el tema y guardar la preferencia en el LocalStorage
  toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");

      localStorage.setItem("theme", "dark-mode"); // Guardar preferencia
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light-mode"); // Guardar preferencia
    }
  });
  updateCartCount();
});

// Función para actualizar el contador del badge en el menú
function updateCartCount() {
  // Recalcular el total de productos en listaCarrito
  const cartCount = listaCarrito.reduce(
    (total, item) => total + (parseInt(item.quantity) || 0),
    0
  );

  const cartCountElement = document.getElementById("cart-count");
  console.log("Cart Count:", cartCount); // Verificar el valor de cartCount
  if (cartCountElement) {
    cartCountElement.textContent = cartCount; // Actualiza el badge
    console.log("Badge Updated"); // Confirmar que el badge se actualizó
  } else {
    console.log("Badge element not found"); // Verificar si el elemento existe
  }
}
