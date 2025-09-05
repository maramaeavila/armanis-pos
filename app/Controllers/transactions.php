<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\TransactionModel;
use App\Models\TransactionItemModel;
use CodeIgniter\HTTP\ResponseInterface;

class Transactions extends BaseController
{
    protected $transactionModel;
    protected $transactionItemModel;

    public function __construct()
    {
        $this->transactionModel = new TransactionModel();
        $this->transactionItemModel = new TransactionItemModel();
    }

    public function index(): ResponseInterface
    {
        $transactions = $this->transactionModel
            ->select('transactions.*, members.first_name, members.last_name')
            ->join('members', 'members.id = transactions.member_id', 'left')
            ->orderBy('created_at', 'DESC')
            ->findAll();

        return $this->response->setJSON($transactions);
    }

    public function create(): ResponseInterface
    {
        $data = $this->request->getJSON(true);

        $db = \Config\Database::connect();
        $db->transStart();

        try {
            // Create transaction
            $transactionData = [
                'transaction_id' => 'TXN' . date('YmdHis') . rand(100, 999),
                'member_id' => $data['member_id'] ?? null,
                'subtotal' => $data['subtotal'],
                'tax_amount' => $data['tax_amount'],
                'total_amount' => $data['total_amount'],
                'payment_methods' => json_encode($data['payment_methods']),
                'status' => 'completed'
            ];

            $transactionId = $this->transactionModel->insert($transactionData);

            // Create transaction items
            foreach ($data['items'] as $item) {
                $itemData = [
                    'transaction_id' => $transactionId,
                    'item_type' => $item['type'],
                    'item_id' => $item['id'],
                    'item_name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['price'],
                    'total_price' => $item['quantity'] * $item['price']
                ];

                $this->transactionItemModel->insert($itemData);
            }

            $db->transComplete();

            if ($db->transStatus() === false) {
                throw new \Exception('Transaction failed');
            }

            return $this->response->setJSON([
                'success' => true,
                'transaction_id' => $transactionId,
                'transaction' => $this->transactionModel->find($transactionId)
            ]);
        } catch (\Exception $e) {
            $db->transRollback();
            return $this->response->setStatusCode(500)->setJSON([
                'success' => false,
                'message' => 'Transaction failed: ' . $e->getMessage()
            ]);
        }
    }

    public function show($id): ResponseInterface
    {
        $transaction = $this->transactionModel->find($id);

        if (!$transaction) {
            return $this->response->setStatusCode(404)->setJSON([
                'success' => false,
                'message' => 'Transaction not found'
            ]);
        }

        $items = $this->transactionItemModel->where('transaction_id', $id)->findAll();
        $transaction['items'] = $items;

        return $this->response->setJSON($transaction);
    }
}
