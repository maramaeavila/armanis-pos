<?php
class Categories extends BaseController
{
    

    public function index()
    {
        $categories = $this->categoryModel->findAll();
        return $this->response->setJSON($categories);
    }

    public function create()
    {
        $url = API_BASE_URL . 'categories/create';
    }
}