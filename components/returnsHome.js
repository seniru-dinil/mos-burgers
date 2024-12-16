export function returnsHome() {
  return `
    <section class="home">
        <div class="grid__item">
          <div
            class="welcom-wrapper d-flex justify-content-center gap-3 mt-2 align-items-center"
          >
            <div class="home__img">
              <img src="img/welcome.png" alt="" />
            </div>
            <h2 class="title m-0">Welcome to MOS</h2>
          </div>
          <p class="main__paragraph mt-2 mb-3" style="text-align: justify">
            At MOS, we reimagine burgers as culinary art. Each creation is
            carefully crafted, blending Japanese inspiration with fresh, premium
            ingredients.Our burgers aren't just meals – they're delicious
            experiences made with passion and precision, prepared perfectly for
            you in the moment.
          </p>
          <span
            class="fw-bolder text-center w-100 d-block fs-4 fw-semibold"
            >More than fast food. More than a meal. This is MOS !</span
          >
        </div>
        <div class="grid__item">
          <div class="home__img my-3 ms-4">
            <img src="img/cooking.png" alt="" />
          </div>
          <h2 class="title mx-auto">Passion Grilled into Every Delicious Bite</h2>
          <p class="main__paragraph mt-4 mb-0">
            Conveys the emotional and skillful approach to burger preparation,
            suggesting that passion is an actual ingredient in the cooking process
            transforming simple ingredients into culinary masterpieces with
            dedication and love.
          </p>
          <div class="home__img img2 ms-auto me-4">
            <img src="img/fried-egg.png" alt="" />
          </div>
        </div>
        <div class="grid__item">
          <div class="home__img mt-2 ms-2">
            <img src="img/dish.png" alt="" />
          </div>
          <h3 class="title mt-2">Your MOS Moment</h3>
          <p class="main__paragraph mt-3">
            A flavor adventure that's totally you, right here, right now!
          </p>
          <button
            class="order-btn mx-auto mt-4 w-50 py-2 rounded-pill  fw-bolder"          
            id="myButton"            
            >
            Order Now
          </button>
        </div>
        <div class="grid__item">
          <div class="home__img ms-auto me-4 mt-3">
            <img src="img/delivery-man.png" alt="" />
          </div>
          <h1 class="title">Making people happy through food</h1>
          <p class="main__paragraph mt-3">
            Our commitment to quality means hand-preparing fresh vegetables every
            morning and cooking burgers only after you order, guaranteeing the
            best taste and freshest ingredients.
          </p>
          <div class="home__img ms-4 mt-0">
            <img src="img/fast-food.png" alt="" />
          </div>
        </div>
        <div class="grid__item">
          <div
            class="location__wrapper mt-4 mb-4 d-flex gap-4 justify-content-center align-items-center"
          >
            <div class="home__img" style="width: 40px">
              <img src="img/map.png" alt="" />
            </div>
            <h2 class="title m-0">Locate US</h2>
          </div>
          <button
            class="find-mos d-flex mx-auto mt-4 justify-content-center align-items-center gap-2 location"
          >
            <span>Swing by your local MOS!</span>
            <i class="fa-solid fa-location-crosshairs"></i>
          </button>
        </div>
      </section>
      `;
}
