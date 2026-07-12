import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ShieldCheck } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

const DATA = [
  { month: 'Jan', compliant: 78, partial: 14, nonCompliant: 8 },
  { month: 'Feb', compliant: 80, partial: 12, nonCompliant: 8 },
  { month: 'Mar', compliant: 75, partial: 18, nonCompliant: 7 },
  { month: 'Apr', compliant: 82, partial: 11, nonCompliant: 7 },
  { month: 'May', compliant: 84, partial: 10, nonCompliant: 6 },
  { month: 'Jun', compliant: 86, partial: 9,  nonCompliant: 5 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; fill: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="text-slate-100 font-semibold">{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

export const ComplianceStatus: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ChartContainer
    title="Compliance Status"
    subtitle="Monthly compliance distribution"
    icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}
    className={className}
  >
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '10px', color: '#64748B', paddingTop: '12px' }}
        />
        <Bar dataKey="compliant"    name="Compliant"      stackId="a" fill="#22C55E" />
        <Bar dataKey="partial"      name="Partial"        stackId="a" fill="#F59E0B" />
        <Bar dataKey="nonCompliant" name="Non-Compliant"  stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
