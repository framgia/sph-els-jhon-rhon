<?php

namespace App\Http\Controllers;

use App\Models\Words;
use Illuminate\Http\Request;

class ChoicesController extends Controller
{
    public function choices($id) {
        return $word = Words::findOrFail($id)->choices->shuffle();
    }
}
