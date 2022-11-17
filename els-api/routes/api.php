<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LessonsController;
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
});

//Admin routes
Route::group(['middleware' => ['auth:sanctum', 'auth.admin']], function () {
    Route::post('/admin/categories/add', [LessonsController::class, 'store']);
    Route::post('/admin/categories/{id}/edit', [LessonsController::class, 'update']);
});
