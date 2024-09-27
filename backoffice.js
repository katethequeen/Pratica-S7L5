const shopUrl = "https://striveschool-api.herokuapp.com/api/product/";

//Prendo lo specifico paramentro per la modifica
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

if (productId) {
  fetch(shopUrl + "/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWIxNTc5YzQ1ZjAwMTU2OWI0YjgiLCJpYXQiOjE3Mjc0MjEyMDUsImV4cCI6MTcyODYzMDgwNX0.llVZejQwpwBq2WcplK9MTlbSyK-QpE-teZABCOQB_EQ",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error from Server");
      }
    })
    .then((singleProduct) => {
      const name = document.getElementById("productName");
      const description = document.getElementById("productDescription");
      const brand = document.getElementById("productBrand");
      const image = document.getElementById("productImage");
      const price = document.getElementById("productPrice");

      name.value = singleProduct.name;
      description.value = singleProduct.description;
      brand.value = singleProduct.brand;
      image.value = singleProduct.image;
      price.value = singleProduct.price;

      const modifyBtn = document.querySelector(".changeBtn");
      modifyBtn.innerText = "Modify";
    })
    .catch((err) => console.log("Error", err));
}

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.getElementById("adm-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const brand = document.getElementById("productBrand").value;
  const image = document.getElementById("productImage").value;
  const price = document.getElementById("productPrice").value;

  const productCreated = new Product(name, description, brand, image, price);
  console.log(productCreated);

  const productJSON = JSON.stringify(productCreated);
  console.log("JSON to be sent:", productJSON);

  fetch(productId ? shopUrl + "/" + productId : shopUrl, {
    method: productId ? "PUT" : "POST",
    body: productJSON,
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWIxNTc5YzQ1ZjAwMTU2OWI0YjgiLCJpYXQiOjE3Mjc0MjEyMDUsImV4cCI6MTcyODYzMDgwNX0.llVZejQwpwBq2WcplK9MTlbSyK-QpE-teZABCOQB_EQ",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Saved Successfully!");
        if (!productId) {
          form.reset();
        }
      } else {
        return res.json().then((error) => {
          console.log("Server Error:", error);
          throw new Error(error.message);
        });
      }
    })
    .catch((err) => {
      return console.log("Error", err);
    });
});
