<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Topic;
use Illuminate\Support\Facades\DB;

class TopicController extends Controller
{

    /**
     * Display a listing of the Topics including their subjects and tutoring sessions.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $topics = Topic::with('subject', 'tutoringSessions')->get();
        return response()->json($topics, 200);
    }

    /*public function getTopicsBySubject($subjectId)
    {
        $topics = Topic::with('subject', 'tutoringSessions')
            ->where('subject_id', $subjectId)
            ->get();

        return response()->json($topics, 200);
    }*/

    /**
     * Display a specific Topic by ID including its subject and tutoring sessions.
     *
     * @param int $subjectId
     * @param int $topicId
     * @return JsonResponse
     */
    public function show($subjectId, $topicId): JsonResponse
    {
        $topic = Topic::with(['subject', 'tutoringSessions'])
            ->where('id', $topicId)
            ->first();

        return $topic != null
            ? response()->json($topic, 200)
            : response()->json(null, 200);
    }

    /**
     * Save a new Topic.
     * This method is used by tutors to create a new topic under a subject.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function save(Request $request): JsonResponse
    {
        //Laravel's validation will handle the request data
        //422 Unprocessable Entity if validation fails
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'subject_id' => 'required|integer|exists:subjects,id',
        ]);

        $topic = new Topic([
            'title' => $data['title'],
            'description' => $data['description'],
            'subject_id' => $data['subject_id'],
        ]);

        $topic->save();
        return response()->json($topic, 200);
    }

    /**
     * Update an existing Topic.
     * This method is used by tutors to update a topic's details.
     *
     * @param Request $request
     * @param int $topicId
     * @return JsonResponse
     */
    public function update(Request $request, $topicId): JsonResponse
    {
        $topic = Topic::find($topicId);
        if (!$topic) {
            return response()->json(['message' => 'Topic not found'], 404);
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $topic->title = $data['title'];
        $topic->description = $data['description'];
        $topic->save();

        return response()->json($topic, 200);

    }

    /**
     * Delete a Topic by ID.
     * This method is used by tutors to delete a topic.
     *
     * @param string $id
     * @return JsonResponse
     */
    public function delete(string $id): JsonResponse
    {
        $topic = Topic::find($id);
        if ($topic != null) {
            $topic->delete();
            return response()->json("Topic deleted", 200);
        } else {
            return response()->json("Topic not found", 404);
        }
    }

}
