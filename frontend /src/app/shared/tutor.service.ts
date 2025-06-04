import { Injectable } from '@angular/core';
import { Subject, User, Topic } from './subject';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { TutoringSession } from './tutoring_session';
import { SessionsCollection } from './sessions-collection';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  private api = 'http://nachhilfe.s2210456035.student.kwmhgb.at/api';
  constructor(private http: HttpClient) {}

  /*SUBJECT API CALLS */
  getSubjects(): Observable<Array<Subject>> {
    return this.http
      .get<Array<Subject>>(`${this.api}/subjects`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getSubjectsByTutor(): Observable<Array<Subject>> {
    return this.http
      .get<Array<Subject>>(`${this.api}/tutor-subjects`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getSingleSubject(id: number): Observable<Subject> {
    return this.http
      .get<Subject>(`${this.api}/subjects/${id}`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  updateSubject(subject: Subject): Observable<Subject> {
    return this.http
      .put<Subject>(`${this.api}/update-subject/${subject.id}`, subject)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  createSubject(subject: Subject): Observable<any> {
    return this.http
      .post<Subject>(`${this.api}/save-subject`, subject)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  deleteSubject(subjectId: number): Observable<any> {
    return this.http
      .delete(`${this.api}/delete-subject/${subjectId}`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  /*TOPIC API CALLS */
  getSingleTopic(subjectId: number, topicId: number): Observable<Topic> {
    return this.http
      .get<Array<Topic>>(`${this.api}/subjects/${subjectId}/topics/${topicId}`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  updateTopic(topic: Topic): Observable<Topic> {
    return this.http
      .put<Topic>(`${this.api}/update-topic/${topic.id}`, topic)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  createTopic(topic: Topic): Observable<any> {
    return this.http
      .post<Topic>(`${this.api}/save-topic`, topic)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  deleteTopic(topicId: number): Observable<any> {
    return this.http
      .delete(`${this.api}/delete-topic/${topicId}`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  /*TUTORING SESSION API CALLS */
  saveMultipleSessions(sessions: SessionsCollection): Observable<any> {
    return this.http
      .post(`${this.api}/save-multiple-sessions`, sessions)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getMultipleSessions(subjectId: number, topicId: number): Observable<any> {
    return this.http
      .get<any>(`${this.api}/subjects/${subjectId}/topics/${topicId}/sessions`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  updateMultipleSessions(sessions: SessionsCollection): Observable<any> {
    return this.http
      .put(`${this.api}/update-multiple-sessions`, sessions)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  /*USER API CALLS */
  getSingleUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3), catchError(this.errorHandler));
  }
  getProfile(): Observable<any> {
    return this.http
      .get<any>(`${this.api}/profile`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getTutors(): Observable<Array<User>> {
    return this.http
      .get<Array<User>>(`${this.api}/tutors`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  bookSession(sessionId: number): Observable<any> {
    return this.http
      .post(`${this.api}/book-session/${sessionId}`, {})
      .pipe(retry(3), catchError(this.errorHandler));
  }

  /*Request Session Api Calls*/
  requestSession(request: any): Observable<any> {
    return this.http
      .post(`${this.api}/save-requestsession`, request)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  acceptSessionRequest(requestId: number): Observable<any> {
    return this.http
      .post(`${this.api}/accept-session-request/${requestId}`, {})
      .pipe(retry(3), catchError(this.errorHandler));
  }

  rejectSessionRequest(requestId: number): Observable<any> {
    return this.http
      .post(`${this.api}/reject-session-request/${requestId}`, {})
      .pipe(retry(3), catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
