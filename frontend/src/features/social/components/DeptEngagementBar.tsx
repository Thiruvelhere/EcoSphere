import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { BarChart2 } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

const DATA = [
  { dept: 'Marketing', score: 91 },
  { dept: 'Engineering', score: 87 },
  { dept: 'Logistics', score: 72 },
  { dept: 'Operations', score: 76 },
  { dept: 'Finance', score: 68 },
];

const BAR_COLOR = (score: number) =>
  score >= 85 ? '#22C55E' : score >= 70 ? '#38BDF8' : '#F59E0B';

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-100">{payload[0].value}% participation</p>
    </div>
  );
};

export const DeptEngagementBar: React.FC = () => (
  <ChartContainer
    title="Department Engagement"
    subtitle="ESG participation rate by department"
    icon={<BarChart2 className="w-4 h-4 text-emerald-400" />}
  >
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        layout="vertical"
        data={DATA}
        margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: '#64748B', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          domain={[0, 100]}
        />
        <YAxis
          dataKey="dept"
          type="category"
          width={90}
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(51,65,85,0.3)' }} />
        <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={14}>
          {DATA.map((entry, index) => (
            <Cell key={index} fill={BAR_COLOR(entry.score)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
