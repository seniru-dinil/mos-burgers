export function returnsAdminPage() {
  return `
   <section class="adminSection">
      <div class="admin__navigation">
        <h4 class="admin__logo text-center m-0 p-0 fw-bolder">MOS-Admin</h4>
        <div class="admin__img--container">
          <div class="admin__img mx-auto mb-2">
            <img src="img/admin/user (2).png" alt="" />
          </div>
          <h6 class="text-center fw-semibold">Seniru Dinil</h6>
        </div>
        <div
          class="admin__navigation--buttons d-flex flex-column align-items-center gap-3"
        >
          <button
            id="viewOrders"
            class="admin__navigation--btn"
            data-type="orders"
          >
            <i class="fa-solid fa-box me-1"></i>
            <p>Orders</p>
          </button>
          <button
            id="viewCustomers"
            class="admin__navigation--btn"
            data-type="customers"
          >
            <i class="fa-solid fa-users me-1"></i>
            <p>Customers</p>
          </button>
          <button
            id="viewItems"
            class="admin__navigation--btn"
            data-type="items"
          >
            <i class="fa-solid fa-burger me-1"></i>
            <p>Items</p>
          </button>
        </div>
        <button
          id="sign-out-btn"
          class="sign-out-btn admin__navigation--btn"
          data-type="sign-out"
        >
          <p>sign-out</p>
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
      <div class="admin__home">        
        <div class="admin__home--wrapper">
          <div class="admin__body--item">
            <h3>Profit Made</h3>
            <h2>$456</h2>
            <div class="admin__body--img">
              <img src="img/admin/financial-profit.png" alt="" />
            </div>
            <div class="first-icon a-icon">
              <i class="fa-solid fa-money-bills"></i>
            </div>
          </div>
          <div class="admin__body--item">
            <h3>Total Customers</h3>
            <h2>13</h2>
            <div class="admin__body--img">
              <img src="img/admin/service.png" alt="" />
            </div>
            <div class="second-icon a-icon">
              <i class="fa-solid fa-users"></i>
            </div>
          </div>
          <div class="admin__body--item">
            <h3>Total Items</h3>
            <h2>13</h2>
            <div class="admin__body--img">
              <img src="img/admin/apps.png" alt="" />
            </div>
            <div class="fifth-icon a-icon">
              <i class="fa-solid fa-users"></i>
            </div>
          </div>
          <div class="admin__body--item">
            <h3>Best Customer</h3>
            <h2>Seniru</h2>
            <div class="admin__body--img">
              <img src="img/admin/best-seller.png" alt="" />
            </div>
            <div class="third-icon a-icon">
              <i class="fa-solid fa-user"></i>
            </div>
          </div>
          <div class="admin__body--item">
            <h3>Best Selling Item</h3>
            <h2>Burgers</h2>
            <div class="admin__body--img">
              <img src="img/admin/burger (1).png" alt="" />
            </div>
            <div class="fourth-icon a-icon">
              <i class="fa-solid fa-burger"></i>
            </div>
          </div>
          <div class="admin__body--item">
            <h3>Best Selling Item</h3>
            <h2>Burgers</h2>
            <div class="admin__body--img">
              <img src="img/admin/rating.png" alt="" />
            </div>
            <div class="fourth-icon a-icon">
              <i class="fa-solid fa-burger"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
