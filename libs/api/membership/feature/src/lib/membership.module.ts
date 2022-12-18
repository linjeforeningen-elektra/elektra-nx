import { MembershipAclAdapter, MembershipService, MembershipResolver } from '@elektra-nx/api/membership/data-access';
import { Membership } from '@elektra-nx/api/membership/models';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Membership])],
  providers: [MembershipService, MembershipAclAdapter, MembershipResolver],
  exports: [MembershipService, MembershipAclAdapter],
})
export class MembershipModule {}
