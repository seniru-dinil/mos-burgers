export function searchFood() {
  let searchFoodInner = ``;
  let FoodName = [
    {
      fdName: "All",
      fdImg: "img/foodIcons/all.png",
    },
    {
      fdName: "Burgers",
      fdImg: "img/foodIcons/burger.png",
    },
    {
      fdName: "Submarines",
      fdImg: "img/foodIcons/submarine.png",
    },
    {
      fdName: "Pasta",
      fdImg: "img/foodIcons/pasta.png",
    },
    {
      fdName: "Fries",
      fdImg: "img/foodIcons/fries.png",
    },
    {
      fdName: "Chicken",
      fdImg: "img/foodIcons/chicken.png",
    },
    {
      fdName: "Beverages",
      fdImg: "img/foodIcons/can.png",
    },
  ];
  FoodName.forEach((foodItem) => {
    searchFoodInner += `
        <button
        id="searchFoodBtn"
        class="searchFoodBtn"
        data-food-name="${foodItem.fdName}"
      >
        <div class="foodIconImg"><img src="${foodItem.fdImg}" alt="" /></div>
      </button>
        `;
  });

  return searchFoodInner;
}
