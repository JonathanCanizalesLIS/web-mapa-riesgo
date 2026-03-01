export interface ApiResponse<T> {
  id: number;
  status: number;
  message: string;
  hasError: boolean;
  data: T;
}
