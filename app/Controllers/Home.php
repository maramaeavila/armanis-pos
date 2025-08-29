<?php

namespace App\Controllers;

use App\Models\ProductModel;

class Home extends BaseController
{
    public function index(): string
    {
        $productModel = new ProductModel();
        $products = $productModel->findAll();
        return view('layouts/main', [
            'title' => 'Armanis - POS',
            'content' => view('components/pos', ['products' => $products])
        ]);
    }

}
