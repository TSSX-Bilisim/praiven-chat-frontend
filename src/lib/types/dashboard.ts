// Dashboard and Usage Statistics Types

export type UsageByProvider = {
  providerId: number;
  providerName: string;
  totalTokens: number;
  totalRequests: number;
  totalCost: number;
};

export type UsageByModel = {
  modelId: number;
  modelName: string;
  providerId: number;
  providerName: string;
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  totalRequests: number;
  totalCost: number;
};

export type UsageByDate = {
  date: string; // YYYY-MM-DD
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  totalRequests: number;
  totalCost: number;
};

export type EntityTypeStats = {
  entityLabelId: number;
  entityLabelName: string;
  entityLabelKey: string;
  count: number;
};

export type EntityCategoryStats = {
  category: string;
  count: number;
  percentage: number;
};

export type DashboardStats = {
  totalUsage: {
    totalTokens: number;
    inputTokens: number;
    outputTokens: number;
    totalRequests: number;
    totalCost: number;
  };
  usageByProvider: UsageByProvider[];
  usageByModel: UsageByModel[];
  usageOverTime: UsageByDate[];
  entityStats: {
    totalEntitiesDetected: number;
    totalMasked: number;
    totalUnmasked: number;
    byType: EntityTypeStats[];
    byCategory: EntityCategoryStats[];
  };
};

// API Response Types
export type DashboardStatsResponse = {
  data: DashboardStats;
  message: string;
};

