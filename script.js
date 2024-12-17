// Handle form submission
document.getElementById("submit-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const imageInput = document.getElementById("image").files[0];
  if (imageInput) {
    const reader = new FileReader();
    reader.onload = function (e) {
      let obj = {
        itemCode: document.getElementById("itemCode").value,
        name: document.getElementById("itemName").value,
        price: document.getElementById("itemPrice").value,
        discount: document.getElementById("itemDiscount").value,
        description: document.getElementById("itemDescription").value,
        imgUrl: e.target.result,
      };
      list["Burgers"].push(obj);
    };

    reader.readAsDataURL(imageInput);
  } else {
    alert("Please provide both a name and an image!");
  }
});
