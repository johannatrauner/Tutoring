import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user';
import { TutorService } from '../shared/tutor.service';

@Component({
  selector: 'bs-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  user = signal<User | undefined>(undefined);
  constructor(
    private authService: AuthenticationService,
    private tutorService: TutorService,
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.getUser();
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUser() {
    this.tutorService.getProfile().subscribe((res) => {
      this.user.set(res);
    });
  }
}
