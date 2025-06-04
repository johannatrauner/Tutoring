import { User } from './user';
export { User } from './user';
import { Topic } from './topic';
export { Topic } from './topic';
export class TutoringSession {
  constructor(
    public id: number,
    public tutor_id: number,
    public seeker_id: number | null,
    public topic_id: number,
    public status: 'offering' | 'booked' | 'requested',
    public start_time: string,
    public end_time: string,
    public comment: string | null,
    public topic?: Topic,
    public tutor?: User,
    public seeker?: User,
  ) {}
}
