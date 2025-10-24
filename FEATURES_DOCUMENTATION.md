# New Features Documentation

## Overview
This document describes the newly implemented frontend features for the SecurAI application. All features use mock data and follow the expected API response format for easy backend integration later.

## ✨ Features Implemented

### 1. 📊 Dashboard (Analytics & Statistics)
**Route:** `/dashboard`  
**Location:** `apps/frontend-react/src/pages/dashboard/index.tsx`

A comprehensive analytics dashboard displaying:

#### Key Metrics (Stats Cards)
- **Total Cost** - Aggregate cost for the last 30 days
- **Total Tokens** - Input/Output token breakdown
- **Total Requests** - Number of API calls made
- **Entities Detected** - Count of masked/unmasked entities

#### Charts & Visualizations

**Usage Over Time (Line Chart)**
- Shows daily token and request trends over the last 30 days
- Helps identify usage patterns and spikes

**Usage by Provider (Bar Chart)**
- Compares token usage and requests across different AI providers (OpenAI, Claude, Gemini)
- Visual breakdown of provider utilization

**Usage by Model (Table)**
- Detailed breakdown by model including:
  - Input/Output tokens
  - Total tokens
  - Number of requests
  - Cost per model
  - Provider information

**Entity Detection Statistics**
- **By Type (Horizontal Bar Chart):** Shows counts for different entity types (Person, Email, Phone, Credit Card, SSN, Address)
- **By Category (Pie Chart):** Categorizes entities into Personal Information, Contact Information, and Financial Information

### 2. 🔑 AI Providers Management
**Route:** `/providers`  
**Location:** `apps/frontend-react/src/pages/providers/index.tsx`

Manage AI provider configurations and API keys.

#### Features
- **View all providers** with their status (Active/Inactive)
- **Add new providers** - Dialog to add OpenAI, Claude, or Gemini
- **Edit API keys** - Update existing provider API keys
- **Toggle provider status** - Activate/deactivate providers
- **Masked API keys** - Shows keys in format `sk-...xxxx` for security

#### Provider Cards Display
- Provider name and icon
- Active/Inactive badge
- Masked API key (if configured)
- Creation and update timestamps
- Quick action buttons (Edit, Activate/Deactivate)

### 3. 🤖 AI Models Management
**Route:** `/models`  
**Location:** `apps/frontend-react/src/pages/models/index.tsx`

Manage AI models across different providers.

#### Features
- **View all models** grouped by provider
- **Filter by provider** - OpenAI, Claude, Gemini, or All
- **Filter by status** - Active, Inactive, or All
- **Toggle model status** - Activate/deactivate models
- **Model details** including:
  - Model name and description
  - Provider
  - Price per token
  - Default token limit
  - Active status
  - Last updated timestamp

#### Supported Models (Mock Data)
**OpenAI:**
- gpt-4o (Active)
- gpt-4o-mini (Active)
- gpt-3.5-turbo (Inactive)

**Claude:**
- claude-3-5-sonnet-20241022 (Active)
- claude-3-haiku-20240307 (Active)

**Gemini:**
- gemini-2.0-flash-exp (Inactive)
- gemini-1.5-pro (Inactive)

## 📁 File Structure

```
apps/frontend-react/src/
├── components/
│   ├── dashboard/
│   │   ├── stats-card.tsx              # Reusable stats card component
│   │   ├── usage-chart.tsx             # Line chart for usage over time
│   │   ├── provider-usage-chart.tsx    # Bar chart for provider comparison
│   │   ├── model-usage-table.tsx       # Detailed model usage table
│   │   └── entity-stats-chart.tsx      # Entity statistics visualizations
│   ├── providers/
│   │   ├── provider-card.tsx           # Provider display card
│   │   └── provider-dialog.tsx         # Add/Edit provider dialog
│   ├── models/
│   │   └── model-card.tsx              # Model display card
│   └── ui/
│       └── badge.tsx                   # Badge component (NEW)
├── lib/
│   ├── types/
│   │   ├── dashboard.ts                # Dashboard data types
│   │   └── provider.ts                 # Provider/Model types
│   └── mock/
│       ├── dashboard-data.ts           # Mock dashboard statistics
│       └── provider-data.ts            # Mock providers/models data
└── pages/
    ├── dashboard/
    │   └── index.tsx                   # Dashboard page
    ├── providers/
    │   └── index.tsx                   # Providers management page
    └── models/
        └── index.tsx                   # Models management page
```

## 🎨 UI Components Used

- **Recharts** - For data visualization (charts)
- **Radix UI** - For dialogs, badges, and other UI primitives
- **Lucide React** - For icons
- **Tailwind CSS** - For styling
- **Shadcn/ui** - Base UI components

## 📊 Data Format (Mock Data Structure)

All mock data follows the expected backend API response format:

### Dashboard Stats Response
```typescript
{
  data: {
    totalUsage: {
      totalTokens: number;
      inputTokens: number;
      outputTokens: number;
      totalRequests: number;
      totalCost: number;
    };
    usageByProvider: Array<{
      providerId: number;
      providerName: string;
      totalTokens: number;
      totalRequests: number;
      totalCost: number;
    }>;
    usageByModel: Array<{
      modelId: number;
      modelName: string;
      providerId: number;
      providerName: string;
      totalTokens: number;
      inputTokens: number;
      outputTokens: number;
      totalRequests: number;
      totalCost: number;
    }>;
    usageOverTime: Array<{
      date: string; // YYYY-MM-DD
      totalTokens: number;
      inputTokens: number;
      outputTokens: number;
      totalRequests: number;
      totalCost: number;
    }>;
    entityStats: {
      totalEntitiesDetected: number;
      totalMasked: number;
      totalUnmasked: number;
      byType: Array<{
        entityLabelId: number;
        entityLabelName: string;
        entityLabelKey: string;
        count: number;
      }>;
      byCategory: Array<{
        category: string;
        count: number;
        percentage: number;
      }>;
    };
  };
  message: string;
}
```

### Providers Response
```typescript
{
  data: {
    providers: Array<{
      id: number;
      name: 'OPENAI' | 'GEMINI' | 'CLAUDE';
      apiKey?: string; // masked: "sk-...xxxx"
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    }>;
  };
  message: string;
}
```

### Models Response
```typescript
{
  data: {
    models: Array<{
      id: number;
      name: string;
      description?: string;
      providerId: number;
      providerName: string;
      isActive: boolean;
      pricePerToken?: number;
      defaultLimit?: number;
      createdAt: Date;
      updatedAt: Date;
    }>;
  };
  message: string;
}
```

## 🔌 Backend Integration Points

When ready to integrate with the backend, replace mock data calls in these files:

1. **Dashboard** (`pages/dashboard/index.tsx`):
   ```typescript
   // Replace:
   const mockStats = getMockDashboardStats();
   // With:
   const response = await apiFetch<DashboardStatsResponse>('/dashboard/stats');
   ```

2. **Providers** (`pages/providers/index.tsx`):
   ```typescript
   // Replace:
   const mockProviders = getMockProviders();
   // With:
   const response = await apiFetch<{ providers: ProviderWithApiKey[] }>('/ai/providers');
   ```

3. **Models** (`pages/models/index.tsx`):
   ```typescript
   // Replace:
   const mockModels = getMockModels();
   // With:
   const response = await apiFetch<{ models: ModelWithProvider[] }>('/ai/models');
   ```

## 🚀 Navigation

All new pages are accessible via the sidebar:
- **Dashboard** - LayoutDashboard icon
- **AI Providers** - Blocks icon
- **AI Models** - Cpu icon

## 📱 Responsive Design

All pages are fully responsive and include:
- Mobile-optimized layouts
- Sidebar trigger for mobile devices
- Responsive grids and tables
- Touch-friendly buttons and controls

## 🎯 Next Steps for Backend Integration

1. Create endpoint: `GET /api/dashboard/stats` - Returns dashboard statistics
2. Create endpoint: `GET /api/ai/providers` - Returns all providers with masked API keys
3. Create endpoint: `POST /api/ai/provider` - Create new provider
4. Create endpoint: `PATCH /api/ai/provider/:id` - Update provider (API key or status)
5. Create endpoint: `GET /api/ai/models` - Returns all models
6. Create endpoint: `PATCH /api/ai/model/:id` - Update model status

## 🔒 Security Considerations

- API keys are always displayed in masked format (`sk-...xxxx`) in the UI
- Actual API keys should be encrypted in the database
- Provider API keys are transmitted via password input fields
- All API calls should be authenticated and authorized

## 📚 Additional Notes

- Charts use the application's theme colors defined in `global.css`
- Dark mode is fully supported across all new pages
- All icons come from `lucide-react` for consistency
- The codebase follows TypeScript strict mode
- All components follow React best practices with proper hooks usage

---

**Created:** October 24, 2025  
**Status:** ✅ Complete - Ready for Backend Integration

