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
        productImg: articles.imageUrl,
        productImgAlt: articles.altTxt,
        productName: articles.name,
        productId: articles._id,
        productPrice: articles.price,
        productQuantity: selectQuantity,
      };
      console.table(productInCart);
    }
  });

  //Importer dans le Local storage
  const saveInLocalStorage = JSON.parse(localStorage.getItem("product"));

  //Si le Local Storage est vide, ajouter un article
  if (saveInLocalStorage) {
    const productNew = saveInLocalStorage.find(
      (el) => el.productId === productId && el.productColors === selectColor
    );

    //Si l'article est déjà dans le panier
    if (productNew) {
      let productAdd = Number(selectQuantity);
      let productCurrent = Number(productNew.productQuantity);
      productNew.productQuantity = productCurrent + productAdd;
      localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
      alert(`Il y a : ` + productNew.productQuantity`de ce produit`);
    } else {
      saveInLocalStorage.push(productInCart);
      localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
      console.table(saveInLocalStorage);
      alert(
        `L'article ${articles.name} de couleur ${selectColor} a été ajouté ${selectQuantity} fois.`
      );
    }
  } else {
    saveInLocalStorage = [];
    saveInLocalStorage.push(productInCart);
    localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
    alert("Votre article a été ajouter au panier");
  }
}
