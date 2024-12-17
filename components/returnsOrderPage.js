export function returnsOrderPage() {
  return `
     <section class="order__section" id="order__section">
     <div class="search__food" id="selectFoodWrapper"></div>
      <div class="wrapper">
        <div class="seperator  d-grid">
          <div class="card__container" id="card__container"></div>
        </div>
        <div class="grid__divider" id="grid__divider">
          <div class="customer d-flex align-items-center justify-content-between box-shadow" id="customer">
          <input
              type="text"
              placeholder="Select or Add New Customer"
              id="search__customer"
              class="search__customer--input"
            />
          <button class="plus__bg" id="addCustomerBtn"><i class="fa-solid fa-plus"></i></button>
          </div>
          <div class="cart__container box-shadow" id="cart__container">
            <h3 class="p-0 fw-bold title w-100 fs-3">Your Cart</h3>
            <div class="cart__wrapper" id="cart__wrapper"></div>
            <div class="total ms-auto m-0 text-light" id="total__amount"></div>
            <button type="button" class="confirm--order" id="confirm-btn">Confirm Order</button>
          </div>
        </div>
      </div>
    </section>
      `;
}
