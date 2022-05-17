var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");
console.log(productId);
const urlKanap = "http://localhost:3000/api/products/";

fetch(urlKanap + productId)
  .then((results) => {
    return results.json();
  })
  .then((results) => {
    let articles = results;
    console.log(articles);
    if (articles) {
      getArticle(articles);
    }
  })
  .catch((error) => {
    console.log("Erreur");
  });

function getArticle(articles) {
  //Ajout de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = articles.imageUrl;
  productImg.alt = articles.altTxt;

  // Modification du titre "h1"
  let productName = document.getElementById("title");
  productName.innerHTML = articles.name;

  // Modification du prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = articles.price;

  // Modification de la description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = articles.description;

  // Ajout des différentes couleurs
  for (let colors of articles.colors) {
    console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(articles);
}

//Ajouter au panier
function addToCart(articles) {
  const btnAddToCart = document.getElementById("addToCart");
  const colors = document.getElementById("colors");
  const quantity = document.getElementById("quantity");
  btnAddToCart.addEventListener("click", (event) => {
    event.preventDefault();
    const selectColor = colors.value;
    console.log(selectColor);
    const selectQuantity = quantity.value;
    console.log(selectQuantity);
    if (selectQuantity == 0) {
      alert("Choisissez une quantité pour le produit");
    } else if (selectColor == "") {
      alert("Choisissez une couleur");
    } else {
      let productInCart = {
        productName: articles.name,
        productId: articles._id,
        productQuantity: selectQuantity,
        productPrice: articles.price,
        productImg: articles.imageUrl,
        productImgAlt: articles.altTxt,
      };
      console.table(productInCart);
    }
  });
}
