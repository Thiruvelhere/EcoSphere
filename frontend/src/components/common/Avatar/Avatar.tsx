import type { AvatarProps } from './Avatar.types';

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  fallback,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-[#1E293B] border border-[#334155] text-[#F8FAFC] font-semibold select-none overflow-hidden shrink-0 ${sizes[size]} ${className}`}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Hide the broken image
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : null}
      <span className="absolute inset-0 flex items-center justify-center bg-[#1E293B]">
        {fallback}
      </span>
    </div>
  );
};
