import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

const DATA = [
  { month: 'Jul', actual: 79.2, forecast: 79.2, lower: 79.2, upper: 79.2 },
  { month: 'Aug', actual: null, forecast: 80.5, lower: 79.0, upper: 82.0 },
  { month: 'Sep', actual: null, forecast: 81.8, lower: 79.5, upper: 84.1 },
  { month: 'Oct', actual: null, forecast: 82.6, lower: 80.0, upper: 85.2 },
  { month: 'Nov', actual: null, forecast: 83.4, lower: 80.8, upper: 86.0 },
  { month: 'Dec', actual: null, forecast: 84.1, lower: 81.5, upper: 86.7 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number | null; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.filter((p) => p.value !== null).map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="text-slate-100 font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export const ESGForecast: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ChartContainer
    title="ESG Score Forecast"
    subtitle="AI-projected 6-month trajectory"
    icon={<TrendingUp className="w-4 h-4 text-amber-400" />}
    className={className}
    action={
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
        AI Forecast
      </span>
    }
  >
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.12} />
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="rangeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.06} />
            <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} domain={[76, 90]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine x="Jul" stroke="#64748B" strokeDasharray="4 4" label={{ value: 'Today', fill: '#64748B', fontSize: 10, position: 'insideTopRight' }} />
        <Area type="monotone" dataKey="upper"    name="Upper Bound" stroke="none"    fill="url(#rangeGrad)" />
        <Area type="monotone" dataKey="forecast" name="Forecast"    stroke="#22C55E" strokeWidth={2} strokeDasharray="5 3" fill="url(#forecastGrad)" />
        <Area type="monotone" dataKey="actual"   name="Actual"      stroke="#22C55E" strokeWidth={2.5} fill="none" dot={{ fill: '#22C55E', r: 3 }} />
      </AreaChart>
    </ResponsiveContainer>
  </ChartContainer>
);
