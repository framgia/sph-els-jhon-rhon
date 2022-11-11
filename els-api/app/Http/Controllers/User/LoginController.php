<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], Response::HTTP_BAD_REQUEST);
        }

        if(!auth()->attempt($request->only('email', 'password'))) {
            return response()->json([
                'errors' => ['header' => 'Invalid login details'],
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = auth()->user();

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('API Token of ' . $user->email)->plainTextToken,
        ]);
    }
}
