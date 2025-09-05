<!-- Sidebar Navigation -->
<aside class="sidebar" id="sidebar">

    <div class="sidebar-header">
        <button class="toggle-btn" id="toggleSidebar">
            <i class="fas fa-bars"></i>
        </button>
        <div class="logo">
            <img src="<?= base_url('images/armanisLogo.png') ?>" alt="Logo">
        </div>
    </div>

    <nav class="sidebar-nav">
        <ul>
            <li class="nav-item active" data-section="dashboard">
                <i class="fas fa-chart-line"></i>
                <span>Dashboard</span>
            </li>
            <li class="nav-item" data-section="pos">
                <i class="fas fa-cash-register"></i>
                <span>Point of Sale</span>
            </li>
            <li class="nav-item" data-section="members">
                <i class="fas fa-users"></i>
                <span>Members</span>
            </li>
            <li class="nav-item" data-section="memberships">
                <i class="fas fa-id-card"></i>
                <span>Memberships</span>
            </li>
            <li class="nav-item" data-section="categories">
                <i class="fas fa-th-large"></i>
                <span>Categories</span>
            </li>
            <li class="nav-item" data-section="products">
                <i class="fas fa-box"></i>
                <span>Products</span>
            </li>
            <li class="nav-item" data-section="transactions">
                <i class="fas fa-receipt"></i>
                <span>Transactions</span>
            </li>
            <li class="nav-item" data-section="reports">
                <i class="fas fa-chart-bar"></i>
                <span>Reports</span>
            </li>
        </ul>
    </nav>

    <div class="sidebar-footer">
        <div class="user-profile">
            <i class="fas fa-user-circle"></i>
            <div class="user-info">
                <div class="user-name">Admin User</div>
                <div class="user-role">Manager</div>
            </div>
        </div>
    </div>
</aside>