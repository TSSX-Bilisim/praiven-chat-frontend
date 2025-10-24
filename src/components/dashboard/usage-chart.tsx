import { Card } from "@/components/ui/card";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { UsageByDate } from "@/lib/types/dashboard";

type UsageChartProps = {
  data: UsageByDate[];
  title: string;
};

export function UsageChart({ data, title }: UsageChartProps) {
  return (
    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">Daily token and request trends</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.5} />
          <XAxis 
            dataKey="date" 
            stroke="#999"
            tick={{ fill: '#fff', fontSize: 12, fontWeight: 600 }}
            interval={2}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis 
            yAxisId="left"
            stroke="#8b5cf6"
            tick={{ fill: '#8b5cf6', fontSize: 12, fontWeight: 600 }}
            label={{ value: 'Tokens', angle: -90, position: 'insideLeft', fill: '#8b5cf6', style: { fontSize: 14, fontWeight: 700 } }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#06b6d4"
            tick={{ fill: '#06b6d4', fontSize: 12, fontWeight: 600 }}
            label={{ value: 'Requests', angle: 90, position: 'insideRight', fill: '#06b6d4', style: { fontSize: 14, fontWeight: 700 } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid #444',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              color: '#fff'
            }}
          />
          <Legend />
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="totalTokens" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorTokens)"
            name="Total Tokens"
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="totalRequests" 
            stroke="#06b6d4" 
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRequests)"
            name="Requests"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

