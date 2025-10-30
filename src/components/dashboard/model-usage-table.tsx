import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { UsageByModel } from "@/lib/types/dashboard";

type ModelUsageTableProps = {
  data: UsageByModel[];
  title: string;
};

const PROVIDER_BADGE_STYLES = {
  OPENAI: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  CLAUDE: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  GEMINI: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export function ModelUsageTable({ data, title }: ModelUsageTableProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getProviderBadgeStyle = (providerName: string) => {
    return PROVIDER_BADGE_STYLES[providerName as keyof typeof PROVIDER_BADGE_STYLES] || "bg-gray-500/10 text-gray-600 border-gray-500/20";
  };

  return (
    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">Detailed breakdown of usage across all models</p>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Model</th>
              <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Provider</th>
              <th className="text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Input</th>
              <th className="text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Output</th>
              <th className="text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total</th>
              <th className="text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Requests</th>
              <th className="text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((model, index) => (
              <tr 
                key={model.modelId} 
                className="hover:bg-muted/30 transition-colors group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="py-4 px-4">
                  <div className="text-sm font-semibold">{model.modelName}</div>
                </td>
                <td className="py-4 px-4">
                  <Badge 
                    variant="outline"
                    className={getProviderBadgeStyle(model.providerName)}
                  >
                    {model.providerName}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-sm text-right tabular-nums">{formatNumber(model.inputTokens)}</td>
                <td className="py-4 px-4 text-sm text-right tabular-nums">{formatNumber(model.outputTokens)}</td>
                <td className="py-4 px-4 text-sm text-right font-semibold tabular-nums">{formatNumber(model.totalTokens)}</td>
                <td className="py-4 px-4 text-sm text-right tabular-nums text-muted-foreground">{formatNumber(model.totalRequests)}</td>
                <td className="py-4 px-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-500/10 text-green-600 text-sm font-semibold tabular-nums">
                    {formatCurrency(model.totalCost)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

