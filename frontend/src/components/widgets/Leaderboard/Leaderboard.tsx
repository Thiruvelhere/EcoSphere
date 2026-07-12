import React from 'react';
import { Award, Zap } from 'lucide-react';
import { Avatar } from '../../common/Avatar';
import type { LeaderboardProps, LeaderboardBadge } from './Leaderboard.types';

const BADGE_CONFIG: Record<
  LeaderboardBadge,
  { label: string; color: string; bg: string } | null
> = {
  gold: { label: 'Gold', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  silver: { label: 'Silver', color: 'text-slate-300', bg: 'bg-slate-500/10' },
  bronze: { label: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-900/20' },
  contributor: { label: 'Contributor', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  none: null,
};

const RANK_COLORS: Record<number, string> = {
  1: 'text-amber-400',
  2: 'text-slate-300',
  3: 'text-amber-700',
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, className = '' }) => {
  return (
    <div
      className={`bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-slate-50">ESG Leaderboard</span>
        </div>
        <span className="text-xs text-slate-500">Top contributors</span>
      </div>

      {/* Entries */}
      <div className="flex flex-col divide-y divide-[#334155]">
        {entries.map((entry) => {
          const rankColor = RANK_COLORS[entry.rank] || 'text-slate-600';
          const badge = BADGE_CONFIG[entry.badge];

          return (
            <div
              key={entry.rank}
              className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-800/30 transition-colors"
            >
              {/* Rank */}
              <span className={`text-sm font-bold w-5 text-center shrink-0 ${rankColor}`}>
                {entry.rank}
              </span>

              {/* Avatar */}
              <Avatar fallback={entry.avatarFallback} size="sm" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-200 truncate">
                    {entry.name}
                  </span>
                  {badge && (
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${badge.bg} ${badge.color} shrink-0`}
                    >
                      {badge.label}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500">{entry.department}</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 shrink-0">
                <Zap className="w-3 h-3" />
                <span>{entry.xp.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
