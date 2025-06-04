<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\TutoringSession;
use App\Models\Subject;
use App\Models\Topic;
use Illuminate\Support\Facades\DB;

class TutoringSessionController extends Controller
{
    /**
     * Display one Tutoring Sessions.
     *
     * @return JsonResponse
     */
    public function show($subjectId, $topicId, $sessionId): JsonResponse{
        $session = TutoringSession::with('topic', 'topic.subject')->
        where('start_time', '>', now())
        ->find($sessionId);

        return $session != null
            ? response()->json($session, 200)
            : response()->json(null, 200);
    }

    /**
     * Save a new Tutoring Session.
     * This method is used by tutors to create a new tutoring session under a topic.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function saveMultipleSessions(Request $request): JsonResponse {
        $user = Auth()->user();
        $data = $request->all();

        $data = $request->validate(
            [
                'topic_id'            => 'required|exists:topics,id',
                'sessions'            => 'required|array|min:1',
                'sessions.*.start_time'=> 'required|date',
                'sessions.*.end_time'  => 'required|date|after:sessions.*.start_time',
                'sessions.*.comment'   => 'nullable|string|max:500',
            ],
        );

        DB::beginTransaction();
        try {
            $tutoringSessions = $data['sessions'];
            $topicId = $data['topic_id'];
            $topic = Topic::with('subject')->find($topicId);

            foreach ($tutoringSessions as $session) {
                $newSession = new TutoringSession([
                    'id' => $session['id'] ?? null,
                    'tutor_id' => $user->id,
                    'topic_id' => $topicId,
                    'status' => 'offering',
                    'start_time' => $session['start_time'],
                    'end_time' => $session['end_time'],
                    'comment' => $session['comment'],
                ]);
                $newSession->save();
            }
            DB::commit();
            return response()->json($topic, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("creating sessions failed: " . $e->getMessage(), 500);
        }
    }

    /**
     * Get multiple Tutoring Sessions for a specific topic.
     *
     * @param int $subjectId
     * @param int $topicId
     * @return JsonResponse
     */
    public function getMultipleSessions($subjectId, $topicId): JsonResponse {
        $user = Auth()->user();
        $sessions = TutoringSession::with('topic')
            ->where('topic_id', $topicId)
            ->where('status', 'offering')
            ->where('start_time', '>', now())
            ->get();

        $topic = Topic::with('subject')->find($topicId);
        $subject = Subject::find($subjectId);

        $sessionsCollection = [
            'tutoring_sessions' => $sessions ?? [],
            'subject_id' => $subjectId,
            'subject' => $subject,
            'topic_id' => $topicId,
            'topic' => $topic,
        ];

        return response()->json($sessionsCollection, 200);
    }

    /**
     * Update multiple Tutoring Sessions for a specific topic.
     * Delete the existing sessions for the topic and create new ones based on the provided data.
     * Only sessions with a start time in the future are considered & which are in the status 'offering' are deleted.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateSessions(Request $request): JsonResponse {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $subjectId = $data['subject_id'] ?? null;
            $topicId = $data['topic_id'] ?? null;

            TutoringSession::where('topic_id', $topicId)
                ->where('start_time', '<', now())
                ->where('status', 'offering')
                ->delete();

            foreach ($data['sessions'] as $sessionData) {
                    TutoringSession::create([
                        'tutor_id' => $request->user()->id ?? 1, // fallback für dev
                        'topic_id' => $topicId,
                        'status' =>  'offering',
                        'start_time' => $sessionData['start_time'],
                        'end_time' => $sessionData['end_time'],
                        'comment' => $sessionData['comment'] ?? ''
                    ]);
            }
            DB::commit();
            $updatedSessions = TutoringSession::with('topic')->where('topic_id', $topicId)->get();

            return response()->json([
                'tutoring_sessions' => $updatedSessions,
                'subject_id' => $subjectId,
                'topic_id' => $topicId
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating session failed: " . $e->getMessage(), 500);
        }
    }


    /**
     * Book a Tutoring Session.
     * This method is used by seekers to book a tutoring session.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function bookSession(int $id) : JsonResponse {

        $user = Auth()->user();
        $session = TutoringSession::find($id);

        if (!$session) {
            return response()->json(['message' => 'Session not found'], 404);
        }

        $session->seeker_id = $user->id;
        $session->status = 'booked';
        $session->save();

        return response()->json($session, 200);
    }
}
