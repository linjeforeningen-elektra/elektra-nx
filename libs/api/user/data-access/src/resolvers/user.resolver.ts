import { GQLAuth, GraphqlGuard } from '@elektra-nx/api/apollo/utils';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { UserSchema } from '@elektra-nx/api/user/schema';
import { MembershipSchema } from '@elektra-nx/api/membership/schema';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserAclAdapter } from '../adapters';
import { UpdateUserDto } from '@elektra-nx/api/shared/dto';
import { CardSchema } from '@elektra-nx/api/card/schema';
import { CardAclAdapter } from '@elektra-nx/api/card/data-access';
import { MembershipAclAdapter } from '@elektra-nx/api/membership/data-access';

@Resolver(UserSchema)
@UseGuards(GraphqlGuard)
export class UserResolver {
  constructor(private user: UserAclAdapter, private membership: MembershipAclAdapter, private card: CardAclAdapter) {}

  @Query(() => [UserSchema], { nullable: true, name: 'user' })
  public findUsers(@GQLAuth() auth: AuthUser) {
    return this.user.find(auth);
  }

  @Query(() => UserSchema, { name: 'user' })
  public findOneUser(@GQLAuth() auth: AuthUser, @Args('userId', { type: () => String }) userId: string) {
    return this.user.findOne(auth, userId);
  }

  @Query(() => UserSchema, { name: 'loggedInUser' })
  public getLoggedInUser(@GQLAuth() auth: AuthUser) {
    return this.user.findOne(auth, auth.id);
  }

  @Mutation(() => UserSchema)
  public updateOneUser(
    @GQLAuth() auth: AuthUser,
    @Args('userId', { type: () => String }) userId: string,
    @Args('body') body: UpdateUserDto,
  ) {
    return this.user.updateOne(auth, userId, body);
  }

  @ResolveField(() => MembershipSchema, { nullable: true, name: 'membership' })
  public findMembershipFromUserRelation(@GQLAuth() auth: AuthUser, @Parent() parent: UserSchema) {
    return this.membership.findOneFromUserRelation(auth, parent, false);
  }

  @ResolveField(() => CardSchema, { nullable: true, name: 'card' })
  public findCardFromUserRelation(@GQLAuth() auth: AuthUser, @Parent() parent: UserSchema) {
    return this.card.findFromUserRelation(auth, parent, false);
  }
}
