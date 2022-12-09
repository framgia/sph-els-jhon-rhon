<?php

namespace App\Http\Controllers;

use App\Models\Activities;
use App\Models\Lesson;
use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivitiesController extends Controller
{
    public function getActivitiesData($activities) {
        $returnedActivities = $activities->map(function($activity) {
            $activityUser = User::find($activity->user_id);
            $instanceValue = $activity->activitable_type::where('id', '=', $activity->activitable_id)->first();

            if($activity->activitable_type === Result::class) {
                return [
                    'type' => 'result',
                    'user' => $activityUser,
                    'result' => $instanceValue,
                    'lesson' => $instanceValue->lesson,
                    'created_at' => $activity->created_at,
                ];
            }
            if($activity->activitable_type === User::class) {
                return [
                    'type' => 'follow',
                    'user' => $activityUser,
                    'followedUser' => $instanceValue,
                    'created_at' => $activity->created_at,
                ];
            }
        });

        return $returnedActivities;
    }

    public function userActivities($id) {
        $user = User::findOrFail($id);
        $activities = $user->activities;

        $user->userFollowingsActivities()->map(function($activity) use ($activities) {
            $activities->push($activity->first());
        });

        $allActivities = $this->getActivitiesData($activities);

        return $allActivities->paginate(6);
    }

    public function profileActivities($id) {
        $user = User::findOrFail($id);
        return $this->getActivitiesData($user->activities)->paginate(6);
    }
}
