import { Component, input, signal } from '@angular/core';
import { TutoringSession, User } from '../shared/tutoring_session';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bs-tutoring-session-item',
  imports: [DatePipe, RouterLink],
  templateUrl: './tutoring-session-item.component.html',
  styles: ``,
})
export class TutoringSessionItemComponent {
  session = input<TutoringSession>();
  role = input<string>();
  past = input<boolean>(false);
  openSession = input<boolean>(false);
  ngOnInit(): void {}
}
