let costoEnvio = 0;
let subtotalPesos = 0;

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart");
  const reciboContainer = document.getElementById("recibo");
  const formulariodeenvio = document.getElementById("formulariodeenvio");

  function showCart() {
    cartContainer.innerHTML = "";
    if (listaCarrito.length === 0) {
      cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
      return;
    }

    listaCarrito.forEach((product, index) => {
      let htmlProduct = `
                  <div class="row product" data-price="${product.cost}" data-currency="${product.currency}">
                    <div class="col">
                        <div class="comment">
                            <div class="row">
                                <div class="col-3">
                                    <img src="${product.image}" class="img-thumbnail">
                                </div>
                                <div class="col d-flex align-items-center">
                                    <div class="w-100">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h4 class="mb-1">${product.name}</h4>
                                            <div class="text-end">
                                                <div class="input-group mb-2 moreless-input" style="width: 120px;">
                                                    <button class="btn btn-outline-secondary btn-less" type="button" onclick="decrement(${index})">-</button>
                                                    <input type="text" class="text-center cantidad" id="quantity-${index}" value="${product.quantity}">
                                                    <button class="btn btn-outline-secondary btn-more" type="button" onclick="increment(${index})">+</button>
                                                </div>
                                                <small class="text-muted subtotal">${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost * product.quantity)}</small>
                                            </div>
                                        </div>
                                        <small class="text-muted">Precio unitario: ${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost)}</small>
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
    let htmlRecibo = `
      <div class="col-md-4 resumen-compra">
          <h3>Recibo</h3>
          <div class="subtotal">
              <p><strong>Subtotal en Pesos:</strong> <span class="total-pesos"></span></p>
              <p><strong>Costo de Envío:</strong> <span class="total-envio"></span></p>
              <p><strong>Total:</strong> <span class="total-final"></span></p>
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
    actualizarSubtotal();
  }

  window.increment = function (index) {
    listaCarrito[index].quantity += 1;
    localStorage.setItem("carrito", JSON.stringify(listaCarrito));
    showCart(); 
    actualizarSubtotal();
    updateCartCount();
  };

  window.decrement = function (index) {
    if (listaCarrito[index].quantity > 1) {
      listaCarrito[index].quantity -= 1;
      localStorage.setItem("carrito", JSON.stringify(listaCarrito));
      showCart(); 
      actualizarSubtotal();
      updateCartCount();
    }
  };


// Función para actualizar el subtotal
function actualizarSubtotal() {
  subtotalPesos = 0; // Reiniciar subtotal cada vez que se recalcula

  const subtotalElements = document.querySelectorAll(".cantidad");
  subtotalElements.forEach((input) => {
    const product = input.closest(".product");
    const precio = parseFloat(product.getAttribute("data-price"));
    const cantidad = parseInt(input.value);
    const moneda = product.getAttribute("data-currency");

    if (!isNaN(precio) && !isNaN(cantidad) && cantidad > 0) {
      if (moneda === "$" || moneda === "UYU") {
        subtotalPesos += precio * cantidad;
      } else if (moneda === "USD") {
        subtotalPesos += precio * cantidad * 42; // Conversión de dólares a pesos
      }
    }
  });

  // Mostrar el subtotal actualizado
  document.querySelector(".total-pesos").textContent = formatCurrency(subtotalPesos);

  // Llamamos a la función de costos (costo de envío) sin recalcular el subtotal
  actualizarCostos();
}

// Función para actualizar los costos (costo de envío)
function actualizarCostos() {
  const tipoEnvio = document.querySelector("input[name='shipping']:checked");
  
  costoEnvio = 0; // Reiniciar el costo de envío cada vez que se actualiza

  if (tipoEnvio) {
    switch (tipoEnvio.id) {
      case "premium":
        costoEnvio = subtotalPesos * 0.15; // 15% de costo de envío
        break;
      case "express":
        costoEnvio = subtotalPesos * 0.07; // 7% de costo de envío
        break;
      case "standard":
        costoEnvio = subtotalPesos * 0.05; // 5% de costo de envío
        break;
    }
  }

  // Mostrar el costo de envío actualizado
  document.querySelector(".total-envio").textContent = formatCurrency(costoEnvio);

  // Calcular el total final (subtotal + costo de envío)
  const totalFinal = subtotalPesos + costoEnvio;

  // Mostrar el total final
  document.querySelector(".total-final").textContent = formatCurrency(totalFinal);
}

// Función para formatear la moneda
const formatCurrency = (amount) => new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "UYU",  // Cambiar la moneda si es necesario
}).format(amount);

// Inicializar listeners para cambios en la cantidad de productos y tipo de envío
function initListeners() {
  // Escuchar cambios en la cantidad de productos
  document.querySelectorAll(".cantidad").forEach(input => {
    input.addEventListener("input", actualizarSubtotal); // Actualizamos solo el subtotal
  });

  // Escuchar cambios en el tipo de envío
  document.querySelectorAll("input[name='shipping']").forEach(input => {
    input.addEventListener("change", actualizarCostos); // Actualizamos solo el costo de envío
  });
}

// Inicializar cuando la página cargue
document.addEventListener("DOMContentLoaded", () => {
  initListeners(); // Iniciamos los listeners
  actualizarSubtotal(); // Mostrar los totales iniciales
});


  function showFormaDeEnvio() {
    let htmlEnvio = `
      <div>
          <h2>Forma de Envío</h2>
          <p>Elige tu forma de envío:</p>

          <div class="form-check">
              <input class="form-check-input" type="radio" name="shipping" id="premium">
              <label class="form-check-label" for="premium">
                  Premium 2 a 5 días (15%)
              </label>
          </div>
          <div class="form-check">
              <input class="form-check-input" type="radio" name="shipping" id="express">
              <label class="form-check-label" for="express">
                  Express 5 a 8 días (7%)
              </label>
          </div>
          <div class="form-check" id="form-check2">
              <input class="form-check-input" type="radio" name="shipping" id="standard">
              <label class="form-check-label" for="standard">
                  Standard 12 a 15 días (5%)
              </label>
          </div>

          <h2>Dirección de Envío</h2>
          <div class="mb-3">
              <label for="departamento" class="form-label">Departamento*</label>
              <input type="text" class="form-control" id="departamento" required>
          </div>
          <div class="mb-3">
              <label for="localidad" class="form-label">Localidad*</label>
              <input type="text" class="form-control" id="localidad" required>
          </div>
          <div class="mb-3">
              <label for="calle" class="form-label">Calle*</label>
              <input type="text" class="form-control" id="calle" required>
          </div>
          <div class="mb-3">
              <label for="numero_de_puerta" class="form-label">Número de Puerta*</label>
              <input type="text" class="form-control" id="numero_de_puerta" required>
          </div>
          <div class="mb-3">
              <label for="esquina" class="form-label">Esquina*</label>
              <input type="text" class="form-control" id="esquina" required>
          </div>
      </div>
    `;
    formulariodeenvio.innerHTML = htmlEnvio;

    // Actualizar el subtotal y costos cuando se selecciona un tipo de envío
    document.querySelectorAll("input[name='shipping']").forEach(input => {
      input.addEventListener("change", () => {
        actualizarSubtotal();
        actualizarCostosTotales(parseFloat(document.querySelector(".total-pesos").textContent.replace('$', '').replace(',', '')));
      });
    });
  }

  showCart();
  showRecibo();
  updateCartCount();
  showFormaDeEnvio();
});


