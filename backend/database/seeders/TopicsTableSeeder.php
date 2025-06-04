<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Topic;

class TopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $topic1 = new Topic();
        $topic1->title = 'Instapost erstellen';
        $topic1->description = 'Lerne, wie du einen Beitrag auf Instagram erstellst.';
        $topic1->subject_id = 1;
        $topic1->save();

        $topic2 = new Topic();
        $topic2->title = 'Instastory erstellen';
        $topic2->description = 'Anleitung zur Erstellung einer Instagram Story.';
        $topic2->subject_id = 1;
        $topic2->save();

        $topic3 = new Topic();
        $topic3->title = 'Auf Instagram erfolgreich werden';
        $topic3->description = 'Strategien, um auf Instagram mehr Reichweite zu erzielen.';
        $topic3->subject_id = 1;
        $topic3->save();

        $topic4 = new Topic();
        $topic4->title = 'Instagram Algorithmus verstehen';
        $topic4->description = 'Einblick in die Funktionsweise des Instagram Algorithmus.';
        $topic4->subject_id = 1;
        $topic4->save();

        $topic5 = new Topic();
        $topic5->title = 'Basics Programmierung';
        $topic5->description = 'Grundlagen und erste Schritte beim Programmieren.';
        $topic5->subject_id = 2;
        $topic5->save();

        $topic6 = new Topic();
        $topic6->title = 'Objektorientierte Programmierung';
        $topic6->description = 'Verständnis für Klassen, Objekte und OOP-Konzepte entwickeln.';
        $topic6->subject_id = 2;
        $topic6->save();

        $topic7 = new Topic();
        $topic7->title = 'Funktionale Programmierung';
        $topic7->description = 'Lerne den funktionalen Programmierstil und seine Prinzipien kennen.';
        $topic7->subject_id = 2;
        $topic7->save();

        $topic8 = new Topic();
        $topic8->title = 'Einführung in Java';
        $topic8->description = 'Grundlagen der Programmiersprache Java verständlich erklärt.';
        $topic8->subject_id = 2;
        $topic8->save();
    }
}
