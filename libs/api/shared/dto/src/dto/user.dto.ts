import { AccessRole, UserModel } from '@elektra-nx/shared/models';
import type { PickPartial } from '@elektra-nx/shared/util/types';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsLowercase, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDto implements Pick<UserModel, 'name' | 'slug'> {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsOptional()
  @IsString()
  @IsLowercase()
  @Field(() => String, { nullable: true })
  slug?: string;
}

@InputType()
export class UpdateUserDto implements PickPartial<UserModel, 'name' | 'slug' | 'roles'> {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  slug?: string;

  @IsOptional()
  @IsEnum(AccessRole, { each: true })
  @Field(() => [String], { nullable: true })
  roles?: AccessRole[];
}

@InputType()
export class DeleteUserDto implements Pick<UserModel, 'id'> {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: string;
}
