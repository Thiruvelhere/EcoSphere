import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, BarChart3, Leaf } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/widgets/StatCard';
import { AIInsight } from '../../components/widgets/AIInsight';
import { DepartmentRanking } from '../../components/widgets/DepartmentRanking';
import { ESGTrendLine } from '../../features/analytics/components/ESGTrendLine';
import { ESGRadar } from '../../features/analytics/components/ESGRadar';
import { DeptComparison } from '../../features/analytics/components/DeptComparison';
import { ESGForecast } from '../../features/analytics/components/ESGForecast';
import { CorrelationHeatmap } from '../../features/analytics/components/CorrelationHeatmap';

const DEPT_RANKINGS = [
  { rank: 1, department: 'Engineering', score: 82, trend: 'up' as const, change: 3 },
  { rank: 2, department: 'Operations',  score: 76, trend: 'up' as const, change: 2 },
  { rank: 3, department: 'Finance',     score: 74, trend: 'stable' as const, change: 0 },
  { rank: 4, department: 'Logistics',   score: 68, trend: 'down' as const, change: -2 },
  { rank: 5, department: 'Marketing',   score: 71, trend: 'up' as const, change: 1 },
];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const Analytics: React.FC = () => (
  <motion.div {...fadeIn} className="flex flex-col gap-6">
    <PageHeader
      title="Analytics"
      subtitle="Advanced sustainability analytics and organisational ESG intelligence."
    />

    {/* ── Row 1: KPI Cards ────────────────────────────────── */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="ESG Score Trend"
        value="+7.2"
        unit="pts YTD"
        trend={11.2}
        status="positive"
        icon={<TrendingUp className="w-4 h-4" />}
      />
      <StatCard
        title="Carbon Saved YTD"
        value="757"
        unit="tCO₂e"
        trend={14.8}
        status="positive"
        icon={<Leaf className="w-4 h-4" />}
      />
      <StatCard
        title="Risk Index"
        value="2.1"
        unit="/ 5"
        trend={-8.7}
        trendLabel="vs last quarter"
        status="positive"
        icon={<BarChart3 className="w-4 h-4" />}
      />
      <StatCard
        title="12M Forecast Score"
        value="84.1"
        unit="pts"
        trend={7.3}
        status="positive"
        icon={<Award className="w-4 h-4" />}
      />
    </div>

    {/* ── Row 2: ESG Trend + Radar ─────────────────────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ESGTrendLine />
      <ESGRadar />
    </div>

    {/* ── Row 3: Department Comparison ─────────────────────── */}
    <DeptComparison />

    {/* ── Row 4: Forecast + Dept Rankings ─────────────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ESGForecast className="lg:col-span-2" />
      <DepartmentRanking entries={DEPT_RANKINGS} />
    </div>

    {/* ── Row 5: Correlation Heatmap ───────────────────────── */}
    <CorrelationHeatmap />

    {/* ── Row 6: AI Analytics Summary ─────────────────────── */}
    <AIInsight
      insight="Executive summary: EcoSphere has improved its composite ESG score by 7.2 points YTD (71.2 → 78.4). The strongest driver is carbon reduction (−14.8% YTD), closely correlated with the fleet EV programme. Social scores are rising fastest, led by Marketing (91%). Governance remains the lagging pillar at 71.0, with Logistics presenting the highest multi-risk concentration. The AI model projects a 84.1 score by end of year — conditional on the CSRD disclosure being filed within 7 days and the SASB overdue item resolved this week."
      severity="low"
      suggestedAction="File CSRD disclosure and resolve SASB overdue item to protect forecast score"
      confidence={94}
      category="Analytics · Executive AI Summary"
    />
  </motion.div>
);
