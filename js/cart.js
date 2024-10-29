document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const clearCartButton = document.getElementById("clear-cart");
  
    // Obtener el carrito de localStorage
    const listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Función para mostrar los productos en el carrito
    function mostrarCarrito() {
      cartContainer.innerHTML = ""; // Limpiar el contenido anterior
  
      if (listaCarrito.length === 0) {
        cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
      }
  
      listaCarrito.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("card", "mb-3");
  
        productElement.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Precio: ${product.currency} ${product.cost}</p>
            <p class="card-text">Cantidad: ${product.quantity}</p>
            <img src="${product.image}" alt="${product.name}" width="100">
          </div>
        `;
        cartContainer.appendChild(productElement);
      });
    }
  
    // Mostrar el carrito al cargar la página
    mostrarCarrito();
  
    // Botón para vaciar el carrito
    clearCartButton.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    });
  });
  