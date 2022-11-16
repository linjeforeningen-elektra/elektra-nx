import { CreateCardModel, UpdateCardModel } from '@elektra-nx/shared/models';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CreateCardDto implements CreateCardModel {
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  @Field(() => String)
  student_number: string;
}

@InputType()
export class DeleteCardDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: string;
}

export class UpdateCardDto implements UpdateCardModel {
  @IsOptional()
  @IsNumberString()
  student_number: string;
}
