<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LessonsController;
use App\Http\Controllers\WordsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/categories', [LessonsController::class, 'lessons']);
    Route::get('/categories/{id}', [LessonsController::class, 'lesson']);
    Route::get('/categories/words/{id}', [WordsController::class, 'word']);
    Route::get('/categories/{lessonId}/words', [WordsController::class, 'words']);
});

//Admin routes
Route::group(['middleware' => ['auth:sanctum', 'auth.admin']], function () {
    Route::post('/admin/categories/add', [LessonsController::class, 'store']);
    Route::put('/admin/categories/{id}/edit', [LessonsController::class, 'update']);
    Route::post('/admin/categories/{id}/delete', [LessonsController::class, 'destroy']);
    Route::post('/admin/categories/{lessonId}/words/add', [WordsController::class, 'store']);
    Route::put('/admin/categories/words/{id}/edit', [WordsController::class, 'update']);
    Route::post('/admin/categories/words/{id}/delete', [WordsController::class, 'destroy']);
});
