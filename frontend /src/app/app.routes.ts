import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { LoginComponent } from './login/login.component';
import { canNavigateToLoggedUserGuard } from './can-navigate-to-logged-user.guard';
import { canNavigateToTutorGuard } from './can-navigate-to-tutor.guard';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { MemeComponent } from './meme/meme.component';
import { SessionFormComponent } from './session-form/session-form.component';
import { TutorSectionComponent } from './tutor-section/tutor-section.component';
import { TutorSectionSubjectsComponent } from './tutor-section-subjects/tutor-section-subjects.component';

export const routes: Routes = [
  //routes for everyone
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'subjects', component: SubjectListComponent },
  { path: 'subjects/:id', component: SubjectDetailsComponent },
  { path: 'subjects/:id/topics/:topicId', component: TopicDetailComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'login', component: LoginComponent },

  //routes for logged in users, seeker and tutor
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [canNavigateToLoggedUserGuard],
  },

  //routes for tutor
  {
    path: 'tutor/subject-form',
    component: SubjectFormComponent,
    canActivate: [canNavigateToTutorGuard],
  },
  {
    path: 'tutor/subject-form/:subjectId',
    component: SubjectFormComponent,
    canActivate: [canNavigateToTutorGuard],
  },
  {
    path: 'tutor/topic-form',
    component: TopicFormComponent,
    canActivate: [canNavigateToTutorGuard],
  },
  {
    path: 'tutor/topic-form/:subjectId/:topicId',
    component: TopicFormComponent,
    canActivate: [canNavigateToTutorGuard],
  },
  {
    path: 'tutor/session-form',
    component: SessionFormComponent,
    canActivate: [canNavigateToTutorGuard],
  },
  {
    path: 'tutor/session-form/:subjectId/:topicId',
    component: SessionFormComponent,
    canActivate: [canNavigateToTutorGuard],
  },
  {
    path: 'tutor/tutor-section',
    component: TutorSectionComponent,
    canActivate: [canNavigateToTutorGuard],
  },
  {
    path: 'tutor/tutor-section/:subjectId',
    component: TutorSectionSubjectsComponent,
    canActivate: [canNavigateToTutorGuard],
  },

  { path: '**', component: MemeComponent },
];
