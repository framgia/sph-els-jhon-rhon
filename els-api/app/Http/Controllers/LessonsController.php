<?php

namespace App\Http\Controllers;

use App\Models\Lessons;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class LessonsController extends Controller
{
    public function view($id = null) {
        $lessons = Lessons::orderBy('created_at', 'desc')->get();
        $lesson = Lessons::find($id);

        if($id && !$lesson) {
            return response()->json([
                'errors' => ['header' => 'Lesson not found'],
            ], Response::HTTP_NOT_FOUND);
        }

        if($lesson) {
            return response()->json([
                'lesson' => $lesson,
            ]);
        }

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

        if(!(auth()->user()->type === 'admin')) {
            return response()->json([
                'errors' => ['header' => 'Administrative Privileges Required'],
            ], Response::HTTP_UNAUTHORIZED);
        }

        Lessons::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Lesson added successfully',
        ]);
    }

    public function update(Request $request, $lessonId) {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'max:255'],
            'description' => ['required'],
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], Response::HTTP_BAD_REQUEST);
        }

        if(!(auth()->user()->type === 'admin')) {
            return response()->json([
                'errors' => ['header' => 'Administrative Privileges Required'],
            ], Response::HTTP_UNAUTHORIZED);
        }

        $lesson = Lessons::find($lessonId);

        if(!$lesson) {
            return response()->json([
                'errors' => ['header' => 'Lesson not found'],
            ], Response::HTTP_NOT_FOUND);
        }

        $lesson->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Lesson updated successfully',
        ]);

    }
}
