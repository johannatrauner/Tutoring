export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const SessionFormErrorMessages = [
  new ErrorMessage('topic_id', 'required', 'Thema ist erforderlich'),
  new ErrorMessage('subject_id', 'required', 'Fach ist erforderlich'),
  new ErrorMessage('start_time', 'required', 'Startzeit ist erforderlich'),
  new ErrorMessage('end_time', 'required', 'Endzeit ist erforderlich'),
  new ErrorMessage('end_time', 'endTimeBeforeStartTime', 'Endzeit muss nach Startzeit liegen'),
]

