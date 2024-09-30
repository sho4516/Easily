const modalContainer = document.querySelector("#modal-container");
const applyButton = document.querySelector(
  ".job-company-details-container > .apply-button"
);
const xButton = document.querySelector(".modal-header i");

applyButton.addEventListener("click", () => {
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

document
  .querySelector("#deleteButton")
  .addEventListener("click", async function () {
    const id = this.getAttribute("data-id");
    const confirmation = window.confirm(
      "Are you sure that you want to delete this job?"
    );
    if (!confirmation) return;

    try {
      const response = await fetch(`/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the job.");
      }

      const data = await response.json(); // Wait for the JSON response
      console.log(data.message); // Success message from the server
      window.location.href = "/jobs";
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the job.", error);
    }
  });
