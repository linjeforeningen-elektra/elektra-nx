import { CoreEntity } from '@elektra-nx/api/database/utils';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BlockRevisionModel } from '@elektra-nx/shared/models';
import { Block } from './block.entity';
import { UserEntity } from '@elektra-nx/api/user/models';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('block_revision')
@ObjectType()
export class BlockRevision extends CoreEntity implements BlockRevisionModel {
  @Column({ type: 'text' })
  @Field(() => String)
  content: string;

  @Column({ type: 'smallint', default: '1' })
  @Field(() => Int)
  version: number;

  @Column()
  @Field(() => String)
  blockId: string;

  @ManyToOne(() => Block, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blockId' })
  block: Block;

  @Column({ nullable: true })
  @Field(() => String)
  createdById: string;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: UserEntity;
}
