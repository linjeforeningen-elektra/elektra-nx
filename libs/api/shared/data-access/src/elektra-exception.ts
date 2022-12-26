import { HttpException } from '@nestjs/common/exceptions';
import { ElektraErrorCode } from '@elektra-nx/shared/util/types';

const ElektraErrorMessages: Map<ElektraErrorCode, string> = new Map([
  [ElektraErrorCode.EMAIL_NOT_CONFIRMED, 'Email not confirmed'],
]);

export class ElektraException extends HttpException {
  constructor(code: ElektraErrorCode) {
    super(ElektraErrorMessages.get(code) || 'Internal server error', code);
    // super('', );
  }
}
