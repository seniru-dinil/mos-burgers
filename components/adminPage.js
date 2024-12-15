export function returnsAdminPage() {
  return `
  <section class="adminPage">
      <div
        class="adminHeader d-flex align-items-center justify-content-between"
      >
        <h2 class="adminTitle m-0">Hello, Seniru</h2>
        <nav
          class="adminNavigation d-flex align-items-center gap-4 justify-content-center"
        >
          <button class="adminNavigation__btn" type="button" data-page="order">
            <div class="adminNavigation__img">
              <img src="img/admin/order-fulfillment.png" alt="" />
            </div>
          </button>

          <button class="adminNavigation__btn" data-page="customer">
            <div class="adminNavigation__img">
              <img src="img/admin/rating.png" alt="" />
            </div>
          </button>
          <button class="adminNavigation__btn" data-page="item">
            <div class="adminNavigation__img">
              <img src="img/admin/task.png" alt="" />
            </div>
          </button>
        </nav>
        <button class="adminNavigation__btn adminBtn">
          <div class="adminNavigation__img">
            <img src="img/admin/user (2).png" alt="" />
          </div>
        </button>
      </div>
      <section class="adminBody">
        <div class="adminBody__item"></div>
        <div class="adminBody__item"></div>
        <div class="adminBody__item"></div>
        <div class="adminBody__item"><canvas id="myChart"></canvas></div>
        <div class="adminBody__item"></div>
        <div class="adminBody__item"></div>
      </section>
    </section>
  `;
}
