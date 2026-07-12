import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Users } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

const DATA = [
  { month: 'Jan', hours: 1200, target: 1500 },
  { month: 'Feb', hours: 1450, target: 1500 },
  { month: 'Mar', hours: 1380, target: 1500 },
  { month: 'Apr', hours: 1620, target: 1600 },
  { month: 'May', hours: 1750, target: 1600 },
  { month: 'Jun', hours: 2100, target: 1700 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-400">{entry.name}:</span>
          <span className="text-slate-100 font-semibold">{entry.value.toLocaleString()} hrs</span>
        </div>
      ))}
    </div>
  );
};

export const CSRTrend: React.FC = () => (
  <ChartContainer
    title="CSR Participation Trend"
    subtitle="Monthly volunteer hours vs. target"
    icon={<Users className="w-4 h-4 text-sky-400" />}
  >
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="csrHoursGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="hours" name="Volunteer Hours" stroke="#38BDF8" strokeWidth={2} fill="url(#csrHoursGrad)" />
        <Area type="monotone" dataKey="target" name="Target" stroke="#A78BFA" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
      </AreaChart>
    </ResponsiveContainer>
  </ChartContainer>
);
