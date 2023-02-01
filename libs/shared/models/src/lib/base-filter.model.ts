export interface BaseFilterModel<T> {
  orderBy?: {
    prop: keyof T;
    direction: 'ASC' | 'DESC';
  };
  pagination?: {
    limit: number;
    offset: number;
  };
}

export interface PaginationOptionsModel {
  limit: number;
  offset: number;
}
