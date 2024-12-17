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
  listenToButton();
}

function listenToButton() {
  document.getElementById("backBtn").addEventListener("click", () => {
    displayHome();
  });
  document.querySelectorAll(".admin__navigation--btn").forEach((button) => {
    button.addEventListener("click", (evt) => {
      let y = evt.target.dataset.type;
      if (y == "orders") {
        document.getElementById("admin__home").innerHTML = loadOrderPage();
      } else if (y == "customers") {
        document.getElementById("admin__home").innerHTML = loadCustomerPage();
        document.querySelectorAll("#action-btn").forEach((button) => {
          button.addEventListener("click", updateCustomer);
        });
        listenToButton();
      } else if (y == "items") {
        orderPageEvents();
      } else {
        displayAdminPage();
      }
    });
  });
}

function orderPageEvents() {
  document.getElementById("admin__home").innerHTML = loadItemsPage();
  document.getElementById("addFood-btn").addEventListener("click", addNewItem);
  document.querySelectorAll("#update-btn").forEach((button) => {
    button.addEventListener("click", (e) =>
      console.log(e.target.dataset.itemCode)
    );
  });
  document.querySelectorAll("#delete-btn").forEach((button) => {
    button.addEventListener("click", (e) =>
      deleteThisItem(e.target.dataset.itemCode)
    );
  });
  document
    .getElementById("search__food--item")
    .addEventListener("input", (e) => {
      document.getElementById("item__page--wrapper").innerHTML =
        searchFoodItem(e);
      document
        .getElementById("addFood-btn")
        .addEventListener("click", addNewItem);
      document.querySelectorAll("#update-btn").forEach((button) => {
        button.addEventListener("click", (e) =>
          console.log(e.target.dataset.itemCode)
        );
      });
      document.querySelectorAll("#delete-btn").forEach((button) => {
        button.addEventListener("click", (e) =>
          deleteThisItem(e.target.dataset.itemCode)
        );
      });
    });
}

function deleteThisItem(param) {
  for (let cato in list) {
    if (list.hasOwnProperty(cato)) {
      list[cato] = list[cato].filter((food) => food.itemCode !== param);
    }
  }
  Swal.fire({
    text: "Item Deleted Succesfully!",
    icon: "success",
  });
  updateTotDishes();
  orderPageEvents();
}

function addNewItem() {
  document.getElementById("admin__home").innerHTML += `
  <div class="myModal" id="myModal">
      <section class="addItem-section" id="addItem-section">
        <div
          class="d-flex align-items-center justify-content-center gap-3 mb-2"
        >
          <h3 class="fw-bolder m-0 p-0 addItemTitle">Add Item</h3>
          <div
            class="addItem-icon d-flex justify-content-center align-items-center"
          >
            <i class="fa-solid fa-upload"></i>
          </div>
        </div>
        <input type="text" id="itemName" placeholder="Classic Burger" />
        <input
          type="text"
          id="itemDescription"
          placeholder="Delicious turkey patty"
        />
        <img src="" alt="" id="itemImg" />
        <input type="text" id="itemCode" placeholder="B0001" />
        <input type="text" id="itemPrice" placeholder="1435LKR" />
        <input type="text" id="itemDiscount" placeholder="20%" />
        <div
          class="foodTypeContainer d-flex align-items-center justify-content-center gap-2"
        >
          <button id="foodType" data-food-type="Burgers">B</button>
          <button id="foodType" data-food-type="Submarines">S</button>
          <button id="foodType" data-food-type="Pasta">P</button>
          <button id="foodType" data-food-type="Fries">F</button>
          <button id="foodType" data-food-type="Chicken">C</button>
          <button id="foodType" data-food-type="Beverages">D</button>
        </div>
        <input type="file" id="image" accept="image/*" required />
        <button id="submit-btn">Add Item</button>
      </section>
    </div>
  `;
  let type;
  document.querySelectorAll("#foodType").forEach((button) => {
    button.addEventListener("click", (e) => {
      type = e.target.dataset.foodType;
    });
  });
  document.getElementById("submit-btn").addEventListener("click", (event) => {
    const imageInput = document.getElementById("image").files[0];
    if (imageInput) {
      const reader = new FileReader();
      reader.onload = function (e) {
        let obj = {
          itemCode: document.getElementById("itemCode").value,
          name: document.getElementById("itemName").value,
          price: document.getElementById("itemPrice").value,
          discount: document.getElementById("itemDiscount").value,
          description: document.getElementById("itemDescription").value,
          imgUrl: e.target.result,
        };
        list[String(type)].push(obj);
        Swal.fire({
          text: "Item Added Succesfully!",
          icon: "success",
        });
        updateTotDishes();
        document.getElementById("myModal").remove();
        document.getElementById("item__page--wrapper").innerHTML =
          addingNewCardToWrapper();
        orderPageEvents();
      };
      reader.readAsDataURL(imageInput);
    } else {
      alert("Please provide an image!");
    }
  });
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.remove();
    }
  });
}

function addingNewCardToWrapper() {
  let html = ``;
  for (let cato in list) {
    list[cato].forEach((food) => {
      html += `
        <div class="item__page--foodCard">
          <div class="item--img m-0 p-0 mb-2">
            <img src="${food.imgUrl}" alt="" />
          </div>
          <h4 class="item--name m-0 p-0">${food.name}</h4>
          <h6 class="item--code">${food.itemCode}</h6>
          <div
            class="action__button--wrapper d-flex justify-content-center gap-2 mt-3"
          >
            <button class="edit-btn" id="update-btn" data-item-code="${food.itemCode}">Update</button>
            <button class="delete-btn" id="delete-btn" data-item-code="${food.itemCode}">Delete</button>
          </div>
        </div>
        `;
    });
  }
  return html;
}

function loadOrderPage() {
  let html = `
  <h1 class="item__page--title ms-5 ">Order History</h1>
  <section class="orderSection" id="orderSection">
      <div class="orderGridSection Header">
        <div>Oder ID</div>
        <div>Customer Name</div>
        <div>Email</div>
        <div>Total</div>
        <div>Status</div>
        <div>Num Of Items</div>
      </div>
      `;
  orderArray.forEach((order, index) => {
    html += `
    <div class="orderGridSection item">
        <div class="bg-transparent">
          <div class="odr mx-auto">ODR#0000${(orderArray, index + 1)}</div>
        </div>
        <div>${order.customerName}</div>
        <div>${order.customerEmail}</div>
        <div>${order.totalAmount}</div>
        <div class="bg-transparent">
          <div class="paid mx-auto">paid</div>
        </div>
        <div>${order.numberOfItems}</div>
      </div>
    `;
  });
  html += `
  </section>
  `;
  return html;
}

function totalNumberOfItems() {
  let tot = 0;
  for (let i in list) {
    tot += list[i].length;
  }
  return tot;
}

function loadCustomerPage() {
  let inner = `
  <h1 class="item__page--title ms-5 ">Customer Management</h1>
  <section class="viewCustomerSection">  
      <div class="customerGrid customerHeader" id="customerGrid">
        <div>CustomerID</div>
        <div>Customer Name</div>
        <div>Customer Mobile</div>
        <div>Customer Email</div>
        <div>Location</div>
        <div>Action</div>
      </div>
      `;
  arr.forEach((customer, index) => {
    inner += `
      <div class="customerGrid">
        <div>CTM#0000${index + 1}</div>
        <div>${customer.name}</div>
        <div>${customer.mobileNumber}</div>
        <div>${customer.email}</div>
        <div>${customer.location}</div>
        <button class="action-btn text-light" id="action-btn" data-customer="${
          customer.mobileNumber
        }">Edit</button>
      </div>
      `;
  });
  return inner + `</section>`;
}

function loadItemsPage() {
  let html = `
  <section class="item__page">
      <h1 class="item__page--title">Food Item Management</h1>
      <div class="item__page--search d-flex align-items-center justify-content-between ">
        <div class="noName d-flex align-items-center gap-3">
          <div class="dishes d-flex align-items-center gap-2">
            <h6 class="m-0 p-0"><span id="totOfDishes">${totalNumberOfItems()}</span> Dishes</h6>
            <div class="total__dishes--icon">
              <i class="fa-solid fa-plate-wheat"></i>
            </div>
          </div>
          <div class="cato dishes d-flex align-items-center gap-2">
            <h6 class="m-0 p-0">7 Categories</h6>
            <div class="cato--icon">
              <i class="fa-solid fa-burger"></i>
            </div>
          </div>
        </div>
        <div class="noName d-flex align-items-center gap-2">
          <input
            type="text"
            id="search__food--item"
            placeholder="search food"
            class="search__food--item"
          />
          <button
            class="search__food--btn d-flex align-items-center gap-2 text-light bg-primary py-2 px-3 rounded"
            id="addFood-btn"
          >
            <div class="add__btn-icon">
              <i class="fa-solid fa-plus fw-normal"></i>
            </div>
            <h6 class="m-0 p-0 fw-bold">Add New Item</h6>
          </button>
        </div>
      </div>
      <div class="item__page--wrapper mt-4" id="item__page--wrapper">
      `;
  for (let cato in list) {
    list[cato].forEach((food) => {
      html += `
        <div class="item__page--foodCard">
          <div class="item--img m-0 p-0 mb-2">
            <img src="${food.imgUrl}" alt="" />
          </div>
          <h4 class="item--name m-0 p-0">${food.name}</h4>
          <h6 class="item--code">${food.itemCode}</h6>
          <div
            class="action__button--wrapper d-flex justify-content-center gap-2 mt-3"
          >
            <button class="edit-btn" id="update-btn" data-item-code="${food.itemCode}">Update</button>
            <button class="delete-btn" id="delete-btn" data-item-code="${food.itemCode}">Delete</button>
          </div>
        </div>
        `;
    });
  }

  html += `
      </div>
    </section>
  `;
  return html;
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

function updateTotDishes() {
  document.getElementById("totOfDishes").innerHTML = totalNumberOfItems();
}

function searchFoodItem(e) {
  let value = e.target.value;
  let inner = ``;
  for (let cate in list) {
    list[cate].forEach((item) => {
      if (item.name.toLowerCase().includes(value)) {
        inner += `
          <div class="item__page--foodCard">
          <div class="item--img m-0 p-0 mb-2">
            <img src="${item.imgUrl}" alt="" />
          </div>
          <h4 class="item--name m-0 p-0">${item.name}</h4>
          <h6 class="item--code">${item.itemCode}</h6>
          <div
            class="action__button--wrapper d-flex justify-content-center gap-2 mt-3"
          >
            <button class="edit-btn" id="update-btn" data-item-code="${item.itemCode}">Update</button>
            <button class="delete-btn" id="delete-btn" data-item-code="${item.itemCode}">Delete</button>
          </div>
        </div>          
          `;
      }
    });
  }
  return inner;
}

function searchCustomer(e) {
  let value = e.target.value;
  let innerCustomer = ``;
  arr.forEach((customer) => {
    if (customer.name.toLowerCase().includes(value)) {
      innerCustomer += `
      <button class="customerBtn d-flex align-items-center justify-content-between  customerCard " 
      data-customer-id="${customer.mobileNumber}" data-customer-name="${customer.name}" data-customer-email="${customer.email}" data-customer-location="${customer.location}">        
          <h6 class="customerName fs-6">${customer.name}</h6>
          <h6 class="customerEmail fs-6">${customer.email}</h6>
        </button>`;
    }
  });
  document.getElementById("cart__container").innerHTML = innerCustomer;
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
  document.getElementById("selectFoodWrapper").innerHTML += searchFood();
  const modal = document.getElementById("selectFoodWrapper");
  modal.style.transform = "translateX(0)";
  document
    .getElementById("open-btn")
    .addEventListener("click", OpenFoodCategoryWrapper);
  document
    .getElementById("close-btn")
    .addEventListener("click", CloseFoodCategoryWrapper);
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

function OpenFoodCategoryWrapper() {
  const modal = document.getElementById("selectFoodWrapper");
  modal.style.transform = "translateX(0)";
  document.addEventListener("click", (e) => {
    if (e.target != modal && e.target != document.getElementById("open-btn")) {
      CloseFoodCategoryWrapper();
    }
  });
  const closeButton = document.getElementById("close-btn");
  closeButton.addEventListener("click", CloseFoodCategoryWrapper);
}

function CloseFoodCategoryWrapper() {
  document.removeEventListener("click", (e) => console.log(e.target));
  const modal = document.getElementById("selectFoodWrapper");
  modal.style.transform = "translateX(-120%)";
  const openButton = document.getElementById("open-btn");
  openButton.addEventListener("click", OpenFoodCategoryWrapper);
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
    console.table(orderArray);
    createInvoice();
    Swal.fire({
      text: "Order confimed Succesfully!",
      icon: "success",
    });
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

function updateCustomer(e) {
  let custID = e.target.dataset.customer;
  for (let cust of arr) {
    if (cust.mobileNumber == custID) {
      myNewFunction(cust);
      document.getElementById("submitBtn").addEventListener("click", () => {
        cust.name = document.getElementById("custName").value;
        cust.email = document.getElementById("custEmail").value;
        cust.location = document.getElementById("custLocation").value;
        cust.mobileNumber = document.getElementById("custId").value;
        document.getElementById("addCustomerModal").style.display = "none";
        document.getElementById("admin__home").innerHTML = loadCustomerPage();
        listenToButton();
        return;
      });
    }
  }
}

function myNewFunction(customer) {
  document.getElementById("root").innerHTML += `
  <div class="modal" id="addCustomerModal">
      <div class="modal-content">
        <h4 class="text-center fw-bolder addCustomer__title">
          Update New Customer
        </h4>
        <form action="" class="addCustomerForm">
          <input
            type="text"
            id="custName"
            class="inpFld"
            value="${customer.name}"
          />
          <input
            type="text"
            id="custEmail"
            placeholder="please enter email"
            class="inpFld"
            value="${customer.email}"
          />
          <input
            type="text"
            id="custId"
            placeholder="please enter mobile number"
            class="inpFld"
            value="${customer.mobileNumber}"
          />
          <input
            type="text"
            placeholder="please enter customer location"
            class="inpFld"
            id="custLocation"
            value="${customer.location}"
          />
          <button
            class="submitBtn addCustomer__btn--hover"
            type="button"
            id="submitBtn"
          >
            Update Customer
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
    }
  });
}
