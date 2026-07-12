import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-4 px-6 border-t border-[#334155] bg-[#0F172A] text-xs text-[#94A3B8] flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        &copy; {new Date().getFullYear()} EcoSphere AI. All rights reserved.
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-[#F8FAFC] transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-[#F8FAFC] transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-[#F8FAFC] transition-colors">Contact Support</a>
      </div>
    </footer>
  );
};
