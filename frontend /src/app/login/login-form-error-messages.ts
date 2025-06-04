export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string,
  ) {}
}
export const LoginFormErrorMessages = [
  new ErrorMessage('username', 'required', 'E-Mail ist erforderlich'),
  new ErrorMessage('username', 'email', 'Sieh dir dein E-Mail-Format an'),
  new ErrorMessage('password', 'required', 'Passwort ist erforderlich'),
];
