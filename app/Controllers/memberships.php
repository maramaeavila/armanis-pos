<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\MembershipModel;
use CodeIgniter\HTTP\ResponseInterface;

class Memberships extends BaseController
{
    protected $membershipModel;

    public function __construct()
    {
        $this->membershipModel = new MembershipModel();
    }

    public function index(): ResponseInterface
    {
        $memberships = $this->membershipModel->findAll();
        return $this->response->setJSON($memberships);
    }

    public function create(): ResponseInterface
    {
        $data = $this->request->getJSON(true);

        $validation = \Config\Services::validation();
        $validation->setRules([
            'name' => 'required|min_length[3]|max_length[100]',
            'price' => 'required|decimal',
            'duration_months' => 'required|integer|greater_than[0]'
        ]);

        if (!$validation->run($data)) {
            return $this->response->setStatusCode(400)->setJSON([
                'success' => false,
                'errors' => $validation->getErrors()
            ]);
        }

        $id = $this->membershipModel->insert($data);

        return $this->response->setJSON([
            'success' => true,
            'id' => $id,
            'membership' => $this->membershipModel->find($id)
        ]);
    }
}
