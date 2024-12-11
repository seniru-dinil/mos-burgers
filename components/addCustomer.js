export function addCustomer() {
  return `
   <div
        class="container d-flex justify-content-center align-items-center mt-3"
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
              <button class="searchCustomerBtn fw-bold">Seach</button>
            </div>
            <div class="d-grid gap-2" id="customerCardWrapper"></div>
          </div>
          <div class="addCustomer"></div>
        </section>
      </div>
    `;
}