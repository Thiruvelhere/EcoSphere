import React from 'react';
import { Filter } from 'lucide-react';

interface FilterOption { label: string; value: string; }

interface FilterPanelField {
  id: string;
  label: string;
  type: 'select' | 'date-range';
  options?: FilterOption[];
  value: string;
  onChange: (v: string) => void;
}

interface FilterPanelProps {
  fields: FilterPanelField[];
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ fields, onReset }) => (
  <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 flex flex-col gap-5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-semibold text-slate-50">Filters</span>
      </div>
      <button
        onClick={onReset}
        className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
        aria-label="Reset all filters"
      >
        Reset all
      </button>
    </div>

    <div className="flex flex-col gap-4">
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-1.5">
          <label
            htmlFor={field.id}
            className="text-[10px] text-slate-500 uppercase tracking-widest"
          >
            {field.label}
          </label>

          {field.type === 'select' ? (
            <select
              id={field.id}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 appearance-none"
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              type="date"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              style={{ colorScheme: 'dark' }}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);
