import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MembershipAclAdapter } from '../adapters';
import { GQLAuth, GraphqlGuard } from '@elektra-nx/api/apollo/utils';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { CreateMembershipDto, UpdateMembershipDto } from '@elektra-nx/api/shared/dto';
import { UseGuards } from '@nestjs/common';
import { Membership } from '@elektra-nx/api/membership/models';

@Resolver(Membership)
@UseGuards(GraphqlGuard)
export class MembershipResolver {
  constructor(private membership: MembershipAclAdapter) {}

  @Mutation(() => Membership)
  public async createMembership(
    @GQLAuth() auth: AuthUser,
    @Args('userId', { type: () => String }) userId: string,
    @Args('body') body: CreateMembershipDto,
  ) {
    return this.membership.create(auth, userId, body);
  }

  @Mutation(() => Membership)
  public async updateMembership(
    @GQLAuth() auth: AuthUser,
    @Args('membershipId', { type: () => String }) membershipId: string,
    @Args('body') body: UpdateMembershipDto,
  ) {
    return this.membership.updateOne(auth, membershipId, body);
  }
}
