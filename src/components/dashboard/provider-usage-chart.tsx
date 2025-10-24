import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { UsageByProvider } from "@/lib/types/dashboard";

type ProviderUsageChartProps = {
  data: UsageByProvider[];
  title: string;
};

const PROVIDER_COLORS = {
  OPENAI: '#10b981',
  CLAUDE: '#8b5cf6', 
  GEMINI: '#3b82f6',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const providerColor = PROVIDER_COLORS[data.providerName as keyof typeof PROVIDER_COLORS] || '#94a3b8';

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-xl">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: providerColor }}
        />
        <p className="font-bold text-white text-sm">{data.providerName}</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400 text-xs">Total Tokens:</span>
          <span className="text-white font-semibold text-sm tabular-nums">
            {formatNumber(data.totalTokens)}
          </span>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400 text-xs">Requests:</span>
          <span className="text-white font-semibold text-sm tabular-nums">
            {formatNumber(data.totalRequests)}
          </span>
        </div>
        
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-700">
          <span className="text-gray-400 text-xs">Total Cost:</span>
          <span className="text-emerald-400 font-bold text-sm tabular-nums">
            ${formatNumber(data.totalCost)}
          </span>
        </div>
      </div>
    </div>
  );
};

interface CustomLegendProps {
  payload?: { color: string; value: string }[];
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  return (
    <div className="flex items-center justify-center gap-8 mt-4">
      {payload?.map((entry: { color: string; value: string }, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-white">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export function ProviderUsageChart({ data, title }: ProviderUsageChartProps) {
  return (
    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">Compare usage across different AI providers</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} barGap={10}>
          <defs>
            <linearGradient id="openaiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="claudeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="geminiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="providerName" 
            stroke="#999"
            tick={{ fill: '#fff', fontSize: 15, fontWeight: 700 }}
          />
          <YAxis 
            stroke="#999"
            tick={{ fill: '#fff', fontSize: 13, fontWeight: 600 }}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="totalTokens" name="Total Tokens" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#${entry.providerName.toLowerCase()}Gradient)`} />
            ))}
          </Bar>
          <Bar dataKey="totalRequests" name="Requests" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PROVIDER_COLORS[entry.providerName as keyof typeof PROVIDER_COLORS] || '#94a3b8'} opacity={0.7} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

