export function addCustomer() {
  return `
   <h1 class="text-center mt-3">Mos Customer Page</h1>
    <div
      class="container d-flex justify-content-center align-items-center mt-5 h-100 w-100"
    >
      <section class="customer__section d-flex gap-4" id="customer__section">
        <div class="searchCustomerWrapper d-flex flex-column">
          <div class="divider">
            <div class="searchCustomer">
              <input
                type="text"
                placeholder="Search Customer"
                id="search__customer"
                class="w-100 py-2 px-4"
              />
            </div>
            <button class="searchCustomerBtn fw-bold default">Seach</button>
          </div>
          <div class="d-grid gap-2" id="customerCardWrapper"></div>
        </div>
        <div class="addCustomer box-shadow">
          <h4 class="text-center">Add New Customer</h4>
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
            <button class="submitBtn default" type="button" id="submitBtn">
              Add Customer
            </button>
          </form>
        </div>
      </section>
    </div>
    `;
}
