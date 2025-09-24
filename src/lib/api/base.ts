import type { ApiResponse } from '@/lib/types/api-response';


export const apiUrl = `/api`;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(`${apiUrl}${path}`, options);
  const data: ApiResponse<T> = await res.json();
  return data;
}
