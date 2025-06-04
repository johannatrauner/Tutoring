import { Subject } from './subject';
import { User } from './user';

export class SubjectFactory {

  static empty() : Subject {
    return new Subject(0, '', '', 0, [], undefined);
  }

  static fromObject(obj: any): Subject {
    const subject = new Subject(
      obj.id,
      obj.title,
      obj.description,
      obj.tutor_id,
      obj.topics,
      obj.tutor ? new User(
        obj.tutor.id,
        obj.tutor.first_name,
        obj.tutor.last_name,
        obj.tutor.email,
        '',
        null,
        '',
        'tutor',
        '',
      ) : undefined
    );
    return subject;
  }
}
