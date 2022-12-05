<?php

namespace App\Http\Controllers;

use App\Models\Activities;
use App\Models\Lessons;
use App\Models\Results;
use App\Models\User;
use Illuminate\Http\Request;

class ActivitiesController extends Controller
{
    public function activities($id) {
        $activities = User::findOrFail($id)->activities;
        $returnActivities = [];

        foreach($activities as $activity) {
            if($activity->activitable_type === Results::class) {
                $result = $activity->activitable_type::where('id', '=', $activity->activitable_id)->firstOrFail();
                array_push($returnActivities, [
                    'type' => 'result',
                    'user' => User::findOrFail($activity->user_id),
                    'result' => $result,
                    'lesson' => Lessons::where('id', '=', $result->lessons_id)->firstOrFail(),
                    'created_at' => $activity->created_at,
                ]);
            }
        }

        return collect($returnActivities)->sortByDesc('created_at')->paginate(6);
    }
}
