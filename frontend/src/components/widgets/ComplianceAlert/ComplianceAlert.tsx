import React from 'react';
import { ShieldAlert, User, Calendar, AlertTriangle } from 'lucide-react';
import type { ComplianceAlertProps, AlertSeverity } from './ComplianceAlert.types';

const SEVERITY_CONFIG: Record<
  AlertSeverity,
  { label: string; border: string; badge: string; dot: string }
> = {
  critical: {
    label: 'Critical',
    border: 'border-l-red-500',
    badge: 'bg-red-500/10 text-red-400',
    dot: 'bg-red-400',
  },
  high: {
    label: 'High',
    border: 'border-l-amber-500',
    badge: 'bg-amber-500/10 text-amber-400',
    dot: 'bg-amber-400',
  },
  medium: {
    label: 'Medium',
    border: 'border-l-sky-500',
    badge: 'bg-sky-500/10 text-sky-400',
    dot: 'bg-sky-400',
  },
  low: {
    label: 'Low',
    border: 'border-l-slate-500',
    badge: 'bg-slate-500/10 text-slate-400',
    dot: 'bg-slate-400',
  },
};

const STATUS_CONFIG = {
  open: { label: 'Open', color: 'text-slate-400' },
  'in-progress': { label: 'In Progress', color: 'text-sky-400' },
  overdue: { label: 'Overdue', color: 'text-red-400' },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const ComplianceAlert: React.FC<ComplianceAlertProps> = ({
  alerts,
  className = '',
}) => {
  return (
    <div
      className={`bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-slate-50">Compliance Alerts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-red-400" />
          <span className="text-xs text-red-400 font-medium">
            {alerts.filter((a) => a.status === 'overdue').length} overdue
          </span>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="flex flex-col gap-2 p-4">
        {alerts.map((alert) => {
          const sc = SEVERITY_CONFIG[alert.severity];
          const stc = STATUS_CONFIG[alert.status];
          return (
            <div
              key={alert.id}
              className={`bg-[#0F172A] border-l-4 ${sc.border} border border-[#334155] rounded-xl px-4 py-3.5 flex flex-col gap-2.5 hover:border-slate-500 transition-colors cursor-pointer`}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-slate-200 block truncate">
                    {alert.title}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    {alert.framework}
                  </span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${sc.badge}`}>
                  {sc.label}
                </span>
              </div>

              {/* Meta Row */}
              <div className="flex items-center gap-4 text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>Due {formatDate(alert.dueDate)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  <span>{alert.owner}</span>
                </div>
                <div className={`ml-auto text-xs font-medium ${stc.color}`}>
                  {stc.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
