import type { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F172A] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#22C55E] text-[#0F172A] hover:bg-[#22C55E]/90 focus:ring-[#22C55E]',
    secondary: 'bg-[#38BDF8] text-[#0F172A] hover:bg-[#38BDF8]/90 focus:ring-[#38BDF8]',
    danger: 'bg-[#EF4444] text-white hover:bg-[#EF4444]/90 focus:ring-[#EF4444]',
    warning: 'bg-[#F59E0B] text-[#0F172A] hover:bg-[#F59E0B]/90 focus:ring-[#F59E0B]',
    outline: 'border border-[#334155] text-[#F8FAFC] hover:bg-[#1E293B] focus:ring-[#334155]',
    ghost: 'text-[#F8FAFC] hover:bg-[#1E293B] focus:ring-[#334155]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
