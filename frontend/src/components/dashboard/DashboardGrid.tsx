import React from 'react';
import { Leaf, Users, Scale, Globe } from 'lucide-react';

import { StatCard } from '../widgets/StatCard';
import { AIInsight } from '../widgets/AIInsight';
import { CarbonTrend } from '../widgets/CarbonTrend';
import { DepartmentRanking } from '../widgets/DepartmentRanking';
import { ActivityFeed } from '../widgets/ActivityFeed';
import { Recommendation } from '../widgets/Recommendation';
import { ComplianceAlert } from '../widgets/ComplianceAlert';
import { Leaderboard } from '../widgets/Leaderboard';

// ─────────────────────────────────────────────────────────
// Placeholder Data  (replace with API calls once backend is live)
// ─────────────────────────────────────────────────────────

const CARBON_DATA = [
  { month: 'Jan', scope1: 4200, scope2: 2800, scope3: 8100, target: 9000 },
  { month: 'Feb', scope1: 3900, scope2: 2600, scope3: 7800, target: 9000 },
  { month: 'Mar', scope1: 4100, scope2: 2750, scope3: 8200, target: 9000 },
  { month: 'Apr', scope1: 3700, scope2: 2500, scope3: 7500, target: 9000 },
  { month: 'May', scope1: 3500, scope2: 2400, scope3: 7200, target: 9000 },
  { month: 'Jun', scope1: 3300, scope2: 2200, scope3: 6900, target: 9000 },
];

const DEPARTMENTS = [
  { rank: 1, department: 'Engineering', score: 92, trend: 'up' as const, change: 4 },
  { rank: 2, department: 'Operations', score: 88, trend: 'up' as const, change: 2 },
  { rank: 3, department: 'Finance', score: 81, trend: 'stable' as const, change: 0 },
  { rank: 4, department: 'Marketing', score: 76, trend: 'down' as const, change: -3 },
  { rank: 5, department: 'Logistics', score: 69, trend: 'up' as const, change: 1 },
];

const ACTIVITIES = [
  {
    id: 'a1',
    type: 'carbon' as const,
    title: 'Carbon offset verified',
    description: 'Gold Standard certification issued for Q2 reforestation project.',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    actor: 'Valery S.',
  },
  {
    id: 'a2',
    type: 'compliance' as const,
    title: 'CSRD disclosure submitted',
    description: 'FY2025 CSRD report submitted to European regulatory portal.',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    actor: 'James L.',
  },
  {
    id: 'a3',
    type: 'ai' as const,
    title: 'AI Copilot insight generated',
    description: 'New high-severity supply chain risk pattern detected in Tier 2 vendors.',
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
  {
    id: 'a4',
    type: 'social' as const,
    title: 'Safety training completed',
    description: '98% of Operations workforce completed mandatory H&S certification.',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
    actor: 'HR Team',
  },
  {
    id: 'a5',
    type: 'governance' as const,
    title: 'Board composition updated',
    description: 'Two independent ESG-specialist directors onboarded to the board.',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    actor: 'Corporate Secretary',
  },
];

const RECOMMENDATIONS = [
  {
    id: 'r1',
    title: 'Switch logistics fleet to EVs',
    description: 'Transitioning the last 30% of the logistics fleet to electric vehicles before Q4.',
    priority: 'high' as const,
    estimatedEsgGain: 14,
    estimatedCarbonReduction: 320,
    effort: 'high' as const,
  },
  {
    id: 'r2',
    title: 'Implement supplier ESG scorecard',
    description: 'Deploy structured ESG questionnaires to all Tier 1 & Tier 2 suppliers.',
    priority: 'medium' as const,
    estimatedEsgGain: 8,
    estimatedCarbonReduction: 140,
    effort: 'medium' as const,
  },
  {
    id: 'r3',
    title: 'Introduce employee green commute subsidy',
    description: 'Launch a public-transport subsidy program across all office locations.',
    priority: 'low' as const,
    estimatedEsgGain: 4,
    effort: 'low' as const,
  },
];

const COMPLIANCE_ALERTS = [
  {
    id: 'c1',
    title: 'TCFD Climate Risk Disclosure',
    framework: 'TCFD',
    severity: 'critical' as const,
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    owner: 'Valery S.',
    status: 'open' as const,
  },
  {
    id: 'c2',
    title: 'GRI 302 Energy Consumption Report',
    framework: 'GRI',
    severity: 'high' as const,
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
    owner: 'James L.',
    status: 'in-progress' as const,
  },
  {
    id: 'c3',
    title: 'SASB Supply Chain Disclosure',
    framework: 'SASB',
    severity: 'medium' as const,
    dueDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    owner: 'Priya M.',
    status: 'overdue' as const,
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    name: 'Aisha Nwosu',
    department: 'Engineering',
    xp: 12480,
    badge: 'gold' as const,
    avatarFallback: 'AN',
  },
  {
    rank: 2,
    name: 'James Liu',
    department: 'Operations',
    xp: 10920,
    badge: 'silver' as const,
    avatarFallback: 'JL',
  },
  {
    rank: 3,
    name: 'Marco Ferrari',
    department: 'Finance',
    xp: 9760,
    badge: 'bronze' as const,
    avatarFallback: 'MF',
  },
  {
    rank: 4,
    name: 'Priya Mehta',
    department: 'Governance',
    xp: 8430,
    badge: 'contributor' as const,
    avatarFallback: 'PM',
  },
  {
    rank: 5,
    name: 'Tom Eriksen',
    department: 'Logistics',
    xp: 7100,
    badge: 'none' as const,
    avatarFallback: 'TE',
  },
];

// ─────────────────────────────────────────────────────────
// DashboardGrid Component
// ─────────────────────────────────────────────────────────

export const DashboardGrid: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* ── Row 1: ESG Stat Cards + AI Insight ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Overall ESG Score"
          value="78.4"
          unit="/ 100"
          trend={3.2}
          status="positive"
          icon={<Globe className="w-4 h-4" />}
        />
        <StatCard
          title="Carbon Emissions"
          value="12.4k"
          unit="tCO₂e"
          trend={-8.6}
          status="positive"
          icon={<Leaf className="w-4 h-4" />}
        />
        <StatCard
          title="Social Score"
          value="84.1"
          unit="pts"
          trend={1.4}
          status="positive"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          title="Governance Index"
          value="71.0"
          unit="pts"
          trend={-2.1}
          status="warning"
          icon={<Scale className="w-4 h-4" />}
        />
      </div>

      {/* ── Row 2: AI Insight (full-width) ─────────────────── */}
      <AIInsight
        insight="EcoSphere's Tier 2 logistics suppliers in Southeast Asia show a 34% correlation with elevated Scope 3 emissions. Cross-referencing supplier shipment frequency data with emissions benchmarks reveals 3 vendors contributing disproportionately to your Q3 footprint. Initiating audits on these vendors could reduce total Scope 3 by up to 8% before year-end."
        severity="high"
        suggestedAction="Schedule vendor ESG audit for Tier 2 logistics suppliers"
        confidence={91}
        category="Supply Chain Risk · Scope 3"
        onActionClick={() => {}}
      />

      {/* ── Row 3: Carbon Trend + Department Ranking ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <CarbonTrend data={CARBON_DATA} className="lg:col-span-3" />
        <DepartmentRanking entries={DEPARTMENTS} className="lg:col-span-2" />
      </div>

      {/* ── Row 4: Activity Feed + Recommendations ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed events={ACTIVITIES} />
        <Recommendation items={RECOMMENDATIONS} />
      </div>

      {/* ── Row 5: Compliance Alerts + Leaderboard ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceAlert alerts={COMPLIANCE_ALERTS} />
        <Leaderboard entries={LEADERBOARD} />
      </div>
    </div>
  );
};
