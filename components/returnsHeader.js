export function returnsHeader() {
  return `
          <header class="header">
            <nav class="navigation">
              <div class="menu opacity">
                <i class="fa-solid fa-bars"></i>
                <span>Menu</span>
              </div>
              <div class="logo">
                <img src="img/hamburger.png" alt="" class="mos__logo" />
              </div>
              <div class="header__right d-flex align-items-center gap-2">
              <button class="renderHome"  id="home-btn">
                <div class="admin">          
                  <i class="fa-solid fa-house"></i>
                </div>
             </button>         
                <buttton id="adminBtn">
                  <div class="admin">
                    <i class="fa-solid fa-user"></i>
                  </div>
                </buttton>
              </div>
            </nav>
          </header>
          `;
}
