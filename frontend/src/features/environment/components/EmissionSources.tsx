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
import { Flame } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

const DATA = [
  { name: 'Fleet & Transport', value: 34 },
  { name: 'Manufacturing', value: 28 },
  { name: 'Supply Chain', value: 19 },
  { name: 'Office Ops', value: 11 },
  { name: 'Business Travel', value: 8 },
];

const BAR_COLORS = ['#22C55E', '#38BDF8', '#A78BFA', '#F59E0B', '#EF4444'];

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
      <p className="text-sm font-semibold text-slate-100">{payload[0].value}% of total</p>
    </div>
  );
};

export const EmissionSources: React.FC = () => {
  return (
    <ChartContainer
      title="Emission Sources"
      subtitle="Top 5 contributors by share"
      icon={<Flame className="w-4 h-4 text-amber-400" />}
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          layout="vertical"
          data={DATA}
          margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={110}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(51,65,85,0.3)' }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={16}>
            {DATA.map((_, index) => (
              <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
