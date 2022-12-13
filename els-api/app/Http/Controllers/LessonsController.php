<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class LessonsController extends Controller
{
    public function lesson($id) {
        return Lesson::findOrFail($id);
    }

    public function lessons() {
        $lessons = Lesson::latest()->paginate(6);

        return response()->json([
            'lessons' => $lessons,
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'max:255'],
            'description' => ['required'],
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], Response::HTTP_BAD_REQUEST);
        }

        Lesson::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Lesson added successfully',
        ]);
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'max:255'],
            'description' => ['required'],
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], Response::HTTP_BAD_REQUEST);
        }

        Lesson::findOrFail($id)->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Lesson updated successfully',
        ]);
    }

    public function destroy(Request $request, $id) {
        Lesson::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Lesson deleted successfully',
        ]);
    }
}
