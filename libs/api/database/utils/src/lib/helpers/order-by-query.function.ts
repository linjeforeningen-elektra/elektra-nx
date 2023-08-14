import { SelectQueryBuilder } from 'typeorm';
import { OrderByOptions } from '../dto';

export function orderByQuery<T>(qb: SelectQueryBuilder<T>, options: OrderByOptions<T>) {
  const { prop, direction } = options;
  qb.orderBy(<string>prop, direction);
}
