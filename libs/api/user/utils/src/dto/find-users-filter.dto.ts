import { BaseFilter } from '@elektra-nx/api/database/utils';
import { AccessRole, FindUserFilterModel, UserModel } from '@elektra-nx/shared/models';
import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

const nullable = true;

@InputType()
export class FindUsersFilterDto extends BaseFilter<UserModel> implements FindUserFilterModel {
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

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable })
  _roles?: AccessRole[];
}
