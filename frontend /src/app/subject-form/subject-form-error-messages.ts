export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string,
  ) {}
}
export const SubjectFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Titel ist erforderlich'),
  new ErrorMessage('description', 'required', 'Beschreibung ist erforderlich'),
];
