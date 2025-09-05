class ShoppingCart {
  constructor() {
    this.items = [];
    this.selectedMember = null;
    this.taxRate = 0.085; // 8.5%
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document
      .getElementById("clearCart")
      ?.addEventListener("click", () => this.clearCart());
    document.getElementById("memberSelect")?.addEventListener("change", (e) => {
      this.selectedMember = e.target.value ? parseInt(e.target.value) : null;
      this.updateDisplay();
    });
  }

  addItem(item, type = "product") {
    console.log('Adding item:', item, 'Type:', type); // Debug log
    
    const numericId = parseInt(item.id);
    const existingItem = this.items.find(
      (cartItem) => parseInt(cartItem.id) === numericId && cartItem.type === type
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        ...item,
        id: numericId, // Ensure ID is numeric
        type: type,
        quantity: 1,
      });
    }

    console.log('Cart items after adding:', this.items); // Debug log
    this.updateDisplay();
    this.showAddedItemFeedback(item.name);
  }

  removeItem(id, type) {
    console.log('Removing item:', { id, type }); // Debug log
    
    // Convert id to number to ensure proper matching
    const numericId = parseInt(id);
    this.items = this.items.filter(
      (item) => !(parseInt(item.id) === numericId && item.type === type)
    );
    
    console.log('Cart items after removal:', this.items); // Debug log
    this.updateDisplay();
  }

  updateQuantity(id, type, quantity) {
    console.log('updateQuantity called:', { id, type, quantity }); // Debug log
    
    // Convert id to number to ensure proper matching
    const numericId = parseInt(id);
    const item = this.items.find(
      (item) => parseInt(item.id) === numericId && item.type === type
    );
    
    console.log('Found item:', item); // Debug log
    console.log('All cart items:', this.items); // Debug log
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(numericId, type);
      } else {
        item.quantity = parseInt(quantity);
        this.updateDisplay();
      }
    } else {
      console.warn('Item not found in cart:', { id: numericId, type });
    }
  }

  clearCart() {
    this.items = [];
    this.selectedMember = null;
    document.getElementById("memberSelect").value = "";
    this.updateDisplay();
  }

  getSubtotal() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTax() {
    return this.getSubtotal() * this.taxRate;
  }

  getTotal() {
    return this.getSubtotal() + this.getTax();
  }

  updateDisplay() {
    this.updateCartItems();
    this.updateSummary();
    this.updateCheckoutButton();
  }

  updateCartItems() {
    const cartItemsContainer = document.getElementById("cartItems");

    if (this.items.length === 0) {
      cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Add items to start transaction</p>
                </div>
            `;
      return;
    }

    cartItemsContainer.innerHTML = this.items
      .map(
        (item) => `
            <div class="cart-item">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${
                      item.type === "membership"
                        ? ``
                        : item.category || "Product"
                    }</p>
                </div>
                <div class="item-controls">
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="cart.updateQuantity(${
                          item.id
                        }, '${item.type}', ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="cart.updateQuantity(${
                          item.id
                        }, '${item.type}', ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <span class="item-total">₱${(
                      item.price * item.quantity
                    ).toFixed(2)}</span>
                    <button class="remove-item" onclick="cart.removeItem(${
                      item.id
                    }, '${item.type}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }

  updateSummary() {
    const subtotal = this.getSubtotal();
    const tax = this.getTax();
    const total = this.getTotal();

    document.getElementById("subtotal").textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `₱${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `₱${total.toFixed(2)}`;
  }

  updateCheckoutButton() {
    const checkoutBtn = document.getElementById("checkoutBtn");
    const hasItems = this.items.length > 0;

    checkoutBtn.disabled = !hasItems;
    checkoutBtn.style.opacity = hasItems ? "1" : "0.5";
  }

  showAddedItemFeedback(itemName) {
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
    notification.innerHTML = `
            <i class="fas fa-check"></i>
            Added "${itemName}" to cart
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  getCartData() {
    return {
      items: this.items,
      member_id: this.selectedMember,
      subtotal: this.getSubtotal(),
      tax_amount: this.getTax(),
      total_amount: this.getTotal(),
    };
  }
}

window.cart = new ShoppingCart();
