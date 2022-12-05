<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Choice;
use App\Models\Lesson;
use App\Models\Result;
use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnswerController extends Controller
{
    public function store(Request $request, $lessonsId) {
        $data = $request->answers;

        $result = [
            'user_id' => auth()->user()->id,
            'lesson_id' => $lessonsId,
            'total' => collect($data)->count(),
            'score' => 0,
        ];

        foreach($data as $value) {
            if(Choice::findOrFail($value['choice_id'])->answer) {
                $result['score'] += 1;
            }
        }

        DB::transaction(function() use ($data, $result)  {
            Answer::upsert($data, ['user_id', 'word_id']);
            Result::upsert($result, ['user_id', 'lesson_id']);

            $results = Result::where('user_id', '=', $result['user_id'])->where('lesson_id', '=', $result['lesson_id'])->firstOrFail();

            $results->activities()->create(['user_id' => auth()->user()->id]);
        });

        return response()->json([
            'message' => 'Answers saved successflly.',
        ]);
    }
}
