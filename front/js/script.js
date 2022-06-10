const urlKanap = "http://localhost:3000/api/products";

//Récupération des produits de l'API
fetch(urlKanap)
  .then((results) => {
    return results.json();
  })
  .then((results) => {
    let articles = results;
    //console.log(articles);

    //Répartition des produits dans le DOM
    //console.table(articles);
    for (let article in articles) {
      /*
      Création de l'élément "a"
      Insertion à la fin de l'élément parent "items"
      Ajout d'une ancre avec l'id du produit
      */
      let productLink = document.createElement("a");
      document.querySelector(".items").appendChild(productLink);
      productLink.href = `product.html?id=${results[article]._id}`;

      /*
      Création de l'élément "article"
      Insertion à la fin de l'élément parent "a"
      */
      let productArticle = document.createElement("article");
      productLink.appendChild(productArticle);

      /*
      Création de l'élément image
      Insertion à la fin de l'élément parent "article"
      Insertion des éléments de la réponse aux éléments "imageUrl" et "altTxt"
      */
      let productImg = document.createElement("img");
      productArticle.appendChild(productImg);
      productImg.src = results[article].imageUrl;
      productImg.alt = results[article].altTxt;

      /*
      Creation de l'élément "h3"
      Insertion à la fin de l'élément parent "article"
      Ajout d'une class à l'élément
      Insertion de l'élément de la réponse à l'élément "name"
      */
      let productName = document.createElement("h3");
      productArticle.appendChild(productName);
      productName.classList.add("productName");
      productName.innerHTML = results[article].name;

      /*
      Creation de l'élément "p"
      Insertion à la fin de l'élément parent "article"
      Ajout d'une class à l'élément
      Insertion de l'élément de la réponse à l'élément "description"
      */
      let productDescription = document.createElement("p");
      productArticle.appendChild(productDescription);
      productDescription.classList.add("productName");
      productDescription.innerHTML = results[article].description;
    }
  });
