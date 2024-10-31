document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado"); // Esto debe aparecer en la consola
  const cartContainer = document.getElementById("cart");
  const reciboContainer = document.getElementById("recibo");
  let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  console.log(listaCarrito); // Asegurarnos que estén los elementos del carrito

  function showCart() {
    cartContainer.innerHTML = ""; // Limpiar contenido anterior
    if (listaCarrito.length === 0) {
      cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
      return;
    }

    listaCarrito.forEach((product, index) => {
      // Estructura HTML para cada producto
      let htmlProduct = `
                <div class="row product" data-price="${product.cost}">
                    <div class="col">
                        <div class="comment">
                            <div class="row">
                                <div class="col-3">
                                    <img src="${
                                      product.image
                                    }" class="img-thumbnail">
                                </div>
                                <div class="col d-flex align-items-center">
                                    <div class="w-100">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h4 class="mb-1">${
                                              product.name
                                            }</h4>
                                            <div class="text-end">
                                                <div class="input-group mb-2 moreless-input" style="width: 120px;">
                                                    <button class="btn btn-outline-secondary btn-less" type="button" onclick="decrement(${index})">-</button>
                                                    <input type="text" class="text-center cantidad" id="quantity-${index}" value="${
        product.quantity
      }">
                                                    <button class="btn btn-outline-secondary btn-more" type="button" onclick="increment(${index})">+</button>
                                                </div>
                                                <small class="text-muted subtotal">${
                                                  product.currency
                                                }${new Intl.NumberFormat(
        "es-ES"
      ).format(product.cost * product.quantity)}</small>
                                            </div>
                                        </div>
                                        <small class="text-muted">Precio unitario: ${
                                          product.currency
                                        }${new Intl.NumberFormat(
        "es-ES"
      ).format(product.cost)}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
      cartContainer.insertAdjacentHTML("beforeend", htmlProduct);
    });
  }

  function showRecibo() {
    // Agregar la sección de recibo
    let htmlRecibo = `
    <div class="col-md-4 resumen-compra">
        <h3>Recibo</h3>
        <div class="subtotal">
            <p><strong>Subtotal:</strong> <span class="total"></span></p> <!-- Monto aquí -->
            <div class="opcion-envio">
                <input type="checkbox" id="envio-gratis" name="envio-gratis">
                <label for="envio-gratis" class="text-muted">Envío mi compra a mi domicilio (gratis)</label>
            </div>
            <div class="botones">
                <button class="btn-cancelar">Cancelar compra</button>
                <button class="btn-abonar">Abonar compra</button>
            </div>
        </div>
    </div>
`;
    reciboContainer.insertAdjacentHTML("beforeend", htmlRecibo);
    actualizarSubtotal(); // Añadir los listeners para actualizar el subtotal
  }

  // Función para incrementar la cantidad
  window.increment = function (index) {
    listaCarrito[index].quantity += 1;
    localStorage.setItem("carrito", JSON.stringify(listaCarrito));
    showCart(); // Actualizar la vista del carrito
    actualizarSubtotal();
    updateCartCount();
  };

  // Función para decrementar la cantidad
  window.decrement = function (index) {
    if (listaCarrito[index].quantity > 1) {
      listaCarrito[index].quantity -= 1;
      localStorage.setItem("carrito", JSON.stringify(listaCarrito));
      showCart(); // Actualizar la vista del carrito
      actualizarSubtotal();
      updateCartCount();
    }
  };

  // Función para actualizar el subtotal en tiempo real
  function actualizarSubtotal() {
    let total = 0; // Inicializa el total
    const subtotalElements = document.querySelectorAll(".cantidad");

    subtotalElements.forEach((input, index) => {
      const product = input.closest(".product");
      const precio = parseFloat(product.getAttribute("data-price"));
      const cantidad = parseInt(input.value);

      // Validar precio y cantidad antes de sumar
      if (!isNaN(precio) && !isNaN(cantidad) && cantidad > 0) {
        total += precio * cantidad; // Suma al total solo si es válido
      }
    });

    // Actualiza el subtotal en la vista
    const totalElement = document.querySelector(".total"); // Selecciona el elemento donde se muestra el total
    if (totalElement) {
      const currency = listaCarrito[0]?.currency || ""; // Obtiene la currency del primer producto
      totalElement.textContent = `${currency}${new Intl.NumberFormat(
        "es-ES"
      ).format(total)}`; // Muestra el subtotal
    }
  }

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

  // Mostrar el carrito al cargar la página
  showCart();
  showRecibo();
  updateCartCount();
});
