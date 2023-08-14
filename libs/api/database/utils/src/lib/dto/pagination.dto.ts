import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class PaginationOptions {
  @Field(() => Int)
  @IsInt()
  offset: number;
  @Field(() => Int)
  @IsInt()
  limit: number;
}

@InputType({ isAbstract: true })
export class PaginationDto {
  @IsOptional()
  @Type(() => PaginationOptions)
  @Field(() => PaginationOptions, { nullable: true })
  pagination?: PaginationOptions;
}
