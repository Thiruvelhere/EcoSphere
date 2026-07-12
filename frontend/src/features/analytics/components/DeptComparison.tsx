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
import { BarChart2 } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

const DATA = [
  { dept: 'Engineering', E: 82, S: 87, G: 78 },
  { dept: 'Operations',  E: 74, S: 76, G: 80 },
  { dept: 'Finance',     E: 68, S: 72, G: 88 },
  { dept: 'Logistics',   E: 70, S: 65, G: 71 },
  { dept: 'Marketing',   E: 65, S: 91, G: 69 },
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
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="text-slate-100 font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export const DeptComparison: React.FC = () => (
  <ChartContainer
    title="Department Comparison"
    subtitle="E/S/G scores by department"
    icon={<BarChart2 className="w-4 h-4 text-sky-400" />}
  >
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
        <XAxis dataKey="dept" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} domain={[50, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', color: '#64748B', paddingTop: '12px' }} />
        <Bar dataKey="E" name="Environmental" fill="#22C55E" radius={[3, 3, 0, 0]} maxBarSize={16} />
        <Bar dataKey="S" name="Social"        fill="#38BDF8" radius={[3, 3, 0, 0]} maxBarSize={16} />
        <Bar dataKey="G" name="Governance"    fill="#A78BFA" radius={[3, 3, 0, 0]} maxBarSize={16} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
