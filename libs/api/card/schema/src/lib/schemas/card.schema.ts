import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EntitySchema } from '@elektra-nx/api/apollo/utils';
import { CardAccessStatus, CardModel } from '@elektra-nx/shared/models';
import { UserSchema } from '@elektra-nx/api/user/schema';

@ObjectType()
export class CardSchema extends EntitySchema implements CardModel {
  @Field(() => String, { nullable: true })
  student_number: string;

  @Field(() => String, { nullable: true })
  userId: string;

  user: UserSchema; // TODO: fix
}

registerEnumType(CardAccessStatus, { name: 'CardAccessStatus' });
