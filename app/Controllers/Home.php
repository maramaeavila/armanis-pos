<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return view('layouts/main', [
            'title' => 'Armanis - POS',
            'content' => view('components/POS')
        ]);
    }
}
