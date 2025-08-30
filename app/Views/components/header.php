<header class="top-header">

    <div class="logo">
        <img src="<?= base_url('images/armanisLogo.png') ?>" alt="Armanis Logo">
    </div>

    <div class="dropdown topbar-user">
        <a class="d-flex align-items-center text-decoration-none " id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-user-circle fa-2x me-2"></i>
            <span class="username fw-bold">Admin User</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
                <a class="dropdown-item">
                    <i class="fas fa-cog me-2"></i> Settings
                </a>
            </li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li>
                <a class="dropdown-item text-danger">
                    <i class="fas fa-sign-out-alt me-2"></i> Logout
                </a>
            </li>
        </ul>
    </div>


</header>