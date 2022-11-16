import { CreateBlockRevisionModel } from '@elektra-nx/shared/models';
import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBlockRevisionDto implements CreateBlockRevisionModel {
  @IsNotEmpty()
  @IsString()
  content: string;
}
