import { SelectQueryBuilder } from 'typeorm';
import { PaginationOptions } from '../dto';

export function paginateQuery<T>(qb: SelectQueryBuilder<T>, dto: PaginationOptions) {
  const { page, page_size } = dto;

  if (page > 0) {
    qb.skip(page_size * (page - 1));
  }

  qb.take(page_size);
}
