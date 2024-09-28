const submitButton = document.querySelector("#submit-button");
const modalContainer = document.querySelector("#modal-container");
const recruiterButton = document.querySelector("#recruiter");
const xButton = document.querySelector(".modal-header i");

Object.assign(submitButton.style, {
  width: "max-content",
  marginLeft: "10%",
  marginRight: "auto",
  backgroundColor: "#ed3589",
  color: "#f1a8e2",
  border: "1px solid #f1a8e2",
});

submitButton.addEventListener("mouseenter", () => {
  submitButton.style.backgroundColor = "#f90385";
  submitButton.style.color = "white";
  submitButton.style.transition = "all 0.5s ease-in-out";
});

submitButton.addEventListener("mouseleave", () => {
  // Reset the styles when mouse leaves
  submitButton.style.backgroundColor = "#ed3589"; // Reset to original state
  submitButton.style.color = "#f1a8e2";
  submitButton.style.border = "1px solid #f1a8e2";
});

recruiterButton.addEventListener("click", () => {
  modalContainer.style.display = "block";
  setTimeout(() => {
    showModal();
  }, 10);
});

xButton.addEventListener("click", () => {
  hideModal();

  setTimeout(() => {
    modalContainer.style.display = "none";
  }, 500);
});

window.addEventListener("click", (event) => {
  if (event.target == modalContainer) {
    hideModal();
    setTimeout(() => {
      modalContainer.style.display = "none";
    }, 500);
  }
});

function hideModal() {
  const modal = document.querySelector(".modal-content-container");
  modal.classList.remove("active");
}

function showModal() {
  const modal = document.querySelector(".modal-content-container");
  modal.classList.add("active");
}
