import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { LoginFormErrorMessages } from './login-form-error-messages';

interface Response {
  access_token: string;
}
@Component({
  selector: 'bs-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.loginForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of LoginFormErrorMessages) {
      const control = this.loginForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  /*Method to login the user
  It retrieves the values from the form, calls the authentication service to log in*/
  login() {
    const val = this.loginForm.value;
    this.authService.login(val.username, val.password).subscribe(
      (res: any) => {
        this.authService.setSessionStorage(res.access_token, res.user);
        this.router.navigateByUrl('/');
      },
      () => {
        this.toastr.error('Inkorrekte Login Daten!', 'Falsch!');
      },
    );
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
