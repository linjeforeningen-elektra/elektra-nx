import { GQLAuth, GraphqlGuard, IdObject } from '@elektra-nx/api/apollo/utils';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { Block, BlockRevision } from '@elektra-nx/api/block/models';
import { CreateBlockDto, UpdateBlockDto } from '@elektra-nx/api/block/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BlockAclAdapter } from '../adapters';
import { BlockRevisionAclAdapter } from '../adapters/block-revision.adapter';

@Resolver(Block)
@UseGuards(GraphqlGuard)
export class BlockResolver {
  constructor(private block: BlockAclAdapter, private blockRevision: BlockRevisionAclAdapter) {}

  @Query(() => [Block], { name: 'blocks' })
  public findBlocks(@GQLAuth() auth: AuthUser) {
    return this.block.findBlocks(auth);
  }

  @Query(() => Block, { name: 'block' })
  public findOneBlock(@GQLAuth() auth: AuthUser, @Args('blockId', { type: () => String }) blockId: string) {
    return this.block.findOneBlock(auth, blockId);
  }

  @Mutation(() => Block)
  public createBlock(@GQLAuth() auth: AuthUser, @Args('body') body: CreateBlockDto) {
    return this.block.createBlock(auth, body);
  }

  @Mutation(() => Block)
  public updateBlock(
    @GQLAuth() auth: AuthUser,
    @Args('blockId', { type: () => String }) blockId: string,
    @Args('body') body: UpdateBlockDto,
  ) {
    return this.block.updateBlock(auth, blockId, body);
  }

  @Mutation(() => IdObject)
  public deleteBlock(@GQLAuth() auth: AuthUser, @Args('blockId', { type: () => String }) blockId: string) {
    return this.block.deleteBlock(auth, blockId);
  }

  @ResolveField(() => [BlockRevision], { name: 'revisions' })
  public findBlockRevisions(@GQLAuth() auth: AuthUser, @Parent() parent: Block) {
    return this.blockRevision.findBlockRevisions(auth, parent.id);
  }

  @ResolveField(() => BlockRevision, { name: 'latest', nullable: true })
  public findLatestRevision(@GQLAuth() auth: AuthUser, @Parent() parent: Block) {
    return this.blockRevision.findLatestRevision(auth, parent.id);
  }
}
