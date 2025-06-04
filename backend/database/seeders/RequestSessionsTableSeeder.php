<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RequestSession;



class RequestSessionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $request1 = new RequestSession();
        $request1->tutor_id = 1;
        $request1->seeker_id = 2;
        $request1->topic_id = 1;
        $request1->status = 'requested';
        $request1->comment = 'Ich brauche Hilfe bei der Erstellung einer Content Strategie für meine Website.';
        $request1->start_time = '2023-10-01 10:00:00';
        $request1->end_time = '2023-10-01 11:00:00';
        $request1->save();

        $request2 = new RequestSession();
        $request2->tutor_id = 3;
        $request2->seeker_id = 4;
        $request2->topic_id = 2;
        $request2->status = 'accepted';
        $request2->comment = 'Ich brauche Hilfe bei der Erstellung einer Content Strategie für meine Website.';
        $request2->start_time = '2023-10-02 14:00:00';
        $request2->end_time = '2023-10-02 15:00:00';
        $request2->save();

        $request3 = new RequestSession();
        $request3->tutor_id = 4;
        $request3->seeker_id = 1;
        $request3->topic_id = 3;
        $request3->status = 'rejected';
        $request3->comment = 'Ich brauche Hilfe bei der Erstellung einer Content Strategie für meine Website.';
        $request3->start_time = '2023-10-03 16:00:00';
        $request3->end_time = '2023-10-03 17:00:00';
        $request3->save();
    }
}
