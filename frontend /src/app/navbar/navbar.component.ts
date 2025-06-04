import { Component, signal } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  constructor(
    private authService: AuthenticationService,
    http: HttpClient,
  ) {}

  ngOnInit(): void {}

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
  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
    console.log(this.isMenuOpen());
  }
}
