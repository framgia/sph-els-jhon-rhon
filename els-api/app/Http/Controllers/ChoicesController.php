<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Http\Request;

class ChoicesController extends Controller
{
    public function choices($id) {
        return $word = Word::findOrFail($id)->choices->shuffle();
    }
}
