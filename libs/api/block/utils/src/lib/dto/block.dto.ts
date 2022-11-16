import { IsOptional, IsString } from 'class-validator';
import { CreateBlockModel, UpdateBlockModel } from '@elektra-nx/shared/models';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBlockDto implements CreateBlockModel {
  @IsOptional()
  @IsString()
  @Field(() => String)
  slug: string;
}

@InputType()
export class UpdateBlockDto implements UpdateBlockModel {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  slug?: string;
}
