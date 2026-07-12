export interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number; // Percentage change
  trendLabel?: string;
  status?: 'positive' | 'negative' | 'neutral' | 'warning';
  icon?: React.ReactNode;
  className?: string;
}
