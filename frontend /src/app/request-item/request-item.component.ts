import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RequestSession } from '../shared/request_session';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'bs-request-item',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './request-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export class RequestItemComponent {
  @Input() request!: RequestSession;
  @Output() accept = new EventEmitter<number>();
  @Output() reject = new EventEmitter<number>();

  onAccept() {
    this.accept.emit(this.request.id);
  }

  onReject() {
    this.reject.emit(this.request.id);
  }
}
