import React from 'react';
import { AlertTriangle, AlertCircle, Info, User, Calendar } from 'lucide-react';

type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';
type IssueStatus = 'open' | 'in-progress' | 'overdue';

interface Issue {
  id: string;
  title: string;
  framework: string;
  severity: IssueSeverity;
  owner: string;
  dueDate: string;
  status: IssueStatus;
}

const SEVERITY_CONFIG: Record<IssueSeverity, { icon: React.FC<{ className?: string }>; color: string; bg: string; border: string }> = {
  critical: { icon: AlertTriangle, color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-l-red-500' },
  high:     { icon: AlertCircle,  color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-l-amber-500' },
  medium:   { icon: Info,         color: 'text-sky-400',    bg: 'bg-sky-500/10',    border: 'border-l-sky-500' },
  low:      { icon: Info,         color: 'text-slate-400',  bg: 'bg-slate-500/10',  border: 'border-l-slate-500' },
};

const STATUS_CONFIG: Record<IssueStatus, { label: string; color: string }> = {
  open:        { label: 'Open',        color: 'text-slate-400' },
  'in-progress': { label: 'In Progress', color: 'text-sky-400' },
  overdue:     { label: 'Overdue',     color: 'text-red-400' },
};

const ISSUES: Issue[] = [
  { id: 'i1', title: 'TCFD Climate Risk Disclosure',   framework: 'TCFD', severity: 'critical', owner: 'Valery S.', dueDate: 'Jul 19, 2026', status: 'open' },
  { id: 'i2', title: 'Board Independence Assessment',  framework: 'GRI',  severity: 'high',     owner: 'James L.', dueDate: 'Jul 25, 2026', status: 'in-progress' },
  { id: 'i3', title: 'SASB Supply Chain Disclosure',   framework: 'SASB', severity: 'high',     owner: 'Priya M.', dueDate: 'Jul 10, 2026', status: 'overdue' },
  { id: 'i4', title: 'Data Privacy Policy Review',     framework: 'ISO',  severity: 'medium',   owner: 'Tom E.',   dueDate: 'Aug 5, 2026',  status: 'in-progress' },
];

export const CriticalIssuesTable: React.FC = () => (
  <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden">
    {/* Header */}
    <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <span className="text-sm font-semibold text-slate-50">Critical Issues</span>
      </div>
      <span className="text-xs text-red-400 font-medium">
        {ISSUES.filter((i) => i.status === 'overdue').length} overdue
      </span>
    </div>

    {/* Column headers */}
    <div className="px-5 py-2.5 grid grid-cols-12 text-[10px] text-slate-500 uppercase tracking-widest border-b border-[#334155]">
      <span className="col-span-1">Sev.</span>
      <span className="col-span-4">Issue</span>
      <span className="col-span-2">Framework</span>
      <span className="col-span-2">Owner</span>
      <span className="col-span-2">Due Date</span>
      <span className="col-span-1 text-right">Status</span>
    </div>

    {/* Rows */}
    <div className="divide-y divide-[#334155]">
      {ISSUES.map((issue) => {
        const sc = SEVERITY_CONFIG[issue.severity];
        const stc = STATUS_CONFIG[issue.status];
        const Icon = sc.icon;
        return (
          <div
            key={issue.id}
            className="px-5 py-3.5 grid grid-cols-12 items-center hover:bg-slate-800/30 transition-colors cursor-pointer group"
          >
            <div className="col-span-1">
              <Icon className={`w-4 h-4 ${sc.color}`} aria-label={issue.severity} />
            </div>
            <span className="col-span-4 text-sm text-slate-200 font-medium truncate pr-3">{issue.title}</span>
            <span className="col-span-2 text-xs text-slate-500">{issue.framework}</span>
            <div className="col-span-2 flex items-center gap-1.5 text-xs text-slate-400">
              <User className="w-3 h-3 shrink-0 text-slate-600" />
              {issue.owner}
            </div>
            <div className="col-span-2 flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3 h-3 shrink-0 text-slate-600" />
              {issue.dueDate}
            </div>
            <div className={`col-span-1 text-right text-xs font-medium ${stc.color}`}>
              {stc.label}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
