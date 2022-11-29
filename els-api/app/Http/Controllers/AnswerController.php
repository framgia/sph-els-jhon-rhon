<?php

namespace App\Http\Controllers;

use App\Models\Answers;
use App\Models\Choices;
use App\Models\Lessons;
use App\Models\Results;
use App\Models\Words;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function store(Request $request, $lessonsId) {
        $data = [];
        foreach($request->answers as $value) {
            array_push($data, [
                'users_id' => auth()->user()->id,
                'words_id' => $value['words_id'],
                'choices_id' => $value['answer'],
            ]);
        }
        $result = [
            'users_id' => auth()->user()->id,
            'lessons_id' => $lessonsId,
            'total' => collect($data)->count(),
            'score' => 0,
        ];

        foreach($data as $value) {
            if(Choices::findOrFail($value['choices_id'])->answer) {
                $result['score'] += 1;
            }
        }

        Answers::upsert($data, ['users_id', 'words_id']);
        Results::upsert($result, ['users_id', 'lessons_id']);

        return response()->json([
            'message' => 'Answers saved successflly.',
        ]);
    }
}
