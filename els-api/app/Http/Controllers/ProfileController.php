<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function profile($id) {
        $user = User::findOrFail($id);
        $results = Result::where('user_id', '=', $user->id)->get();

        $profile = [
            'id' => $user->id,
            'fname' => ucfirst($user->fname),
            'lname' => ucfirst($user->lname),
            'email' => $user->email,
        ];

        $learned = [
          'words' => 0,
          'lessons' => count($results),
        ];

        foreach($results as $value) {
            $learned['words'] = $learned['words'] + $value->score;
        }

        return response()->json([
            'profile' => $profile,
            'learned' => $learned,
        ]);
    }
}
