import type { ApiResponse } from '@/lib/types/api-response';


const API_HOST = import.meta.env.VITE_HOST ?? 'localhost';
const API_PORT = import.meta.env.VITE_PORT ?? 3000;
export const apiUrl = `http://${API_HOST}:${API_PORT}/api`;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(`${apiUrl}${path}`, options);
  const data: ApiResponse<T> = await res.json();
  return data;
}
