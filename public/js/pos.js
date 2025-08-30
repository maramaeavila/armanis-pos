class POSManager {
  constructor() {
    this.products = [];
    this.category = [];
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.handleSearch(e.target.value);
    });
  }

  async loadPOSData() {
    try {
      this.products = products;
      this.category = category;

      this.displayCategory();
      this.displayTabContent();
    } catch (error) {
      console.error("Failed to load POS data:", error);
    
    }
  }


  switchTab(tabName) {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

    this.currentTab = tabName;
    
    if (tabName === 'all') {
      this.displayCategory();
    } else if (tabName.startsWith('category-')) {
      const categoryId = parseInt(tabName.replace('category-', ''));
      this.filterByCategory(categoryId);
    } 
  }


 

  displayCategory() {
    const grid = document.getElementById("categoryGrid");
    if (!grid) return;
    
    // Hide the back button when showing categories
    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
      backBtn.style.opacity = "0";
      setTimeout(() => {
        backBtn.style.display = "none";
      }, 200);
    }
    
    grid.innerHTML = this.category
      .map(category => `
        <div class="item-card category-card small-card" onclick="posManager.filterByCategory(${category.id})">
          <div class="item-image small-image"><i class="fas fa-tags"></i></div>
          <div class="item-name small-text">${category.name}</div>
        </div>
      `)
      .join("");
  }



  filterByCategory(categoryId) {
    const backBtn = document.getElementById("backBtn");
    backBtn.style.display = "flex";
    backBtn.style.opacity = "1";
    const filteredProducts = this.products.filter(product => {
      return parseInt(product.category_id) === parseInt(categoryId);
    });
    
    
    const grid = document.getElementById("categoryGrid");
    if (!grid) {
      console.error('categoryGrid not found');
      return;
    }
    
    if (filteredProducts.length === 0) {
      grid.innerHTML = `
        <div class="empty-category">
          <i class="fas fa-box-open"></i>
          <p>No products found in this category</p>
        </div>
      `;
      return;
    }
    
    grid.innerHTML = filteredProducts
      .map(product => `
        <div class="item-card product-card" onclick="cart.addItem(${JSON.stringify(
          product
        ).replace(/"/g, "&quot;")}, 'product')">
          <div class="item-image">
            <i class="fas fa-box"></i>
          </div>
          <div class="item-name">${product.name}</div>
          <div class="item-price">₱${product.price}</div>
          <div class="item-category">${product.category || product.category_name || 'General'}</div>
          <div class="product-stock">
            <span class="stock-indicator ${this.getStockStatus(
              product.stock_quantity
            )}"></span>
           
            ${product.stock_quantity}  ${product.uom} in stock
          </div>
        </div>
      `)
      .join('');
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
                    ${product.stock_quantity}  ${product.uom} in stock
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
    const items = this.products;
    if(query === "") {
      document.getElementById("productGrid").innerHTML = '';
      this.displayCategory();
      return;
    }

    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) 
    );

      this.displayFilteredProducts(filtered);
    
  }
  displayFilteredProducts(products) {
    const grid = document.getElementById("productGrid");
    document.getElementById('categoryGrid').innerHTML = ''; 
    grid.innerHTML = products
      .map(
        (product) => `
            <div class="item-card small-card product-card" onclick="cart.addItem(${JSON.stringify(
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
                    ${product.stock_quantity} ${product.uom} in stock
                </div>
            </div>
        `
      )
      .join("");
  }
  backToCategories() {
    const backBtn = document.getElementById("backBtn");
    backBtn.style.opacity = "0";
    setTimeout(() => {
      backBtn.style.display = "none";
    }, 200);
    this.displayCategory();
  }
}

window.posManager = new POSManager();
