import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum OrderByDirection {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

@InputType()
export class OrderByOptions<T> {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  prop: keyof T;

  @Field(() => String)
  @IsNotEmpty()
  @IsEnum(OrderByDirection)
  direction: OrderByDirection;
}

@InputType({ isAbstract: true })
export class OrderByDto<T> {
  @IsOptional()
  @Type(() => OrderByOptions)
  @Field(() => OrderByOptions, { nullable: true })
  orderBy?: OrderByOptions<T>;
}
