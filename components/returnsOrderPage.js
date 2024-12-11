export function returnsOrderPage() {
  return `
     <section class="order__section" id="order__section">
      <h3 class="title my-3">MOS Menu</h3>
      <div class="wrapper">
        <div class="card__container" id="card__container"></div>
        <div class="grid__divider">
          <div class="customer d-flex align-items-center justify-content-between box-shadow" id="customer">
          <p class="mt-3 opacity-75 fw-semibold ">Select or add new Customer</p>
          <button class="plus__bg" id="addCustomerBtn"><i class="fa-solid fa-plus"></i></button>
          </div>
          <div class="cart__container box-shadow">
            <h3 class="p-0 fw-bold title w-100 fs-3 mb-4">Your Cart</h3>
            <div class="cart__wrapper" id="cart__wrapper"></div>
            <div class="total ms-auto m-0" id="total__amount"></div>
            <button type="button" class="confirm--order" id="confirm-btn">Confirm Order</button>
          </div>
        </div>
      </div>
    </section>
      `;
}
