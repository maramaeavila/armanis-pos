<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\ProductModel;
use CodeIgniter\HTTP\ResponseInterface;

class Products extends BaseController
{
    protected $productModel;

    public function __construct()
    {
        $this->productModel = new ProductModel();
    }

    public function index(): ResponseInterface
    {
        $products = $this->productModel->findAll();
        return $this->response->setJSON($products);
    }

    public function create(): ResponseInterface
    {
        $data = $this->request->getJSON(true);

        $validation = \Config\Services::validation();
        $validation->setRules([
            'name' => 'required|min_length[2]|max_length[100]',
            'price' => 'required|decimal',
            'stock_quantity' => 'required|integer|greater_than_equal_to[0]',
            'category' => 'required|max_length[50]'
        ]);

        if (!$validation->run($data)) {
            return $this->response->setStatusCode(400)->setJSON([
                'success' => false,
                'errors' => $validation->getErrors()
            ]);
        }

        $id = $this->productModel->insert($data);

        return $this->response->setJSON([
            'success' => true,
            'id' => $id,
            'product' => $this->productModel->find($id)
        ]);
    }
}
