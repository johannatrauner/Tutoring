import { Subject } from './subject';
import {TutoringSession} from './tutoring_session';
export class User {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public phone: string | null,
    public study_program: string,
    public role: 'tutor' | 'seeker',
    public description: string,
    public subjects?: Subject[],
    public seeker_sessions?: TutoringSession[],
    public tutor_sessions?: TutoringSession[],
  ) {}
}
