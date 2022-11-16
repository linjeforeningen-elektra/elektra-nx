import {
  BlockAclAdapter,
  BlockRevisionAclAdapter,
  BlockResolver,
  BlockRevisionService,
  BlockService,
  BlockRevisionResolver,
} from '@elektra-nx/api/block/data-access';
import { Block, BlockRevision } from '@elektra-nx/api/block/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Block, BlockRevision])],
  providers: [
    BlockService,
    BlockRevisionService,
    BlockAclAdapter,
    BlockRevisionAclAdapter,
    BlockResolver,
    BlockRevisionResolver,
  ],
  exports: [BlockService],
})
export class BlockModule {}
