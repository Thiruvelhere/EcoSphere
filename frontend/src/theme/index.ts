export const theme = {
  colors: {
    background: '#0F172A',
    sidebar: '#111827',
    card: '#1E293B',
    border: '#334155',
    primary: '#22C55E',
    secondary: '#38BDF8',
    danger: '#EF4444',
    warning: '#F59E0B',
    text: '#F8FAFC',
    muted: '#94A3B8',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      h1: '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
} as const;

export * from './colors';
export * from './spacing';
export * from './typography';
export default theme;
