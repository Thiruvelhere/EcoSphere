import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

const DATA = [
  { month: 'Jan', score: 71.2 },
  { month: 'Feb', score: 72.8 },
  { month: 'Mar', score: 71.9 },
  { month: 'Apr', score: 74.3 },
  { month: 'May', score: 76.1 },
  { month: 'Jun', score: 78.4 },
  { month: 'Jul', score: 79.2 },
];

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
      <p className="text-sm font-semibold text-slate-100">{payload[0].value} ESG pts</p>
    </div>
  );
};

export const ESGTrendLine: React.FC = () => (
  <ChartContainer
    title="Overall ESG Trend"
    subtitle="Monthly composite ESG score"
    icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
  >
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} domain={[65, 85]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={80} stroke="#A78BFA" strokeDasharray="4 4" label={{ value: 'Target', fill: '#A78BFA', fontSize: 10, position: 'insideTopRight' }} />
        <Line type="monotone" dataKey="score" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: '#22C55E', r: 3 }} activeDot={{ r: 5, fill: '#22C55E' }} />
      </LineChart>
    </ResponsiveContainer>
  </ChartContainer>
);
