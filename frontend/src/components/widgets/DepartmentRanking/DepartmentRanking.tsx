import React from 'react';
import { TrendingUp, TrendingDown, Minus, Building2 } from 'lucide-react';
import type { DepartmentRankingProps } from './DepartmentRanking.types';

export const DepartmentRanking: React.FC<DepartmentRankingProps> = ({
  entries,
  className = '',
}) => {
  return (
    <div
      className={`bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Building2 className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-semibold text-slate-50">Department Rankings</span>
        </div>
        <span className="text-xs text-slate-500">ESG Score</span>
      </div>

      {/* Table Header */}
      <div className="px-5 py-2.5 grid grid-cols-12 text-[10px] text-slate-500 uppercase tracking-widest border-b border-[#334155]">
        <span className="col-span-1">#</span>
        <span className="col-span-6">Department</span>
        <span className="col-span-3 text-right">Score</span>
        <span className="col-span-2 text-right">Change</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-[#334155]">
        {entries.map((entry) => {
          const TrendIcon =
            entry.trend === 'up'
              ? TrendingUp
              : entry.trend === 'down'
              ? TrendingDown
              : Minus;

          const trendColor =
            entry.trend === 'up'
              ? 'text-emerald-400'
              : entry.trend === 'down'
              ? 'text-red-400'
              : 'text-slate-500';

          const rankColor =
            entry.rank === 1
              ? 'text-amber-400'
              : entry.rank === 2
              ? 'text-slate-400'
              : entry.rank === 3
              ? 'text-amber-700'
              : 'text-slate-600';

          const scoreWidth = `${entry.score}%`;

          return (
            <div
              key={entry.rank}
              className="px-5 py-3.5 grid grid-cols-12 items-center hover:bg-slate-800/30 transition-colors"
            >
              <span className={`col-span-1 text-sm font-bold ${rankColor}`}>
                {entry.rank}
              </span>
              <div className="col-span-6 flex flex-col gap-1.5">
                <span className="text-sm text-slate-200 font-medium">{entry.department}</span>
                <div className="h-1 rounded-full bg-[#334155] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: scoreWidth }}
                  />
                </div>
              </div>
              <span className="col-span-3 text-right text-sm font-semibold text-slate-100">
                {entry.score}
              </span>
              <div className={`col-span-2 flex items-center justify-end gap-0.5 text-xs font-medium ${trendColor}`}>
                <TrendIcon className="w-3 h-3" />
                <span>{entry.change > 0 ? '+' : ''}{entry.change}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
