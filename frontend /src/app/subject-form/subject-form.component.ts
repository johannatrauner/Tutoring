import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TutorService } from '../shared/tutor.service';
import { SubjectFactory } from '../shared/subject-factory';
import { SubjectFormErrorMessages } from './subject-form-error-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'bs-subject-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subject-form.component.html',
  styles: ``,
})
export class SubjectFormComponent {
  subjectForm: FormGroup;

  subject = SubjectFactory.empty();
  subjectId = 0;

  isUpdatingSubject = false;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.subjectForm = this.fb.group({});
  }

  ngOnInit() {
    this.subjectId = this.route.snapshot.params['subjectId'];
    if (this.subjectId) {
      this.isUpdatingSubject = true;
      this.tutorService
        .getSingleSubject(this.subjectId)
        .subscribe((subject) => {
          this.subject = subject;
          this.initSubject();
        });
    }
    this.initSubject();
  }

  initSubject() {
    this.subjectForm = this.fb.group({
      id: [this.subject.id],
      title: [this.subject.title, Validators.required],
      description: [this.subject.description, Validators.required],
    });
    this.subjectForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of SubjectFormErrorMessages) {
      const control = this.subjectForm.get(message.forControl);
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

  deleteSubject() {
    this.tutorService.deleteSubject(this.subject.id).subscribe((res) => {
      this.toastr.success('Du hast das Fach erfolgreich gelöscht', 'Gelöscht');
      this.router.navigate(['/tutor/tutor-section']);
    });
  }

  submitForm() {
    if (this.isUpdatingSubject) {
      const subject = SubjectFactory.fromObject(this.subjectForm.value);
      this.tutorService.updateSubject(subject).subscribe((res) => {
        this.toastr.success('Super du hast eine Fach bearbeitet!', 'Success');
        this.router.navigate(['/tutor/tutor-section']);
      });
    } else {
      const subject = SubjectFactory.fromObject(this.subjectForm.value);
      this.tutorService.createSubject(subject).subscribe((res) => {
        this.toastr.success('Super du hast eine Fach angelegt!', 'Success');
        this.router.navigate(['/tutor/tutor-section']);
      });
    }
  }
}
