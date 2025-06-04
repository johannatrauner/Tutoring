<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{

    public function index() {
        $users = User::with('subjects')->get();
        return response()->json($users, 200);
    }

     public function show($id) {
         $user = User::with('subjects')->find($id);
         return $user != null
             ? response()->json($user, 200)
             : response()->json(null, 200);
     }

    public function profile(): JsonResponse
    {
        $user = Auth::user();

        $relations = [
            'subjects',
            'subjects.topics',
            'subjects.topics.tutoringSessions' => function ($query) {
                $query->where('start_time', '>', now());
            },
        ];

        if ($user->role === 'tutor') {
            $relations = [...$relations, 'tutorSessions', 'tutorSessions.topic', 'tutorSessions.seeker', 'tutorRequests' => function ($query) {
                $query->where('start_time', '>', now());
            }, 'tutorRequests.seeker'];
        } else {
            $relations = [...$relations, 'seekerSessions', 'seekerSessions.topic', 'seekerSessions.tutor'];
        }

        $userInformation = User::with($relations)->find($user->id);

        return response()->json($userInformation, 200);
    }


    public function allTutors() {
        $tutors = User::with('subjects', 'subjects.topics', 'tutorSessions')
            ->where('role', 'tutor')
            ->get();

        return $tutors != null
            ? response()->json($tutors, 200)
            : response()->json(null, 200);
    }
}
