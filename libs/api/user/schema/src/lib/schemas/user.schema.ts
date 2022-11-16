import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserModel, AccessRole } from '@elektra-nx/shared/models';
import { EntitySchema } from '@elektra-nx/api/apollo/utils';

@ObjectType()
export class UserSchema extends EntitySchema implements UserModel {
  @Field(() => String, { nullable: true })
  slug: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => [String], { nullable: true })
  roles: AccessRole[];
}

registerEnumType(AccessRole, { name: 'AccessRole' });
