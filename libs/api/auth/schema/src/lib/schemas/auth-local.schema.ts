import { Field, ObjectType } from '@nestjs/graphql';
import { EntitySchema } from '@elektra-nx/api/apollo/utils';
import { AuthLocalModel } from '@elektra-nx/shared/models';

@ObjectType()
export class AuthLocalSchema extends EntitySchema implements Pick<AuthLocalModel, 'email'> {
  @Field(() => String, { nullable: true })
  email: string;
}
