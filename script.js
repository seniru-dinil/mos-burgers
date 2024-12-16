// Get elements
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("addCustomerModal");

// Open modal on button click
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal when clicking outside the content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
