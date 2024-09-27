const shopUrl = "https://striveschool-api.herokuapp.com/api/product/";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
console.log(productId);

const getSingleProduct = function () {
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
      createDetailCard(singleProduct);
      const spinner = document.querySelector(".spinner-border");
      spinner.style.display = "none";
    })
    .catch((err) => console.log("Error", err));
};

const createDetailCard = function (productDetails) {
  const cardsContainer = document.getElementById("cards-row");
  const newCol = document.createElement("div");
  newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
  newCol.innerHTML = `
    <div class="card">
    <img src="./assets/makeup.jpg" class="card-img-top" alt="Product image">
    <div class="card-body">
    <h2 class="card-title text-center">${productDetails.name}</h2>
    <h4 class="card-title text-center">${productDetails.brand} - ${productDetails.price}$</h4>
    <p class="text-center">${productDetails.description}</p>
    <div class="d-flex justify-content-around gap-2">
    <button class="btn btn-primary w-50" onclick="deleteProduct()">Delete</button>
    <a href="./backoffice.html?productId=${productDetails._id}" class="btn btn-primary w-50">Modify</a>
    </div>
    </div>
    </div>
    `;
  cardsContainer.appendChild(newCol);
};

getSingleProduct();

const deleteProduct = function () {
  fetch(shopUrl + "/" + productId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWIxNTc5YzQ1ZjAwMTU2OWI0YjgiLCJpYXQiOjE3Mjc0MjEyMDUsImV4cCI6MTcyODYzMDgwNX0.llVZejQwpwBq2WcplK9MTlbSyK-QpE-teZABCOQB_EQ",
    },
  })
    .then((res) => {
      alert("Are you sure to procced?");
      if (res.ok) {
        location.assign("./index.html");
      } else {
        throw new Error("Error from Server");
      }
    })
    .catch((err) => console.log("Error", err));
};
