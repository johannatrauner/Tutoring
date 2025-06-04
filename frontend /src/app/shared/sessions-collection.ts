import { Subject } from './subject';
export { Subject } from './subject';
import { TutoringSession } from './tutoring_session';
export { TutoringSession } from './tutoring_session';
import { Topic } from './topic';
export { Topic } from './topic';

export class SessionsCollection {
  constructor(
    public subject_id: number | null,
    public topic_id: number | null,
    public tutoring_sessions?: TutoringSession[],
    public subject?: Subject,
    public topic?: Topic,
  ) {}

  static empty(): SessionsCollection {
    return new SessionsCollection(null, null, [], undefined);
  }

  static fromObject(obj: any): SessionsCollection {
    const sessionsCollection = new SessionsCollection(
      obj.subject_id,
      obj.topic_id,
      obj.tutoring_sessions,
      obj.subject
        ? new Subject(
            obj.subject.id,
            obj.subject.title,
            obj.subject.description,
            obj.subject.tutor_id,
            obj.subject.topics,
          )
        : undefined,
      obj.topic
        ? new Topic(
            obj.topic.id,
            obj.topic.title,
            obj.topic.description,
            obj.topic.subject_id,
            obj.topic.subject,
          )
        : undefined,
    );
    return sessionsCollection;
  }
}
