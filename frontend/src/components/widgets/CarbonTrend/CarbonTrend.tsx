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
import { Leaf } from 'lucide-react';
import type { CarbonTrendProps } from './CarbonTrend.types';

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
          <span className="text-slate-400 capitalize">{entry.name}:</span>
          <span className="text-slate-100 font-semibold">{entry.value.toLocaleString()} tCO₂e</span>
        </div>
      ))}
    </div>
  );
};

export const CarbonTrend: React.FC<CarbonTrendProps> = ({ data, className = '' }) => {
  return (
    <div
      className={`bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-slate-50">Carbon Emissions</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-slate-500">
          {[
            { color: '#22C55E', label: 'Scope 1' },
            { color: '#38BDF8', label: 'Scope 2' },
            { color: '#A78BFA', label: 'Scope 3' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="p-5 flex-1">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scope1Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="scope2Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="scope3Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#64748B', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748B', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {data[0]?.target && (
              <ReferenceLine
                y={data[0].target}
                stroke="#EF4444"
                strokeDasharray="4 4"
                label={{ value: 'Target', fill: '#EF4444', fontSize: 10, position: 'right' }}
              />
            )}
            <Area
              type="monotone"
              dataKey="scope1"
              stroke="#22C55E"
              strokeWidth={2}
              fill="url(#scope1Grad)"
            />
            <Area
              type="monotone"
              dataKey="scope2"
              stroke="#38BDF8"
              strokeWidth={2}
              fill="url(#scope2Grad)"
            />
            <Area
              type="monotone"
              dataKey="scope3"
              stroke="#A78BFA"
              strokeWidth={2}
              fill="url(#scope3Grad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
