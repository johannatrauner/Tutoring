<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\TutoringSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RequestSessionController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Everybody can use this routes*/
Route::get('/', [SubjectController::class, 'index']);
Route::get('/subjects', [SubjectController::class, 'index']);
Route::get('/subjects/{id}', [SubjectController::class, 'show']);
Route::get('/subjects/{subjectId}/topics', [TopicController::class, 'index']);
Route::get('/subjects/{subjectId}/topics/{topicId}/sessions/{sessionId}', [TutoringSessionController::class, 'show']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/tutors', [UserController::class, 'allTutors']);
Route::get('/subjects/{subjectId}/topics/{topicId}', [TopicController::class, 'show']);
Route::get('/subjects/{subjectId}/topics/{topicId}/sessions', [TutoringSessionController::class, 'getMultipleSessions']);


/*Only authenticated user can use this route*/
Route::group(['middleware' => ['api', 'auth.jwt']], function () {
    Route::get('/profile', [UserController::class, 'profile']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/requestsessions', [RequestSessionController::class, 'index']);
});

/*Only tutors user can use this routes*/
Route::group(['middleware' => ['api', 'auth.jwt', 'tutor']], function () {
    /*subjects*/
    Route::post('/save-subject', [SubjectController::class, 'save']);
    Route::put('/update-subject/{id}', [SubjectController::class, 'update']);
    Route::delete('/delete-subject/{id}', [SubjectController::class, 'delete']);

    /*topics*/
    Route::post('/save-topic', [TopicController::class, 'save']);
    Route::put('/update-topic/{topicId}', [TopicController::class, 'update']);
    Route::delete('/delete-topic/{topicId}', [TopicController::class, 'delete']);

    /*tutoring sessions*/
    Route::put('/update-multiple-sessions', [TutoringSessionController::class, 'updateSessions']);
    Route::post('save-multiple-sessions', [TutoringSessionController::class, 'saveMultipleSessions']);
    Route::get('tutor-subjects', [SubjectController::class, 'getSubjectsByTutor']);

    /*request sessions*/
    Route::post('/accept-session-request/{id}', [RequestSessionController::class, 'accept']);
    Route::post('/reject-session-request/{id}', [RequestSessionController::class, 'reject']);
});

/*Only seeker user can use this routes*/
Route::group(['middleware' => ['api', 'auth.jwt', 'seeker']], function () {
    //request sessions
    Route::post('/save-requestsession', [RequestSessionController::class, 'save']);
    Route::post('/book-session/{id}', [TutoringSessionController::class, 'bookSession']);
});


