import React from 'react';
import { NavLink } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-[#F8FAFC] px-4">
      <h1 className="text-9xl font-bold text-[#22C55E]">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-sm text-[#94A3B8] mt-2 text-center max-w-md">
        The ESG intelligence page or asset you are trying to view does not exist or has been relocated.
      </p>
      <NavLink
        to="/"
        className="mt-6 px-4 py-2 bg-[#22C55E] text-[#0F172A] text-sm font-medium rounded-lg hover:bg-[#22C55E]/90 transition-colors"
      >
        Return to Dashboard
      </NavLink>
    </div>
  );
};

export default NotFound;
