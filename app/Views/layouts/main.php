<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= esc($title ?? 'GymPro POS - Professional Gym Management System') ?></title>
    <link rel="stylesheet" href="<?= base_url('styles/main.css') ?>">
    <link rel="stylesheet" href="<?= base_url('styles/sidebar.css') ?>">
    <link rel="stylesheet" href="<?= base_url('styles/pos.css') ?>">
    <link rel="stylesheet" href="<?= base_url('styles/modal.css') ?>">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        window.API_BASE = '<?= base_url('/') ?>';
        window.BASE_URL = '<?= base_url() ?>';
    </script>
</head>

<body>
    <div class="app-container">
        <?= view('components/sidebar') ?>

        <main class="main-content">
            <?= view('components/header') ?>

            <section id="dashboard" class="content-section active">
                <?= view('components/dashboard') ?>
            </section>

            <section id="pos" class="content-section">
                <?= view('components/pos') ?>
            </section>

            <section id="members" class="content-section">
                <?= view('components/members') ?>
            </section>

            <section id="memberships" class="content-section">
                <?= view('components/memberships') ?>
            </section>

            <section id="categories" class="content-section">
                <?= view('components/categories') ?>
            </section>

            <section id="products" class="content-section">
                <?= view('components/products') ?>
            </section>

            <section id="transactions" class="content-section">
                <?= view('components/transactions') ?>
            </section>

            <section id="reports" class="content-section">
                <?= view('components/reports') ?>
            </section>
        </main>
    </div>

    <?= view('components/modals') ?>

    <script src="<?= base_url('js/database.js') ?>"></script>
    <script src="<?= base_url('js/cart.js') ?>"></script>
    <script src="<?= base_url('js/payment.js') ?>"></script>
    <script src="<?= base_url('js/receipt.js') ?>"></script>
    <script src="<?= base_url('js/navigation.js') ?>"></script>
    <script src="<?= base_url('js/pos.js') ?>"></script>
    <script src="<?= base_url('js/members.js') ?>"></script>
    <script src="<?= base_url('js/modals.js') ?>"></script>
    <script src="<?= base_url('js/app.js') ?>"></script>
</body>

</html>