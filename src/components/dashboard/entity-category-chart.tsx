import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { EntityCategoryStats } from "@/lib/types/dashboard";

type EntityCategoryChartProps = {
  data: EntityCategoryStats[];
};

const CATEGORY_COLORS = ['#a78bfa', '#22d3ee', '#34d399'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
      {payload?.map((entry: { color: string; payload: { category: string } }, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-white">
            {entry.payload.category}
          </span>
        </div>
      ))}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];
  const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

  return (
    <div className="bg-gray-950/98 backdrop-blur-md border border-gray-700/80 rounded-md px-3 py-2 shadow-2xl">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: data.payload.fill }}
          />
          <span className="text-white font-semibold text-xs">{data.payload.category}</span>
        </div>
        <div className="flex items-center justify-between gap-4 pl-4">
          <span className="text-gray-400 text-xs">Count:</span>
          <span className="text-white font-bold text-xs tabular-nums">
            {formatNumber(data.value)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 pl-4">
          <span className="text-gray-400 text-xs">Percentage:</span>
          <span className="text-emerald-400 font-bold text-xs tabular-nums">
            {data.payload.percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export function EntityCategoryChart({ data }: EntityCategoryChartProps) {
  return (
    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Entities by Category</h3>
        <p className="text-sm text-muted-foreground mt-1">Distribution across major categories</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <defs>
            {CATEGORY_COLORS.map((color, index) => (
              <linearGradient key={index} id={`categoryGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1}/>
                <stop offset="100%" stopColor={color} stopOpacity={0.75}/>
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={{
              stroke: '#666',
              strokeWidth: 1
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            label={(props: any) => {
              const { cx, cy, midAngle, outerRadius, percentage } = props;
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 35;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              
              return (
                <text 
                  x={x} 
                  y={y} 
                  fill="#fff"
                  textAnchor={x > cx ? 'start' : 'end'} 
                  dominantBaseline="central"
                  style={{ fontSize: '12px', fontWeight: 700 }}
                >
                  {`${percentage}%`}
                </text>
              );
            }}
            outerRadius={90}
            innerRadius={45}
            dataKey="count"
            stroke="#1a1a1a"
            strokeWidth={2}
            animationDuration={800}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CATEGORY_COLORS[index]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

