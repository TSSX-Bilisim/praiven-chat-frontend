// Extended Provider and Model Types

export type ProviderWithApiKey = {
  id: number;
  name: string;
  apiKey?: string; // masked or partial
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ModelWithProvider = {
  id: number;
  name: string;
  description?: string;
  providerId: number;
  providerName: string;
  isActive: boolean;
  pricePerToken?: number;
  defaultLimit?: number;
  updatedAt: Date;
  createdAt: Date;
};

export type CreateProviderRequest = {
  name: 'OPENAI' | 'GEMINI' | 'CLAUDE';
  apiKey: string;
};

export type UpdateProviderRequest = {
  apiKey?: string;
  isActive?: boolean;
};

export type UpdateModelRequest = {
  isActive: boolean;
};

