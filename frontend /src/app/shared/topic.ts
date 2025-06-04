import { Subject } from './subject';
export {Subject} from './subject';
import {TutoringSession} from './tutoring_session';
export {TutoringSession} from './tutoring_session';
import { User } from './user';

export class Topic {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public subject_id: number,
    public subject?: Subject,
    public tutor?: User,
    public tutoring_sessions? : TutoringSession [],
  ) {}
}
