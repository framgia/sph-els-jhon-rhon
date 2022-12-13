<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

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

    public function getProfileEdit($id) {
        return User::findOrFail($id);
    }

    public function updateProfile(Request $request, $id) {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'fname' => ['required', 'max:255'],
            'lname' => ['required', 'max:255'],
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $user->update($request->only(['fname', 'lname']));

        return response()->json([
            'message' => 'Profile updated successfully',
        ]);
    }
}
