import { IsDateString, IsOptional } from 'class-validator';

export class BeforeAfterDateDto {
  @IsOptional()
  @IsDateString()
  before?: string;

  @IsOptional()
  @IsDateString()
  after?: string;
}
