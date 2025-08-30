<?php

namespace App\Controllers;

use App\Models\ProductModel;

class Home extends BaseController
{
    public function index(): string
    {
        $db = \Config\Database::connect();
        $productModel = new ProductModel();
        
        // Get products with category and unit information
        $query = $db->query("SELECT p.*,c.id as category_id, c.type as category_name, uom.name as uom_name FROM products p 
        LEFT JOIN category c ON p.category_id = c.id
        LEFT JOIN unit_of_measure uom ON p.suom_id = uom.id");
        $products = $query->getResultArray();
        
        // Get categories
        $categoryQuery = $db->query("SELECT * FROM category");
        $categories = $categoryQuery->getResultArray();
        
        return view('layouts/main', [
            'title' => 'Armanis - POS',
            'content' => view('components/pos', [
                'products' => $products,
                'categories' => $categories
            ])
        ]);
    }

}
