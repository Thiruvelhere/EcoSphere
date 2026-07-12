import type { SectionProps } from './Section.types';

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  divider = false,
  className = '',
  ...props
}) => {
  return (
    <section
      className={`py-6 ${divider ? 'border-b border-[#334155]' : ''} ${className}`}
      {...props}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-lg font-semibold text-[#F8FAFC]">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xs text-[#94A3B8] mt-1">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="text-[#F8FAFC]">{children}</div>
    </section>
  );
};
