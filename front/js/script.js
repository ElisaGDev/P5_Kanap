const urlKanap = "http://localhost:3000/api/products";

//Récupération des produits de l'API

fetch(urlKanap)
  .then((results) => {
    return results.json();
  })
  .then((results) => {
    let articles = results;
    //console.log(articles);

    // Répartition des produits dans le DOM
    //console.table(articles);
    for (let article in articles) {
      // Insertion de l'élément "a"
      let productLink = document.createElement("a");
      document.querySelector(".items").appendChild(productLink);
      productLink.href = `product.html?id=${results[article]._id}`;
      // Insertion de l'élément "article"
      let productArticle = document.createElement("article");
      productLink.appendChild(productArticle);
      // Insertion de l'image
      let productImg = document.createElement("img");
      productArticle.appendChild(productImg);
      productImg.src = results[article].imageUrl;
      productImg.alt = results[article].altTxt;
      // Insertion du titre "h3"
      let productName = document.createElement("h3");
      productArticle.appendChild(productName);
      productName.classList.add("productName");
      productName.innerHTML = results[article].name;
      // Insertion de la description "p"
      let productDescription = document.createElement("p");
      productArticle.appendChild(productDescription);
      productDescription.classList.add("productName");
      productDescription.innerHTML = results[article].description;
    }
  });
