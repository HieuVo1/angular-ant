export interface BaseResponse<T> {
  errorMessage: string;
  data: T;
  isSuccess: boolean;
}
