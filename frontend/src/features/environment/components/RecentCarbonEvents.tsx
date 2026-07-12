import React from 'react';
import { Truck, ShoppingCart, Factory, Package } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

type EventType = 'fleet' | 'purchase' | 'manufacturing' | 'transport';

interface CarbonEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: string;
  delta: number; // tCO2e negative = reduction
}

const EVENT_CONFIG: Record<EventType, { icon: React.FC<{ className?: string }>; color: string; bg: string }> = {
  fleet: { icon: Truck, color: 'text-sky-400', bg: 'bg-sky-500/10' },
  purchase: { icon: ShoppingCart, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  manufacturing: { icon: Factory, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  transport: { icon: Package, color: 'text-violet-400', bg: 'bg-violet-500/10' },
};

const EVENTS: CarbonEvent[] = [
  {
    id: 'e1',
    type: 'fleet',
    title: 'EV Fleet Transition Milestone',
    description: '40 diesel vehicles replaced with electric equivalents in Logistics.',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    delta: -180,
  },
  {
    id: 'e2',
    type: 'purchase',
    title: 'Q2 Renewable Energy Procurement',
    description: 'Signed 12-month PPA for 100% renewable electricity at HQ campus.',
    timestamp: new Date(Date.now() - 26 * 3600000).toISOString(),
    delta: -420,
  },
  {
    id: 'e3',
    type: 'manufacturing',
    title: 'Process Efficiency Improvement',
    description: 'New thermal management system reduces heat waste in manufacturing by 18%.',
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
    delta: -95,
  },
  {
    id: 'e4',
    type: 'transport',
    title: 'Route Optimization Deployed',
    description: 'AI-optimized delivery routes reduce last-mile emissions across 3 cities.',
    timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
    delta: -62,
  },
];

function relativeTime(iso: string): string {
  const delta = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(delta / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export const RecentCarbonEvents: React.FC = () => {
  return (
    <ChartContainer title="Recent Carbon Events" contentClassName="p-0">
      <div className="flex flex-col divide-y divide-[#334155]">
        {EVENTS.map((event, idx) => {
          const cfg = EVENT_CONFIG[event.type];
          const Icon = cfg.icon;
          const isLast = idx === EVENTS.length - 1;

          return (
            <div key={event.id} className="px-5 py-4 flex items-start gap-3 relative">
              {!isLast && (
                <div className="absolute left-[38px] top-[52px] bottom-0 w-px bg-[#334155]" />
              )}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-200">{event.title}</span>
                  <span className="text-[10px] text-slate-500 shrink-0">{relativeTime(event.timestamp)}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{event.description}</p>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                  −{Math.abs(event.delta)} tCO₂e avoided
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ChartContainer>
  );
};
