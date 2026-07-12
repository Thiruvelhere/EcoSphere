import React, { useState } from 'react';
import { Bell, SunMoon, Leaf } from 'lucide-react';
import { SearchBar } from '../../common/SearchBar';
import { Avatar } from '../../common/Avatar';

export const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 border-b border-[#334155] bg-[#0F172A] px-6 flex items-center justify-between text-[#F8FAFC]">
      {/* Brand logo (visible on mobile / desktop context) */}
      <div className="flex items-center gap-2">
        <Leaf className="h-5 w-5 text-[#22C55E]" />
        <span className="font-semibold text-base tracking-tight hidden md:inline-block">
          EcoSphere Intel
        </span>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md mx-8 hidden sm:block">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search ESG resources, entities, configurations..."
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Placeholder */}
        <button
          type="button"
          className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors"
          title="Toggle theme (currently Dark Mode only)"
        >
          <SunMoon className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] relative transition-colors"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>

        <div className="w-px h-6 bg-[#334155]"></div>

        {/* User Profile Info & Avatar */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <Avatar fallback="VS" size="sm" />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-sm font-medium leading-none text-[#F8FAFC] group-hover:text-[#22C55E] transition-colors">
              Valery S.
            </span>
            <span className="text-[10px] text-[#94A3B8] mt-0.5 leading-none">
              Sustainability Director
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
