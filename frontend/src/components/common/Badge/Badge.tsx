import type { BadgeProps } from './Badge.types';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'success',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    primary: 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20',
    secondary: 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20',
    success: 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20',
    danger: 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20',
    warning: 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20',
    info: 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-xs',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
