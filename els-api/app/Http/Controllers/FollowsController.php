<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FollowsController extends Controller
{
    public function follows($id) {
        $user = User::findOrFail($id);
        $isFollowing = $user->followers->find(auth()->user())? true: false;
        $followers = $user->followers->count();
        $following = $user->followings->count();

        return response()->json([
            'isFollowing' => $isFollowing,
            'follows' => compact('followers', 'following'),
        ]);
    }

    public function follow(Request $request, $id) {
        $user = User::findOrFail($id);
        if($request->id === auth()->user()->id) {
            $user->followers()->toggle(auth()->user());

            if(!$user->followers->find(auth()->user())){
                auth()->user()->followsActivities()->where('activitable_id', '=', $id)->delete();

                return response()->json([
                    'message' => 'Unfollowed user successfully',
                ]);
            }

            $user->followsActivitable()->create(['user_id' => auth()->user()->id]);

            return response()->json([
                'message' => 'Followed user successfully',
            ]);
        }

        return response()->json([], Response::HTTP_FORBIDDEN);
    }
}
