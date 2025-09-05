class ReceiptManager {
  constructor() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document
      .getElementById("closeReceiptModal")
      ?.addEventListener("click", () => this.closeReceipt());
    document
      .getElementById("printReceipt")
      ?.addEventListener("click", () => this.printReceipt());
    document
      .getElementById("emailReceipt")
      ?.addEventListener("click", () => this.emailReceipt());
  }

  async showReceipt(transaction) {
    try {
      const fullTransaction = await db.getTransaction(transaction.id);
      this.generateReceiptHTML(fullTransaction);
      document.getElementById("receiptModal").classList.add("show");
    } catch (error) {
      console.error("Failed to load transaction details:", error);
      alert("Failed to generate receipt");
    }
  }

  generateReceiptHTML(transaction) {
    const receiptContent = document.getElementById("receiptContent");
    const currentDate = new Date().toLocaleString();

    receiptContent.innerHTML = `
            <div class="receipt-header">
                <div class="gym-name">GymPro Fitness</div>
                <div class="gym-info">
                    123 Fitness Street<br>
                    Gym City, GC 12345<br>
                    Phone: (555) 123-4567<br>
                    Email: info@gympro.com
                </div>
            </div>

            <div class="receipt-info">
                <div class="receipt-info-section">
                    <h4>Transaction Details</h4>
                    <div class="receipt-info-item">
                        <span class="receipt-info-label">Transaction ID:</span>
                        <span class="receipt-info-value">${
                          transaction.transaction_id
                        }</span>
                    </div>
                    <div class="receipt-info-item">
                        <span class="receipt-info-label">Date:</span>
                        <span class="receipt-info-value">${currentDate}</span>
                    </div>
                    <div class="receipt-info-item">
                        <span class="receipt-info-label">Cashier:</span>
                        <span class="receipt-info-value">Admin User</span>
                    </div>
                </div>
                
                <div class="receipt-info-section">
                    <h4>Customer Information</h4>
                    <div class="receipt-info-item">
                        <span class="receipt-info-label">Customer:</span>
                        <span class="receipt-info-value">${
                          transaction.member_id
                            ? `${transaction.first_name || ""} ${
                                transaction.last_name || ""
                              }`
                            : "Walk-in Customer"
                        }</span>
                    </div>
                    ${
                      transaction.member_id
                        ? `
                        <div class="receipt-info-item">
                            <span class="receipt-info-label">Member ID:</span>
                            <span class="receipt-info-value">${transaction.member_id}</span>
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>

            <div class="receipt-items">
                <h3>Items Purchased</h3>
                ${(transaction.items || [])
                  .map(
                    (item) => `
                    <div class="receipt-item">
                        <div class="receipt-item-desc">
                            <div class="receipt-item-name">${
                              item.item_name
                            }</div>
                            <div class="receipt-item-details">${
                              item.item_type === "membership"
                                ? "Membership Plan"
                                : "Product"
                            }</div>
                        </div>
                        <div class="receipt-item-qty">x${item.quantity}</div>
                        <div class="receipt-item-price">$${item.total_price.toFixed(
                          2
                        )}</div>
                    </div>
                `
                  )
                  .join("")}
            </div>

            <div class="receipt-totals">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>$${transaction.subtotal.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Tax (8.5%):</span>
                    <span>$${transaction.tax_amount.toFixed(2)}</span>
                </div>
                <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>$${transaction.total_amount.toFixed(2)}</span>
                </div>
            </div>

            <div class="receipt-payments">
                <h3>Payment Methods</h3>
                ${JSON.parse(transaction.payment_methods || "[]")
                  .map(
                    (payment) => `
                    <div class="payment-row">
                        <span class="payment-row-method">${this.getPaymentTypeName(
                          payment.type
                        )}</span>
                        <span class="payment-row-amount">$${payment.amount.toFixed(
                          2
                        )}</span>
                    </div>
                `
                  )
                  .join("")}
            </div>

            <div class="receipt-footer">
                <div class="thank-you">Thank You for Your Business!</div>
                <p>Please keep this receipt for your records.</p>
                <p>Visit us online at www.gympro.com</p>
                <p>Follow us on social media @GymProArmanisPOSFitness</p>
            </div>
        `;
  }

  getPaymentTypeName(type) {
    const names = {
      cash: "Cash",
      card: "Credit/Debit Card",
      bank_transfer: "Bank Transfer",
      digital_wallet: "Digital Wallet",
    };
    return names[type] || type;
  }

  closeReceipt() {
    document.getElementById("receiptModal").classList.remove("show");
  }

  printReceipt() {
    const receiptContent = document.getElementById("receiptContent").innerHTML;
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Receipt - ${new Date().toLocaleDateString()}</title>
                <style>
                    body { font-family: 'Courier New', monospace; margin: 20px; }
                    .receipt-content { max-width: 400px; margin: 0 auto; }
                    .receipt-header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
                    .gym-name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                    .receipt-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
                    .receipt-item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px dashed #ccc; }
                    .receipt-totals { margin: 20px 0; padding-top: 10px; border-top: 2px solid #000; }
                    .total-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
                    .grand-total { font-weight: bold; font-size: 18px; border-top: 1px solid #000; padding-top: 10px; }
                    .receipt-footer { text-align: center; margin-top: 20px; padding-top: 10px; border-top: 2px solid #000; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                <div class="receipt-content">${receiptContent}</div>
            </body>
            </html>
        `);

    printWindow.document.close();
    printWindow.print();
  }

  emailReceipt() {
    alert(
      "Email receipt functionality would be implemented here.\nReceipt would be sent to the customer's email address."
    );
  }
}

window.receiptManager = new ReceiptManager();
