let url = "http://localhost:3000/api/products/";

//Récupération des données de l'API
fetch(url).then((res) => {
  res
    .json()
    .then((data) => {
      console.log(data);
      articles = res;
      console.table(articles);
      for (let article in articles) {
        //Insertion de l'élément <a>
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = "product.html?id=${res[article]._id}";
        console.log(productLink);

        //Insertion de l'élément <article>
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        //Insertion de l'élément <img>
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = res[article].imageUrl;
        productImg.alt = res[article].altTxt;

        //Insertion de l'élément <h3>
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = res[article].name;

        //Insertion de l'élément <p>
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productName");
        productDescription.innerHTML = res[article].description;
      }
    })
    .catch(function (error) {
      return error;
    });
});
