import { HttpException } from '@nestjs/common/exceptions';
import { ElektraErrors } from '@elektra-nx/shared/util/types';
import { HttpStatus } from '@nestjs/common';

export class EmailNotConfirmedException extends HttpException {
  constructor(message?: string) {
    super(
      HttpException.createBody(message, ElektraErrors.EMAIL_NOT_CONFIRMED, HttpStatus.FORBIDDEN),
      HttpStatus.FORBIDDEN,
    );
  }
}
