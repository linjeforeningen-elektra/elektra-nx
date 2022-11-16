import { GQLAuth, GraphqlGuard } from '@elektra-nx/api/apollo/utils';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { BlockRevision } from '@elektra-nx/api/block/models';
import { CreateBlockRevisionDto } from '@elektra-nx/api/block/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BlockRevisionAclAdapter } from '../adapters';

@Resolver(BlockRevision)
@UseGuards(GraphqlGuard)
export class BlockRevisionResolver {
  constructor(private blockRevision: BlockRevisionAclAdapter) {}

  @Mutation(() => BlockRevision)
  public createBlockRevision(
    @GQLAuth() auth: AuthUser,
    @Args('blockId', { type: () => String }) blockId: string,
    @Args('body') body: CreateBlockRevisionDto,
  ) {
    return this.blockRevision.createBlockRevision(auth, blockId, body);
  }
}
