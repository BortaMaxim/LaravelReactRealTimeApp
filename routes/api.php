<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'auth', 'middleware' => 'cors'], function ($route) {
    Route::post('registration', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
    Route::get('email/verify/{id}/{hash}', [UserController::class, 'verify'])
        ->middleware(['signed', 'throttle'])
        ->name('verification.verify');
    Route::post('password/forgot-password', [UserController::class, 'send_reset_link_email_response'])
        ->middleware('guest')->name('password.email');
    Route::get('password/reset/{token}', [UserController::class, 'reset_password'])
        ->middleware('guest')->name('password.reset');
    Route::get('password-reset-token', [UserController::class, 'password_reset_token']);
    Route::post('update-password', [UserController::class, 'send_reset_response'])
        ->middleware('guest')->name('password.update');

    Route::group(['middleware' => 'auth:api'], function ($route) {
        Route::get('profile', [UserController::class, 'profile']);
        Route::post('profile/update', [UserController::class, 'updateProfile']);
        Route::get('logout', [UserController::class, 'logout']);
    });
});


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
