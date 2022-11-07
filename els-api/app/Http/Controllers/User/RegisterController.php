<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fname' => ['required', 'max:255'],
            'lname' => ['required', 'max:255'],
            'email' => ['required', 'unique:users', 'email', 'max:255'],
            'password' => ['required'],
        ]);

        if( $validator->fails() )
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        }
        else
        {
            $user = User::create([
                'fname' => $request->fname,
                'lname' => $request->lname,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'type' => 'student',
            ]);

            return response()->json([
                'status' => 200,
                'fame' => $user->fname,
                'lname' => $user->lname,
                'email' => $user->email,
            ]);
        }
    }
}
