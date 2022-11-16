import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IdObject {
  @Field(() => String)
  id: string;
}
