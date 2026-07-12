import type { PageHeaderProps } from './PageHeader.types';

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  action,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#334155] mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[#94A3B8] mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
    </div>
  );
};
