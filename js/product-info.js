let productINFOURL =
  PRODUCT_INFO_URL + localStorage.getItem("productId") + EXT_TYPE;
let productCommentsURL =
  PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productId") + EXT_TYPE;

// Fetch para obtener la información del producto
fetch(productINFOURL)
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((resultadoObj) => {
    showProduct(resultadoObj); // Mostrar el producto
  });

// Función para mostrar el producto
function showProduct(product) {
  let htmlProduct = " ";

  htmlProduct += `<div id="imagenes-chicas" class="col-2">`;

  for (let i = 1; i < product.images.length; i++) {
    const img = product.images[i];
    htmlProduct += `
                    <img src="${img}" alt="Imágenes secundarias del producto">
                  `;
  }

  htmlProduct += `</div>`;

  htmlProduct += `<div id="imagenGrande" class="col-7">
                <img src="${product.images[0]}" alt="Imagen principal del producto">
              </div>`;

  htmlProduct += `<div id="info" class="col-3">
                    <h6> Categoría ${product.category}</h6>
                    <h7> ${product.soldCount} Unidades vendidas</h7>
                    <h2>${product.name}</h2>
                    <p><strong>Precio:</strong> ${
                      product.currency
                    }${new Intl.NumberFormat("es-ES").format(product.cost)}</p>
                    <button class="btn btn-primary">Agregar al carrito</button>
                  </div>`;

  htmlProduct += `<div id="Descripción" class="col-9">
<p><strong>Descripción</strong></p>
<p>${product.description}</p>`;

  document.getElementById("product").innerHTML = htmlProduct;
}

// Función para mostrar los comentarios
function showComments(commentsArray) {
  let htmlComments = "";
  for (let comment of commentsArray) {
    htmlComments += `
            <div class="comment">
                <p><strong>${comment.user}</strong> - <span>${
      comment.dateTime
    }</span></p>
                <p>${comment.description}</p>
                <div class="rating">
                    ${getStarsHTML(comment.score)}
                </div>
            </div>
        `;
  }
  document.getElementById("comments").innerHTML = htmlComments;
}

// Función auxiliar para generar las estrellas de calificación
function getStarsHTML(score) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      starsHTML += `<span class="fa fa-star checked"></span>`;
    } else {
      starsHTML += `<span class="fa fa-star"></span>`;
    }
  }
  return starsHTML;
}

// Obtener los comentarios usando getJSONData dentro del evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", (e) => {
  getJSONData(productCommentsURL).then((object) => {
    if (object.status === "ok") {
      let commentsArray = object.data;
      showComments(commentsArray); // Mostrar los comentarios
    }
  });
});
