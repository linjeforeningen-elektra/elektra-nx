import { EntitySchema } from '@elektra-nx/api/apollo/utils';
import { MembershipModel, Specialisation } from '@elektra-nx/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MembershipSchema extends EntitySchema implements MembershipModel {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  postal_code: string;

  @Field(() => Date, { nullable: true })
  memberyear: Date;

  @Field(() => Date, { nullable: true })
  immatriculation?: Date;

  @Field(() => Date, { nullable: true })
  graduation?: Date;

  @Field(() => Boolean, { nullable: true })
  confirmed: boolean;

  @Field(() => String, { nullable: true })
  specialisation?: Specialisation;

  @Field(() => String, { nullable: true })
  gender: string;
}

// registerEnumType(Specialisation, {
//   name: 'Specialisation',
//   valuesMap: Object.fromEntries(Object.entries(Specialisation)),
// });
