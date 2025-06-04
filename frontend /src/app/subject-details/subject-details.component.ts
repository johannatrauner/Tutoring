import { Component, input, output, signal } from '@angular/core';
import { User, Subject, Topic } from '../shared/subject';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TutorService } from '../shared/tutor.service';

@Component({
  selector: 'bs-subject-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subject-details.component.html',
  styles: ``,
})
export class SubjectDetailsComponent {
  subject = signal<Subject | undefined>(undefined);
  user = signal<User | undefined>(undefined);

  constructor(
    private subje: TutorService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subje.getSingleSubject(id).subscribe((s: Subject) => {
      this.subject.set(s);
      this.subje.getSingleUser(s.tutor_id).subscribe((u: User) => {
        this.user.set(u);
      });
    });
  }
}
