import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import type { EntityTypeStats } from "@/lib/types/dashboard";

type EntityTypeChartProps = {
  data: EntityTypeStats[];
};

const TYPE_COLORS = [
  '#10b981', // emerald - Person Name
  '#3b82f6', // blue - Email Address
  '#8b5cf6', // purple - Phone Number
  '#f59e0b', // amber - Credit Card
  '#ef4444', // red - SSN
  '#ec4899', // pink - Address
];

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
    <div className="bg-gray-950/98 backdrop-blur-md border border-gray-700/80 rounded-lg px-4 py-3 shadow-2xl">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: payload[0].fill }}
          />
          <span className="text-white font-bold text-sm">{data.entityLabelName}</span>
        </div>
        <span className="text-emerald-400 font-bold text-lg tabular-nums pl-5">
          {formatNumber(data.count)} detected
        </span>
      </div>
    </div>
  );
};

export function EntityTypeChart({ data }: EntityTypeChartProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

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
            {TYPE_COLORS.map((color, index) => (
              <linearGradient key={index} id={`typeBarGradient${index}`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={color} stopOpacity={0.7}/>
                <stop offset="100%" stopColor={color} stopOpacity={1}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} vertical={false} />
          <XAxis 
            dataKey="entityLabelName"
            stroke="#666"
            tick={{ fill: '#fff', fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: '#444' }}
            tickLine={{ stroke: '#444' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#666"
            tick={{ fill: '#999', fontSize: 12 }}
            axisLine={{ stroke: '#444' }}
            tickLine={{ stroke: '#444' }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'rgba(100, 100, 255, 0.05)', radius: 8 }} 
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
                fill: '#fff', 
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
