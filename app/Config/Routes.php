<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/dashboard', 'dashboard::index');
$routes->get('test', function () {
    return view('test');
});

$routes->group('/', function ($routes) {
    
    //members
    $routes->get('members', 'Members::index');
    $routes->post('members', 'Members::create');
    $routes->get('members/(:num)', 'Members::show/$1');
    $routes->put('members/(:num)', 'Members::update/$1');
    $routes->delete('members/(:num)', 'Members::delete/$1');
    
    //memberships
    $routes->get('memberships', 'Memberships::index');
    $routes->post('memberships', 'Memberships::create');

    //products
    $routes->get('products', 'Products::index');
    $routes->post('products', 'Products::create');
    
    //transactions
    $routes->get('transactions', 'Transactions::index');
    $routes->post('transactions', 'Transactions::create');
    $routes->get('transactions/(:num)', 'Transactions::show/$1');

    // Dashboard
    $routes->get('dashboard', 'Dashboard::stats');
    $routes->get('dashboard/stats', 'Dashboard::stats');

    //categories
    $routes->post('categories/create', 'Categories::create');
    $routes->get('categories', 'Categories::index');
    
});
