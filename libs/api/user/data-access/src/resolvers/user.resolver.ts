import { GQLAuth, GraphqlGuard } from '@elektra-nx/api/apollo/utils';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserAclAdapter } from '../adapters';
import { UpdateUserDto } from '@elektra-nx/api/shared/dto';
import { CardAclAdapter } from '@elektra-nx/api/card/data-access';
import { MembershipAclAdapter } from '@elektra-nx/api/membership/data-access';
import { User } from '@elektra-nx/api/user/models';
import { Card } from '@elektra-nx/api/card/models';
import { Membership } from '@elektra-nx/api/membership/models';
import { FindUsersFilterDto } from '@elektra-nx/api/user/utils';
import { AuthLocal } from '@elektra-nx/api/auth/data-access';

@Resolver(User)
@UseGuards(GraphqlGuard)
export class UserResolver {
  constructor(private user: UserAclAdapter, private membership: MembershipAclAdapter, private card: CardAclAdapter) {}

  @Query(() => [User], { nullable: true, name: 'users' })
  public findUsers(@GQLAuth() auth: AuthUser, @Args('filter', { nullable: true }) filter: FindUsersFilterDto = {}) {
    return this.user.find(auth, filter);
  }

  @Query(() => User, { name: 'user' })
  public findOneUser(@GQLAuth() auth: AuthUser, @Args('userId', { type: () => String }) userId: string) {
    return this.user.findOne(auth, userId);
  }

  @Query(() => User, { name: 'loggedInUser' })
  public getLoggedInUser(@GQLAuth() auth: AuthUser) {
    return this.user.findOne(auth, auth.id);
  }

  @Mutation(() => User)
  public updateOneUser(
    @GQLAuth() auth: AuthUser,
    @Args('userId', { type: () => String }) userId: string,
    @Args('body') body: UpdateUserDto,
  ) {
    return this.user.updateOne(auth, userId, body);
  }

  @ResolveField(() => Membership, { nullable: true, name: 'membership' })
  public findMembershipFromUserRelation(@GQLAuth() auth: AuthUser, @Parent() parent: User) {
    return this.membership.findOneFromUserRelation(auth, parent, false);
  }

  @ResolveField(() => Card, { nullable: true, name: 'card' })
  public findCardFromUserRelation(@GQLAuth() auth: AuthUser, @Parent() parent: User) {
    return this.card.findFromUserRelation(auth, parent, false);
  }

  @ResolveField(() => AuthLocal, { nullable: true, name: 'auth_local' })
  public findAuthLocalFromUserRelation(@GQLAuth() auth: AuthUser) {}
}
