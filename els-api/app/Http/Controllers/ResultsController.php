<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Choice;
use App\Models\Lesson;
use App\Models\Result;
use App\Models\User;
use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResultsController extends Controller
{
    public function results($lessonId) {
        $user = auth()->user();
        $dbQuery = DB::transaction(function() use ($lessonId, $user)  {
            $lesson = Lesson::findOrFail($lessonId);
            $results = $user->results->where('lessons_id', '=', $lessonId)->firstOrFail();
            $answers = Answer::userAnswersChoice($user->id);
            $words = $lesson->words;

            return compact('lesson', 'results', 'answers', 'words');
        });

        return response()->json($dbQuery);
    }

    public function completed() {
        return auth()->user()->results;
    }

    public function words($id) {
        $user = User::findOrFail($id);
        $answers = Answer::where('user_id', '=', $user->id)->get();
        $learned = [];
        $words = [];

        foreach($answers as $answer) {
            $choice = Choice::where('id','=', $answer->choice_id)->firstOrFail();
            if($choice->answer) {
                array_push($learned, $choice);
                array_push($words, Word::where('id','=', $choice->word_id)->firstOrFail());
            }
        }

        return response()->json([
            'answers'=> collect($learned)->paginate(10),
            'words' => $words,
        ]);
    }

    public function lessons($id) {
        $user = User::findOrFail($id);
        $results = Result::where('user_id', '=', $user->id)->get();
        $lessons = [];

        foreach($results as $result) {
            array_push($lessons, Lesson::where('id', '=', $result->lesson_id)->firstOrFail(['id', 'title']));
        }

        return collect($lessons)->paginate(6);
    }
}
