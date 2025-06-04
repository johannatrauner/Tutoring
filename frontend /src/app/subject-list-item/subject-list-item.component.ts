import { Component, input } from '@angular/core';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { Subject } from '../shared/subject';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'a.bs-subject-list-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subject-list-item.component.html',
  styles: ``,
})
export class SubjectListItemComponent {
  subject = input<Subject>();
  ngOnInit(): void {}
}
