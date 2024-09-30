let productINFOURL = PRODUCT_INFO_URL + localStorage.getItem("productId") + EXT_TYPE;

fetch(productINFOURL)
    .then((respuesta) => {
        console.log(respuesta);
        return respuesta.json();
    })
    .then((resultadoObj) => {
        showProduct(resultadoObj);
    });




function showProduct(product) {
    let htmlProduct = " ";
   
    htmlProduct += `<div id="imagenes-chicas" class="col-2">`

    for (let i = 1; i < product.images.length; i++) {
        const img = product.images[i];
        htmlProduct += `
        
                    <img src="${img}" alt="Imágenes secundarias del producto">
                  `;
                }

        htmlProduct += `</div>`
    
                htmlProduct +=  `<div id="imagenGrande" class="col-7">
                <img src="${product.images[0]}" alt="Imagen principal del producto">
              </div>`;

        htmlProduct += `<div id="info" class="col-3">
                    <h6> Categoría ${product.category}</h6>
                    <h7> ${product.soldCount} Unidades vendidas</h7>
                    <h2>${product.name}</h2>
                    <p><strong>Precio:</strong> ${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost)}</p>
                    <button class="btn btn-primary">Agregar al carrito</button>
                  </div>`;

htmlProduct+= `<div id="Descripción" class="col-9">
<p><strong>Descripción</strong></p>
<p>${product.description}</p>`;

// En las próximas líneas de código se visualiza como  se inserta el HTML de las estrellitas. 
            htmlProduct+= ` <div class="rating">
            <span class="fa fa-star" data-value="1"></span>
            <span class="fa fa-star" data-value="2"></span>
            <span class="fa fa-star" data-value="3"></span>
            <span class="fa fa-star" data-value="4"></span>
            <span class="fa fa-star" data-value="5"></span>
        </div>
    `;

        document.getElementById("product").innerHTML = htmlProduct;
        
        const stars = document.getElementsByClassName("fa-star");
         console.log(stars)
        for (let i = 0; i < stars.length; i++) {
            stars[i].addEventListener('click', () => {
                const value = parseInt(stars[i].getAttribute('data-value'));
                console.log(value)
                // Limpiar las estrellas previamente seleccionadas
                for (let j = 0; j < stars.length; j++) {
                    stars[j].classList.remove('checked');
                }
               
                // Marcar las estrellas hasta la clicada
                for (let j = 0; j < value; j++) {
                    stars[j].classList.add('checked');
                }
                // Mostrar en la consola el valor seleccionado
                console.log(`Valor seleccionado: ${value}`);
            });
        }
    }
    

    

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
  