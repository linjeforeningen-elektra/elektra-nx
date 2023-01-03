import { JobModel } from '@elektra-nx/shared/models';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobSchema implements JobModel {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  location: string;

  @Field(() => String, { nullable: true })
  link: string;

  @Field(() => String, { nullable: true })
  deadline: string;

  @Field(() => String, { nullable: true })
  company: string;

  @Field(() => String, { nullable: true })
  companyimg: string;

  @Field(() => String, { nullable: true })
  pct: string;

  @Field(() => String, { nullable: true })
  desc: string;
}
