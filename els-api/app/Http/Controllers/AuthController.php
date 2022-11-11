<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    protected function tokenCreate($user) {
        return $user->createToken('API Token of ' . $user->email)->plainTextToken;
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'fname' => ['required', 'max:255'],
            'lname' => ['required', 'max:255'],
            'email' => ['required', 'unique:users', 'email', 'max:255'],
            'password' => ['required'],
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => 'student',
        ]);

        auth()->attempt($request->only('email', 'password'));

        $user = auth()->user();

        return response()->json([
            'user' => auth()->user(),
            'token' => $this->tokenCreate(auth()->user()),
        ]);
    }

    public function login(Request $request) {
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

        return response()->json([
            'user' => auth()->user(),
            'token' => $this->tokenCreate(auth()->user()),
        ]);
    }

    public function logout() {
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successfully',
        ]);
    }
}
