export enum ElektraErrorCode {
  EMAIL_NOT_CONFIRMED = 460,
}

export type ElektraError = {
  elektraError: ElektraErrorCode;
  message: string;
};

export function isElektraError(error: any): error is ElektraError {
  return !!(error?.elektraError && error?.message);
}

export const ElektraError = (elektraError: ElektraErrorCode, message: string) => ({ elektraError, message });
