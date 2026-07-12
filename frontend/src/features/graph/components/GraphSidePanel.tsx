import React from 'react';
import { X, Link2, BarChart2, Clock } from 'lucide-react';

export interface NodeDetail {
  id: string;
  type: string;
  label: string;
  properties: Record<string, string | number>;
  connections: number;
  metrics?: { label: string; value: string }[];
}

interface GraphSidePanelProps {
  node: NodeDetail | null;
  onClose: () => void;
}

export const GraphSidePanel: React.FC<GraphSidePanelProps> = ({ node, onClose }) => {
  if (!node) {
    return (
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 h-full min-h-[400px]">
        <div className="w-12 h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center">
          <Link2 className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-400">No node selected</p>
          <p className="text-xs text-slate-600 mt-1">Click any node in the graph to view its properties.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-slate-50">{node.label}</span>
          <p className="text-[10px] text-slate-500 mt-0.5 capitalize">{node.type} node</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-0 overflow-y-auto">
        {/* Properties */}
        <div className="px-5 py-4 border-b border-[#334155]">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-3">Properties</span>
          <div className="flex flex-col gap-2.5">
            {Object.entries(node.properties).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-xs font-medium text-slate-200">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connections */}
        <div className="px-5 py-4 border-b border-[#334155]">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Connections</span>
          </div>
          <span className="text-2xl font-bold text-slate-50">{node.connections}</span>
          <span className="text-xs text-slate-500 ml-1.5">linked nodes</span>
        </div>

        {/* Metrics */}
        {node.metrics && node.metrics.length > 0 && (
          <div className="px-5 py-4 border-b border-[#334155]">
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Metrics</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {node.metrics.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-xs font-semibold text-emerald-400">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History placeholder */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">History</span>
          </div>
          <div className="text-xs text-slate-600 italic">Connect to backend to view audit history.</div>
        </div>
      </div>
    </div>
  );
};
