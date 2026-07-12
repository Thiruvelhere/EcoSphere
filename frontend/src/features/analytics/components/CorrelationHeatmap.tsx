import React from 'react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';
import { Grid3x3 } from 'lucide-react';

const METRICS = ['Carbon', 'Energy', 'Water', 'Social', 'Governance', 'Compliance'];

// Correlation values −1.0 to +1.0
const MATRIX: number[][] = [
  [ 1.00,  0.82,  0.67, -0.20,  0.15,  0.31],
  [ 0.82,  1.00,  0.74, -0.15,  0.20,  0.28],
  [ 0.67,  0.74,  1.00, -0.10,  0.12,  0.22],
  [-0.20, -0.15, -0.10,  1.00,  0.65,  0.50],
  [ 0.15,  0.20,  0.12,  0.65,  1.00,  0.72],
  [ 0.31,  0.28,  0.22,  0.50,  0.72,  1.00],
];

function correlationColor(val: number): string {
  if (val >= 0.8)  return 'bg-emerald-500/30 text-emerald-300';
  if (val >= 0.5)  return 'bg-emerald-500/15 text-emerald-400';
  if (val >= 0.2)  return 'bg-sky-500/15 text-sky-400';
  if (val >= 0)    return 'bg-slate-700/50 text-slate-500';
  if (val >= -0.3) return 'bg-red-500/10 text-red-400';
  return 'bg-red-500/20 text-red-300';
}

export const CorrelationHeatmap: React.FC = () => (
  <ChartContainer
    title="Correlation Analysis"
    subtitle="Cross-metric ESG correlation matrix"
    icon={<Grid3x3 className="w-4 h-4 text-sky-400" />}
    contentClassName="p-3"
  >
    <div className="overflow-x-auto">
      <table className="w-full text-center" aria-label="Correlation matrix">
        <thead>
          <tr>
            <th className="w-20 p-1" />
            {METRICS.map((m) => (
              <th key={m} className="p-1 text-[9px] text-slate-500 uppercase font-medium">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MATRIX.map((row, ri) => (
            <tr key={METRICS[ri]}>
              <td className="text-[9px] text-slate-500 text-right pr-2 font-medium">{METRICS[ri]}</td>
              {row.map((val, ci) => (
                <td key={ci} className="p-0.5">
                  <div
                    className={`rounded-md text-[9px] font-semibold py-1.5 ${correlationColor(val)}`}
                    title={`${METRICS[ri]} ↔ ${METRICS[ci]}: ${val.toFixed(2)}`}
                    aria-label={`${METRICS[ri]} to ${METRICS[ci]}: ${val.toFixed(2)}`}
                  >
                    {val.toFixed(2)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#334155]">
        <span className="text-[9px] text-slate-600 uppercase tracking-widest">Correlation</span>
        {[
          { label: 'Strong +', cls: 'bg-emerald-500/30' },
          { label: 'Moderate +', cls: 'bg-emerald-500/15' },
          { label: 'Weak +', cls: 'bg-sky-500/15' },
          { label: 'Negative', cls: 'bg-red-500/15' },
        ].map(({ label, cls }) => (
          <div key={label} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded ${cls}`} />
            <span className="text-[9px] text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </ChartContainer>
);
