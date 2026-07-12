import React from 'react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';
import { Grid3x3 } from 'lucide-react';

type Severity = 0 | 1 | 2 | 3 | 4;

interface HeatCell {
  dept: string;
  regulatory: Severity;
  operational: Severity;
  financial: Severity;
  reputational: Severity;
}

const DATA: HeatCell[] = [
  { dept: 'Engineering', regulatory: 1, operational: 2, financial: 1, reputational: 1 },
  { dept: 'Operations',  regulatory: 2, operational: 3, financial: 2, reputational: 2 },
  { dept: 'Logistics',   regulatory: 3, operational: 3, financial: 2, reputational: 3 },
  { dept: 'Finance',     regulatory: 2, operational: 1, financial: 3, reputational: 1 },
  { dept: 'Marketing',   regulatory: 1, operational: 1, financial: 1, reputational: 2 },
];

const RISK_CATEGORIES = ['Regulatory', 'Operational', 'Financial', 'Reputational'];

const RISK_COLORS: Record<number, { bg: string; text: string; label: string }> = {
  0: { bg: 'bg-slate-800',      text: 'text-slate-600',  label: 'None' },
  1: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Low' },
  2: { bg: 'bg-amber-500/15',   text: 'text-amber-400',   label: 'Medium' },
  3: { bg: 'bg-orange-500/15',  text: 'text-orange-400',  label: 'High' },
  4: { bg: 'bg-red-500/20',     text: 'text-red-400',     label: 'Critical' },
};

export const RiskHeatmap: React.FC = () => (
  <ChartContainer
    title="Risk Heatmap"
    subtitle="Department × risk category severity"
    icon={<Grid3x3 className="w-4 h-4 text-rose-400" />}
  >
    <div className="overflow-x-auto">
      {/* Column headers */}
      <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: `160px repeat(${RISK_CATEGORIES.length}, 1fr)` }}>
        <div />
        {RISK_CATEGORIES.map((cat) => (
          <div key={cat} className="text-[10px] text-slate-500 uppercase tracking-widest text-center">
            {cat}
          </div>
        ))}
      </div>

      {/* Rows */}
      {DATA.map((row) => (
        <div
          key={row.dept}
          className="grid gap-2 mb-2 items-center"
          style={{ gridTemplateColumns: `160px repeat(${RISK_CATEGORIES.length}, 1fr)` }}
        >
          <span className="text-xs text-slate-400 font-medium">{row.dept}</span>
          {([row.regulatory, row.operational, row.financial, row.reputational] as Severity[]).map((sev, i) => {
            const cfg = RISK_COLORS[sev];
            return (
              <div
                key={i}
                className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}
                title={`${RISK_CATEGORIES[i]}: ${cfg.label}`}
                aria-label={`${row.dept} ${RISK_CATEGORIES[i]} risk: ${cfg.label}`}
              >
                {cfg.label}
              </div>
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#334155]">
        <span className="text-[10px] text-slate-600 uppercase tracking-widest">Legend</span>
        {Object.entries(RISK_COLORS).filter(([k]) => k !== '0').map(([, cfg]) => (
          <div key={cfg.label} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded ${cfg.bg}`} />
            <span className="text-[10px] text-slate-500">{cfg.label}</span>
          </div>
        ))}
      </div>
    </div>
  </ChartContainer>
);
