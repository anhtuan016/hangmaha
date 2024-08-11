export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  error?: string;
}

export interface ApiResponseWithPaging<T> extends ApiResponse<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
