import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import type { EntityTypeStats } from "@/lib/types/dashboard";
import { useTheme } from "next-themes";

type EntityTypeChartProps = {
  data: EntityTypeStats[];
};

// Base color palette - will cycle through these colors for any number of bars
const BASE_COLORS = [
  '#10b981', // emerald
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#f59e0b', // amber
  '#ef4444', // red
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#14b8a6', // teal
];

// Function to get color for any index - cycles through BASE_COLORS
const getColorForIndex = (index: number): string => {
  return BASE_COLORS[index % BASE_COLORS.length];
};

type TooltipData = {
  entityLabelName: string;
  count: number;
  [key: string]: unknown;
};

type TooltipPayload = {
  payload: TooltipData;
  fill?: string;
  [key: string]: unknown;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

  return (
    <div className="bg-popover/98 backdrop-blur-md border border-border rounded-lg px-4 py-3 shadow-2xl">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: payload[0].fill }}
          />
          <span className="text-foreground font-bold text-sm">{data.entityLabelName}</span>
        </div>
        <span className="text-emerald-500 dark:text-emerald-400 font-bold text-lg tabular-nums pl-5">
          {formatNumber(data.count)} detected
        </span>
      </div>
    </div>
  );
};

export function EntityTypeChart({ data }: EntityTypeChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  // Theme-aware colors
  const gridColor = isDark ? 'hsl(var(--border))' : '#e5e7eb';
  const axisColor = isDark ? '#666' : '#9ca3af';
  const tickColor = isDark ? '#fff' : '#374151';
  const labelColor = isDark ? '#fff' : '#1f2937';

  return (
    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Entities by Type</h3>
        <p className="text-sm text-muted-foreground mt-1">Detection breakdown by entity type</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={data} 
          margin={{ top: 30, right: 20, bottom: 80, left: 20 }}
        >
          <defs>
            {data.map((_, index) => {
              const color = getColorForIndex(index);
              return (
                <linearGradient key={index} id={`typeBarGradient${index}`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={color} stopOpacity={0.7}/>
                  <stop offset="100%" stopColor={color} stopOpacity={1}/>
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.3} vertical={false} />
          <XAxis 
            dataKey="entityLabelName"
            stroke={axisColor}
            tick={{ fill: tickColor, fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: gridColor }}
            tickLine={{ stroke: gridColor }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke={axisColor}
            tick={{ fill: tickColor, fontSize: 12 }}
            axisLine={{ stroke: gridColor }}
            tickLine={{ stroke: gridColor }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: isDark ? 'rgba(100, 100, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)', radius: 8 }} 
          />
          <Bar 
            dataKey="count"
            radius={[8, 8, 0, 0]}
            maxBarSize={80}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#typeBarGradient${index})`}
              />
            ))}
            <LabelList 
              dataKey="count"
              position="top"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => formatNumber(Number(value))}
              style={{ 
                fill: labelColor, 
                fontSize: '13px', 
                fontWeight: 700,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
