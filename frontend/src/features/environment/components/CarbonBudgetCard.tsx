import React from 'react';

interface CarbonBudgetCardProps {
  total: number;
  used: number;
  unit?: string;
}

export const CarbonBudgetCard: React.FC<CarbonBudgetCardProps> = ({
  total,
  used,
  unit = 'tCO₂e',
}) => {
  const percentage = Math.min(100, (used / total) * 100);
  const remaining = total - used;

  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const color =
    percentage > 90
      ? '#EF4444'
      : percentage > 70
      ? '#F59E0B'
      : '#22C55E';

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          Carbon Budget
        </span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ color, backgroundColor: `${color}18` }}
        >
          {percentage.toFixed(1)}% used
        </span>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center justify-center py-2">
        <div className="relative">
          <svg width={radius * 2} height={radius * 2} aria-label={`Carbon budget ${percentage.toFixed(0)}% used`}>
            {/* Track */}
            <circle
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              fill="none"
              stroke="#334155"
              strokeWidth={stroke}
            />
            {/* Progress */}
            <circle
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              fill="none"
              stroke={color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${radius} ${radius})`}
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-50">
              {(used / 1000).toFixed(1)}k
            </span>
            <span className="text-[10px] text-slate-500">{unit}</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#334155]">
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Budget</p>
          <p className="text-sm font-semibold text-slate-100">
            {(total / 1000).toFixed(0)}k{' '}
            <span className="text-xs font-normal text-slate-500">{unit}</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Remaining</p>
          <p className="text-sm font-semibold" style={{ color }}>
            {(remaining / 1000).toFixed(1)}k{' '}
            <span className="text-xs font-normal text-slate-500">{unit}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
