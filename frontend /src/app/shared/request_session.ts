import { User } from './user';
export { User } from './user';
import { Topic } from './topic';
export { Topic } from './topic';

export class RequestSession {
  constructor(
    public id: number,
    public tutor_id: number,
    public seeker_id: number,
    public topic_id: number,
    public status: 'requested' | 'accepted' | 'rejected',
    public comment: string | null,
    public start_time: string,
    public end_time: string,
    public tutor?: User,
    public seeker?: User,
    public topic?: Topic [],
  ) {}
}
