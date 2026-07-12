import React from 'react';
import { Cpu } from 'lucide-react';

export type ConfidenceLevel = 'very-high' | 'high' | 'medium' | 'low';

const CONFIG: Record<ConfidenceLevel, { label: string; color: string; bg: string }> = {
  'very-high': { label: 'Very High', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  high: { label: 'High', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  low: { label: 'Low', color: 'text-red-400', bg: 'bg-red-500/10' },
};

function scoreToLevel(score: number): ConfidenceLevel {
  if (score >= 90) return 'very-high';
  if (score >= 75) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

interface ConfidenceBadgeProps {
  score: number; // 0–100
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ score }) => {
  const level = scoreToLevel(score);
  const cfg = CONFIG[level];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>
      <Cpu className="w-3 h-3" />
      <span>{score}% confidence · {cfg.label}</span>
    </div>
  );
};
