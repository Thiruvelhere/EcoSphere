import React from 'react';
import { Cpu, ArrowRight, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import type { AIInsightProps, InsightSeverity } from './AIInsight.types';

const SEVERITY_CONFIG: Record<
  InsightSeverity,
  { label: string; icon: React.FC<{ className?: string }>; border: string; badge: string; text: string }
> = {
  critical: {
    label: 'Critical',
    icon: AlertTriangle,
    border: 'border-red-500/30',
    badge: 'bg-red-500/10 text-red-400 border border-red-500/20',
    text: 'text-red-400',
  },
  high: {
    label: 'High',
    icon: AlertCircle,
    border: 'border-amber-500/30',
    badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    text: 'text-amber-400',
  },
  medium: {
    label: 'Medium',
    icon: Info,
    border: 'border-sky-500/30',
    badge: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    text: 'text-sky-400',
  },
  low: {
    label: 'Low',
    icon: CheckCircle,
    border: 'border-emerald-500/30',
    badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    text: 'text-emerald-400',
  },
};

export const AIInsight: React.FC<AIInsightProps> = ({
  insight,
  severity,
  suggestedAction,
  onActionClick,
  confidence,
  category = 'ESG Intelligence',
  className = '',
}) => {
  const config = SEVERITY_CONFIG[severity];
  const SeverityIcon = config.icon;

  return (
    <div
      className={`bg-[#1E293B] border ${config.border} rounded-2xl p-6 flex flex-col gap-5 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-50 uppercase tracking-widest">
              AI Copilot
            </span>
            <p className="text-[10px] text-slate-500 mt-0.5">{category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {confidence !== undefined && (
            <span className="text-[10px] text-slate-500 font-mono">{confidence}% confidence</span>
          )}
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.badge}`}>
            <SeverityIcon className="w-3 h-3" />
            {config.label}
          </span>
        </div>
      </div>

      {/* Insight Body */}
      <p className="text-sm text-slate-300 leading-relaxed">
        {insight}
      </p>

      {/* Suggested Action */}
      {suggestedAction && (
        <div className="flex items-center justify-between pt-4 border-t border-[#334155]">
          <div className="flex-1 min-w-0 mr-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
              Suggested Action
            </p>
            <p className="text-xs text-slate-300 truncate">{suggestedAction}</p>
          </div>
          <button
            onClick={onActionClick}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#22C55E] text-[#0F172A] text-xs font-semibold rounded-lg hover:bg-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#1E293B]"
          >
            Take Action
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
