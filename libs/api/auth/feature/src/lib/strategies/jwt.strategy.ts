import { AuthConfigService } from '@elektra-nx/api/auth/config';
import { JwtPayload } from '@elektra-nx/shared/models';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
    } as StrategyOptions);
  }

  // create helper class here
  async validate(payload: JwtPayload) {
    return payload;
  }
}
