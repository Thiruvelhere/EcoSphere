import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Scale, ClipboardCheck, BarChart3 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/widgets/StatCard';
import { ComplianceAlert } from '../../components/widgets/ComplianceAlert';
import { AIInsight } from '../../components/widgets/AIInsight';
import { ComplianceStatus } from '../../features/governance/components/ComplianceStatus';
import { CriticalIssuesTable } from '../../features/governance/components/CriticalIssuesTable';
import { RiskHeatmap } from '../../features/governance/components/RiskHeatmap';
import { PolicyAcknowledgements } from '../../features/governance/components/PolicyAcknowledgements';

const COMPLIANCE_ALERTS = [
  {
    id: 'ca1',
    title: 'TCFD Climate Risk Disclosure',
    framework: 'TCFD',
    severity: 'critical' as const,
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    owner: 'Valery S.',
    status: 'open' as const,
  },
  {
    id: 'ca2',
    title: 'GRI 302 Energy Consumption',
    framework: 'GRI',
    severity: 'high' as const,
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
    owner: 'James L.',
    status: 'in-progress' as const,
  },
  {
    id: 'ca3',
    title: 'SASB Supply Chain Disclosure',
    framework: 'SASB',
    severity: 'high' as const,
    dueDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    owner: 'Priya M.',
    status: 'overdue' as const,
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const Governance: React.FC = () => (
  <motion.div {...fadeIn} className="flex flex-col gap-6">
    <PageHeader
      title="Governance Intelligence"
      subtitle="Monitor audits, policies, compliance issues and organizational governance."
    />

    {/* ── Row 1: KPI Cards ────────────────────────────────── */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Open Audits"
        value="3"
        trend={0}
        status="neutral"
        icon={<ClipboardCheck className="w-4 h-4" />}
      />
      <StatCard
        title="Compliance Score"
        value="84.2"
        unit="/ 100"
        trend={2.8}
        status="positive"
        icon={<ShieldAlert className="w-4 h-4" />}
      />
      <StatCard
        title="Policies Accepted"
        value="91"
        unit="%"
        trend={1.5}
        status="positive"
        icon={<BarChart3 className="w-4 h-4" />}
      />
      <StatCard
        title="Critical Issues"
        value="4"
        trend={-25}
        trendLabel="vs last quarter"
        status="warning"
        icon={<Scale className="w-4 h-4" />}
      />
    </div>

    {/* ── Row 2: Compliance Status Chart + Alerts ─────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ComplianceStatus className="lg:col-span-2" />
      <ComplianceAlert alerts={COMPLIANCE_ALERTS} />
    </div>

    {/* ── Row 3: Critical Issues Table ────────────────────── */}
    <CriticalIssuesTable />

    {/* ── Row 4: Policy Acknowledgements + Risk Heatmap ───── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PolicyAcknowledgements />
      <RiskHeatmap />
    </div>

    {/* ── Row 5: AI Governance Insight ────────────────────── */}
    <AIInsight
      insight="Based on current audit velocity and policy acceptance rates, 2 additional compliance deadlines are at risk of becoming overdue in the next 30 days. The SASB Supply Chain Disclosure — already overdue by 2 days — requires immediate owner escalation. Logistics department carries the highest composite risk score (3.0/4.0), driven by regulatory and reputational factors correlating with the AsiaTrade vendor relationship."
      severity="critical"
      suggestedAction="Escalate SASB disclosure and initiate Logistics risk mitigation plan"
      confidence={93}
      category="Governance Risk · Predictive AI"
    />
  </motion.div>
);
