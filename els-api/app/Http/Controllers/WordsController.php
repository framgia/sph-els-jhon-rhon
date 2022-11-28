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
    public function word($id) {
        $word = Words::findOrFail($id);

        $data = [
            'word' => $word,
        ];
        $choiceStart = 2;

        foreach($word->choices as $value) {
            if($value->answer) {
                $data['answer'] = $value;
                continue;
            }

            $data['choice'.$choiceStart] = $value;
            $choiceStart+=1;
        }

        return response()->json([
            'data' => $data,
        ]);

    }

    public function words($lessonId) {
        $lesson = Lessons::findOrFail($lessonId);

        return response()->json([
            'lesson' => $lesson,
            'words' => $lesson->words,
        ]);
    }

    public function allWords() {
        return Words::all();
    }

    public function adminWords($lessonId) {
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
        $choices = [
            ['id' => null, 'words_id' => $word->id, 'choice' => $request->answer, 'answer' => true],
            ['id' => null, 'words_id' => $word->id, 'choice' => $request->choice2, 'answer' => false],
            ['id' => null, 'words_id' => $word->id, 'choice' => $request->choice3, 'answer' => false],
            ['id' => null, 'words_id' => $word->id, 'choice' => $request->choice4, 'answer' => false],
        ];

        Choices::upsert($choices, ['id']);

        return response()->json([
            'message' => 'Word and choices added successflly',
        ]);
    }

    public function update(Request $request, $id) {
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

        Words::findOrFail($id)->update(['word' => $request->word]);
        $choicesId = ($request->choicesId)? $request->choicesId : [];

        $choices = [
            ['id' => array_key_exists('answer', $choicesId)? $choicesId['answer']: null, 'words_id' => $id,  'choice' => $request->answer, 'answer' => true],
            ['id' => array_key_exists('choice2', $choicesId)? $choicesId['choice2']: null, 'words_id' => $id,  'choice' => $request->choice2, 'answer' => false],
            ['id' => array_key_exists('choice3', $choicesId)? $choicesId['choice3']: null, 'words_id' => $id,  'choice' => $request->choice3, 'answer' => false],
            ['id' => array_key_exists('choice4', $choicesId)? $choicesId['choice4']: null, 'words_id' => $id,  'choice' => $request->choice4, 'answer' => false],
        ];

        Choices::upsert($choices, ['id'], ['choice']);

        return response()->json([
            'message' => 'Word and choices updated successflly',
        ]);
    }

    public function destroy($id) {
        Words::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Word deleted successfully',
        ]);
    }
}
