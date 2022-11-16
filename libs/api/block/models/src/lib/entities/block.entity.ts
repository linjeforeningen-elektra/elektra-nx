import { CoreEntity } from '@elektra-nx/api/database/utils';
import { BlockModel } from '@elektra-nx/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Unique } from 'typeorm';

@Entity('block')
@Unique('UQ_block_slug', ['slug'])
@ObjectType()
export class Block extends CoreEntity implements BlockModel {
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  slug?: string;

  // @Field(() => BlockRevision, { nullable: true })
  // latest?: BlockRevision;
}
