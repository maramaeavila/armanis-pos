class PaymentManager {
  constructor() {
    this.payments = [];
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document
      .getElementById("addPaymentBtn")
      ?.addEventListener("click", () => this.openPaymentModal());
    document
      .getElementById("closePaymentModal")
      ?.addEventListener("click", () => this.closePaymentModal());
    document
      .getElementById("cancelPayment")
      ?.addEventListener("click", () => this.closePaymentModal());
    document
      .getElementById("paymentForm")
      ?.addEventListener("submit", (e) => this.handlePaymentSubmit(e));
    document
      .getElementById("paymentType")
      ?.addEventListener("change", (e) => this.handlePaymentTypeChange(e));
    document
      .getElementById("checkoutBtn")
      ?.addEventListener("click", () => this.processCheckout());
  }

  openPaymentModal() {
    const total = cart.getTotal();
    const paidAmount = this.getTotalPaid();
    const remaining = Math.max(0, total - paidAmount);

    document.getElementById("maxAmount").textContent = remaining.toFixed(2);
    document.getElementById("paymentAmount").max = remaining.toFixed(2);
    document.getElementById("paymentAmount").value = remaining.toFixed(2);

    document.getElementById("paymentModal").classList.add("show");
  }

  closePaymentModal() {
    document.getElementById("paymentModal").classList.remove("show");
    document.getElementById("paymentForm").reset();
    document.getElementById("referenceGroup").style.display = "none";
  }

  handlePaymentTypeChange(e) {
    const referenceGroup = document.getElementById("referenceGroup");
    const needsReference = ["card", "bank_transfer", "digital_wallet"].includes(
      e.target.value
    );
    referenceGroup.style.display = needsReference ? "block" : "none";
  }

  handlePaymentSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const paymentData = {
      type: document.getElementById("paymentType").value,
      amount: parseFloat(document.getElementById("paymentAmount").value),
      reference: document.getElementById("paymentReference").value || null,
    };

    if (this.validatePayment(paymentData)) {
      this.addPayment(paymentData);
      this.closePaymentModal();
    }
  }

  validatePayment(payment) {
    const total = cart.getTotal();
    const paidAmount = this.getTotalPaid();
    const remaining = total - paidAmount;

    if (payment.amount <= 0) {
      alert("Payment amount must be greater than 0");
      return false;
    }

    if (payment.amount > remaining) {
      alert(
        `Payment amount cannot exceed remaining balance of $${remaining.toFixed(
          2
        )}`
      );
      return false;
    }

    return true;
  }

  addPayment(payment) {
    payment.id = Date.now();
    this.payments.push(payment);
    this.updatePaymentDisplay();
    this.updateRemainingAmount();
  }

  removePayment(paymentId) {
    this.payments = this.payments.filter((p) => p.id !== paymentId);
    this.updatePaymentDisplay();
    this.updateRemainingAmount();
  }

  updatePaymentDisplay() {
    const container = document.getElementById("paymentMethods");

    if (this.payments.length === 0) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = this.payments
      .map(
        (payment) => `
            <div class="payment-method">
                <div class="payment-info">
                    <div class="payment-method-icon">
                        <i class="fas fa-${this.getPaymentIcon(
                          payment.type
                        )}"></i>
                    </div>
                    <div class="payment-details">
                        <div class="payment-type">${this.getPaymentTypeName(
                          payment.type
                        )}</div>
                        ${
                          payment.reference
                            ? `<div class="payment-reference">${payment.reference}</div>`
                            : ""
                        }
                    </div>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="payment-amount">$${payment.amount.toFixed(
                      2
                    )}</span>
                    <button class="remove-payment" onclick="paymentManager.removePayment(${
                      payment.id
                    })">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }

  updateRemainingAmount() {
    const total = cart.getTotal();
    const paid = this.getTotalPaid();
    const remaining = Math.max(0, total - paid);

    document.getElementById(
      "remainingAmount"
    ).textContent = `$${remaining.toFixed(2)} remaining`;

    const checkoutBtn = document.getElementById("checkoutBtn");
    const canCheckout = cart.items.length > 0 && remaining === 0;
    checkoutBtn.disabled = !canCheckout;
  }

  getTotalPaid() {
    return this.payments.reduce((total, payment) => total + payment.amount, 0);
  }

  getPaymentIcon(type) {
    const icons = {
      cash: "money-bill",
      card: "credit-card",
      bank_transfer: "university",
      digital_wallet: "mobile-alt",
    };
    return icons[type] || "money-bill";
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

  async processCheckout() {
    if (cart.items.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (this.getTotalPaid() < cart.getTotal()) {
      alert(
        "Payment incomplete. Please add payment methods to cover the full amount."
      );
      return;
    }

    try {
      const transactionData = {
        ...cart.getCartData(),
        payment_methods: this.payments,
      };

      const result = await db.createTransaction(transactionData);

      if (result.success) {
        receiptManager.showReceipt(result.transaction);

        cart.clearCart();
        this.payments = [];
        this.updatePaymentDisplay();
        this.updateRemainingAmount();

        this.showSuccessMessage("Transaction completed successfully!");
      } else {
        throw new Error(result.message || "Transaction failed");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed: " + error.message);
    }
  }

  showSuccessMessage(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
    notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ${message}
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

window.paymentManager = new PaymentManager();
