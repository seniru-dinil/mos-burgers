import { returnsOrderPage } from "./components/returnsOrderPage.js";
import { returnsHeader } from "./components/returnsHeader.js";
import { list } from "./components/data.js";
import { returnsHome } from "./components/returnsHome.js";

/* ---home page loading--- */
displayHome();
/* --------------------*/

function displayHome() {
  document.getElementById("root").innerHTML = returnsHeader() + returnsHome();
  document
    .getElementById("myButton")
    .addEventListener("click", displayOrderPage);
}

function displayOrderPage() {
  document.getElementById("root").innerHTML =
    returnsHeader() + returnsOrderPage();
  loadCards();
  updateCart();
  document.getElementById("home-btn").addEventListener("click", displayHome);
}

function loadCards() {
  let card__container = document.getElementById("card__container");

  let inner = "";
  list["Burgers"].forEach((element) => {
    inner += `<div class="food__card">
    <div class="card__img"><img src="img/hamburger.png" alt="" /></div>
    <h3 class="card__title">${element.name}</h3>
    <p class="card__description">
    ${element.itemCode}
    </p>
    <h3 class="card__price">${element.price}</h3>
    <button class="card__btn" data-name="${element.name}">Add to cart</button>
    </div>`;
  });
  card__container.innerHTML = inner;

  document.querySelectorAll(".card__btn").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

let tempCart = [];
function addToCart(event) {
  let myBool = true;
  const itemName = event.target.dataset.name;
  tempCart.forEach((element) => {
    if (element.name === itemName) {
      element.qty++;
      myBool = false;
    }
  });
  if (myBool) {
    tempCart.push({
      name: itemName,
      qty: 1,
    });
  }

  updateCart();
}

function updateCart() {
  let inside = "";
  tempCart.forEach((val) => {
    inside += `
        <h3>name : ${val.name}</h3>
        <h4>qty  : ${val.qty}</h4>
        `;
  });
  document.getElementById("cart__wrapper").innerHTML = inside;
}
