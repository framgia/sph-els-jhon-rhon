<?php

namespace App\Http\Controllers;

use App\Models\Choices;
use App\Models\Lessons;
use App\Models\Words;
use App\Rules\maxWord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class WordsController extends Controller
{
    public function words($lessonId) {
        return Lessons::findOrFail($lessonId)->words->sortByDesc('created_at')->paginate(10);
    }

    public function store(Request $request, $lessonId) {
        $validator = Validator::make($request->all(), [
            'word' => ['required', new maxWord(1)],
            'answer' => ['required', new maxWord(1)],
            'choice2' => ['required', new maxWord(1)],
            'choice3' => ['required', new maxWord(1)],
            'choice4' => ['required', new maxWord(1)],
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $word = Lessons::findOrFail($lessonId)->words()->create(['word' => $request->word]);
        $word->choices()->create(['choice' => $request->answer, 'answer' => true]);
        $word->choices()->create(['choice' => $request->choice2, 'answer' => false]);
        $word->choices()->create(['choice' => $request->choice3, 'answer' => false]);
        $word->choices()->create(['choice' => $request->choice4, 'answer' => false]);

        return response()->json([
            'message' => 'Word and choices added successflly',
        ]);
    }
}
