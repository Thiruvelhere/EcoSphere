import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, BarChart3, Cpu, Scale } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/widgets/StatCard';
import { CarbonTrend } from '../../components/widgets/CarbonTrend';
import { AIInsight } from '../../components/widgets/AIInsight';
import { EmissionSources } from '../../features/environment/components/EmissionSources';
import { CarbonBudgetCard } from '../../features/environment/components/CarbonBudgetCard';
import { EmissionBreakdown } from '../../features/environment/components/EmissionBreakdown';
import { DepartmentEmissions } from '../../features/environment/components/DepartmentEmissions';
import { RecentCarbonEvents } from '../../features/environment/components/RecentCarbonEvents';

const CARBON_DATA = [
  { month: 'Jan', scope1: 4200, scope2: 2800, scope3: 8100, target: 13000 },
  { month: 'Feb', scope1: 3900, scope2: 2600, scope3: 7800, target: 13000 },
  { month: 'Mar', scope1: 4100, scope2: 2750, scope3: 8200, target: 13000 },
  { month: 'Apr', scope1: 3700, scope2: 2500, scope3: 7500, target: 13000 },
  { month: 'May', scope1: 3500, scope2: 2400, scope3: 7200, target: 13000 },
  { month: 'Jun', scope1: 3300, scope2: 2200, scope3: 6900, target: 13000 },
];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const Environment: React.FC = () => {
  return (
    <motion.div {...fadeIn} className="flex flex-col gap-6">
      <PageHeader
        title="Environment Intelligence"
        subtitle="Monitor emissions, sustainability goals, and carbon trends across the organization."
      />

      {/* ── Row 1: Top Metrics ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Scope 1 Emissions"
          value="3.3k"
          unit="tCO₂e"
          trend={-5.7}
          status="positive"
          icon={<Leaf className="w-4 h-4" />}
        />
        <StatCard
          title="Scope 2 Emissions"
          value="2.2k"
          unit="tCO₂e"
          trend={-8.3}
          status="positive"
          icon={<BarChart3 className="w-4 h-4" />}
        />
        <StatCard
          title="Scope 3 Emissions"
          value="6.9k"
          unit="tCO₂e"
          trend={-4.2}
          status="positive"
          icon={<Scale className="w-4 h-4" />}
        />
        <StatCard
          title="Carbon Budget Used"
          value="61.3"
          unit="%"
          trend={2.1}
          status="warning"
          icon={<Cpu className="w-4 h-4" />}
        />
      </div>

      {/* ── Row 2: Carbon Trend + Budget ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CarbonTrend data={CARBON_DATA} className="lg:col-span-2" />
        <CarbonBudgetCard total={15000} used={9200} />
      </div>

      {/* ── Row 3: Emission Sources + Breakdown ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmissionSources />
        <EmissionBreakdown />
      </div>

      {/* ── Row 4: Department Emissions + AI Recommendation ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DepartmentEmissions className="lg:col-span-2" />
        <AIInsight
          insight="Fleet and transport operations contribute 34% of total emissions — significantly above the industry median of 22%. Accelerating the EV transition program by 6 months and deploying dynamic route optimization could reduce this category by up to 28% before Q4."
          severity="high"
          suggestedAction="Accelerate EV fleet rollout & deploy AI route optimization"
          confidence={88}
          category="Scope 1 · Fleet Emissions"
        />
      </div>

      {/* ── Row 5: Recent Carbon Events ────────────────────── */}
      <RecentCarbonEvents />
    </motion.div>
  );
};
