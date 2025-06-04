import { Component, signal } from '@angular/core';
import { User } from '../shared/user';
import { TutorService } from '../shared/tutor.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'bs-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styles: ``,
})
export class UserComponent {
  user = signal<User | undefined>(undefined);
  constructor(
    private tutorService: TutorService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tutorService.getSingleUser(id).subscribe((u: User) => {
      this.user.set(u);
    });
  }
}
