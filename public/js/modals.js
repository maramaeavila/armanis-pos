document.addEventListener("DOMContentLoaded", function () {
  const addProductBtn = document.getElementById("addCategoryBtn");
  const categoryModal = document.getElementById("categoryModal");
  const closeCategoryModal = document.getElementById("closeCategoryModal");

  // Open category modal
  addProductBtn.addEventListener("click", () => {
    document.getElementById("categoryForm").reset();
    categoryModal.classList.add("show");
  });

  // Close category modal
  closeCategoryModal.addEventListener("click", () => {
    categoryModal.classList.remove("show");
  });

  // Close modal when clicking outside
  categoryModal.addEventListener("click", (e) => {
    if (e.target === categoryModal) {
      categoryModal.classList.remove("show");
    }
  });

  // Close modal when clicking cancel button
  const cancelButtons = categoryModal.querySelectorAll('[data-bs-dismiss="modal"]');
  cancelButtons.forEach(button => {
    button.addEventListener("click", () => {
      categoryModal.classList.remove("show");
    });
  });
});
