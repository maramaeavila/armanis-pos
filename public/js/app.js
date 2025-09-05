class GymApp {
  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    await this.loadInitialData();

    this.initializeComponents();

    console.log("GymPro POS System initialized successfully");
  }

  updateClock() {
    const clockElement = document.getElementById("currentTime");
    if (clockElement) {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      clockElement.textContent = timeString;
    }
  }

  async loadInitialData() {
    try {
      await navigationManager.loadDashboardData();

      await posManager.loadPOSData();

      await membersManager.loadMembers();
    } catch (error) {
      console.error("Failed to load initial data:", error);
    }
  }

  initializeComponents() {
    const originalUpdateDisplay = cart.updateDisplay.bind(cart);
    cart.updateDisplay = function () {
      originalUpdateDisplay();
      paymentManager.updateRemainingAmount();
    };

    this.initializeModalHandlers();

    const toggleButton = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");

    if (toggleButton && sidebar && mainContent) {
      toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        mainContent.classList.toggle("expanded");
      });
    }
  }

  initializeModalHandlers() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.classList.remove("show");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal.show").forEach((modal) => {
          modal.classList.remove("show");
        });
      }
    });
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  showNotification(message, type = "success") {
    const colors = {
      success: "var(--success)",
      error: "var(--error)",
      warning: "var(--warning)",
      info: "var(--info)",
    };

    const icons = {
      success: "check-circle",
      error: "exclamation-circle",
      warning: "exclamation-triangle",
      info: "info-circle",
    };

    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            box-shadow: var(--shadow-lg);
            max-width: 400px;
        `;
    notification.innerHTML = `
            <i class="fas fa-${icons[type]}"></i>
            ${message}
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new GymApp();
});
