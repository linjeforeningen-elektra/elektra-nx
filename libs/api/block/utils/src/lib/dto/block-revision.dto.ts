import { BlockRevisionType, CreateBlockRevisionModel } from '@elektra-nx/shared/models';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBlockRevisionDto implements CreateBlockRevisionModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  content: string;

  @IsNotEmpty()
  @IsEnum(BlockRevisionType)
  @Field(() => String)
  type: BlockRevisionType;
}
