import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import {
  AuthLocalAclAdapter,
  AuthLocalEntity,
  AuthLocalResolver,
  AuthLocalService,
  AuthService,
} from '@elektra-nx/api/auth/data-access';

import { AuthGuard } from '@elektra-nx/api/auth/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController, AuthLocalController } from './controllers';
import { ApiAuthConfigModule, AuthConfigService } from '@elektra-nx/api/auth/config';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ApiAuthConfigModule,
    JwtModule.registerAsync({
      imports: [ApiAuthConfigModule],
      inject: [AuthConfigService],
      useFactory: (config: AuthConfigService) => ({
        secret: config.JWT_SECRET,
        signOptions: {
          expiresIn: config.JWT_EXPIRY,
        },
      }),
    }),
    TypeOrmModule.forFeature([AuthLocalEntity]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthGuard,
    AuthLocalAclAdapter,
    AuthLocalService,
    AuthLocalResolver,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [AuthController, AuthLocalController],
  exports: [TypeOrmModule, AuthService, AuthGuard, AuthLocalAclAdapter, AuthLocalService],
})
export class AuthModule {}
