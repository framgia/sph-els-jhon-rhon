<?php

namespace App\Http\Controllers;

use App\Models\Answers;
use App\Models\Choices;
use App\Models\Lessons;
use App\Models\Results;
use Illuminate\Console\View\Components\Choice;
use Illuminate\Http\Request;

class ResultsController extends Controller
{
    public function results($lessonId) {
        $user = auth()->user();
        $lesson = Lessons::findOrFail($lessonId);
        $results = Results::where('users_id', '=', $user->id)
            ->where('lessons_id', '=', $lessonId)
            ->firstOrFail();
        $words = $lesson->words;
        $answers = [];

        foreach($words as $word) {
            array_push($answers, Choices::where('id','=',
                Answers::where('users_id', '=', $user->id)->where('words_id', '=', $word->id)->firstOrFail()->choices_id)
                ->firstOrFail()
            );
        }

        return response()->json([
            'lesson' => $lesson,
            'results' => $results,
            'words' => $words,
            'answers' => $answers,
        ]);
    }

    public function completed() {
        return Results::all();
    }
}
