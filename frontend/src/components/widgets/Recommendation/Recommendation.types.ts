export type RecommendationPriority = 'critical' | 'high' | 'medium' | 'low';

export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  priority: RecommendationPriority;
  estimatedEsgGain: number;    // Points
  estimatedCarbonReduction?: number; // tCO2e
  effort: 'low' | 'medium' | 'high';
}

export interface RecommendationProps {
  items: RecommendationItem[];
  className?: string;
}
