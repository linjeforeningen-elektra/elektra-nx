export enum MailJobType {
  EMAIL_CONFIRMATION = 'EMAIL_CONFIRMATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

export type EmailConfirmationJob = {
  type: MailJobType.EMAIL_CONFIRMATION;
  data: {
    email: string;
    code: string;
    hash: string;
  };
};

export type PasswordResetJob = {
  type: MailJobType.PASSWORD_RESET;
  data: {
    email: string;
    hash: string;
  };
};

export type MailJob = EmailConfirmationJob | PasswordResetJob;
