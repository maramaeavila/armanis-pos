
<div class="pos-layout">
    <div class="pos-left">
        <div class="pos-header">
            <div class="search-container">
                <div class="search-bar">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search products" id="searchInput">
                </div>
                <!-- <button class="search-btn">
                    <i class="fas fa-barcode"></i>
                </button> -->
            </div>
        </div>


        <div class="pos-content">
            <button class="back-btn" id="backBtn" onclick="window.posManager.backToCategories()">
                <i class="fas fa-arrow-left"></i>
                <span>Back to Categories</span>
            </button>
            <div id="categoryGrid" class="category-grid">
                <!-- Categories will be populated by JavaScript -->
            </div>
            <div id="productGrid" class="product-grid">
                 
                <!-- Products will be populated by JavaScript -->
                
            </div>
        </div>
    </div>

    <div class="pos-right">
        <div class="cart-section">
            <div class="cart-header">
                <h3>
                    <i class="fas fa-shopping-cart"></i>
                    Current Transaction
                </h3>
                <button class="clear-cart-btn" id="clearCart" title="Clear Cart">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>

            <div class="member-selection">
                <label>
                    <i class="fas fa-user"></i>
                    Select Member
                </label>
                <select id="memberSelect">
                    <option value="">Walk-in Customer</option>
                </select>
            </div>

            <div class="cart-items" id="cartItems">
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Add items to start transaction</p>
                </div>
            </div>

            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span id="subtotal">₱0.00</span>
                </div>
                <div class="summary-row">
                    <span>Tax (8.5%):</span>
                    <span id="tax">₱0.00</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span id="total">₱0.00</span>
                </div>
            </div>
        </div>

        <div class="payment-section">
            <div class="payment-header">
                <h4>
                    <i class="fas fa-credit-card"></i>
                    Payment Methods
                </h4>
                <span class="remaining-amount" id="remainingAmount">₱0.00 remaining</span>
            </div>

            <div class="payment-methods" id="paymentMethods"></div>

            <button class="add-payment-btn" id="addPaymentBtn">
                <i class="fas fa-plus"></i>
                Add Payment Method
            </button>

            <button class="checkout-btn" id="checkoutBtn" disabled>
                <i class="fas fa-check"></i>
                Complete Transaction
            </button>
        </div>
    </div>
</div>
<script>
    // renders the data dynamically from PHP to JS

window.phpData = {
    products: <?= json_encode($products ?? []) ?>,
    categories: <?= json_encode($categories ?? []) ?>,
    memberships: <?= json_encode(array_filter($products ?? [], function($product) { 
        return isset($product['category_id']) && $product['category_id'] == 2; 
    })) ?>,
    items: <?= json_encode(array_filter($products ?? [], function($product) { 
        return isset($product['category_id']) && $product['category_id'] == 1; 
    })) ?>
};

document.addEventListener('DOMContentLoaded', function() {
    
    const initializePOS = () => {
        if (window.posManager) {

            // Set the categories data
            window.posManager.category = window.phpData.categories.map(category => ({
                id: category.id,
                name: category.type || category.name,
                description: category.description || ''
            }));

      
            
            // Map ALL products (not just items with category_id == 1)
            window.posManager.products = window.phpData.products.map(product => ({
                id: product.id,
                name: product.product_name,
                price: product.costing_price,
                category_id: product.category_id,
                category: product.category_name || "General",
                category_name: product.category_name,
                stock_quantity: product.stock_quantity || 10,
                uom: product.uom_name || "pcs",
            }));


            // Display the categories and tabs
            if (typeof window.posManager.displayCategory === 'function') {
                window.posManager.displayCategory();
            }
      

        } else {
            console.log('POS Manager not ready, retrying...');
            setTimeout(initializePOS, 100);
        }
    };
    
    initializePOS();
});
</script>