<!-- Payment Method -->
<div id="paymentModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>
                <i class="fas fa-credit-card"></i>
                Add Payment Method
            </h3>
            <button class="close-btn" id="closePaymentModal">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-body">
            <form id="paymentForm">
                <div class="form-group">
                    <label>Payment Method</label>
                    <select id="paymentType" required>
                        <option value="">Select payment method</option>
                        <option value="cash">Cash</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="digital_wallet">Digital Wallet</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Amount</label>
                    <div class="amount-input">
                        <span class="currency">₱</span>
                        <input type="number" id="paymentAmount" step="0.01" min="0" required>
                    </div>
                    <small class="form-help">Maximum: ₱<span id="maxAmount">0.00</span></small>
                </div>
                <div class="form-group" id="referenceGroup" style="display: none;">
                    <label>Reference Number</label>
                    <input type="text" id="paymentReference" placeholder="Transaction reference">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" id="cancelPayment">Cancel</button>
                    <button type="submit" class="btn-primary">Add Payment</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Receipt -->
<div id="receiptModal" class="modal">
    <div class="modal-content receipt-modal">
        <div class="modal-header">
            <h3>
                <i class="fas fa-receipt"></i>
                Transaction Receipt
            </h3>
            <button class="close-btn" id="closeReceiptModal">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-body">
            <div id="receiptContent" class="receipt-content"></div>
            <div class="receipt-actions">
                <button class="btn-secondary" id="printReceipt">
                    <i class="fas fa-print"></i>
                    Print Receipt
                </button>
                <button class="btn-primary" id="emailReceipt">
                    <i class="fas fa-envelope"></i>
                    Email Receipt
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Member -->
<div id="memberModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>
                <i class="fas fa-user-plus"></i>
                Add New Member
            </h3>
            <button class="close-btn" id="closeMemberModal">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-body">
            <form id="memberForm">
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" id="memberFirstName" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" id="memberLastName" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="memberEmail" required>
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" id="memberPhone" required>
                </div>
                <div class="form-group">
                    <label>Emergency Contact</label>
                    <input type="text" id="memberEmergencyContact" placeholder="Name and phone number">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" id="cancelMember">Cancel</button>
                    <button type="submit" class="btn-primary">Add Member</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- add Categories -->
<div id="categoryModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>
                <i class="fas fa-user-plus"></i>
                Add New Category
            </h3>
            <button class="close-btn" id="closeCategoryModal">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-body">
            <form id="categoryForm">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="categoryType" class="form-label fw-bold">Category Type</label>
                        <select class="form-select" id="categoryType" name="categoryType" required>
                            <option value="">-- Select Type --</option>
                            <option value="product">🛍️ Product</option>
                            <option value="service">💪 Service</option>
                        </select>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-success rounded-pill">
                        <i class="fas fa-save"></i> Save Category
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>