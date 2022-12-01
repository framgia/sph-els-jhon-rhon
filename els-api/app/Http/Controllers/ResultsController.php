<?php

namespace App\Http\Controllers;

use App\Models\Answers;
use App\Models\Choices;
use App\Models\Lessons;
use App\Models\Results;
use App\Models\User;
use App\Models\Words;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResultsController extends Controller
{
    public function results($lessonId) {
        $user = auth()->user();
        $dbQuery = DB::transaction(function() use ($lessonId, $user)  {
            $lesson = Lessons::findOrFail($lessonId);
            $results = $user->results->where('lessons_id', '=', $lessonId)->firstOrFail();
            $answers = Answers::userAnswersChoice($user->id);
            $words = $lesson->words;

            return compact('lesson', 'results', 'answers', 'words');
        });

        return response()->json($dbQuery);
    }

    public function completed() {
        return Results::where('users_id', '=', auth()->user()->id)->get();
    }

    public function words($id) {
        $user = User::findOrFail($id);
        $answers = Answers::where('users_id', '=', $user->id)->get();
        $learned = [];
        $words = [];

        foreach($answers as $answer) {
            $choice = Choices::where('id','=', $answer->choices_id)->firstOrFail();
            if($choice->answer) {
                array_push($learned, $choice);
                array_push($words, Words::where('id','=', $choice->words_id)->firstOrFail());
            }
        }

        return response()->json([
            'answers'=> collect($learned)->paginate(10),
            'words' => $words,
        ]);
    }
}
