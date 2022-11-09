<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if( $validator->fails() ) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 400);
        }

        if( !auth()->attempt($request->only('email', 'password')) ) {
            return response()->json([
                'errors' => ['header' => 'Invalid login details'],
            ], 401);
        }

        return response()->json([
            'fname' => auth()->user()->fname,
            'lname' => auth()->user()->lname,
            'email' => auth()->user()->email,
        ]);
    }
}
