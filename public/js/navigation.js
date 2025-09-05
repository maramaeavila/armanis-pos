class NavigationManager {
  constructor() {
    this.currentSection = "POS";
    this.initializeEventListeners();
    this.updatePageTitle();
  }

  initializeEventListeners() {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const section = e.currentTarget.dataset.section;
        this.navigateToSection(section);
      });
    });

    document.getElementById("mobileMenuBtn")?.addEventListener("click", () => {
      this.toggleMobileMenu();
    });

    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".sidebar") &&
        !e.target.closest(".mobile-menu-btn")
      ) {
        this.closeMobileMenu();
      }
    });
  }

  navigateToSection(sectionName) {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(`[data-section="${sectionName}"]`)
      .classList.add("active");

    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(sectionName).classList.add("active");

    this.currentSection = sectionName;
    this.updatePageTitle();

    this.closeMobileMenu();
  }

  updatePageTitle() {
    const titles = {
      pos: "POS",
      members: "Members",
      categories: "Categories",
      products: "Products",
      transactions: "Transactions",
      reports: "Reports",
    };

    const pageTitle = document.querySelector(".page-title");
    if (pageTitle) {
      pageTitle.textContent = titles[this.currentSection] || "POS";
    }
  }

  toggleMobileMenu() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("open");

    if (sidebar.classList.contains("open")) {
      this.showMobileOverlay();
    } else {
      this.hideMobileOverlay();
    }
  }

  closeMobileMenu() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove("open");
    this.hideMobileOverlay();
  }

  showMobileOverlay() {
    let overlay = document.querySelector(".sidebar-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "sidebar-overlay";
      overlay.addEventListener("click", () => this.closeMobileMenu());
      document.body.appendChild(overlay);
    }
    overlay.classList.add("show");
  }

  hideMobileOverlay() {
    const overlay = document.querySelector(".sidebar-overlay");
    if (overlay) {
      overlay.classList.remove("show");
    }
  }

  async loadMembersData() {
    if (window.membersManager) {
      await window.membersManager.loadMembers();
    }
  }

  async loadPOSData() {
    if (window.posManager) {
      await window.posManager.loadPOSData();
    }
  }

  async loadTransactionsData() {
    try {
      const transactions = await db.getTransactions();
      this.displayTransactions(transactions);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    }
  }

  displayTransactions(transactions) {
    const container = document.getElementById("transactionsContainer");

    if (transactions.length === 0) {
      container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-light);">
                    <i class="fas fa-receipt" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;"></i>
                    <p>No transactions found</p>
                </div>
            `;
      return;
    }

    container.innerHTML = `
            <table class="transactions-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${transactions
                      .map(
                        (transaction) => `
                        <tr>
                            <td class="transaction-id">${
                              transaction.transaction_id
                            }</td>
                            <td>${
                              transaction.first_name
                                ? `${transaction.first_name} ${transaction.last_name}`
                                : "Walk-in"
                            }</td>
                            <td>${new Date(
                              transaction.created_at
                            ).toLocaleDateString()}</td>
                            <td>${transaction.items?.length || 0} items</td>
                            <td class="transaction-total">$${parseFloat(
                              transaction.total_amount
                            ).toFixed(2)}</td>
                            <td>
                                <span class="status-badge ${
                                  transaction.status
                                }">
                                    ${
                                      transaction.status
                                        .charAt(0)
                                        .toUpperCase() +
                                      transaction.status.slice(1)
                                    }
                                </span>
                            </td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        `;
  }
}

window.navigationManager = new NavigationManager();
