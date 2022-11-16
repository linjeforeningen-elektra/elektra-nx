import { MembershipAclAdapter, MembershipService, MembershipResolver } from '@elektra-nx/api/membership/data-access';
import { MembershipEntity } from '@elektra-nx/api/membership/models';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MembershipEntity])],
  providers: [MembershipService, MembershipAclAdapter, MembershipResolver],
  exports: [MembershipService, MembershipAclAdapter],
})
export class MembershipModule {}
