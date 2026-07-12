import React from 'react';
import { Lightbulb, Zap, Leaf, ChevronRight } from 'lucide-react';
import type { RecommendationProps, RecommendationPriority } from './Recommendation.types';

const PRIORITY_CONFIG: Record<
  RecommendationPriority,
  { label: string; dot: string; text: string; bg: string }
> = {
  critical: { label: 'Critical', dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-500/10' },
  high: { label: 'High', dot: 'bg-amber-400', text: 'text-amber-400', bg: 'bg-amber-500/10' },
  medium: { label: 'Medium', dot: 'bg-sky-400', text: 'text-sky-400', bg: 'bg-sky-500/10' },
  low: { label: 'Low', dot: 'bg-slate-400', text: 'text-slate-400', bg: 'bg-slate-500/10' },
};

export const Recommendation: React.FC<RecommendationProps> = ({ items, className = '' }) => {
  return (
    <div className={`bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden flex flex-col ${className}`}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-slate-50">Recommendations</span>
        </div>
        <span className="text-xs text-slate-500">{items.length} actions</span>
      </div>

      {/* Items */}
      <div className="flex flex-col divide-y divide-[#334155]">
        {items.map((item) => {
          const pc = PRIORITY_CONFIG[item.priority];
          return (
            <div
              key={item.id}
              className="px-5 py-4 flex items-start gap-4 hover:bg-slate-800/40 transition-colors cursor-pointer group"
            >
              {/* Priority dot */}
              <div className="flex flex-col items-center gap-1.5 pt-0.5 shrink-0">
                <span className={`w-2 h-2 rounded-full ${pc.dot}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-semibold uppercase tracking-widest ${pc.text}`}>
                    {pc.label} Priority
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-200 truncate">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{item.description}</p>

                {/* Metrics */}
                <div className="flex items-center gap-3 mt-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <Zap className="w-2.5 h-2.5" />
                    <span>+{item.estimatedEsgGain} ESG pts</span>
                  </div>
                  {item.estimatedCarbonReduction !== undefined && (
                    <div className="flex items-center gap-1.5 text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                      <Leaf className="w-2.5 h-2.5" />
                      <span>−{item.estimatedCarbonReduction}t CO₂e</span>
                    </div>
                  )}
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 mt-0.5" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
