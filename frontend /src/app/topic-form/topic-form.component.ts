import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TutorService } from '../shared/tutor.service';
import { TopicFactory } from '../shared/topic-factory';
import { Subject } from '../shared/subject';
import { TopicFormErrorMessages } from './topic-form-error-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'bs-topic-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './topic-form.component.html',
  styles: ``,
})
export class TopicFormComponent {
  topicForm: FormGroup;

  topic = TopicFactory.empty();

  subjects: Subject[] = [];
  selectedSubjectTitle = '';

  isUpdatingTopic = false;
  errors: { [key: string]: string } = {};

  noSubjects = false;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.topicForm = this.fb.group({});
  }

  ngOnInit() {
    // Fetch all subjects for the tutor
    this.tutorService.getSubjectsByTutor().subscribe((subjects) => {
      this.subjects = subjects;
      if (this.subjects.length === 0) {
        this.noSubjects = true;
      }
    });

    const topicId = this.route.snapshot.params['topicId'];
    const subjectId = this.route.snapshot.params['subjectId'];

    if (topicId) {
      this.isUpdatingTopic = true;
      this.tutorService
        .getSingleTopic(subjectId, topicId)
        .subscribe((topic) => {
          this.topic = topic;
          this.selectedSubjectTitle =
            topic?.subject?.title ?? 'Unbekanntes Fach';
          this.initTopic();
        });
    }
    this.initTopic();
  }

  initTopic() {
    this.topicForm = this.fb.group({
      id: [this.topic.id],
      title: [this.topic.title, Validators.required],
      subject_id: [
        this.topic.subject_id === 0 ? null : this.topic.subject_id,
        Validators.required,
      ],
      description: [this.topic.description, Validators.required],
    });
    this.topicForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of TopicFormErrorMessages) {
      const control = this.topicForm.get(message.forControl);
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

  deleteTopic() {
    this.tutorService.deleteTopic(this.topic.id).subscribe(() => {
      this.router.navigate(['/tutor/tutor-section']);
      this.toastr.success('Du hast das Thema erfolgreich gelöscht!', 'Success');
    });
  }

  submitForm() {
    console.log(this.topicForm.value);
    if (this.isUpdatingTopic) {
      const topic = TopicFactory.fromObject(this.topicForm.value);
      this.tutorService.updateTopic(topic).subscribe(() => {
        this.router.navigate(['/tutor/tutor-section']);
        this.toastr.success(
          'Du hast das Thema erfolgreich aktualisiert!',
          'Success',
        );
      });
    } else {
      const topic = TopicFactory.fromObject(this.topicForm.value);
      this.tutorService.createTopic(topic).subscribe(() => {
        this.router.navigate(['/tutor/tutor-section']);
        this.toastr.success('Du hast ein neues Thema erstellt', 'Success');
      });
    }
  }
}
