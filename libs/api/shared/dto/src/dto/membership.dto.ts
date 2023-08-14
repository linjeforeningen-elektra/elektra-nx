import { CreateMembershipModel, Specialisation, UpdateMembershipModel } from '@elektra-nx/shared/models';
import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class CreateMembershipDto implements CreateMembershipModel {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('NO')
  @Field(() => String)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  address: string;

  @IsNotEmpty()
  @IsNumberString()
  @Field(() => String)
  postal_code: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  gender: string;

  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  memberyear: Date;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  immatriculation?: Date;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  graduation?: Date;

  @IsOptional()
  @IsEnum(Specialisation)
  @Field(() => String, { nullable: true })
  specialisation?: Specialisation;
}

@InputType()
export class UpdateMembershipDto implements UpdateMembershipModel {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  phone?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  address?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  postal_code?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  gender?: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  memberyear?: Date;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  immatriculation?: Date;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  graduation?: Date;

  @IsOptional()
  @IsEnum(Specialisation)
  @Field(() => String, { nullable: true })
  specialisation?: Specialisation;
}
