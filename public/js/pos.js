<<<<<<< HEAD
class POSManager {
  constructor() {
    this.memberships = [];
    this.products = [];
    this.members = [];
    this.currentTab = "memberships";
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    document.getElementById("searchInput")?.addEventListener("input", (e) => {
      this.handleSearch(e.target.value);
    });
  }

  async loadPOSData() {
    try {
      const [memberships, products, members] = await Promise.all([
        db.getMemberships(),
        db.getProducts(),
        db.getMembers(),
      ]);

      this.memberships = memberships;
      this.products = products;
      this.members = members;

      this.populateMemberSelect();

      this.displayTabContent();
    } catch (error) {
      console.error("Failed to load POS data:", error);
      this.memberships = window.sampleData.memberships;
      this.products = window.sampleData.products;
      this.members = window.sampleData.members;
      this.populateMemberSelect();
      this.displayTabContent();
    }
  }

  populateMemberSelect() {
    const memberSelect = document.getElementById("memberSelect");
    if (!memberSelect) return;

    memberSelect.innerHTML = '<option value="">Walk-in Customer</option>';

    this.members.forEach((member) => {
      const option = document.createElement("option");
      option.value = member.id;
      option.textContent = `${member.first_name} ${member.last_name} (${member.member_id})`;
      memberSelect.appendChild(option);
    });
  }

  switchTab(tabName) {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(tabName).classList.add("active");

    this.currentTab = tabName;
    this.displayTabContent();
  }

  displayTabContent() {
    if (this.currentTab === "memberships") {
      this.displayMemberships();
    } else if (this.currentTab === "products") {
      this.displayProducts();
    }
  }

  displayMemberships() {
    const grid = document.getElementById("membershipGrid");
    if (!grid) return;

    grid.innerHTML = this.memberships
      .map(
        (membership) => `
            <div class="item-card membership-card" onclick="cart.addItem(${JSON.stringify(
              membership
            ).replace(/"/g, "&quot;")}, 'membership')">
                <div class="item-image">
                    <i class="fas fa-id-card"></i>
                </div>
                <div class="item-name">${membership.name}</div>
                <div class="item-price">$${membership.price}</div>
                <div class="item-duration">${
                  membership.duration_months
                } month(s)</div>
                <div class="features">
                    ${(membership.features || [])
                      .slice(0, 2)
                      .map(
                        (feature) =>
                          `<span class="feature-tag">${feature}</span>`
                      )
                      .join("")}
                </div>
            </div>
        `
      )
      .join("");
  }

  displayProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = this.products
      .map(
        (product) => `
            <div class="item-card product-card" onclick="cart.addItem(${JSON.stringify(
              product
            ).replace(/"/g, "&quot;")}, 'product')">
                <div class="item-image">
                    <i class="fas fa-box"></i>
                </div>
                <div class="item-name">${product.name}</div>
                <div class="item-price">$${product.price}</div>
                <div class="item-category">${product.category}</div>
                <div class="product-stock">
                    <span class="stock-indicator ${this.getStockStatus(
                      product.stock_quantity
                    )}"></span>
                    ${product.stock_quantity} in stock
                </div>
            </div>
        `
      )
      .join("");
  }

  getStockStatus(quantity) {
    if (quantity === 0) return "out";
    if (quantity <= 5) return "low";
    return "";
  }

  handleSearch(query) {
    const items =
      this.currentTab === "memberships" ? this.memberships : this.products;
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(query.toLowerCase())) ||
        (item.category &&
          item.category.toLowerCase().includes(query.toLowerCase()))
    );

    if (this.currentTab === "memberships") {
      this.displayFilteredMemberships(filtered);
    } else {
      this.displayFilteredProducts(filtered);
    }
  }

  displayFilteredMemberships(memberships) {
    const grid = document.getElementById("membershipGrid");
    grid.innerHTML = memberships
      .map(
        (membership) => `
            <div class="item-card membership-card" onclick="cart.addItem(${JSON.stringify(
              membership
            ).replace(/"/g, "&quot;")}, 'membership')">
                <div class="item-image">
                    <i class="fas fa-id-card"></i>
                </div>
                <div class="item-name">${membership.name}</div>
                <div class="item-price">$${membership.price}</div>
                <div class="item-duration">${
                  membership.duration_months
                } month(s)</div>
                <div class="features">
                    ${(membership.features || [])
                      .slice(0, 2)
                      .map(
                        (feature) =>
                          `<span class="feature-tag">${feature}</span>`
                      )
                      .join("")}
                </div>
            </div>
        `
      )
      .join("");
  }

  displayFilteredProducts(products) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = products
      .map(
        (product) => `
            <div class="item-card product-card" onclick="cart.addItem(${JSON.stringify(
              product
            ).replace(/"/g, "&quot;")}, 'product')">
                <div class="item-image">
                    <i class="fas fa-box"></i>
                </div>
                <div class="item-name">${product.name}</div>
                <div class="item-price">$${product.price}</div>
                <div class="item-category">${product.category}</div>
                <div class="product-stock">
                    <span class="stock-indicator ${this.getStockStatus(
                      product.stock_quantity
                    )}"></span>
                    ${product.stock_quantity} in stock
                </div>
            </div>
        `
      )
      .join("");
  }
}

window.posManager = new POSManager();
=======
 class POSManager {
   constructor() {
     this.memberships = [];
     this.products = [];
     this.members = [];
     this.currentTab = "memberships";
     this.initializeEventListeners();
   }

   initializeEventListeners() {
     document.querySelectorAll(".tab-btn").forEach((btn) => {
       btn.addEventListener("click", (e) => {
         const tab = e.currentTarget.dataset.tab;
         this.switchTab(tab);
       });
     });

     document.getElementById("searchInput")?.addEventListener("input", (e) => {
       this.handleSearch(e.target.value);
     });
   }


  switchTab(tabName) {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(tabName).classList.add("active");

    this.currentTab = tabName;
    this.displayTabContent();
  }

  displayTabContent() {
    if (this.currentTab === "memberships") {
      this.displayMemberships();
    } else if (this.currentTab === "products") {
      this.displayProducts();
    }
  }

   displayMemberships() {
     const grid = document.getElementById("membershipGrid");
     if (!grid) return;
     if(!this.memberships) grid.innerHTML = "<p>No memberships available.</p>";

     grid.innerHTML = this.memberships
       .map(
         (membership) => `
             <div class="item-card membership-card" onclick="cart.addItem(${JSON.stringify(
               membership
             ).replace(/"/g, "&quot;")}, 'membership')">
                 <div class="item-image">
                     <i class="fas fa-id-card"></i>
                 </div>
                 <div class="item-name">${membership.name}</div>
                 <div class="item-price">₱${membership.price}</div>

                 <div class="features">
                     ${(membership.features || [])
                       .slice(0, 2)
                       .map(
                         (feature) =>
                           `<span class="feature-tag">${feature}</span>`
                       )
                       .join("")}
                 </div>
             </div>
         `
       )
       .join("");
   }

  displayProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    if(!this.products) grid.innerHTML = "<p>No products available.</p>";

    console.log('Displaying products:', this.products);

    grid.innerHTML = this.products
      .map(
        (product) => `
            <div class="item-card product-card" onclick="cart.addItem(${JSON.stringify(
              product
            ).replace(/"/g, "&quot;")}, 'product')">
                <div class="item-image">
                    <i class="fas fa-box"></i>
                </div>
                <div class="item-name">${product.name}</div>
                <div class="item-price">₱${product.price}</div>
                <div class="item-category">${product.category}</div>
                <div class="product-stock">
                    <span class="stock-indicator ${this.getStockStatus(
                      product.stock_quantity
                    )}"></span>
                    ${product.stock_quantity} in stock
                </div>
            </div>
        `
      )
      .join("");
  }

   getStockStatus(quantity) {
     if (quantity === 0) return "out";
     if (quantity <= 5) return "low";
     return "";
   }

   handleSearch(query) {
     const items =
       this.currentTab === "memberships" ? this.memberships : this.products;
     const filtered = items.filter(
       (item) =>
         item.name.toLowerCase().includes(query.toLowerCase()) ||
         (item.description &&
           item.description.toLowerCase().includes(query.toLowerCase())) ||
         (item.category &&
           item.category.toLowerCase().includes(query.toLowerCase()))
     );

     if (this.currentTab === "memberships") {
       this.displayFilteredMemberships(filtered);
     } else {
       this.displayFilteredProducts(filtered);
     }
   }

   displayFilteredMemberships(memberships) {
     const grid = document.getElementById("membershipGrid");
     if(!memberships || memberships.length === 0) {
       grid.innerHTML = "<p>No memberships found.</p>";
       return;
     }

     grid.innerHTML = memberships
       .map(
         (membership) => `
             <div class="item-card membership-card" onclick="cart.addItem(${JSON.stringify(
               membership
             ).replace(/"/g, "&quot;")}, 'membership')">
                 <div class="item-image">
                     <i class="fas fa-id-card"></i>
                 </div>
                 <div class="item-name">${membership.name}</div>
                 <div class="item-price">₱${membership.price}</div>
                 <div class="features">
                     ${(membership.features || [])
                       .slice(0, 2)
                       .map(
                         (feature) =>
                           `<span class="feature-tag">${feature}</span>`
                       )
                       .join("")}
                 </div>
             </div>
         `
       )
       .join("");
   }

   displayFilteredProducts(products) {
     const grid = document.getElementById("productGrid");
      if(!products || products.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
      }
     grid.innerHTML = products
       .map(
         (product) => `
             <div class="item-card product-card" onclick="cart.addItem(${JSON.stringify(
               product
             ).replace(/"/g, "&quot;")}, 'product')">
                 <div class="item-image">
                     <i class="fas fa-box"></i>
                 </div>
                 <div class="item-name">${product.name}</div>
                 <div class="item-price">₱${product.price}</div>
                 <div class="item-category">${product.category}</div>
                 <div class="product-stock">
                     <span class="stock-indicator ${this.getStockStatus(
                       product.stock_quantity
                     )}"></span>
                     ${product.stock_quantity} in stock
                 </div>
             </div>
         `
       )
       .join("");
   }
 }

 window.posManager = new POSManager();
>>>>>>> 4844d84ecee0121f239aa23013db5da398c3939c
