import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../layouts';
import { Dashboard } from '../pages/Dashboard';
import { Environment } from '../pages/Environment';
import { Social } from '../pages/Social';
import { Governance } from '../pages/Governance';
import { Analytics } from '../pages/Analytics';
import { KnowledgeGraph } from '../pages/KnowledgeGraph';
import { Copilot } from '../pages/Copilot';
import { Reports } from '../pages/Reports';
import { Settings } from '../pages/Settings';
import { NotFound } from '../pages/NotFound';
import { Unauthorized } from '../pages/Unauthorized';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="environment" element={<Environment />} />
          <Route path="social" element={<Social />} />
          <Route path="governance" element={<Governance />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="knowledge-graph" element={<KnowledgeGraph />} />
          <Route path="copilot" element={<Copilot />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          {/* Catch-all route for NotFound */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
