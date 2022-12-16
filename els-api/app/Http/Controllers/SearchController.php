<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function users() {
        $users = DB::table('users')->orderBy('fname');
        $search_text = collect($_GET)->has('query')? $_GET['query']: '';

        if($search_text) {
            $users = $users->whereRaw("(concat(fname,' ',lname) like '%". $search_text . "%') or (email like '%". $search_text ."%')");
        }

        return $users->get()->whereNotIn('id', [auth()->user()->id])->paginate(20);
    }
}
