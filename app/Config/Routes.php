<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/dashboard', 'dashboard::index');

$routes->group('/', function ($routes) {

    $routes->get('members', 'Members::index');
    $routes->post('members', 'Members::create');
    $routes->get('members/(:num)', 'Members::show/$1');
    $routes->put('members/(:num)', 'Members::update/$1');
    $routes->delete('members/(:num)', 'Members::delete/$1');

    $routes->get('memberships', 'Memberships::index');
    $routes->post('memberships', 'Memberships::create');

    $routes->get('products', 'Products::index');
    $routes->post('products', 'Products::create');

    $routes->get('transactions', 'Transactions::index');
    $routes->post('transactions', 'Transactions::create');
    $routes->get('transactions/(:num)', 'Transactions::show/$1');

    $routes->get('dashboard', 'Dashboard::stats');
    $routes->get('dashboard/stats', 'Dashboard::stats');
});
