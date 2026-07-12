import React from 'react';
import {
  Leaf,
  ShieldAlert,
  Users,
  Scale,
  FileText,
  Cpu,
  Activity,
} from 'lucide-react';
import type { ActivityFeedProps, ActivityEventType } from './ActivityFeed.types';

const EVENT_CONFIG: Record<
  ActivityEventType,
  { icon: React.FC<{ className?: string }>; color: string; bg: string }
> = {
  carbon: { icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  compliance: { icon: ShieldAlert, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  social: { icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10' },
  governance: { icon: Scale, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  report: { icon: FileText, color: 'text-slate-400', bg: 'bg-slate-500/10' },
  ai: { icon: Cpu, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
};

function relativeTime(iso: string): string {
  const delta = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(delta / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ events, className = '' }) => {
  return (
    <div
      className={`bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-50">Activity Feed</span>
        </div>
        <span className="text-xs text-slate-500">{events.length} events</span>
      </div>

      {/* Timeline */}
      <div className="flex flex-col px-5 py-2 overflow-y-auto max-h-[320px]">
        {events.map((event, idx) => {
          const cfg = EVENT_CONFIG[event.type];
          const Icon = cfg.icon;
          const isLast = idx === events.length - 1;
          return (
            <div key={event.id} className="flex items-start gap-3 py-3.5 relative">
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-[18px] top-[44px] w-px bg-[#334155] bottom-0" />
              )}

              {/* Icon */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-200 truncate">
                    {event.title}
                  </span>
                  <span className="text-[10px] text-slate-500 shrink-0">
                    {relativeTime(event.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {event.description}
                </p>
                {event.actor && (
                  <span className="text-[10px] text-slate-600 mt-1 block">by {event.actor}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
