document.addEventListener("DOMContentLoaded", function () {
  const addProductBtn = document.getElementById("addCategoryBtn");
  const categoryModal = new bootstrap.Modal(
    document.getElementById("categoryModal")
  );

  addProductBtn.addEventListener("click", () => {
    document.getElementById("categoryForm").reset();

    document.getElementById("categoryModalLabel").textContent = "Add Category";

    categoryModal.show();
  });
});
