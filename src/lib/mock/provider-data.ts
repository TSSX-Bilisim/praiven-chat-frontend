import type { ProviderWithApiKey, ModelWithProvider } from '@/lib/types/provider';

export function getMockProviders(): ProviderWithApiKey[] {
  return [
    {
      id: 1,
      name: 'OPENAI',
      apiKey: 'sk-...4f2a', // masked
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-03-10'),
    },
    {
      id: 2,
      name: 'CLAUDE',
      apiKey: 'sk-ant-...8b3c', // masked
      isActive: true,
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-03-12'),
    },
    {
      id: 3,
      name: 'GEMINI',
      apiKey: undefined, // not configured
      isActive: false,
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01'),
    },
  ];
}

export function getMockModels(): ModelWithProvider[] {
  return [
    {
      id: 1,
      name: 'gpt-4o',
      description: 'Most advanced GPT-4 model with vision capabilities',
      providerId: 1,
      providerName: 'OPENAI',
      isActive: true,
      pricePerToken: 0.00003,
      defaultLimit: 1000000,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-03-10'),
    },
    {
      id: 2,
      name: 'gpt-4o-mini',
      description: 'Faster and more affordable GPT-4 variant',
      providerId: 1,
      providerName: 'OPENAI',
      isActive: true,
      pricePerToken: 0.00001,
      defaultLimit: 2000000,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-03-10'),
    },
    {
      id: 3,
      name: 'gpt-3.5-turbo',
      description: 'Fast and cost-effective GPT-3.5 model',
      providerId: 1,
      providerName: 'OPENAI',
      isActive: false,
      pricePerToken: 0.000005,
      defaultLimit: 3000000,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-20'),
    },
    {
      id: 4,
      name: 'claude-3-5-sonnet-20241022',
      description: 'Latest Claude 3.5 Sonnet with enhanced capabilities',
      providerId: 2,
      providerName: 'CLAUDE',
      isActive: true,
      pricePerToken: 0.000025,
      defaultLimit: 1500000,
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-03-12'),
    },
    {
      id: 5,
      name: 'claude-3-haiku-20240307',
      description: 'Fast and compact Claude 3 Haiku',
      providerId: 2,
      providerName: 'CLAUDE',
      isActive: true,
      pricePerToken: 0.000008,
      defaultLimit: 2500000,
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-03-12'),
    },
    {
      id: 6,
      name: 'gemini-2.0-flash-exp',
      description: 'Experimental fast Gemini 2.0 model',
      providerId: 3,
      providerName: 'GEMINI',
      isActive: false,
      pricePerToken: 0.00001,
      defaultLimit: 2000000,
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01'),
    },
    {
      id: 7,
      name: 'gemini-1.5-pro',
      description: 'Advanced Gemini 1.5 Pro with multimodal capabilities',
      providerId: 3,
      providerName: 'GEMINI',
      isActive: false,
      pricePerToken: 0.00002,
      defaultLimit: 1000000,
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01'),
    },
  ];
}

