import React from 'react';
import { FileCheck } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

interface Policy {
  name: string;
  accepted: number;
  total: number;
  deadline: string;
}

const POLICIES: Policy[] = [
  { name: 'Code of Conduct 2026',      accepted: 578, total: 600, deadline: 'Jul 31, 2026' },
  { name: 'Data Privacy Policy',       accepted: 555, total: 600, deadline: 'Aug 15, 2026' },
  { name: 'Anti-Bribery Policy',       accepted: 540, total: 600, deadline: 'Aug 30, 2026' },
  { name: 'Sustainability Commitment', accepted: 510, total: 600, deadline: 'Sep 15, 2026' },
];

export const PolicyAcknowledgements: React.FC = () => (
  <ChartContainer
    title="Policy Acknowledgements"
    subtitle="Staff acceptance progress"
    icon={<FileCheck className="w-4 h-4 text-emerald-400" />}
    contentClassName="p-0"
  >
    <div className="flex flex-col divide-y divide-[#334155]">
      {POLICIES.map((policy) => {
        const pct = Math.round((policy.accepted / policy.total) * 100);
        const color = pct >= 90 ? '#22C55E' : pct >= 75 ? '#F59E0B' : '#EF4444';
        return (
          <div key={policy.name} className="px-5 py-4 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-slate-200 truncate">{policy.name}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-600">Due: {policy.deadline}</span>
                <span className="text-xs font-semibold" style={{ color }}>{pct}%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-[#334155] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
              <span className="text-[10px] text-slate-600 tabular-nums shrink-0">
                {policy.accepted}/{policy.total}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </ChartContainer>
);
