import type { Model, Provider } from "@/lib/types/model";
import { apiFetch } from "@/lib/api/base";

async function fetchAvailableAIModels() {
  const response = await apiFetch<{ models: Model[] }>('/ai/models', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

async function fetchAvailableAIProviders() {
  const response = await apiFetch<{ providers: Provider[] }>('/ai/providers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

export { fetchAvailableAIModels, fetchAvailableAIProviders };