export interface EsgScoreSummary {
  overallScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  lastUpdated: string;
}

export interface MetricTrend {
  label: string;
  value: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
}
