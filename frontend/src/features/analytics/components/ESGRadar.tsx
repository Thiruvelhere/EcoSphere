import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { Activity } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

const DATA = [
  { subject: 'Carbon',       E: 82, S: 74, G: 71 },
  { subject: 'Energy',       E: 78, S: 70, G: 68 },
  { subject: 'Workforce',    E: 65, S: 84, G: 72 },
  { subject: 'Compliance',   E: 70, S: 76, G: 88 },
  { subject: 'Supply Chain', E: 74, S: 80, G: 75 },
  { subject: 'Community',    E: 68, S: 90, G: 73 },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 shadow-xl">
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="text-slate-100 font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export const ESGRadar: React.FC = () => (
  <ChartContainer
    title="E vs S vs G Breakdown"
    subtitle="Performance across ESG dimensions"
    icon={<Activity className="w-4 h-4 text-violet-400" />}
  >
    <div className="flex items-center gap-4 mb-3">
      {[
        { label: 'Environmental', color: '#22C55E' },
        { label: 'Social', color: '#38BDF8' },
        { label: 'Governance', color: '#A78BFA' },
      ].map((l) => (
        <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
          {l.label}
        </div>
      ))}
    </div>
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={DATA} margin={{ top: 4, right: 20, left: 20, bottom: 4 }}>
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 11 }} />
        <Tooltip content={<CustomTooltip />} />
        <Radar name="Environmental" dataKey="E" stroke="#22C55E" fill="#22C55E" fillOpacity={0.08} strokeWidth={2} />
        <Radar name="Social"        dataKey="S" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.08} strokeWidth={2} />
        <Radar name="Governance"    dataKey="G" stroke="#A78BFA" fill="#A78BFA" fillOpacity={0.08} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
