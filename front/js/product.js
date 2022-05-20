var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");
//onsole.log(productId);
const urlKanap = "http://localhost:3000/api/products/";
const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");

fetch(urlKanap + productId)
  .then((results) => {
    return results.json();
  })
  .then((results) => {
    let article = results;
    //console.log(articles);
    if (article) {
      getArticle(article);
    }
  })
  .catch((error) => {
    //console.log("Erreur");
  });

function getArticle(article) {
  //Ajout de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // Modification du titre "h1"
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // Modification du prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  // Modification de la description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  // Ajout des différentes couleurs
  for (let colors of article.colors) {
    //console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(article);
}

//Ajouter au panier
function addToCart(article) {
  const btnAddToCart = document.querySelector("#addToCart");

  //Vérifier 2 conditions : couleur non nulle et quantité entre 1 et 100
  btnAddToCart.addEventListener("click", (event) => {
    if (quantity.value > 0 && quantity.value <= 100 && quantity.value != 0) {
      //Recupération du choix de la couleur
      let selectColor = color.value;

      //Recupération du choix de la quantité
      let selectQuantity = quantity.value;

      //Récupération des options de l'article à ajouter au panier
      let productInCart = {
        productId: productId,
        productColors: selectColor,
        productQuantity: Number(selectQuantity),
        productName: article.name,
        productPrice: article.price,
        productDescription: article.description,
        productImg: article.imageUrl,
        productImgAlt: article.altTxt,
      };

      //Initialisation du local storage
      let saveInLocalStorage = JSON.parse(localStorage.getItem("product"));

      //fenêtre pop-up
      const popupConfirmation = () => {
        if (
          window.confirm(`Votre commande de ${selectQuantity} ${article.name} ${selectColor} est ajoutée au panier
Pour voir le panier, cliquez sur OK`)
        ) {
          window.location.href = "cart.html";
        }
      };

      //Importation dans le Local Storage
      //Si le panier a déjà 1 article minimum
      if (saveInLocalStorage) {
        const resultFind = saveInLocalStorage.find(
          (el) => el.productId === productId && el.productColors === selectColor
        );
        //Si le produit est déjà dans le panier
        if (resultFind) {
          let newQuantity =
            parseInt(productInCart.productQuantity) +
            parseInt(resultFind.productQuantity);
          resultFind.productQuantity = newQuantity;
          localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
          console.table(saveInLocalStorage);
          popupConfirmation();
          //Si le produit choisi n'est pas dans le panier
        } else {
          saveInLocalStorage.push(productInCart);
          localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
          console.table(saveInLocalStorage);
          popupConfirmation();
        }
        //Si le panier est vide
      } else {
        saveInLocalStorage = [];
        saveInLocalStorage.push(productInCart);
        localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
        console.table(saveInLocalStorage);
        popupConfirmation();
      }
    }
  });
}
