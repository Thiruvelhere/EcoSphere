export type InsightSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface AIInsightProps {
  insight: string;
  severity: InsightSeverity;
  suggestedAction?: string;
  onActionClick?: () => void;
  confidence?: number; // 0-100
  category?: string;
  className?: string;
}
