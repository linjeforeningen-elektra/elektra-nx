import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumberString, IsString, ValidateNested } from 'class-validator';
import {
  ConfirmEmailModel,
  CreateAuthLocalModel,
  LoginWithAuthLocalModel,
  RegisterWithAuthLocalModel,
} from '@elektra-nx/shared/models';
import { CreateUserDto } from './user.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginWithAuthLocalDto implements LoginWithAuthLocalModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  @Transform((p) => (<string>p.value).toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;
}

@InputType()
export class CreateAuthLocalDto implements CreateAuthLocalModel {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  @Transform((p) => (<string>p.value).toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;
}

@InputType()
export class RegisterWithAuthLocalDto implements RegisterWithAuthLocalModel {
  @Type(() => CreateUserDto)
  @ValidateNested()
  @IsNotEmpty()
  @Field(() => CreateUserDto)
  user: CreateUserDto;

  @Type(() => CreateAuthLocalDto)
  @ValidateNested()
  @IsNotEmpty()
  @Field(() => CreateAuthLocalDto)
  auth: CreateAuthLocalDto;
}

@InputType()
export class ConfirmEmailDto implements ConfirmEmailModel {
  @IsNotEmpty()
  @IsNumberString()
  @Field(() => String)
  code: string;
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  @Transform((p) => (<string>p.value).toLowerCase())
  email: string;
}
