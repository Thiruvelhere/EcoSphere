import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight text-slate-50">Settings</h1>
      <p className="text-base text-slate-400">Configure framework weights, notifications, API keys, and workspace profiles.</p>
    </div>
  );
};
