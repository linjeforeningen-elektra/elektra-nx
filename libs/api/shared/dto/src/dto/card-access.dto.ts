import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateCardAccessDto {
  @IsNotEmpty()
  @IsDate()
  expiration: Date;

  @IsNotEmpty()
  @IsBoolean()
  sent: boolean;
}

@InputType()
export class UpdateCardAccessDto {
  @IsOptional()
  @IsBoolean()
  sent?: boolean;

  @IsOptional()
  @IsDate()
  expiration?: Date;
}

// export class UpdateCardAccessDto implements Pick<CardAccess, 'sent'> {}
