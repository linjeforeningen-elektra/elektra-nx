// import { BearerTokenPayload } from '@elektra-nx/auth/shared';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as JwtAuthGuard } from '@nestjs/passport';
import { AuthUser } from '../classes';

@Injectable()
export class AuthGuard extends JwtAuthGuard('jwt') {
  /* eslint-disable */
  // @ts-ignore
  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    return new AuthUser(user);
  }
  /* eslint-enable */
}
