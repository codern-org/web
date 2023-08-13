export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: ApiError;
}

export interface ApiError {
  code: number;
  message: string;
  data: unknown;
}
