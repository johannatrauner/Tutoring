<?php

namespace App\Http\Controllers;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class SubjectController extends Controller
{
    /**
     * Display a listing of the Subjects including the tutors and topics.
     *
     * @return JsonResponse
     */
    public function index () : JsonResponse
    {
        $subjects = Subject::with('topics', 'tutor')->get();
        return response()->json($subjects, 200);
    }

    /**
     * Display a listing of the Subjects for the authenticated tutor.
     *
     * @return JsonResponse
     */
    public function getSubjectsByTutor() : JsonResponse
    {
        $user = Auth()->user();
        $subjects = Subject::with('topics', 'tutor', 'topics.tutoringSessions')
            ->where('tutor_id', $user->id)
            ->get();

        return response()->json($subjects, 200);
    }

    /**
     * Display a specific Subject by ID including its topics and tutoring sessions.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id) : JsonResponse
    {
        $subject = Subject::with('topics', 'topics.tutoringSessions')->find($id);

        return $subject != null
            ? response()->json($subject, 200)
            : response()->json(null, 200);
    }

    /**
     * Save a new Subject.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function save(Request $request) : JsonResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $subject = new Subject([
                'title' => $data['title'],
                'description' => $data['description'],
                'tutor_id' => $user->id,
            ]);
            $subject->save();
            DB::commit();
            return response()->json($subject, 200);
        }catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving subject failed:" . $e->getMessage(), 500);
        }
    }

    /**
     * Update an existing Subject by ID.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id)
    {

        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }
        if(!Gate::allows('own-subject', $subject)) {
            return response()->json(['message' => 'You are not authorized to delete this subject'], 403);
        }

        DB::beginTransaction();
        try {
            $data = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);
            $subject->title = $data['title'];
            $subject->description = $data['description'];
            $subject->save();

            DB::commit();
            return response()->json($subject, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating subject failed:" . $e->getMessage(), 500);
        }


    }

    /**
     * Delete a Subject by ID.
     *
     * @param string $id
     * @return JsonResponse
     */
    public function delete(string $id) : JsonResponse
    {
        $subject = Subject::find($id);
        if(!Gate::allows('own-subject', $subject)) {
            return response()->json(['message' => 'You are not authorized to delete this subject'], 403);
        }
        if ($subject != null) {
            $subject->delete();
            return response()->json("Subject deleted", 200);
        } else {
            return response()->json("Subject not found here", 404);
        }
    }
}
