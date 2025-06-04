export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const RequestSessionFormErrorMessages = [
  new ErrorMessage('comment',    'required',               'Kommentar ist erforderlich'),
  new ErrorMessage('start_time', 'required',               'Startzeit ist erforderlich'),
  new ErrorMessage('start_time', 'startTimeInPast',        'Startzeit muss in der Zukunft liegen'),
  new ErrorMessage('end_time',   'required',               'Endzeit ist erforderlich'),
  new ErrorMessage('end_time',   'endTimeBeforeStartTime', 'Endzeit muss nach der Startzeit liegen'),
];

