import { BaseFilter } from '@elektra-nx/api/database/utils';
import { User } from '@elektra-nx/api/user/models';
import { AccessRole } from '@elektra-nx/shared/models';
import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

const nullable = true;

@InputType()
export class FindUsersFilterDto extends BaseFilter<User> {
  @IsOptional()
  @IsString()
  @Transform((p) => String(p.value).toLowerCase())
  @Field(() => String, { nullable })
  name?: string;

  @IsOptional()
  @IsString()
  @Transform((p) => String(p.value).toLowerCase())
  @Field(() => String, { nullable })
  slug?: string;

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable })
  roles?: AccessRole[];
}
