<?php

namespace App\Http\Controllers;

use App\Models\TutoringSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\RequestSession;
use App\Models\Topic;
use Illuminate\Support\Facades\DB;


class RequestSessionController extends Controller
{

    /**
     * Display a listing of the requested Sessions.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $user = auth()->user();
        $requestSessions = RequestSession::with('topic', 'topic.subject.tutor')->where('seeker_id', $user->id)->get();
        return $requestSessions != null
            ? response()->json($requestSessions, 200)
            : response()->json(null, 200);
    }

    /**
     * Saves a new request session.
     * This method is used by seekers to request a tutoring session.
     * Get the topic for the request, then create a new RequestSession.
     *
     * @return JsonResponse
     */
    public function save(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $topic = Topic::with([
            'subject',
            'subject.tutor'
        ])->find($request['topic_id']);

        $data = $request->all();

        DB::beginTransaction();
        try {
            $requestSession = new RequestSession([
                'tutor_id' => $topic->subject->tutor->id,
                'seeker_id' => $user->id,
                'topic_id' => $data['topic_id'],
                'status' => 'requested',
                'comment' => $data['comment'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
            ]);
            $requestSession->save();
            DB::commit();
            return response()->json($requestSession, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Anfrage stellen ist leider fehlgeschalgen " . $e->getMessage(), 500);
        }
    }

    /**
     * Accepts a request session.
     * This method is used by tutors to accept a request from a seeker.
     * After accepting, a TutoringSession is created.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function accept(Request $request, $id): JsonResponse
    {
        $requestSession = RequestSession::with('topic', 'topic.subject')->find($id);
        if (!$requestSession) {
            return response()->json(['message' => 'Request session not found'], 200);
        }
        if ($requestSession->tutor_id != $request->user()->id) {
            return response()->json(['message' => 'You are not authorized to accept this request'], 200);
        }

        DB::beginTransaction();
        try {
            $requestSession->status = 'accepted';
            $requestSession->save();
            DB::commit();

            //create a tutoring session
            $tutoringSession = new TutoringSession([
                'tutor_id' => $requestSession->tutor_id,
                'seeker_id' => $requestSession->seeker_id,
                'topic_id' => $requestSession->topic_id,
                'start_time' => $requestSession->start_time,
                'end_time' => $requestSession->end_time,
                'status' => 'booked',
            ]);
            $tutoringSession->save();
            return response()->json($requestSession, 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Accepting request failed: " . $e->getMessage(), 500);
        }
    }

    /**
     * Rejects a request session.
     * This method is used by tutors to reject a request from a seeker.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function reject(Request $request, $id): JsonResponse
    {
        $requestSession = RequestSession::with('topic', 'topic.subject.tutor')->find($id);
        if (!$requestSession) {
            return response()->json("Session not found", 404); //422 for unprocessable entity
        }
        if ($requestSession->tutor_id != $request->user()->id) {
            return response()->json(['message' => 'You are not authorized to reject this request'], 403);
        }

        DB::beginTransaction();
        try {
            $requestSession->status = 'rejected';
            $requestSession->save();
            DB::commit();
            return response()->json($requestSession, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Rejecting request failed: " . $e->getMessage(), 420);
        }
    }
}
