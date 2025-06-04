import { Component } from '@angular/core';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { Subject } from './shared/subject';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './shared/authentication.service';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'bs-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  myValue: string = '';
  constructor(
    private authService: AuthenticationService,
    http: HttpClient,
  ) {
    this.isTutor();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isTutor() {
    return this.authService.isTutor();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return 'Logout';
    } else {
      return 'Login';
    }
  }
}
