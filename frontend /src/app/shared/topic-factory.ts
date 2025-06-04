import { Topic } from './topic';

export class TopicFactory {
  static empty(): Topic {
    return new Topic(0, '', '', 0, undefined, undefined, undefined);
  }

  static fromObject(obj: any): Topic {
    const topic = new Topic(
      obj.id,
      obj.title,
      obj.description,
      obj.subject_id,
      obj.tutor_id,
      obj.tutoring_sessions,
    );
    return topic;
  }
}
