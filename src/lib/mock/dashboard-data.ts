import type { DashboardStats, UsageByDate } from '@/lib/types/dashboard';

// Generate mock data for last 30 days
function generateUsageOverTime(): UsageByDate[] {
  const data: UsageByDate[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const baseRequests = Math.floor(Math.random() * 50) + 10;
    const inputTokens = baseRequests * (Math.floor(Math.random() * 500) + 100);
    const outputTokens = baseRequests * (Math.floor(Math.random() * 800) + 200);
    const totalTokens = inputTokens + outputTokens;
    const costPerToken = 0.00002; // $0.00002 per token (example rate)
    
    data.push({
      date: date.toISOString().split('T')[0],
      totalTokens,
      inputTokens,
      outputTokens,
      totalRequests: baseRequests,
      totalCost: totalTokens * costPerToken,
    });
  }
  
  return data;
}

export function getMockDashboardStats(): DashboardStats {
  const usageOverTime = generateUsageOverTime();
  
  // Calculate totals from usage over time
  const totalTokens = usageOverTime.reduce((sum, day) => sum + day.totalTokens, 0);
  const inputTokens = usageOverTime.reduce((sum, day) => sum + day.inputTokens, 0);
  const outputTokens = usageOverTime.reduce((sum, day) => sum + day.outputTokens, 0);
  const totalRequests = usageOverTime.reduce((sum, day) => sum + day.totalRequests, 0);
  const totalCost = usageOverTime.reduce((sum, day) => sum + day.totalCost, 0);
  
  return {
    totalUsage: {
      totalTokens,
      inputTokens,
      outputTokens,
      totalRequests,
      totalCost,
    },
    usageByProvider: [
      {
        providerId: 1,
        providerName: 'OPENAI',
        totalTokens: Math.floor(totalTokens * 0.6),
        totalRequests: Math.floor(totalRequests * 0.6),
        totalCost: totalCost * 0.6,
      },
      {
        providerId: 2,
        providerName: 'CLAUDE',
        totalTokens: Math.floor(totalTokens * 0.25),
        totalRequests: Math.floor(totalRequests * 0.25),
        totalCost: totalCost * 0.25,
      },
      {
        providerId: 3,
        providerName: 'GEMINI',
        totalTokens: Math.floor(totalTokens * 0.15),
        totalRequests: Math.floor(totalRequests * 0.15),
        totalCost: totalCost * 0.15,
      },
    ],
    usageByModel: [
      {
        modelId: 1,
        modelName: 'gpt-4o',
        providerId: 1,
        providerName: 'OPENAI',
        totalTokens: Math.floor(totalTokens * 0.35),
        inputTokens: Math.floor(inputTokens * 0.35),
        outputTokens: Math.floor(outputTokens * 0.35),
        totalRequests: Math.floor(totalRequests * 0.35),
        totalCost: totalCost * 0.35,
      },
      {
        modelId: 2,
        modelName: 'gpt-4o-mini',
        providerId: 1,
        providerName: 'OPENAI',
        totalTokens: Math.floor(totalTokens * 0.25),
        inputTokens: Math.floor(inputTokens * 0.25),
        outputTokens: Math.floor(outputTokens * 0.25),
        totalRequests: Math.floor(totalRequests * 0.25),
        totalCost: totalCost * 0.25,
      },
      {
        modelId: 3,
        modelName: 'claude-3-5-sonnet-20241022',
        providerId: 2,
        providerName: 'CLAUDE',
        totalTokens: Math.floor(totalTokens * 0.25),
        inputTokens: Math.floor(inputTokens * 0.25),
        outputTokens: Math.floor(outputTokens * 0.25),
        totalRequests: Math.floor(totalRequests * 0.25),
        totalCost: totalCost * 0.25,
      },
      {
        modelId: 4,
        modelName: 'gemini-2.0-flash-exp',
        providerId: 3,
        providerName: 'GEMINI',
        totalTokens: Math.floor(totalTokens * 0.15),
        inputTokens: Math.floor(inputTokens * 0.15),
        outputTokens: Math.floor(outputTokens * 0.15),
        totalRequests: Math.floor(totalRequests * 0.15),
        totalCost: totalCost * 0.15,
      },
    ],
    usageOverTime,
    entityStats: {
      totalEntitiesDetected: 18642,
      totalMasked: 16789,
      totalUnmasked: 1853,
      byType: [
        {
          entityLabelId: 1,
          entityLabelName: 'Person Name',
          entityLabelKey: 'PERSON',
          count: 5234,
        },
        {
          entityLabelId: 2,
          entityLabelName: 'Email Address',
          entityLabelKey: 'EMAIL',
          count: 4521,
        },
        {
          entityLabelId: 3,
          entityLabelName: 'Phone Number',
          entityLabelKey: 'PHONE',
          count: 2847,
        },
        {
          entityLabelId: 4,
          entityLabelName: 'Credit Card',
          entityLabelKey: 'CREDIT_CARD',
          count: 2156,
        },
        {
          entityLabelId: 5,
          entityLabelName: 'Social Security Number',
          entityLabelKey: 'SSN',
          count: 1893,
        },
        {
          entityLabelId: 6,
          entityLabelName: 'Address',
          entityLabelKey: 'ADDRESS',
          count: 1991,
        },
      ],
      byCategory: [
        {
          category: 'Personal Information',
          count: 7127,
          percentage: 38.2,
        },
        {
          category: 'Contact Information',
          count: 7368,
          percentage: 39.5,
        },
        {
          category: 'Financial Information',
          count: 4147,
          percentage: 22.3,
        },
      ],
    },
  };
}

