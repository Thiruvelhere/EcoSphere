export type LeaderboardBadge = 'gold' | 'silver' | 'bronze' | 'contributor' | 'none';

export interface LeaderboardEntry {
  rank: number;
  name: string;
  department: string;
  xp: number;
  badge: LeaderboardBadge;
  avatarFallback: string;
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
  className?: string;
}
