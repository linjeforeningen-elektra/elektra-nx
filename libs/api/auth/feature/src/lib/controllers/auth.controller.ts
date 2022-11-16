import { AuthLocalAclAdapter } from '@elektra-nx/api/auth/data-access';
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthLocalAclAdapter) {}
}
