import { CreateBlockRevisionModel } from '@elektra-nx/shared/models';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBlockRevisionDto implements CreateBlockRevisionModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  content: string;
}
