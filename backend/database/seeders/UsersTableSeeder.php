<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = new User();
        $user1->first_name = 'Sophia';
        $user1->last_name = 'Bauer';
        $user1->email = 'sophiabauer@diesdas.at';
        $user1->password = bcrypt('password');
        $user1->phone = '+43123456789';
        $user1->study_program = 'Kommunikation, Wissen, Medien';
        $user1->role = 'tutor';
        $user1->description = 'Ich bin leidenschaftliche Programmiererin mit viel Erfahrung in PHP, JavaScript und modernen Webframeworks. Mir macht es große Freude, komplexe technische Zusammenhänge auf verständliche Weise zu erklären und dabei jedem Lernenden individuell zu helfen, seine Stärken auszubauen. In meiner Freizeit halte ich regelmäßig Workshops an der Hochschule, leite Coding-Communities und entwickle Open-Source-Projekte, weil ich davon überzeugt bin, dass kollaboratives Lernen der Schlüssel zum Erfolg ist. Als Tutor lege ich großen Wert auf geduldige und praxisnahe Erklärungen, damit du nicht nur den Stoff verstehst, sondern auch direkt mit Freude anwenden kannst.';
        $user1->save();

        $user2 = new User();
        $user2->first_name = 'Max';
        $user2->last_name = 'Mustermann';
        $user2->email = 'maxmustermann@diesdas.at';
        $user2->password = bcrypt('password');
        $user2->phone = '+43123456789';
        $user2->study_program = 'Software Engineering';
        $user2->role = 'seeker'; // tutor, seeker
        $user2->description = 'Ich studiere Software Engineering im dritten Semester und merke, dass ich in den Fächern Algorithmen und Datenstrukturen sowie objektorientierte Programmierung noch Schwierigkeiten habe. Mir ist wichtig, nicht nur die Theorie zu verstehen, sondern auch praktische Beispiele umzusetzen. Daher suche ich einen geduldigen Tutor, der mir hilft, komplexe Konzepte zu durchdringen und mich beim Erstellen eigener Projekte zu unterstützen. Am liebsten würde ich wöchentliche Treffen vereinbaren, in denen Konzeption, Code-Reviews und kleine Übungen anstehen, damit ich sicher in meinen Klausuren werde und langfristig Spaß am Programmieren behalte.';
        $user2->save();

        $user3 = new User();
        $user3->first_name = 'Erika';
        $user3->last_name = 'Mayr';
        $user3->email = 'erikamayr@diesdas.at';
        $user3->password = bcrypt('password');
        $user3->phone = '+43123456789';
        $user3->study_program = 'Software Engineering';
        $user3->role = 'tutor'; // tutor, seeker
        $user3->description = 'Ich bin Software Engineering Studentin mit über fünf Jahren Erfahrung als Nachhilfelehrerin für Programmierung und Webentwicklung. Während meines Studiums habe ich regelmäßig Blockkurse geleitet und Studierende in Java, Python und Datenbanken unterstützt. Meine Stärke liegt darin, komplizierte Algorithmen anschaulich zu erklären und Lernende Schritt für Schritt an Projektaufgaben heranzuführen. Besonders viel Freude macht es mir, individuelle Lernpläne zu erstellen und praxisorientierte Aufgaben zu entwickeln, sodass meine Schüler:innen schnell Erfolge sehen und motiviert bleiben. Gerne biete ich Einzel- oder Kleingruppenunterricht an, sowohl persönlich als auch online.';
        $user3->save();

        $user4 = new User();
        $user4->first_name = 'Hans';
        $user4->last_name = 'Müller';
        $user4->email = 'hansmüller@diesdas.at';
        $user4->password = bcrypt('password');
        $user4->phone = '+43123456789';
        $user4->study_program = 'Medientechnik';
        $user4->role = 'tutor'; // tutor, seeker
        $user4->description = 'Als Medientechniker mit einem Notendurchschnitt von 1,0 habe ich mich in Studium und Beruf auf audiovisuelle Medienproduktion und Onlinesysteme spezialisiert. Ich verfüge über fundierte Kenntnisse in Grafik- und Videoschnittsoftware, 3D-Modellierung sowie Webtechnologien. Seit mehreren Jahren gebe ich Nachhilfe in den Fächern Mathematik, Physik und Informatik, insbesondere zu Programmiersprachen wie C++ und JavaScript sowie zu Medientechnik-spezifischen Inhalten wie Signalverarbeitung und Mediensystemarchitektur. Mein Ziel ist es, Lernende dazu zu befähigen, komplexe Aufgaben selbstständig zu lösen und kreative Projekte umzusetzen. Ich lege Wert auf klare Struktur, Praxisbezug und individuelle Betreuung, damit jeder Schüler eigenständig und mit Freude an seinen Fähigkeiten arbeiten kann.';
        $user4->save();

    }
}
