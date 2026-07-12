import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../../constants/navigation';
import * as LucideIcons from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-[260px] bg-[#111827] border-r border-[#334155] flex flex-col h-screen shrink-0 text-[#F8FAFC]">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-[#334155] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center font-bold text-[#0F172A]">
          E
        </div>
        <span className="font-semibold text-lg tracking-tight">EcoSphere</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
        {NAVIGATION_ITEMS.map((item) => {
          // Resolve Lucide Icon dynamically
          const IconComponent = (LucideIcons as any)[item.iconName] || LucideIcons.HelpCircle;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-[#1E293B] text-[#22C55E]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <IconComponent
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive
                        ? 'text-[#22C55E]'
                        : 'text-[#94A3B8] group-hover:text-[#F8FAFC]'
                    }`}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#334155]">
        <div className="px-3 py-2 bg-[#1E293B]/40 rounded-lg text-xs text-[#94A3B8] flex items-center justify-between">
          <span>Tier: Enterprise</span>
          <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
        </div>
      </div>
    </aside>
  );
};
