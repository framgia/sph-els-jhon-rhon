<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChoicesController;
use App\Http\Controllers\LessonsController;
use App\Http\Controllers\ResultsController;
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


    //Categories
    Route::prefix('categories')->group(function () {
        Route::get('/', [LessonsController::class, 'lessons']);
        Route::get('/words', [WordsController::class, 'allWords']);
        Route::get('/{id}', [LessonsController::class, 'lesson']);
        Route::get('/words/{id}', [WordsController::class, 'word']);
        Route::get('/words/{id}/choices', [ChoicesController::class, 'choices']);
        Route::get('/{lessonId}/words', [WordsController::class, 'words']);
        Route::post('/{lessonId}/answers', [AnswerController::class, 'store']);
        Route::get('/{lessonId}/results', [ResultsController::class, 'results']);
        Route::get('/results/completed', [ResultsController::class, 'completed']);
    });

    //User learned
    Route::prefix('{id}/learned')->group(function () {
        Route::get('/words', [ResultsController::class, 'words']);
    });

    //Profile
    Route::prefix('profile')->group(function () {
        Route::get('/{id}', [ProfileController::class, 'profile']);
    });
});

//Admin routes
Route::group(['middleware' => ['auth:sanctum', 'auth.admin']], function () {
    //Categories
    Route::prefix('admin/categories', )->group(function () {
        Route::post('/add', [LessonsController::class, 'store']);
        Route::put('/{id}/edit', [LessonsController::class, 'update']);
        Route::post('/{id}/delete', [LessonsController::class, 'destroy']);
        Route::get('/{lessonId}/words', [WordsController::class, 'adminWords']);
        Route::post('/{lessonId}/words/add', [WordsController::class, 'store']);
        Route::put('/words/{id}/edit', [WordsController::class, 'update']);
        Route::post('/words/{id}/delete', [WordsController::class, 'destroy']);
    });
});
