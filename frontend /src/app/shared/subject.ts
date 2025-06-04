import {User} from './user';
export {User} from './user';
import {Topic} from './topic';
export {Topic} from './topic';
export class Subject {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public tutor_id: number,
    public topics?: Topic[],  // für API-Speicherung
    public tutor?: User,      // optional für Anzeige
  ) {}
}
