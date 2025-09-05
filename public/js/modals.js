document.addEventListener("DOMContentLoaded", function () {
  const addProductBtn = document.getElementById("addCategoryBtn");
  const categoryModal = document.getElementById("categoryModal");
  const closeCategoryModal = document.getElementById("closeCategoryModal");

  addProductBtn.addEventListener("click", () => {
    document.getElementById("categoryForm").reset();
    categoryModal.classList.add("show");
  });

  closeCategoryModal.addEventListener("click", () => {
    categoryModal.classList.remove("show");
  });

  categoryModal.addEventListener("click", (e) => {
    if (e.target === categoryModal) {
      categoryModal.classList.remove("show");
    }
  });

  const cancelButtons = categoryModal.querySelectorAll(
    '[data-bs-dismiss="modal"]'
  );
  cancelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryModal.classList.remove("show");
    });
  });
});
