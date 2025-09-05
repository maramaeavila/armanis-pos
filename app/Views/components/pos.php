<div class="pos-layout">
    <div class="pos-left">
        <div class="pos-header">
            <div class="search-container">
                <div class="search-bar">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search products, memberships, or members..." id="searchInput">
                </div>
                <!-- <button class="search-btn">
                    <i class="fas fa-barcode"></i>
                </button> -->
            </div>
        </div>

        <div class="pos-tabs">
            <button class="tab-btn active" data-tab="memberships">
                <i class="fas fa-id-card"></i>
                Memberships
            </button>
            <button class="tab-btn" data-tab="products">
                <i class="fas fa-box"></i>
                Products
            </button>
        </div>

        <div class="pos-content">
            <div id="memberships" class="tab-content active">
                <div class="items-grid" id="membershipGrid">
                </div>
            </div>
            <div id="products" class="tab-content">
                <div class="items-grid" id="productGrid">
                </div>
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
    memberships: <?= json_encode(array_filter($products ?? [], function($product) { 
        return isset($product['category_id']) && $product['category_id'] == 2; 
    })) ?>,
    items: <?= json_encode(array_filter($products ?? [], function($product) { 
        return isset($product['category_id']) && $product['category_id'] == 1; 
    })) ?>
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, phpData:', window.phpData);
    //check files pos.js for the unfamiliar names
    const initializePOS = () => {
        if (window.posManager) {
            console.log('POS Manager found, initializing...');
            
            
            window.posManager.memberships = Object.values(window.phpData.memberships).map(product => ({
                id: product.id,
                name: product.product_name,
                price: product.costing_price,
            }));
            
            window.posManager.products = Object.values(window.phpData.items).map(product => ({
                id: product.id,
                name: product.product_name,
                price: product.costing_price,
                category: "supplements",
                stock_quantity: product.stock_quantity || 10
            }));
            
           
            
            window.posManager.displayTabContent();
        } else {
            console.log('POS Manager not ready, retrying...');
        }
    };
    
    initializePOS();
});
</script>