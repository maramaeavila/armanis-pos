<?php

namespace App\Controllers;

class Dashboard extends BaseController
{
    public function index(): string
    {
        $data = [
            'title' => 'Dashboard - Armanis POS',
            'stats' => $this->getDashboardStats(),
            'content' => view('components/dashboard', ['stats' => $this->getDashboardStats()])
        ];

        return view('layouts/main', $data);
    }

    private function getDashboardStats(): array
    {
        return [
            'active_members' => 1247,
            'daily_revenue' => 3450.00,
            'daily_transactions' => 124,
            'monthly_growth' => 15.3
        ];
    }
}
