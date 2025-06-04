import { Component, OnInit, output, signal } from '@angular/core';
import { Subject, User } from '../shared/subject';
import { TutorService } from '../shared/tutor.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bs-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styles: ``,
})
export class UserListComponent {
  users = signal<User[]>([]);
  constructor(private tutorService: TutorService) {
    this.tutorService.getTutors().subscribe((res) => {
      this.users.set(res);
    });
  }
}
