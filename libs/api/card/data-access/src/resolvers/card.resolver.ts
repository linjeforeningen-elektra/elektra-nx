import { GQLAuth, GraphqlGuard, IdObject } from '@elektra-nx/api/apollo/utils';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { CardAccessSchema, CardSchema } from '@elektra-nx/api/card/schema';
import { CreateCardDto } from '@elektra-nx/api/shared/dto';
import { CardAccessStatus } from '@elektra-nx/shared/models';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CardAccessAclAdapter, CardAclAdapter } from '../adapters';

@Resolver(CardSchema)
@UseGuards(GraphqlGuard)
export class CardResolver {
  constructor(private card: CardAclAdapter, private cardAccess: CardAccessAclAdapter) {}

  @Mutation(() => CardSchema)
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

  @ResolveField(() => [CardAccessSchema], { name: 'card_access', nullable: true })
  public async getCardAccess(@GQLAuth() auth: AuthUser, @Parent() parent: CardSchema) {
    return this.cardAccess.findByCardRelation(auth, parent);
  }

  @ResolveField(() => CardAccessStatus, { nullable: true, name: 'status' })
  public async getCardStatus(@GQLAuth() auth: AuthUser, @Parent() parent: CardSchema) {
    return this.cardAccess.getStatus(auth, parent.id);
  }
}
