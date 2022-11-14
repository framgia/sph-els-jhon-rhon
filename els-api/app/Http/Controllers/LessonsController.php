<?php

namespace App\Http\Controllers;

use App\Models\Lessons;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class LessonsController extends Controller
{
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
}
