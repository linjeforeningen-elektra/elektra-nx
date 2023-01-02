export enum MailJobType {
  EMAIL_CONFIRMATION = 'EMAIL_CONFIRMATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

export type EmailConfirmationJob = {
  type: MailJobType.EMAIL_CONFIRMATION;
  data: {
    email: string;
    code: string;
  };
};

export type PasswordResetJob = {
  type: MailJobType.PASSWORD_RESET;
  data: {
    password: string;
  };
};

export type MailJob = EmailConfirmationJob | PasswordResetJob;
