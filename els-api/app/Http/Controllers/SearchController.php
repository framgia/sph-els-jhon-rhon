<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function users() {
        return User::orderBy('fname')->whereNotIn('id', [auth()->user()->id])->paginate(20);
    }
}
