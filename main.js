import { returnsOrderPage } from "./components/returnsOrderPage.js";
import { returnsHeader } from "./components/returnsHeader.js";
import { list } from "./components/foodItemData.js";
import { returnsHome } from "./components/returnsHome.js";
import { arr } from "./components/customerData.js";
import { searchFood } from "./components/searchFood.js";
import { returnsBackBtn } from "./components/returnsBackBtn.js";
import { returnsAdminPage } from "./components/adminPage.js";

let tempCart = [];
let orderArray = [];
let total = 0;
let isCustomerSelected = false;
let selectedCustomerDetails = {
  nameOfCust: "",
  emailOfCust: "",
  idOfCust: "",
  locatoinOfCust: "",
};
let categoryOfTheFood = {
  burgers: 0,
  submarines: 0,
  chicken: 0,
  pasta: 0,
  beverages: 0,
  fries: 0,
};

let totalCustomerCount = 0;
let totalSoldFoodItmes = 0;

/* ---home page loading--- */
displayHome();
/*-------------------------*/

function displayHome() {
  const element = document.getElementById("wrapper");
  if (element) {
    element.remove();
  }
  document.getElementById("root").innerHTML = returnsHeader() + returnsHome();
  document
    .getElementById("myButton")
    .addEventListener("click", displayOrderPage);
  document.getElementById("adminBtn").addEventListener("click", () => {
    displayAdminPage();
  });
}

function displayOrderPage() {
  document.getElementById("root").innerHTML =
    returnsOrderPage() + returnsBackBtn();
  loadCards();
  updateCart();
  updateTotal();
  document.getElementById("backBtn").addEventListener("click", displayHome);
  document
    .getElementById("search__customer")
    .addEventListener("input", searchCustomer);
  document
    .getElementById("confirm-btn")
    .addEventListener("click", orderConfirmed);
  document.getElementById("addCustomerBtn").addEventListener("click", () => {
    helperFunction();
  });
}

function displayAdminPage() {
  document.getElementById("root").innerHTML =
    returnsBackBtn() + returnsAdminPage();
  document.getElementById("backBtn").addEventListener("click", () => {
    displayHome();
  });
  document.querySelectorAll(".admin__navigation--btn").forEach((button) => {
    button.addEventListener("click", (evt) => {
      let y = evt.target.dataset.type;
      if (y == "orders") {
        loadOrderPage();
      } else if (y == "customers") {
        loadCustomerPage();
      } else if (y == "items") {
        loadItemsPage();
      }
    });
  });
}

function loadOrderPage() {
  document.getElementById("root").innerHTML = "";
  let wrapper = document.createElement("div");
  wrapper.id = "wrapper";
  document.body.appendChild(wrapper);
  new gridjs.Grid({
    columns: [
      "Customer Name",
      "Customer Email",
      "Customer ID",
      "Number of Items",
      "Spent",
    ],
    data: adminOrderPage(),
    className: {
      table: "custom-table",
      thead: "custom-thead",
      tbody: "custom-tbody",
      th: "custom-th",
      td: "custom-td",
      tr: "custom-tr",
    },
  }).render(document.getElementById("wrapper"));
  document.getElementById("wrapper").innerHTML += returnsBackBtn();
  document.getElementById("backBtn").addEventListener("click", () => {
    displayHome();
  });
}

function loadCustomerPage() {
  document.getElementById("root").innerHTML = "";
  let wrapper = document.createElement("div");
  wrapper.id = "wrapper";
  document.body.appendChild(wrapper);
  new gridjs.Grid({
    columns: [
      "Customer Name",
      "Customer Email",
      "Customer ID",
      "Customer Image",
    ],
    // data: customerDetails(),
    data: [
      [
        "seniru",
        "seniru@gmail.com",
        "0888269665",
        gridjs.html(
          `<div class="table__img"><img src="img/admin/best-seller.png" alt="" /></div>`
        ),
      ],
    ],
    className: {
      table: "custom-table",
      thead: "custom-thead",
      tbody: "custom-tbody",
      th: "custom-th",
      td: "custom-td",
      tr: "custom-tr",
    },
  }).render(document.getElementById("wrapper"));
  document.getElementById("wrapper").innerHTML += returnsBackBtn();
  document.getElementById("backBtn").addEventListener("click", () => {
    displayHome();
  });
}

function loadItemsPage() {
  document.getElementById("root").innerHTML = "";
  let wrapper = document.createElement("div");
  wrapper.id = "wrapper";
  document.body.appendChild(wrapper);
  new gridjs.Grid({
    columns: ["Item Code", "Item Name", "Item Description"],
    data: itemDetails(),
    className: {
      table: "custom-table",
      thead: "custom-thead",
      tbody: "custom-tbody",
      th: "custom-th",
      td: "custom-td",
      tr: "custom-tr",
    },
  }).render(document.getElementById("wrapper"));
  document.getElementById("wrapper").innerHTML += returnsBackBtn();
  document.getElementById("backBtn").addEventListener("click", () => {
    displayHome();
  });
}

function adminOrderPage() {
  let inner = [];
  orderArray.forEach((order) => {
    let arr = [
      order.customerName,
      order.customerId,
      order.customerEmail,
      order.numberOfItems,
      order.totalAmount,
    ];
    inner.push(arr);
  });
  return inner;
}

function itemDetails() {
  let inner = [];
  for (let item in list) {
    list[String(item)].forEach((food) => {
      inner.push([food.itemCode, food.name, food.description]);
    });
  }
  return inner;
}

function customerDetails() {
  let inner = [];
  arr.forEach((order) => {
    let arr = [order.name, order.email, order.mobileNumber];
    inner.push(arr);
  });
  return inner;
}

function helperFunction() {
  document.getElementById("root").innerHTML += `
  <div class="modal" id="addCustomerModal">
      <div class="modal-content">
        <h4 class="text-center fw-bolder addCustomer__title">
          Add New Customer
        </h4>
        <form action="" class="addCustomerForm">
          <input
            type="text"
            id="custName"
            placeholder="please enter name"
            class="inpFld"
          />
          <input
            type="text"
            id="custEmail"
            placeholder="please enter email"
            class="inpFld"
          />
          <input
            type="text"
            id="custId"
            placeholder="please enter mobile number"
            class="inpFld"
          />
          <input
            type="text"
            placeholder="please enter customer location"
            class="inpFld"
            id="custLocation"
          />
          <button
            class="submitBtn addCustomer__btn--hover"
            type="button"
            id="submitBtn"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  `;
  const modal = document.getElementById("addCustomerModal");
  modal.style.display = "block";
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      displayOrderPage();
    }
  });
  document.getElementById("submitBtn").addEventListener("click", () => {
    arr.push({
      name: document.getElementById("custName").value,
      mobileNumber: document.getElementById("custId").value,
      email: document.getElementById("custEmail").value,
      location: document.getElementById("custLocation").value,
    });
    document.querySelectorAll(".inpFld").forEach((item) => (item.value = ""));
    Swal.fire({
      text: "New Customer added Succesfully!",
      icon: "success",
    });
    totalCustomerCount++;
    modal.style.display = "none";
    displayOrderPage();
  });
}

function searchCustomer(e) {
  let value = e.target.value;
  let innerCustomer = ``;
  arr.forEach((customer) => {
    if (customer.name.toLowerCase().includes(value)) {
      innerCustomer += `
        <button class="customerBtn d-flex align-items-center gap-4 mt-3 customerCard " 
                data-customer-id="${customer.mobileNumber}" data-customer-name="${customer.name}" data-customer-email="${customer.email}" data-customer-location="${customer.location}">        
          <h6 class="customerName fs-6">${customer.name}</h6>
          <h6 class="customerEmail fs-6">${customer.email}</h6>
        </button>`;
    }
  });
  document.getElementById("cart__wrapper").innerHTML = innerCustomer;
  document
    .querySelectorAll(".customerBtn")
    .forEach((btn) => btn.addEventListener("click", newHelperFunction));
}

function newHelperFunction(e) {
  selectedCustomerDetails.nameOfCust = e.target.dataset.customerName;
  selectedCustomerDetails.idOfCust = e.target.dataset.customerId;
  selectedCustomerDetails.emailOfCust = e.target.dataset.customerEmail;
  selectedCustomerDetails.locatoinOfCust = e.target.dataset.customerLocation;
  isCustomerSelected = true;
  Swal.fire({
    text: "Customer Selected Succesfully!",
    icon: "success",
  });
  displayOrderPage();
}

function loadCards() {
  let inner = "";
  document.getElementById("selectFoodWrapper").innerHTML = searchFood();
  firstLoad(inner);
  document.querySelectorAll("#searchFoodBtn").forEach((btn) => {
    btn.addEventListener("click", setFoodCart);
  });
  function setFoodCart(e) {
    inner = "";
    let itemName = e.target.dataset.foodName;
    console.log(itemName);
    if (itemName === "All") {
      firstLoad(inner);
      return;
    }
    list[String(itemName)].forEach((element) => {
      inner += `<div class="food__card box-shadow">
      <div class="card__img"><img src="${element.imgUrl}" alt="" /></div>
      <h3 class="card__title fs-5">${element.name}</h3>
      <p class="card__description text-center">
      ${element.description}  
      </p>
      <h3 class="card__price  fs-6">Rs.${element.price}<span class="opacity-50 fs-8"> / 1 piece</span></h3>
      <button class="card__btn" data-name="${element.name}" data-id="${element.itemCode}" data-price="${element.price}">Add to cart</button>
      </div>`;
    });
    document.getElementById("card__container").innerHTML = inner;
    document.querySelectorAll(".card__btn").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }
  function firstLoad(inner) {
    for (let category in list) {
      list[String(category)].forEach((element) => {
        inner += `<div class="food__card box-shadow">
        <div class="card__img"><img src="${element.imgUrl}" alt="" /></div>
        <h3 class="card__title fs-5">${element.name}</h3>
        <p class="card__description text-center">
        ${element.description}  
        </p>
        <h3 class="card__price  fs-6">Rs.${element.price}<span class="opacity-50 fs-8"> / 1 piece</span></h3>
        <button class="card__btn" data-name="${element.name}" data-id="${element.itemCode}" data-price="${element.price}">Add to cart</button>
        </div>`;
      });
    }
    document.getElementById("card__container").innerHTML = inner;
    document.querySelectorAll(".card__btn").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }
}

function addToCart(event) {
  totalSoldFoodItmes++;
  let myBool = true;
  const itemName = event.target.dataset.name;
  const itemCode = event.target.dataset.id;
  const itemPrice = event.target.dataset.price;
  foodCountTracker(itemCode.charAt(0));
  function foodCountTracker(x) {
    if (x == "B") {
      categoryOfTheFood.burgers++;
    } else if (x == "C") {
      categoryOfTheFood.chicken++;
    } else if (x == "F") {
      categoryOfTheFood.fries++;
    } else if (x == "D") {
      categoryOfTheFood.beverages++;
    } else if (x == "S") {
      categoryOfTheFood.submarines++;
    } else if (x == "P") {
      categoryOfTheFood.pasta++;
    }
  }
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
  <div class="cartImg  text-center "><i class="fa-solid fa-cart-shopping  text-danger"></i></div>
    `;
    return;
  }
  let inside = "";
  tempCart.forEach((val) => {
    inside += `
        <div class="selected__item  w-100 text-light">
          <h3 class="fs-6 opacity-75 item-name">${val.name}</h3>
          <div class="ms-auto  grid-col d-flex align-items-center gap-3">
            <button class="selected__item--btn"  data-id="${val.id}" id="increment"><i class="fa-solid fa-plus" ></i></button>
            <div class="fs-6 opacity-100" >1<span class="x-bg"><i class="fa-solid fa-xmark"></i></span><span class="numberOfItems" id="numberOfItems-${val.id}">${val.qty}</span></div>
            <button class="selected__item--btn" id="decrement"  data-id="${val.id}"><i class="fa-solid fa-minus"></i></button>
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
  totalSoldFoodItmes++;
  let itemId = event.target.dataset.id;
  foodCountTracker(itemId.charAt(0));
  function foodCountTracker(x) {
    if (x == "B") {
      categoryOfTheFood.burgers++;
    } else if (x == "C") {
      categoryOfTheFood.chicken++;
    } else if (x == "F") {
      categoryOfTheFood.fries++;
    } else if (x == "D") {
      categoryOfTheFood.beverages++;
    } else if (x == "S") {
      categoryOfTheFood.submarines++;
    } else if (x == "P") {
      categoryOfTheFood.pasta++;
    }
  }
  tempCart.forEach((item) => {
    if (itemId === item.id) {
      item.qty++;
      total += item.price;
      updateTotal();
      document.getElementById(`numberOfItems-${item.id}`).innerHTML = item.qty;
    }
  });
}

function decrement(event) {
  totalSoldFoodItmes--;
  let itemId = event.target.dataset.id;
  foodCountTracker(itemId.charAt(0));
  function foodCountTracker(x) {
    if (x == "B") {
      categoryOfTheFood.burgers--;
    } else if (x == "C") {
      categoryOfTheFood.chicken--;
    } else if (x == "F") {
      categoryOfTheFood.fries--;
    } else if (x == "D") {
      categoryOfTheFood.beverages--;
    } else if (x == "S") {
      categoryOfTheFood.submarines--;
    } else if (x == "P") {
      categoryOfTheFood.pasta--;
    }
  }
  tempCart.forEach((item) => {
    if (itemId === item.id) {
      if (item.qty == 1) {
        item.qty = 0;
        total -= item.price;
        updateTempCart();
        updateCart();
        return;
      }
      total -= item.price;
      item.qty--;
      document.getElementById(`numberOfItems-${item.id}`).innerHTML = item.qty;
      console.log(item.qty);
    }
  });
  updateTotal();
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
    orderArray.push({
      customerName: selectedCustomerDetails.nameOfCust,
      customerId: selectedCustomerDetails.idOfCust,
      customerEmail: selectedCustomerDetails.emailOfCust,
      customerLocation: selectedCustomerDetails.locatoinOfCust,
      selectedItems: tempCart,
      totalAmount: total,
      numberOfItems: tempCart.length,
    });
    console.log(selectedCustomerDetails);
    console.log(tempCart);
    createInvoice();
    selectedCustomerDetails = {
      nameOfCust: "",
      emailOfCust: "",
      idOfCust: "",
      locatoinOfCust: "",
    };
    tempCart = [];
    total = 0;
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

function updateTempCart() {
  let newCart = tempCart.filter((item) => item.qty != 0);
  tempCart = newCart;
}

function createInvoice() {
  const totalAmount = tempCart.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 102, 204);
  doc.text("Order Summary", 10, 10);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text("Customer Details:", 10, 20);

  doc.autoTable({
    startY: 25,
    theme: "grid",
    headStyles: { fillColor: [0, 102, 204] },
    bodyStyles: { fillColor: [240, 248, 255] },
    head: [["Field", "Details"]],
    body: [
      ["Name", selectedCustomerDetails.nameOfCust],
      ["Email", selectedCustomerDetails.emailOfCust],
      ["Contact", selectedCustomerDetails.idOfCust],
      ["Location", selectedCustomerDetails.locatoinOfCust],
    ],
  });

  let startY = doc.lastAutoTable.finalY + 10;
  doc.setTextColor(0, 0, 0);
  doc.text("Order Details:", 10, startY);

  doc.autoTable({
    startY: startY + 5,
    theme: "striped",
    headStyles: { fillColor: [0, 102, 204] },
    bodyStyles: { fillColor: [245, 245, 245] },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    head: [["#", "Name", "Quantity", "Price", "Total"]],
    body: tempCart.map((item, index) => [
      index + 1,
      item.name,
      item.qty,
      item.price,
      item.qty * item.price,
    ]),
  });

  let totalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(`Total Amount: ${totalAmount} LKR`, 10, totalY);

  let finalY = totalY + 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(0, 102, 0);
  doc.text("We appreciate your business with Mos Burgers!", 10, finalY);

  finalY += 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text("Order cleared by Counter 3.", 10, finalY);
  doc.save("Order_Summary.pdf");
}
