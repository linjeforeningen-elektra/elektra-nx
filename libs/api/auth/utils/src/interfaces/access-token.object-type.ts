import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GQLAccessToken {
  @Field(() => String)
  access_token: string;
}
