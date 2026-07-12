import React from 'react';
import { Search, Filter, Expand, Minimize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface GraphToolbarProps {
  searchValue: string;
  onSearchChange: (v: string) => void;
  onExpand: () => void;
  onCollapse: () => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  activeFilter: string;
  onFilterChange: (f: string) => void;
}

const FILTERS = ['All', 'Department', 'Supplier', 'Emission', 'Audit', 'Policy'];

export const GraphToolbar: React.FC<GraphToolbarProps> = ({
  searchValue,
  onSearchChange,
  onExpand,
  onCollapse,
  onReset,
  onZoomIn,
  onZoomOut,
  activeFilter,
  onFilterChange,
}) => (
  <div className="flex flex-wrap items-center gap-3 p-4 bg-[#1E293B] border border-[#334155] rounded-2xl">
    {/* Search */}
    <div className="relative flex-1 min-w-[180px] max-w-xs">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search nodes…"
        aria-label="Search graph nodes"
        className="w-full pl-9 pr-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
      />
    </div>

    {/* Filters */}
    <div className="flex items-center gap-1.5">
      <Filter className="w-3.5 h-3.5 text-slate-500" />
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          aria-pressed={activeFilter === f}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
            activeFilter === f
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {f}
        </button>
      ))}
    </div>

    {/* Actions */}
    <div className="flex items-center gap-1 ml-auto">
      {[
        { icon: <ZoomIn className="w-3.5 h-3.5" />, label: 'Zoom in', fn: onZoomIn },
        { icon: <ZoomOut className="w-3.5 h-3.5" />, label: 'Zoom out', fn: onZoomOut },
        { icon: <Expand className="w-3.5 h-3.5" />, label: 'Expand all', fn: onExpand },
        { icon: <Minimize2 className="w-3.5 h-3.5" />, label: 'Collapse all', fn: onCollapse },
        { icon: <RotateCcw className="w-3.5 h-3.5" />, label: 'Reset view', fn: onReset },
      ].map(({ icon, label, fn }) => (
        <button
          key={label}
          onClick={fn}
          title={label}
          aria-label={label}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
        >
          {icon}
        </button>
      ))}
    </div>
  </div>
);
