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
    Route::post('/admin/categories/add', [LessonsController::class, 'store']);
    Route::get('/categories', [LessonsController::class, 'view']);
});
