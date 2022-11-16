import { CoreModel } from '@elektra-nx/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class EntitySchema implements CoreModel {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  ownerId: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
