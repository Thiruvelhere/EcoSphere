export interface DepartmentEntry {
  rank: number;
  department: string;
  score: number; // 0–100
  trend: 'up' | 'down' | 'stable';
  change: number; // Point change
}

export interface DepartmentRankingProps {
  entries: DepartmentEntry[];
  className?: string;
}
