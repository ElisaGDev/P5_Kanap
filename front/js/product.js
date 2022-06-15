//Récupération de l'url de la page courante
var str = window.location.href;
var url = new URL(str);
//Récupération de l'id produit dans l'URL
var productId = url.searchParams.get("id");

const urlKanap = "http://localhost:3000/api/products/";
const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");

//Récupèration des éléments produits de l'API pour le produit passé dans l'Url
fetch(urlKanap + productId)
  .then((results) => {
    return results.json();
  })
  .then((results) => {
    let article = results;
    if (article) {
      //Appel de la fonction getArticle
      getArticle(article);
    }
  })
  .catch((error) => {
    //console.log("Erreur");
  });

//Fonction qui récupère les données de la promesse pour l'insérer dans le DOM
function getArticle(article) {
  //Création de l'élément image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  //Création de l'élément titre
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  //Création de l'élément prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  //Création de l'élément description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  //Création des éléments couleurs
  for (let colors of article.colors) {
    //console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  //Appel de la fonction addToCart
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

    if (selectQuantity == 0 || selectQuantity > 100 || selectQuantity < 0) {
      alert("Veuillez choisir une quantité entre 0 et 100");
    } else if (selectColor == "") {
      alert("Veuillez choisir une couleur");
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
      //Initialisation du localStorage
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
      //Si le localStorage a déjà une valeur
      //console.table(productInCart);
      if (saveInLocalStorage) {
        const resultFind = saveInLocalStorage.find(
          (el) => el.productId === productId && el.productColors === selectColor
        );
        //Si le produit est déjà dans le panier
        if (resultFind) {
          //On ajoute la nouvelle quantité
          let newQuantity =
            parseInt(productInCart.productQuantity) +
            parseInt(resultFind.productQuantity);
          resultFind.productQuantity = newQuantity;
          if (newQuantity > 100) {
            newQuantity = 100;
            alert("Il y a déjà 100 articles dans le panier");
            event.popupConfirmation();
          }
          //On stocke dans le localStorage
          localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
          //console.table(saveInLocalStorage);
          popupConfirmation();
          //Ou si le produit choisi n'est pas dans le panier
        } else {
          //On ajoute une nouvelle valeur
          saveInLocalStorage.push(productInCart);
          //On stocke dans le localStorage
          localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
          //console.table(saveInLocalStorage);
          popupConfirmation();
        }
        //Si le localStorage est vide
      } else {
        //On crée un tableau avec les valeurs du produit
        saveInLocalStorage = [];
        saveInLocalStorage.push(productInCart);
        //On stocke dans le localStorage
        localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
        //console.table(saveInLocalStorage);
        popupConfirmation();
      }
    }
  });
}
