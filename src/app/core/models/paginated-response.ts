export interface PaginatedResponse<T> {
  pageIndex: number;
  pageSize: number;
  data: T[];
  count: number;
}
