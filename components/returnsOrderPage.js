export function returnsOrderPage() {
  return `
     <section class="order__section" id="order__section">
      <h3 class="title my-3">MOS Menu</h3>
      <div class="wrapper d-flex gap-2 p-4">
        <div class="card__container" id="card__container"></div>
        <div class="cart__container">
          <h3 class="p-0 fw-bold title w-100 fs-3">Your Cart</h3>
          <div class="cart__wrapper" id="cart__wrapper"></div>
        </div>
      </div>
    </section>
      `;
}
