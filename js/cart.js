document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart");
    let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function showCart() {
        cartContainer.innerHTML = ""; // Limpiar contenido anterior

        if (listaCarrito.length === 0) {
            cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
            return;
        }

        listaCarrito.forEach((product, index) => {
            // Estructura HTML para cada producto
            let htmlProduct = `
                <div class="row">
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
                                                    <input type="text" class="text-center" id="quantity-${index}" value="${product.quantity}" readonly>
                                                    <button class="btn btn-outline-secondary btn-more" type="button" onclick="increment(${index})">+</button>
                                                </div>
                                                <small class="text-muted">${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost * product.quantity)}</small>
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

        // Agregar la sección de recibo
        let htmlRecibo = `
            <div class="col-md-4 resumen-compra">
                <h3>Recibo</h3>
                <div class="subtotal">
                    <p><strong>Subtotal:</strong></p>
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
        cartContainer.insertAdjacentHTML("beforeend", htmlRecibo);
    }

    // Función para incrementar la cantidad
    window.increment = function(index) {
        listaCarrito[index].quantity += 1;
        localStorage.setItem("carrito", JSON.stringify(listaCarrito));
        showCart(); // Actualizar la vista del carrito
    }

    // Función para decrementar la cantidad
    window.decrement = function(index) {
        if (listaCarrito[index].quantity > 1) {
            listaCarrito[index].quantity -= 1;
            localStorage.setItem("carrito", JSON.stringify(listaCarrito));
            showCart(); // Actualizar la vista del carrito
        }
    }

    // Mostrar el carrito al cargar la página
    showCart();
});
