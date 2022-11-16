import { GQLAuth, GraphqlGuard } from '@elektra-nx/api/apollo/utils';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { CardAccessSchema } from '@elektra-nx/api/card/schema';
import { CardAccessStatus } from '@elektra-nx/shared/models';
// import { CreateCardAccessDto } from '@elektra-nx/api/shared/dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CardAccessAclAdapter } from '../adapters';

@Resolver(CardAccessSchema)
@UseGuards(GraphqlGuard)
export class CardAccessResolver {
  constructor(private cardAccess: CardAccessAclAdapter) {}

  // @Mutation(() => CardAccessSchema)
  // public async createCardAccess(
  //   @GQLAuth() auth: AuthUser,
  //   @Args('cardId', { type: () => String }) cardId: string,
  //   @Args('body') dto: CreateCardAccessDto,
  // ) {
  //   return this.cardAccess;
  // }
  @Mutation(() => CardAccessStatus)
  public async renewCardAccess(@GQLAuth() auth: AuthUser, @Args('cardId', { type: () => String }) cardId: string) {
    return this.cardAccess.renew(auth, cardId);
  }
}
