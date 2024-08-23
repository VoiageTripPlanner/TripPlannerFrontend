export interface IPagination<T> {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  data: T[];
}