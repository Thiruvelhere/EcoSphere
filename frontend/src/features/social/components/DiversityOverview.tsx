import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ChartContainer } from '../../../components/widgets/ChartContainer';
import { Users } from 'lucide-react';

interface DonutData {
  name: string;
  value: number;
  color: string;
}

const GENDER_DATA: DonutData[] = [
  { name: 'Female', value: 42, color: '#A78BFA' },
  { name: 'Male',   value: 55, color: '#38BDF8' },
  { name: 'Other',  value: 3,  color: '#64748B' },
];

const AGE_DATA: DonutData[] = [
  { name: '18–30', value: 28, color: '#22C55E' },
  { name: '31–45', value: 48, color: '#38BDF8' },
  { name: '46–60', value: 20, color: '#F59E0B' },
  { name: '60+',   value: 4,  color: '#64748B' },
];

const DEPT_DATA: DonutData[] = [
  { name: 'Engineering', value: 35, color: '#38BDF8' },
  { name: 'Operations',  value: 28, color: '#22C55E' },
  { name: 'Finance',     value: 12, color: '#A78BFA' },
  { name: 'Logistics',   value: 15, color: '#F59E0B' },
  { name: 'Marketing',   value: 10, color: '#EF4444' },
];

interface MiniDonutProps {
  title: string;
  data: DonutData[];
}

const MiniDonut: React.FC<MiniDonutProps> = ({ title, data }) => (
  <div className="flex flex-col items-center gap-3">
    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{title}</p>
    <ResponsiveContainer width={110} height={110}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={32}
          outerRadius={48}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          formatter={(val) => [`${val}%`]}
          contentStyle={{
            backgroundColor: '#0F172A',
            border: '1px solid #334155',
            borderRadius: '12px',
            fontSize: '11px',
            color: '#F8FAFC',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex flex-col gap-1.5 w-full">
      {data.map((d) => (
        <div key={d.name} className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[10px] text-slate-500">{d.name}</span>
          </div>
          <span className="text-[10px] font-semibold text-slate-300">{d.value}%</span>
        </div>
      ))}
    </div>
  </div>
);

export const DiversityOverview: React.FC = () => (
  <ChartContainer
    title="Diversity Overview"
    subtitle="Workforce composition breakdown"
    icon={<Users className="w-4 h-4 text-violet-400" />}
  >
    <div className="grid grid-cols-3 gap-6">
      <MiniDonut title="Gender" data={GENDER_DATA} />
      <MiniDonut title="Age Group" data={AGE_DATA} />
      <MiniDonut title="Department" data={DEPT_DATA} />
    </div>
  </ChartContainer>
);
