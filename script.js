console.log("hello this is working");

document.querySelectorAll(".admin__navigation--btn").forEach((button) => {
  button.addEventListener("click", (evt) =>
    console.log(evt.target.dataset.type)
  );
});
