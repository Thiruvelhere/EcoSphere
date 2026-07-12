import React from 'react';
import { GraduationCap, CheckCircle } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

interface TrainingItem {
  label: string;
  completed: number;
  total: number;
  color: string;
}

const TRAININGS: TrainingItem[] = [
  { label: 'Health & Safety',       completed: 564, total: 600,  color: '#22C55E' },
  { label: 'ESG Awareness',         completed: 468, total: 600,  color: '#38BDF8' },
  { label: 'Diversity & Inclusion', completed: 516, total: 600,  color: '#A78BFA' },
  { label: 'Business Ethics',       completed: 552, total: 600,  color: '#F59E0B' },
];

export const TrainingProgress: React.FC = () => (
  <ChartContainer
    title="Training Completion"
    subtitle="Mandatory program progress"
    icon={<GraduationCap className="w-4 h-4 text-amber-400" />}
    contentClassName="p-0"
  >
    <div className="flex flex-col divide-y divide-[#334155]">
      {TRAININGS.map((item) => {
        const pct = Math.round((item.completed / item.total) * 100);
        const done = pct === 100;
        return (
          <div key={item.label} className="px-5 py-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {done && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                <span className="text-sm text-slate-200 font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 tabular-nums">
                  {item.completed}/{item.total}
                </span>
                <span className="text-xs font-semibold" style={{ color: item.color }}>
                  {pct}%
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#334155] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </ChartContainer>
);
