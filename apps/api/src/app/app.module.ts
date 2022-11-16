import { Module } from '@nestjs/common';

import { UserModule } from '@elektra-nx/api/user/feature';
import { DatabaseModule } from '@elektra-nx/api/database/feature';
import { AuthModule } from '@elektra-nx/api/auth/feature';

import { MembershipModule } from '@elektra-nx/api/membership/feature';
import { ApiShellModule } from '@elektra-nx/api/shell/feature';
import { CardModule } from '@elektra-nx/api/card/feature';

@Module({
  imports: [ApiShellModule, DatabaseModule, AuthModule, MembershipModule, CardModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
