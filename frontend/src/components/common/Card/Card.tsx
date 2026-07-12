import type { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden shadow-lg ${className}`}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4 border-b border-[#334155] flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="font-semibold text-base text-[#F8FAFC]">{title}</h3>}
            {subtitle && <p className="text-xs text-[#94A3B8] mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}
      
      <div className="px-6 py-5 text-sm text-[#F8FAFC]">{children}</div>

      {footer && (
        <div className="px-6 py-3 border-t border-[#334155] bg-[#0F172A]/30 flex items-center justify-end">
          {footer}
        </div>
      )}
    </div>
  );
};
