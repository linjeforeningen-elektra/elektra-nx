import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateAuthLocalModel, LoginWithAuthLocalModel, RegisterWithAuthLocalModel } from '@elektra-nx/shared/models';
import { CreateUserDto } from './user.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginWithAuthLocalDto implements LoginWithAuthLocalModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;
}

export class CreateAuthLocalDto implements CreateAuthLocalModel {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterWithAuthLocalDto implements RegisterWithAuthLocalModel {
  @Type(() => CreateUserDto)
  @ValidateNested()
  @IsNotEmpty()
  user: CreateUserDto;

  @Type(() => CreateAuthLocalDto)
  @ValidateNested()
  @IsNotEmpty()
  auth: CreateAuthLocalDto;
}
