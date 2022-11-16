export type PickPartial<T, U extends keyof T> = Partial<Pick<T, U>>;
