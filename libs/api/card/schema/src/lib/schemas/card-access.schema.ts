import { EntitySchema } from '@elektra-nx/api/apollo/utils';
import { CardAccessModel } from '@elektra-nx/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CardAccessSchema extends EntitySchema implements CardAccessModel {
  @Field(() => Date, { nullable: true })
  expiration: Date;

  @Field(() => Boolean, { nullable: true })
  sent: boolean;
}
