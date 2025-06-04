import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TutorService } from '../shared/tutor.service';
import { SessionFormErrorMessages } from './session-form-error-messages';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, Topic } from '../shared/subject';
import { SubjectFactory } from '../shared/subject-factory';
import { TopicFactory } from '../shared/topic-factory';
import { SessionsCollection } from '../shared/sessions-collection';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'bs-session-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './session-form.component.html',
})
export class SessionFormComponent {
  sessionForm: FormGroup;
  errors: { [key: string]: string } = {};
  databaseSessions: any[] = [];

  subjects: any[] = [];
  topics: any[] = [];

  isSubjectSelected = false;
  isUpdatingSession = false;

  selectedSubject: Subject = SubjectFactory.empty();
  selectedTopic: Topic = TopicFactory.empty();

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private tutorService: TutorService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.sessionForm = this.fb.group({
      sessions: this.fb.array([]),
    });
    this.addSession();
  }

  ngOnInit() {
    this.initSession();
    const subjectId = this.route.snapshot.params['subjectId'];
    const topicId = this.route.snapshot.params['topicId'];

    if (topicId) {
      this.isUpdatingSession = true;
      this.tutorService
        .getMultipleSessions(subjectId, topicId)
        .subscribe((tutorSessions) => {
          this.databaseSessions = tutorSessions?.tutoring_sessions || [];
          this.selectedSubject =
            tutorSessions?.subject || SubjectFactory.empty();
          this.selectedTopic = tutorSessions?.topic || TopicFactory.empty();
          this.initSession();
        });
    }
  }

  initSession() {
    this.getAllSubjects();
    this.sessionForm = this.fb.group({
      subject_id: ['', Validators.required],
      topic_id: ['', Validators.required],
      sessions: this.fb.array([this.createSession()], [this.minArrayLength(1)]),
    });

    if (this.isUpdatingSession) {
      this.sessionForm = this.fb.group({
        subject_id: [this.selectedSubject?.id, Validators.required],
        topic_id: [this.selectedTopic?.id, Validators.required],
        sessions: this.fb.array([]),
      });
      this.buildSessionArray();
    }

    this.sessionForm.get('subject_id')?.valueChanges.subscribe((subjectId) => {
      if (subjectId) {
        this.getAllTopics(subjectId);
      }
    });
  }

  get session(): FormArray {
    return this.sessionForm.get('sessions') as FormArray;
  }

  // Creates a new session FormGroup with validations
  createSession(): FormGroup {
    return this.fb.group(
      {
        id: [null],
        start_time: ['', [Validators.required, this.checkDateFuture]],
        end_time: ['', Validators.required],
        comment: [''],
      },
      { validators: [this.dateOrderValidator] },
    );
  }

  // Adds a new session FormGroup to the sessions FormArray
  addSession(): void {
    this.session.push(this.createSession());
  }

  // Removes a session FormGroup from the sessions FormArray
  removeItem(index: number): void {
    this.session.removeAt(index);
  }

  // Fetches all subjects from the tutor service
  getAllSubjects() {
    this.tutorService.getSubjectsByTutor().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  // Fetches all topics for a selected subject
  getAllTopics(subjectId: number) {
    this.isSubjectSelected = true;
    const subject = this.subjects.find((s) => s.id === Number(subjectId));
    this.topics = subject?.topics || [];
  }

  // Builds the sessions FormArray from the database sessions
  buildSessionArray() {
    const sessionsArray = this.sessionForm.get('sessions') as FormArray;
    if (sessionsArray) {
      sessionsArray.clear();
      this.databaseSessions.forEach((session) => {
        const sessionGroup = this.fb.group({
          id: [session.id],
          start_time: [session.start_time, Validators.required],
          end_time: [session.end_time, Validators.required],
          comment: [session.comment || ''],
        });
        sessionsArray.push(sessionGroup);
      });
    }
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of SessionFormErrorMessages) {
      const control = this.sessionForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !control.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  /*function generated by ChatGPT
   * Validates that the end time is after the start time
   * AbstractControl is the base class for FormControl, FormGroup, and FormArray
   * providing shared properties (e.g., value, valid) and methods (e.g., get()).*/
  dateOrderValidator(ctrl: AbstractControl) {
    const start = ctrl.get('start_time')!.value;
    const end = ctrl.get('end_time')!.value;
    return start && end && new Date(end) <= new Date(start)
      ? { dateOrder: true }
      : null;
  }

  /*function generated by ChatGPT
   * Validates that the start date is in the future
   */
  checkDateFuture(control: AbstractControl): ValidationErrors | null {
    const start = control.value;
    if (start) {
      return new Date(start) < new Date() ? { startTimeInPast: true } : null;
    }
    return null;
  }

  /* generated by ChatGPT
   * Validates that the FormArray has a minimum length
   * So no empty array can be submitted
   * usage in the sessionForm
   * returns null if valid, or an error object if invalid
   */
  minArrayLength(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const arr = control as FormArray;
      return arr.length >= min
        ? null
        : { minArrayLength: { requiredLength: min, actualLength: arr.length } };
    };
  }

  // Submits the form data to the tutor service
  onSubmit(): void {
    const tutoringSessions = this.sessionForm.value;
    if (this.isUpdatingSession) {
      this.tutorService
        .updateMultipleSessions(tutoringSessions)
        .subscribe((res) => {
          this.toastr.success(
            'Super du hast die Nachhilfestunden aktualisiert!',
            'Success',
          );
          this.router.navigate(['/tutor/tutor-section']);
        });
    } else {
      this.tutorService
        .saveMultipleSessions(tutoringSessions)
        .subscribe((res) => {
          this.toastr.success(
            'Super du hast eine neue Nachhilfestunde erstellt!',
            'Success',
          );
          this.sessionForm.reset(SessionsCollection.empty());
        });
    }
    this.updateErrorMessages();
  }
}
