<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\MemberModel;
use CodeIgniter\HTTP\ResponseInterface;

class Members extends BaseController
{
    protected $memberModel;

    public function __construct()
    {
        $this->memberModel = new MemberModel();
    }

    public function index(): ResponseInterface
    {
        $members = $this->memberModel->findAll();
        return $this->response->setJSON($members);
    }

    public function create(): ResponseInterface
    {
        $data = $this->request->getJSON(true);

        $validation = \Config\Services::validation();
        $validation->setRules([
            'first_name' => 'required|min_length[2]|max_length[50]',
            'last_name' => 'required|min_length[2]|max_length[50]',
            'email' => 'required|valid_email|is_unique[members.email]',
            'phone' => 'required|min_length[10]|max_length[15]'
        ]);

        if (!$validation->run($data)) {
            return $this->response->setStatusCode(400)->setJSON([
                'success' => false,
                'errors' => $validation->getErrors()
            ]);
        }

        $data['member_id'] = 'GYM' . str_pad(rand(1, 99999), 5, '0', STR_PAD_LEFT);
        $data['status'] = 'active';
        $data['join_date'] = date('Y-m-d');

        $id = $this->memberModel->insert($data);

        return $this->response->setJSON([
            'success' => true,
            'id' => $id,
            'member' => $this->memberModel->find($id)
        ]);
    }

    public function show($id): ResponseInterface
    {
        $member = $this->memberModel->find($id);

        if (!$member) {
            return $this->response->setStatusCode(404)->setJSON([
                'success' => false,
                'message' => 'Member not found'
            ]);
        }

        return $this->response->setJSON($member);
    }

    public function update($id): ResponseInterface
    {
        $data = $this->request->getJSON(true);

        if (!$this->memberModel->find($id)) {
            return $this->response->setStatusCode(404)->setJSON([
                'success' => false,
                'message' => 'Member not found'
            ]);
        }

        $this->memberModel->update($id, $data);

        return $this->response->setJSON([
            'success' => true,
            'member' => $this->memberModel->find($id)
        ]);
    }

    public function delete($id): ResponseInterface
    {
        if (!$this->memberModel->find($id)) {
            return $this->response->setStatusCode(404)->setJSON([
                'success' => false,
                'message' => 'Member not found'
            ]);
        }

        $this->memberModel->delete($id);

        return $this->response->setJSON([
            'success' => true,
            'message' => 'Member deleted successfully'
        ]);
    }
}
