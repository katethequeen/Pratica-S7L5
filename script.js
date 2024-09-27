const shopUrl = "https://striveschool-api.herokuapp.com/api/product/";

const getProducts = function () {
  fetch(shopUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWIxNTc5YzQ1ZjAwMTU2OWI0YjgiLCJpYXQiOjE3Mjc0MjEyMDUsImV4cCI6MTcyODYzMDgwNX0.llVZejQwpwBq2WcplK9MTlbSyK-QpE-teZABCOQB_EQ",
    },
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error in server response");
      }
    })
    .then((data) => {
      console.log(data);
      //Take my HTML row
      const cardsContainer = document.getElementById("cards-row");

      data.forEach((product) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
        newCol.innerHTML = `
            <div class="card">
            <img src="./assets/makeup.jpg" class="card-img-top" alt="Product image">
            <div class="card-body">
              <h2 class="card-title text-center">${product.name}</h2>
              <p class="card-title text-center fs-4">${product.brand} - ${product.price}$</p>
              <p class="text-center">${product.description}</p>
              <a href="./details.html?productId=${product._id}" class="btn btn-primary w-100">Details</a>
            </div>
          </div>
          `;
        cardsContainer.appendChild(newCol);
        console.log(product.description);
      });
      const spinner = document.querySelector(".spinner-border");
      spinner.style.display = "none";
    })
    .catch((err) => console.log("Error", err));
};

getProducts();
