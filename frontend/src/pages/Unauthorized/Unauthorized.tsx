import React from 'react';
import { NavLink } from 'react-router-dom';

export const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-[#F8FAFC] px-4">
      <h1 className="text-9xl font-bold text-[#EF4444]">403</h1>
      <h2 className="text-2xl font-semibold mt-4">Access Denied</h2>
      <p className="text-sm text-[#94A3B8] mt-2 text-center max-w-md">
        You do not have the required permissions to view this resource. Contact your workspace administrator.
      </p>
      <NavLink
        to="/"
        className="mt-6 px-4 py-2 bg-[#EF4444] text-white text-sm font-medium rounded-lg hover:bg-[#EF4444]/90 transition-colors"
      >
        Return to Dashboard
      </NavLink>
    </div>
  );
};

export default Unauthorized;
