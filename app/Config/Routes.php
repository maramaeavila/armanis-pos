<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/POS', 'pos::index');

$routes->group('/', function ($routes) {

    //members
    $routes->get('members', 'Members::index');
    $routes->post('members', 'Members::create');
    $routes->get('members/(:num)', 'Members::show/$1');
    $routes->put('members/(:num)', 'Members::update/$1');
    $routes->delete('members/(:num)', 'Members::delete/$1');

    //transactions
    $routes->get('transactions', 'Transactions::index');
    $routes->post('transactions', 'Transactions::create');
    $routes->get('transactions/(:num)', 'Transactions::show/$1');
});
