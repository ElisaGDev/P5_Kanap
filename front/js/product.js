//Récupération de l'id produit dans l'URL
var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");
//console.log(productId);

const urlKanap = "http://localhost:3000/api/products/";
const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");

//Récupère les infos produits de l'API
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

//Fonction qui récupère les données de la promesse pour l'insérer dans le DOM
function getArticle(article) {
  //Ajout de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  //Ajout du titre "h1"
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  //Ajout du prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  //Ajout de la description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  //Ajout des différentes couleurs
  for (let colors of article.colors) {
    //console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(article);
}

//Fonction Ajouter au panier
function addToCart(article) {
  const btnAddToCart = document.querySelector("#addToCart");

  //Vérifie 2 conditions : couleur non nulle et quantité entre 1 et 100
  btnAddToCart.addEventListener("click", (event) => {
    const selectColor = colors.value;
    // console.log(selectColor);

    const selectQuantity = quantity.value;
    // console.log(selectQuantity);

    if (selectQuantity == 0) {
      //alert("Veuillez choisir une quantité du produit");
    } else if (selectColor == "") {
      //alert("Veuillez choisir une couleur");
    } else {
      let productInCart = {
        productId: productId,
        productColors: selectColor,
        productQuantity: selectQuantity,
        productName: article.name,
        productPrice: article.price,
        productDescription: article.description,
        productImg: article.imageUrl,
        productImgAlt: article.altTxt,
      };
      //console.table(productInCart);

      /******************************************  LOCAL STORAGE  ***************************************** */
      //Initialise le local storage
      let saveInLocalStorage = JSON.parse(localStorage.getItem("product"));

      //Pop-up de confirmation
      const popupConfirmation = () => {
        if (
          window.confirm(`Vous avez ajouté ${selectQuantity} ${article.name} ${selectColor} au panier
Pour voir le panier, cliquez sur OK`)
        ) {
          window.location.href = "cart.html";
        }
      };

      //Importation dans le Local Storage
      //Si le panier a déjà 1 article minimum
      console.table(productInCart);
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
