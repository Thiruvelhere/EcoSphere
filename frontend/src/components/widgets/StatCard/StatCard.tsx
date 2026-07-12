import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { StatCardProps } from './StatCard.types';

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendLabel = 'vs last month',
  status = 'neutral',
  icon,
  className = '',
}) => {
  const statusConfig = {
    positive: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      dot: 'bg-emerald-400',
    },
    negative: {
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      dot: 'bg-red-400',
    },
    neutral: {
      bg: 'bg-slate-500/10',
      text: 'text-slate-400',
      dot: 'bg-slate-400',
    },
    warning: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      dot: 'bg-amber-400',
    },
  };

  const config = statusConfig[status];

  const TrendIcon =
    trend === undefined || trend === 0
      ? Minus
      : trend > 0
      ? TrendingUp
      : TrendingDown;

  const trendColor =
    trend === undefined || trend === 0
      ? 'text-slate-500'
      : trend > 0
      ? 'text-emerald-400'
      : 'text-red-400';

  return (
    <div
      className={`bg-[#1E293B] border border-[#334155] rounded-2xl p-5 flex flex-col gap-4 ${className}`}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
            {title}
          </span>
        </div>
        {icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${config.bg}`}>
            <div className={config.text}>{icon}</div>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold tracking-tight text-slate-50 leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-slate-500 mb-0.5">{unit}</span>
        )}
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between pt-1 border-t border-[#334155]">
        {trend !== undefined ? (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{Math.abs(trend)}%</span>
            <span className="text-slate-500 font-normal">{trendLabel}</span>
          </div>
        ) : (
          <div className="text-xs text-slate-500">No trend data</div>
        )}
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          <span className={`text-xs font-medium ${config.text} capitalize`}>{status}</span>
        </div>
      </div>
    </div>
  );
};
