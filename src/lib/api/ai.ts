import type { Model, Provider } from "@/lib/types/model";
import type { 
  CreateProviderRequest,
  UpdateProviderRequest
} from "@/lib/types/provider";
import { apiFetch } from "@/lib/api/base";

// ===== Models API =====

async function fetchAvailableAIModels() {
  const response = await apiFetch<{ models: Model[] }>('/ai/models', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return response;
}

export interface ModelResponse {
  id: number;
  name: string;
  description?: string;
  providerId: number;
  provider?: {
    id: number;
    name: string;
    isActive: boolean;
  };
  isActive: boolean;
  pricePerToken?: number;
  defaultLimit?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

async function fetchAllModels() {
  const response = await apiFetch<{ models: ModelResponse[] }>('/llm-models', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response;
}

async function updateModel(id: number, data: { pricePerToken?: number; isActive?: boolean }) {
  const response = await apiFetch<{ model: ModelResponse }>(`/llm-models/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return response;
}

// ===== Providers API =====

async function fetchAvailableAIProviders() {
  const response = await apiFetch<{ providers: Provider[] }>('/ai/providers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return response;
}

export interface ProviderResponse {
  id: number;
  name: string;
  apiKey?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

async function fetchAllProviders() {
  const response = await apiFetch<{ providers: ProviderResponse[] }>('/ai/providers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response;
}

async function updateProvider(id: number, data: UpdateProviderRequest) {
  const response = await apiFetch<{ provider: ProviderResponse }>(`/ai/provider/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return response;
}

async function createProvider(data: CreateProviderRequest) {
  const response = await apiFetch<{ provider: ProviderResponse }>('/llm-provider', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return response;
}

async function updateProviderApiKey(id: number, apiKey: string) {
  const response = await apiFetch<{ provider: ProviderResponse }>(`/llm-provider/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ apiKey }),
  });
  return response;
}

async function deleteProvider(id: number) {
  const response = await apiFetch<void>(`/llm-provider/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response;
}

// ===== Analytics/Dashboard API =====

async function fetchDashboardStats() {
  const response = await apiFetch<any>('/analytics/dashboard', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response;
}

export { 
  fetchAvailableAIModels, 
  fetchAvailableAIProviders,
  fetchAllModels,
  updateModel,
  fetchAllProviders,
  updateProvider,
  createProvider,
  updateProviderApiKey,
  deleteProvider,
  fetchDashboardStats
};