import React from 'react';
import { TrendingUp, TrendingDown, Minus, Building2 } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

interface DeptRow {
  department: string;
  current: number;
  previous: number;
}

const DATA: DeptRow[] = [
  { department: 'Engineering', current: 1200, previous: 1350 },
  { department: 'Operations', current: 3400, previous: 3200 },
  { department: 'Logistics', current: 2800, previous: 3100 },
  { department: 'Marketing', current: 450, previous: 480 },
  { department: 'Finance', current: 320, previous: 310 },
];

function formatChange(current: number, previous: number) {
  const pct = ((current - previous) / previous) * 100;
  return { pct, isDown: pct < 0, isUp: pct > 0 };
}

export const DepartmentEmissions: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <ChartContainer
      title="Department Emissions"
      subtitle="Current vs. previous quarter · tCO₂e"
      icon={<Building2 className="w-4 h-4 text-sky-400" />}
      className={className}
      contentClassName="p-0"
    >
      {/* Table Header */}
      <div className="px-5 py-2.5 grid grid-cols-12 text-[10px] text-slate-500 uppercase tracking-widest border-b border-[#334155]">
        <span className="col-span-5">Department</span>
        <span className="col-span-3 text-right">Current</span>
        <span className="col-span-2 text-right">Previous</span>
        <span className="col-span-2 text-right">Change</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#334155]">
        {DATA.map((row) => {
          const { pct, isDown, isUp } = formatChange(row.current, row.previous);
          const Icon = isDown ? TrendingDown : isUp ? TrendingUp : Minus;
          const color = isDown ? 'text-emerald-400' : isUp ? 'text-red-400' : 'text-slate-500';

          return (
            <div
              key={row.department}
              className="px-5 py-3.5 grid grid-cols-12 items-center hover:bg-slate-800/30 transition-colors"
            >
              <span className="col-span-5 text-sm text-slate-200 font-medium">{row.department}</span>
              <span className="col-span-3 text-right text-sm font-semibold text-slate-100 tabular-nums">
                {row.current.toLocaleString()}
              </span>
              <span className="col-span-2 text-right text-xs text-slate-500 tabular-nums">
                {row.previous.toLocaleString()}
              </span>
              <div className={`col-span-2 flex items-center justify-end gap-0.5 text-xs font-medium ${color}`}>
                <Icon className="w-3 h-3" />
                <span>{Math.abs(pct).toFixed(1)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </ChartContainer>
  );
};
