document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado"); // Esto debe aparecer en la consola
  const cartContainer = document.getElementById("cart");
  const reciboContainer = document.getElementById("recibo");
  const formulariodeenvio = document.getElementById("formulariodeenvio");

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
                  <div class="row product" data-price="${product.cost}" data-currency="${product.currency}">
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
              <p><strong>Subtotal en Pesos:</strong> <span class="total-pesos"></span></p> <!-- Subtotal en Pesos -->
              <p><strong>Subtotal en Dólares:</strong> <span class="total-dolares"></span></p> <!-- Subtotal en Dólares -->
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
    actualizarSubtotal(); // Actualizar el subtotal después de insertar el HTML del recibo
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

  function actualizarSubtotal() {
    let totalPesos = 0; // Inicializa el total en pesos
    let totalDolares = 0; // Inicializa el total en dólares
  
    // Selecciona todos los elementos de la clase 'cantidad'
    const subtotalElements = document.querySelectorAll(".cantidad");
  
    // Itera sobre cada cantidad en el carrito
    subtotalElements.forEach((input, index) => {
      const product = input.closest(".product");
      const precio = parseFloat(product.getAttribute("data-price")); // Obtiene el precio del producto
      const cantidad = parseInt(input.value); // Obtiene la cantidad del producto
      const moneda = product.getAttribute("data-currency"); // Obtiene la moneda del producto
  
      // Validar precio y cantidad antes de sumar
      if (!isNaN(precio) && !isNaN(cantidad) && cantidad > 0) {
        if (moneda === "$" || moneda === "UYU") {
          totalPesos += precio * cantidad; // Suma al total en pesos si la moneda es pesos o UYU
        } else if (moneda === "USD") {
          totalDolares += precio * cantidad; // Suma al total en dólares si la moneda es dólares
        }
      }
    });
  
    // Actualiza el subtotal en pesos
    const totalElementPesos = document.querySelector(".total-pesos");
    if (totalElementPesos) {
      totalElementPesos.textContent = `$${new Intl.NumberFormat("es-ES").format(totalPesos)}`; // Muestra el subtotal en pesos
    }
  
    // Actualiza el subtotal en dólares
    const totalElementDolares = document.querySelector(".total-dolares");
    if (totalElementDolares) {
      totalElementDolares.textContent = `USD ${new Intl.NumberFormat("es-ES").format(totalDolares)}`; // Muestra el subtotal en dólares
    }
  }
  
  
  

  function showFormaDeEnvio() {
    let htmlEnvio =  `
<div   class="card"> 
    <div class="card-body">
        <h2 class="card-title">Forma de Envío</h2>
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


        <h2 class="card-title">Dirección de Envío</h2>

        <div class="mb-3">
            <label for="departamento" class="form-label">Departamento*</label>
            <input type="text" class="form-control" id="departamento"   
required>
        </div>

        <div class="mb-3">
            <label for="localidad" class="form-label">Localidad*</label>
            <input type="text" class="form-control" id="localidad"   
required>
        </div>

        <div   
class="mb-3">
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
    </div>
`;
document.getElementById('formulariodeenvio');
    formulariodeenvio.innerHTML = htmlEnvio;
  }



  // Mostrar el carrito al cargar la página
  showCart();
  showRecibo();
  updateCartCount();
  showFormaDeEnvio();


});
