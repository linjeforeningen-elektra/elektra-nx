import { GQLAuth, GraphqlGuard, IdObject } from '@elektra-nx/api/apollo/utils';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { Card, CardAccess } from '@elektra-nx/api/card/models';
import { CreateCardDto } from '@elektra-nx/api/shared/dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CardAccessAclAdapter, CardAclAdapter } from '../adapters';

@Resolver(Card)
@UseGuards(GraphqlGuard)
export class CardResolver {
  constructor(private card: CardAclAdapter, private cardAccess: CardAccessAclAdapter) {}

  @Mutation(() => Card)
  public async createCard(
    @GQLAuth() auth: AuthUser,
    @Args('userId', { type: () => String }) userId: string,
    @Args('body') body: CreateCardDto,
  ) {
    return this.card.create(auth, userId, body);
  }

  @Mutation(() => IdObject)
  public async deleteCard(@GQLAuth() auth: AuthUser, @Args('cardId', { type: () => String }) cardId: string) {
    return this.card.deleteOne(auth, cardId);
  }

  @ResolveField(() => [CardAccess], { name: 'card_access', nullable: true })
  public async getCardAccess(@GQLAuth() auth: AuthUser, @Parent() parent: Card) {
    return this.cardAccess.findByCardRelation(auth, parent);
  }

  @ResolveField(() => String, { nullable: true, name: 'status' })
  public async getCardStatus(@GQLAuth() auth: AuthUser, @Parent() parent: Card) {
    return this.cardAccess.getStatus(auth, parent.id);
  }
}
