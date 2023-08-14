import {
  AccessRole,
  AddManyUserRoleModel,
  AddOneUserRoleModel,
  RemoveOneUserRoleModel,
  UpdateUserModel,
  UserModel,
} from '@elektra-nx/shared/models';
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
export class UpdateUserDto implements UpdateUserModel {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  slug?: string;
}

@InputType()
export class DeleteUserDto implements Pick<UserModel, 'id'> {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: string;
}

@InputType()
export class AddOneUserRoleDto implements AddOneUserRoleModel {
  @IsNotEmpty()
  @IsEnum(AccessRole)
  @Field(() => String)
  role: AccessRole;
}

@InputType()
export class RemoveOneUserRoleDto implements RemoveOneUserRoleModel {
  @IsNotEmpty()
  @IsEnum(AccessRole)
  @Field(() => String)
  role: AccessRole;
}

@InputType()
export class AddManyUserRoleDto implements AddManyUserRoleModel {
  @IsNotEmpty()
  @IsString({ each: true })
  @Field(() => [String])
  userIds: string[];

  @IsNotEmpty()
  @IsEnum(AccessRole)
  @Field(() => String)
  role: AccessRole;
}
