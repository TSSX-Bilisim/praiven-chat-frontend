import { useEffect, useState } from "react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UsageChart } from "@/components/dashboard/usage-chart";
import { ProviderUsageChart } from "@/components/dashboard/provider-usage-chart";
import { ModelUsageTable } from "@/components/dashboard/model-usage-table";
import { EntityStatsChart } from "@/components/dashboard/entity-stats-chart";
import { DollarSign, MessageSquare, Hash, Shield } from "lucide-react";
import { getMockDashboardStats } from "@/lib/mock/dashboard-data";
import type { DashboardStats } from "@/lib/types/dashboard";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulate API call
    const loadStats = async () => {
      // In real app, this would be: const response = await apiFetch<DashboardStatsResponse>('/dashboard/stats');
      const mockStats = getMockDashboardStats();
      setStats(mockStats);
    };

    loadStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <main className="flex w-full h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-background z-10 flex h-16 w-full shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          {isMobile && <SidebarTrigger />}
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Cost"
              value={formatCurrency(stats.totalUsage.totalCost)}
              description="Last 30 days"
              icon={DollarSign}
              gradient="bg-gradient-to-br from-emerald-500 to-green-600"
              iconBg="bg-white/20"
            />
            <StatsCard
              title="Total Tokens"
              value={formatNumber(stats.totalUsage.totalTokens)}
              description={`${formatNumber(stats.totalUsage.inputTokens)} input / ${formatNumber(stats.totalUsage.outputTokens)} output`}
              icon={Hash}
              gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
              iconBg="bg-white/20"
            />
            <StatsCard
              title="Total Requests"
              value={formatNumber(stats.totalUsage.totalRequests)}
              description="API calls made"
              icon={MessageSquare}
              gradient="bg-gradient-to-br from-purple-500 to-violet-600"
              iconBg="bg-white/20"
            />
            <StatsCard
              title="Entities Detected"
              value={formatNumber(stats.entityStats.totalEntitiesDetected)}
              description={`${formatNumber(stats.entityStats.totalMasked)} masked`}
              icon={Shield}
              gradient="bg-gradient-to-br from-orange-500 to-amber-600"
              iconBg="bg-white/20"
            />
          </div>

          {/* Usage Over Time Chart */}
          <UsageChart 
            data={stats.usageOverTime} 
            title="Usage Over Time (Last 30 Days)"
          />

          {/* Provider Usage Chart */}
          <ProviderUsageChart 
            data={stats.usageByProvider} 
            title="Usage by Provider"
          />

          {/* Model Usage Table */}
          <ModelUsageTable 
            data={stats.usageByModel} 
            title="Usage by Model"
          />

          {/* Entity Statistics */}
          <div className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Entity Detection Statistics</h2>
              <p className="text-muted-foreground mt-2">Comprehensive analysis of detected and masked entities</p>
            </div>
            <EntityStatsChart 
              typeData={stats.entityStats.byType}
              categoryData={stats.entityStats.byCategory}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

