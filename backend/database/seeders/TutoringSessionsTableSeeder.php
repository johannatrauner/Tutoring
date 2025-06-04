<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TutoringSession;

class TutoringSessionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*Past Sessions*/
        $tutorSession1 = new TutoringSession();
        $tutorSession1->topic_id = 1;
        $tutorSession1->tutor_id = 1;
        $tutorSession1->seeker_id = 2;
        $tutorSession1->start_time = '2025-02-01 10:00:00';
        $tutorSession1->end_time = '2025-02-01 11:00:00';
        $tutorSession1->status = 'booked';
        $tutorSession1->save();

        $tutorSession2 = new TutoringSession();
        $tutorSession2->topic_id = 1;
        $tutorSession2->tutor_id = 1;
        $tutorSession1->seeker_id = 2;
        $tutorSession2->start_time = '2025-03-02 10:00:00';
        $tutorSession2->end_time = '2025-03-02 11:00:00';
        $tutorSession2->status = 'booked';
        $tutorSession2->save();

        $tutorSession3 = new TutoringSession();
        $tutorSession3->topic_id = 1;
        $tutorSession3->tutor_id = 1;
        $tutorSession3->start_time = '2025-10-03 10:00:00';
        $tutorSession3->end_time = '2025-10-03 11:00:00';
        $tutorSession3->status = 'offering';
        $tutorSession3->save();

        $tutorSession4 = new TutoringSession();
        $tutorSession4->topic_id = 1;
        $tutorSession4->tutor_id = 1;
        $tutorSession4->start_time = '2025-10-01 10:00:00';
        $tutorSession4->end_time = '2025-10-01 11:00:00';
        $tutorSession4->status = 'offering';
        $tutorSession4->save();

        $tutorSession5 = new TutoringSession();
        $tutorSession5->topic_id = 1;
        $tutorSession5->tutor_id = 1;
        $tutorSession5->start_time = '2025-10-02 10:00:00';
        $tutorSession5->end_time = '2025-10-02 11:00:00';
        $tutorSession5->status = 'offering';
        $tutorSession5->save();

        $tutorSession6 = new TutoringSession();
        $tutorSession6->topic_id = 1;
        $tutorSession6->tutor_id = 1;
        $tutorSession6->seeker_id = 2;
        $tutorSession6->start_time = '2025-02-02 10:00:00';
        $tutorSession6->end_time = '2025-02-02 11:00:00';
        $tutorSession6->status = 'booked';
        $tutorSession6->save();

    }
}
