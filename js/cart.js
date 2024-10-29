// Verifica si hay un productId en el localStorage antes de construir la URL
let productId = localStorage.getItem("productId");

if (productId) {
  let productINFOURL = PRODUCT_INFO_URL + productId + EXT_TYPE; // Se encarga de armar una URL para que el 
                                                                //getJSONData vaya a consultar a una URL variable por articulo

  // Obtener los datos del producto si existe productId
  getJSONData(productINFOURL).then(function(result) {  //getJSONData es una función que está definidda en init.js y tiene un fetch
    if (result.status === "ok") {
        let productData = result.data;
        showProduct(productData);
    } else {
        console.error("Error al obtener los datos del producto");
    }
  });
} else {
  // Si no hay productId, mostrar el mensaje de error
  document.getElementById("cart").innerHTML = `<p>No se encontró ningún producto.</p>`;
}

let productCost; 

// Función para mostrar el producto
function showProduct(product) {
    let htmlProduct = ""; 
        htmlProduct += `



         <!--Sector donde se carga el articulo -->




        <div class="row">
            <div class="col">
                <div class="comment">
                    <div class="row"> 
                        <div class="col-3">
                            <img src="${product.images[0]}" class="img-thumbnail">
                        </div>
                        <div class="col d-flex align-items-center">
                            <div class="w-100">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${product.name}</h4>
                                    <div class="text-end">
                                        <div class="input-group mb-2 moreless-input" style="width: 120px;">
                                            <button class="btn btn-outline-secondary btn-less" type="button" onclick="decrement()">-</button>
                                            <input type="text" class="text-center" id="quantity" value="1" readonly>
                                            <button class="btn btn-outline-secondary btn-more" type="button" onclick="increment()">+</button>
                                        </div>
                                        <small class="text-muted" id="costo">${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost)}</small>
                                    </div>
                                </div>
                                <small class="text-muted">${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost)}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            <div class="col"> 




             <!--Sector Recibo --> 

                <div class="col-md-4 resumen-compra">
                    <h3>Recibo</h3>
                    <div class="subtotal">
                        <p><strong>Subtotal:</strong></p>
                        <div class="opcion-envio">
                            <input type="checkbox" id="envio gratis" name="envio gratis">
                            <label for="envio gratis" class="text-muted">Envío mi compra a mi domicilio (gratis)</label>
                        </div>
                        <div class="botones">
                            <button class="btn-cancelar">Cancelar compra</button>
                            <button class="btn-abonar">Abonar compra</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `; 
  
        document.getElementById("cart").innerHTML = htmlProduct;
    }


// Función para incrementar la cantidad
function increment() {
    let quantityInput = document.getElementById("quantity");
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Función para decrementar la cantidad
function decrement() {
    let quantityInput = document.getElementById("quantity");
    if (parseInt(quantityInput.value) > 1) {  // evita que baje de 1
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}
