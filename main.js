import { returnsOrderPage } from "./components/returnsOrderPage.js";
import { returnsHeader } from "./components/returnsHeader.js";
import { list } from "./components/data.js";
import { returnsHome } from "./components/returnsHome.js";
let tempCart = [];

/* ---home page loading--- */
displayOrderPage();
/*-------------------------*/

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
    inner += `<div class="food__card box-shadow">
    <div class="card__img"><img src="img/hamburger.png" alt="" /></div>
    <h3 class="card__title">${element.name}</h3>
    <p class="card__description">
    ${element.itemCode}
    </p>
    <h3 class="card__price">${element.price}</h3>
    <button class="card__btn" data-name="${element.name}" data-id="${element.itemCode}">Add to cart</button>
    </div>`;
  });
  card__container.innerHTML = inner;
  document.querySelectorAll(".card__btn").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

function addToCart(event) {
  let myBool = true;
  const itemName = event.target.dataset.name;
  const itemCode = event.target.dataset.id;
  tempCart.forEach((element) => {
    if (element.id === itemCode) {
      element.qty++;
      myBool = false;
    }
  });
  if (myBool) {
    tempCart.push({
      name: itemName,
      qty: 1,
      id: itemCode,
    });
  }
  updateCart();
}

function updateCart() {
  if (tempCart.length == 0) {
    document.getElementById("cart__wrapper").innerHTML = `
  <h4 class="text-black fs-6 opacity-50 text-center">your added items will appear here</h4>
    `;
    return;
  }
  let inside = "";
  tempCart.forEach((val) => {
    inside += `
        <div class="selected__item  w-100">
          <h3 class="fs-6 opacity-75 item-name">${val.name}</h3>
          <div class="divider ms-auto  grid-col d-flex align-items-center gap-3">
            <button class="increment__btn"  data-id="${val.id}" id="increment"><i class="fa-solid fa-plus" ></i></button>
            <div class="fs-6 opacity-100" >1<span class="x-bg"><i class="fa-solid fa-xmark"></i></span><span class="numberOfItems" id="numberOfItems-${val.id}">${val.qty}</span></div>
            <button class="decrement__btn" id="decrement"  data-id="${val.id}"><i class="fa-solid fa-minus"></i></button>
          </div>
        </div>
        `;
  });
  document.getElementById("cart__wrapper").innerHTML = inside;
  document.querySelectorAll("#increment").forEach((button) => {
    button.addEventListener("click", increment);
  });
  document.querySelectorAll("#decrement").forEach((button) => {
    button.addEventListener("click", decrement);
  });
}

function increment(event) {
  let itemId = event.target.dataset.id;
  tempCart.forEach((item) => {
    if (itemId === item.id) {
      item.qty++;
      document.getElementById(`numberOfItems-${item.id}`).innerHTML = item.qty;
    }
  });
}

function decrement(event) {
  let itemId = event.target.dataset.id;
  tempCart.forEach((item) => {
    if (itemId === item.id) {
      if (item.qty == 0) {
        return;
      }
      item.qty--;
      document.getElementById(`numberOfItems-${item.id}`).innerHTML = item.qty;
      console.log(item.qty);
    }
  });
}
