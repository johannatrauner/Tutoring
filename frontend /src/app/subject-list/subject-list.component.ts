import {
  Component,
  EventEmitter,
  OnInit,
  output,
  Output,
  signal,
} from '@angular/core';
import { User, Subject, Topic } from '../shared/subject';
import { SubjectListItemComponent } from '../subject-list-item/subject-list-item.component';
import { TutorService } from '../shared/tutor.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bs-subject-list',
  imports: [SubjectListItemComponent],
  templateUrl: './subject-list.component.html',
  styles: ``,
})
export class SubjectListComponent implements OnInit {
  subjects = signal<Subject[]>([]);
  user = signal<User | undefined>(undefined);
  showSubjectDetails = output<Subject>();

  constructor(private subje: TutorService) {}

  ngOnInit(): void {
    this.subje.getSubjects().subscribe((res) => this.subjects.set(res));
  }
}
