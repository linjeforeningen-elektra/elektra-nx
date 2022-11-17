import { JobModel } from '@elektra-nx/shared/models';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobSchema implements JobModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  link: string;

  @Field(() => String)
  deadline: string;

  @Field(() => String)
  company: string;

  @Field(() => String)
  companyimg: string;

  @Field(() => String)
  pct: string;

  @Field(() => String)
  desc: string;
}
