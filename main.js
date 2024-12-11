import { returnsOrderPage } from "./components/returnsOrderPage.js";
import { returnsHeader } from "./components/returnsHeader.js";
import { list } from "./components/foodItemData.js";
import { returnsHome } from "./components/returnsHome.js";
import { addCustomer } from "./components/addCustomer.js";
import { arr } from "./components/customerData.js";

let tempCart = [];
let orderArray = [];
let total = 0;
let isCustomerSelected = false;
let selectedCustomerId = null;

/* ---home page loading--- */
// displayHome();
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
  updateTotal();
  document.getElementById("home-btn").addEventListener("click", displayHome);
  document
    .getElementById("confirm-btn")
    .addEventListener("click", orderConfirmed);
  document
    .getElementById("addCustomerBtn")
    .addEventListener("click", helperFunction);
}

function helperFunction() {
  document.getElementById("root").innerHTML = returnsHeader() + addCustomer();
  document.getElementById("home-btn").addEventListener("click", displayHome);
  document
    .getElementById("search__customer")
    .addEventListener("input", myFunction);
}

function myFunction(e) {
  let value = e.target.value;
  let innerCustomer = ``;
  arr.forEach((customer) => {
    if (customer.name.toLowerCase().includes(value)) {
      innerCustomer += `
        <button class="customerBtn d-flex align-items-center gap-4 mt-3 customerCard h-100" 
                data-customer-id="${customer.mobileNumber}  ${customer.name}">        
          <h6 class="customerName fs-6">${customer.name}</h6>
          <h6 class="customerEmail fs-6">${customer.email}</h6>
        </button>`;
    }
  });
  document.getElementById("customerCardWrapper").innerHTML = innerCustomer;
  document
    .querySelectorAll(".customerBtn")
    .forEach((btn) => btn.addEventListener("click", newHelperFunction));
}

function newHelperFunction(e) {
  console.log(e.target.dataset.customerId);
  selectedCustomerId = e.target.dataset.customerId;
  isCustomerSelected = true;
  Swal.fire({
    text: "Customer Selected Succesfully!",
    icon: "success",
  });
  displayOrderPage();
}

function loadCards() {
  let card__container = document.getElementById("card__container");
  let inner = "";
  list["Burgers"].forEach((element) => {
    inner += `<div class="food__card box-shadow">
    <div class="card__img"><img src="img/hamburger.png" alt="" /></div>
    <h3 class="card__title fs-5">${element.name}</h3>
    <p class="card__description text-center">
    Lorem ipsum dolor sit amet consectetur adipisicing el    
    </p>
    <h3 class="card__price  fs-6">Rs.${element.price}</h3>
    <button class="card__btn" data-name="${element.name}" data-id="${element.itemCode}" data-price="${element.price}">Add to cart</button>
    </div>`;
  });
  list.Submarines.forEach((element) => {
    inner += `<div class="food__card box-shadow">
    <div class="card__img"><img src="img/hamburger.png" alt="" /></div>
    <h3 class="card__title fs-5">${element.name}</h3>
    <p class="card__description text-center">
    Lorem ipsum dolor sit amet consectetur adipisicing el    
    </p>
    <h3 class="card__price  fs-6">Rs.${element.price}</h3>
    <button class="card__btn" data-name="${element.name}" data-id="${element.itemCode}" data-price="${element.price}">Add to cart</button>
    </div>`;
  });
  list.Chicken.forEach((element) => {
    inner += `<div class="food__card box-shadow">
    <div class="card__img"><img src="img/hamburger.png" alt="" /></div>
    <h3 class="card__title fs-5">${element.name}</h3>
    <p class="card__description text-center">
    Lorem ipsum dolor sit amet consectetur adipisicing el    
    </p>
    <h3 class="card__price  fs-6">Rs.${element.price}</h3>
    <button class="card__btn" data-name="${element.name}" data-id="${element.itemCode}" data-price="${element.price}">Add to cart</button>
    </div>`;
  });
  list.Beverages.forEach((element) => {
    inner += `<div class="food__card box-shadow">
    <div class="card__img"><img src="img/hamburger.png" alt="" /></div>
    <h3 class="card__title fs-5">${element.name}</h3>
    <p class="card__description text-center">
    Lorem ipsum dolor sit amet consectetur adipisicing el    
    </p>
    <h3 class="card__price  fs-6">Rs.${element.price}</h3>
    <button class="card__btn" data-name="${element.name}" data-id="${element.itemCode}" data-price="${element.price}">Add to cart</button>
    </div>`;
  });
  list.Pasta.forEach((element) => {
    inner += `<div class="food__card box-shadow">
    <div class="card__img"><img src="img/hamburger.png" alt="" /></div>
    <h3 class="card__title fs-5">${element.name}</h3>
    <p class="card__description text-center">
    Lorem ipsum dolor sit amet consectetur adipisicing el    
    </p>
    <h3 class="card__price  fs-6">Rs.${element.price}</h3>
    <button class="card__btn" data-name="${element.name}" data-id="${element.itemCode}" data-price="${element.price}">Add to cart</button>
    </div>`;
  });
  list.Fries.forEach((element) => {
    inner += `<div class="food__card box-shadow">
    <div class="card__img"><img src="img/hamburger.png" alt="" /></div>
    <h3 class="card__title fs-5">${element.name}</h3>
    <p class="card__description text-center">
    Lorem ipsum dolor sit amet consectetur adipisicing el    
    </p>
    <h3 class="card__price  fs-6">Rs.${element.price}</h3>
    <button class="card__btn" data-name="${element.name}" data-id="${element.itemCode}" data-price="${element.price}">Add to cart</button>
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
  const itemPrice = event.target.dataset.price;
  tempCart.forEach((element) => {
    if (element.id === itemCode) {
      element.qty++;
      total += element.price;
      myBool = false;
    }
  });
  if (myBool) {
    tempCart.push({
      name: itemName,
      qty: 1,
      id: itemCode,
      isEmpty: false,
      price: Number(itemPrice),
    });
    total += Number(itemPrice);
  }
  updateTotal();
  updateCart();
}

function updateCart() {
  if (tempCart.length == 0) {
    document.getElementById("cart__wrapper").innerHTML = `
  <h4 class="text-black fs-5 opacity-25 text-center">your added items will appear here</h4>
  <div class="empty-cart-img mx-auto mt-5"><img src="img/empty-cart.png" alt=""></div>
    `;
    return;
  }
  let inside = "";
  tempCart.forEach((val) => {
    inside += `
        <div class="selected__item  w-100">
          <h3 class="fs-6 opacity-75 item-name">${val.name}</h3>
          <div class="ms-auto  grid-col d-flex align-items-center gap-3">
            <button class="plus__bg"  data-id="${val.id}" id="increment"><i class="fa-solid fa-plus" ></i></button>
            <div class="fs-6 opacity-100" >1<span class="x-bg"><i class="fa-solid fa-xmark"></i></span><span class="numberOfItems" id="numberOfItems-${val.id}">${val.qty}</span></div>
            <button class="plus__bg" id="decrement"  data-id="${val.id}"><i class="fa-solid fa-minus"></i></button>
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
      total += item.price;
      updateTotal();
      document.getElementById(`numberOfItems-${item.id}`).innerHTML = item.qty;
    }
  });
  update();
}

function decrement(event) {
  let itemId = event.target.dataset.id;
  tempCart.forEach((item) => {
    if (itemId === item.id) {
      total -= item.price;
      if (item.qty == 1) {
        item.isEmpty = true;
        update();
        return;
      }
      item.qty--;
      document.getElementById(`numberOfItems-${item.id}`).innerHTML = item.qty;
      console.log(item.qty);
    }
  });
  updateTotal();
}

function update() {
  let cart = [];
  cart = tempCart.filter((item) => !item.isEmpty);
  tempCart = cart;
  updateCart();
}

function updateTotal() {
  if (tempCart.length == 0) {
    document.getElementById("total__amount").innerHTML = ``;
    return;
  }
  document.getElementById("total__amount").innerHTML = `
  Total: ${total}
  `;
}

function orderConfirmed() {
  if (isCustomerSelected && tempCart.length != 0) {
    let myObject = {
      customerId: selectedCustomerId,
      selectedItems: tempCart,
    };
    orderArray.push(myObject);
    console.table(orderArray);
    selectedCustomerId = null;
    tempCart = [];
    updateCart();
    updateTotal();
    Swal.fire({
      text: "Order confimed Succesfully!",
      icon: "success",
    });
    isCustomerSelected = false;
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Select Existing Customer or Add new Customer!",
    });
    return;
  }
}
