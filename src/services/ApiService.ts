import { Axios } from '@/libs/Axios';
import { ApiResponse } from '@/types/ApiResponseTypes';

export abstract class ApiService {
  protected get<T = object>(url: string) {
    return Axios.get<ApiResponse<T>>(url);
  }

  protected post<T = object>(url: string, data: object) {
    return Axios.post<ApiResponse<T>>(url, data);
  }

  protected put<T = object>(url: string, data: object) {
    return Axios.put<ApiResponse<T>>(url, data);
  }

  protected patch<T = object>(url: string, data: object) {
    return Axios.patch<ApiResponse<T>>(url, data);
  }

  protected delete<T = object>(url: string, data: object) {
    return Axios.delete<ApiResponse<T>>(url, data);
  }

  protected upload<T = object>(url: string, data: FormData) {
    return Axios.post<ApiResponse<T>>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Throws the error object from the API response. Or return the root of the error if it does not exist,
  // in case the root of the error instance is not from the API response.
  protected throwError(error: unknown): never {
    if (typeof error === 'string') {
      throw new Error(error);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw (error as any)?.response?.error || error;
    }
  }
}
