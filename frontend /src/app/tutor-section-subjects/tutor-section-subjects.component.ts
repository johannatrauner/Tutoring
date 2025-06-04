import { Component, signal } from '@angular/core';
import { Subject, User } from '../shared/subject';
import { TutorService } from '../shared/tutor.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TutoringSessionItemComponent } from '../tutoring-session-item/tutoring-session-item.component';

@Component({
  selector: 'bs-tutor-section-subjects',
  imports: [RouterLink, TutoringSessionItemComponent],
  templateUrl: './tutor-section-subjects.component.html',
  styles: ``,
})
export class TutorSectionSubjectsComponent {
  currentDate = new Date();
  subject = signal<Subject | undefined>(undefined);
  user = signal<User | undefined>(undefined);

  constructor(
    private subje: TutorService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('subjectId'));
    this.subje.getSingleSubject(id).subscribe((s: Subject) => {
      this.subject.set(s);
      this.subje.getSingleUser(s.tutor_id).subscribe((u: User) => {
        this.user.set(u);
      });
    });
  }
  parseDate(s: string): Date {
    return new Date(s.replace(' ', 'T'));
  }
}
