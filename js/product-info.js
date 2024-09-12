let productINFOURL = PRODUCT_INFO_URL + localStorage.getItem("id") + EXT_TYPE;

fetch(productsINFOURL)
    .then((respuesta) => {
        console.log(respuesta);
        return respuesta.json();
    })
    .then((resultadoObj) => {
        showProduct(resultadoObj);
    });


/* 
function showProduct(product) {
 let htmlProduct = ` 
          
         <div class="col-3">
           <h6>${product.category}</h6>
           <h7>${product.soldCount}</h7>
           <h2>${product.name}</h2>
           <p>${product.description}</p>
           <p><strong>Precio:</strong> ${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost)}</p>
           <button class="btn btn-primary">Agregar al carrito</button>
         </div>`;

         for (let img of product.images){
           htmlProduct+=`<<div class="col-7">
            <img src="${img}" alt="Imagen principal del producto">
         </div>
           `
         }

         document.getElementById("product").innerHTML = htmlProduct;
}
*/



function showProduct(product) {
    let htmlProduct += `<div id="imagenGrande" class="col-7">
                    <img src="${product.images[0]}" alt="Imagen principal del producto">
                  </div>`;

    for (let i = 1; i < product.images.length; i++) {
        const img = product.images[i].img;
        htmlProduct += `<div id="imagenes-chicas"class=col-7">
                    <img src="${img}" alt="Imagen principal del producto">
                  </div>`;

        htmlProduct += `<div id="info" class="col-3">
                    <h6>${product.category}</h6>
                    <h7>${product.soldCount}</h7>
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p><strong>Precio:</strong> ${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost)}</p>
                    <button class="btn btn-primary">Agregar al carrito</button>
                  </div>`;



        document.getElementById("product").innerHTML = htmlProduct;
    }

    /* 
    function showProduct(product) {
        let htmlProduct = '';
      
        // Images container
        htmlProduct += '<div id="imagenes-chicas">';
      
        // Loop through secondary images
        for (let i = 1; i < product.images.length; i++) {
          let img = product.images[i].img;
          htmlProduct += `<div class="col-2">
                            <img src="${img}" alt="Imágenes secundarias del producto">
                          </div>`;
        }
      
        htmlProduct += '</div>'; // Close images container
      
        // Description container
        htmlProduct += '<div id="descripcion">';
      
        // Primary image
        htmlProduct += `<div class="col-7">
                          <img src="${product.images[0]}" alt="Imagen principal del producto">
                        </div>`;
      
        // Product details
        htmlProduct += `<div class="col-3">
                          <h6>${product.category}</h6>
                          <h7>${product.soldCount}</h7>
                          <h2>${product.name}</h2>
                          <p>${product.description}</p>
                          <p><strong>Precio:</strong> ${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost)}</p>
                          <button class="btn btn-primary">Agregar al carrito</button>
                        </div>`;
      
        htmlProduct += '</div>'; // Close description container
      
        document.getElementById("product").innerHTML = htmlProduct;
      }
    
     */


    function listenForListGroupClicks() {
        const listGroups = document.querySelectorAll('.list-group');

        listGroups.forEach(listGroup => {
            listGroup.addEventListener('click', (event) => {
                if (event.target.classList.contains('list-group-item')) {
                    window.location.href = 'product-info.html';
                }
            });
        });
    }

    // Llamamos a la función para que se ejecute al cargar la página
    document.addEventListener('DOMContentLoaded', listenForListGroupClicks);


    //Llamamos a la función dentro de un evento para que se ejecute después de que se haya cargado todo.
    document.addEventListener("DOMContentLoaded", (e) => {
        getJSONData(productsINFOURL + EXT_TYPE).then((object) => {
            if (object.status === "ok") {
                let productArray = object.data.products;
                showProduct(productArray);
            }
        });
    });
