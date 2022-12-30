import { Module } from '@nestjs/common';

import { UserModule } from '@elektra-nx/api/user/feature';
import { DatabaseModule } from '@elektra-nx/api/database/feature';
import { ApiAuthModule } from '@elektra-nx/api/auth/feature';

import { MembershipModule } from '@elektra-nx/api/membership/feature';
import { ApiShellModule } from '@elektra-nx/api/shell/feature';
import { CardModule } from '@elektra-nx/api/card/feature';
import { AppController } from './app.controller';

@Module({
  imports: [ApiShellModule, DatabaseModule, ApiAuthModule, MembershipModule, CardModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
