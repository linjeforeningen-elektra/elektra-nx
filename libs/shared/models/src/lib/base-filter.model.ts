export interface BaseFilterModel<T> {
  orderBy?: {
    prop: keyof T;
    direction: 'ASC' | 'DESC';
  };
  pagination?: {
    page: number;
    page_size: number;
  };
}
