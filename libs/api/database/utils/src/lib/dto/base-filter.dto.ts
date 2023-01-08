import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { OrderByOptions } from './order-by.dto';
import { PaginationOptions } from './pagination.dto';

@InputType({ isAbstract: true })
export class BaseFilter<T = unknown> {
  @IsOptional()
  @Type(() => OrderByOptions)
  @ValidateNested()
  @Field(() => OrderByOptions, { nullable: true })
  orderBy?: OrderByOptions<T>;

  @IsOptional()
  @Type(() => PaginationOptions)
  @ValidateNested()
  @Field(() => PaginationOptions, { nullable: true })
  pagination?: PaginationOptions;
}
