// export class BasePagination {
//   @IsNotEmpty()
//   @IsInt()
//   page: number;

//   @IsNotEmpty()
//   @IsInt()
//   size: number;
// }

// export class BaseFilter {
//   @IsOptional()
//   @Type(() => BasePagination)
//   @ValidateNested()
//   pagination: BasePagination;
// }
