<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subject1 = new Subject();
        $subject1->title = 'Content Strategie';
        $subject1->description = 'Content Strategie ist ein Planungsprozess zur Erstellung und Verbreitung zielgruppenspezifischer Inhalte. Sie hilft dabei, Markenbotschaften effektiv zu kommunizieren und Nutzer langfristig zu binden.';
        $subject1->tutor_id = 1;
        $subject1->save();

        $subject2 = new Subject();
        $subject2->title = 'Programmierung';
        $subject2->description = 'Objekt-orientierte Programmierung nutzt Klassen und Objekte, um Code modular und wartbar zu gestalten. So lassen sich komplexe Softwareprojekte effizient strukturieren und erweitern.';
        $subject2->tutor_id = 3;
        $subject2->save();

        $subject3 = new Subject();
        $subject3->title = 'Kameraeinstellung';
        $subject3->description = 'Kameraeinstellungen wie Blende, Verschlusszeit und ISO bestimmen Bildhelligkeit und Schärfentiefe. Mit dem richtigen Weißabgleich und Fokusmodus erzielst du stets natürliche Farben und gestochen scharfe Bilder.';
        $subject3->tutor_id = 4;
        $subject3->save();

        $subject4 = new Subject();
        $subject4->title = 'Unternehmenskommunikation';
        $subject4->description = 'Unternehmenskommunikation umfasst alle internen und externen Kommunikationsprozesse eines Unternehmens. Sie dient der Informationsweitergabe, Imagepflege und Stakeholder-Interaktion, um Vertrauen und Transparenz zu schaffen.';
        $subject4->tutor_id = 1;
        $subject4->save();
    }
}
