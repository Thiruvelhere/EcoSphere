import React from 'react';

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  icon,
  action,
  children,
  className = '',
  contentClassName = '',
}) => {
  return (
    <div className={`bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden flex flex-col ${className}`}>
      <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          {icon && <div className="text-slate-400">{icon}</div>}
          <div>
            <span className="text-sm font-semibold text-slate-50">{title}</span>
            {subtitle && <p className="text-[10px] text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className={`p-5 flex-1 ${contentClassName}`}>{children}</div>
    </div>
  );
};
