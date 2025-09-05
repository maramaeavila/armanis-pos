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

<!-- Member List Modal -->
<div id="memberModal" class="modal fade" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
        <div class="modal-content">

            <div class="modal-header">
                <h3>
                    <i class="fas fa-users"></i>
                    Member List
                </h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-striped table-hover align-middle">
                        <thead class="table-dark">
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Emergency Contact</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="membersTableBody">
                            <tr>
                                <td>1</td>
                                <td>Juan</td>
                                <td>Dela Cruz</td>
                                <td>juan@example.com</td>
                                <td>09123456789</td>
                                <td>Maria - 09987654321</td>
                                <td>
                                    <input type="checkbox" class="member-checkbox" data-id="1">
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Ana</td>
                                <td>Santos</td>
                                <td>ana@example.com</td>
                                <td>09223334444</td>
                                <td>Jose - 09119998877</td>
                                <td>
                                    <input type="checkbox" class="member-checkbox" data-id="1">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>

<!-- Member List Modal -->
<div id="orderpaymentsModal" class="modal fade" tabindex="-1" aria-labelledby="orderpaymentsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
        <div class="modal-content">

            <div class="modal-header">
                <h3>
                    <i class="fas fa-users"></i>
                    Order of Payments
                </h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-striped table-hover align-middle">
                        <thead class="table-dark">
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Emergency Contact</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="membersTableBody">
                            <tr>
                                <td>1</td>
                                <td>Juan</td>
                                <td>Dela Cruz</td>
                                <td>juan@example.com</td>
                                <td>09123456789</td>
                                <td>Maria - 09987654321</td>
                                <td>
                                    <input type="checkbox" class="member-checkbox" data-id="1">
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Ana</td>
                                <td>Santos</td>
                                <td>ana@example.com</td>
                                <td>09223334444</td>
                                <td>Jose - 09119998877</td>
                                <td>
                                    <input type="checkbox" class="member-checkbox" data-id="1">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>