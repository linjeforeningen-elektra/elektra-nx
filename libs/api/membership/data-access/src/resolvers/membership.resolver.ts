import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MembershipSchema } from '@elektra-nx/api/membership/schema';
import { MembershipAclAdapter } from '../adapters';
import { GQLAuth, GraphqlGuard } from '@elektra-nx/api/apollo/utils';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { CreateMembershipDto, UpdateMembershipDto } from '@elektra-nx/api/shared/dto';
import { UseGuards } from '@nestjs/common';

@Resolver(MembershipSchema)
@UseGuards(GraphqlGuard)
export class MembershipResolver {
  constructor(private membership: MembershipAclAdapter) {}

  @Mutation(() => MembershipSchema)
  public async createMembership(
    @GQLAuth() auth: AuthUser,
    @Args('userId', { type: () => String }) userId: string,
    @Args('body') body: CreateMembershipDto,
  ) {
    return this.membership.create(auth, userId, body);
  }

  @Mutation(() => MembershipSchema)
  public async updateMembership(
    @GQLAuth() auth: AuthUser,
    @Args('membershipId', { type: () => String }) membershipId: string,
    @Args('body') body: UpdateMembershipDto,
  ) {
    return this.membership.updateOne(auth, membershipId, body);
  }
}
