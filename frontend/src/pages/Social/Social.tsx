import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, GraduationCap, Heart } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/widgets/StatCard';
import { AIInsight } from '../../components/widgets/AIInsight';
import { Leaderboard } from '../../components/widgets/Leaderboard';
import { ActivityFeed } from '../../components/widgets/ActivityFeed';
import { CSRTrend } from '../../features/social/components/CSRTrend';
import { DeptEngagementBar } from '../../features/social/components/DeptEngagementBar';
import { TrainingProgress } from '../../features/social/components/TrainingProgress';
import { DiversityOverview } from '../../features/social/components/DiversityOverview';
import { UpcomingEvents } from '../../features/social/components/UpcomingEvents';

const LEADERBOARD = [
  { rank: 1, name: 'Aisha Nwosu',   department: 'Engineering', xp: 12480, badge: 'gold' as const,        avatarFallback: 'AN' },
  { rank: 2, name: 'James Liu',     department: 'Operations',  xp: 10920, badge: 'silver' as const,      avatarFallback: 'JL' },
  { rank: 3, name: 'Marco Ferrari', department: 'Finance',     xp: 9760,  badge: 'bronze' as const,      avatarFallback: 'MF' },
  { rank: 4, name: 'Priya Mehta',   department: 'Governance',  xp: 8430,  badge: 'contributor' as const, avatarFallback: 'PM' },
  { rank: 5, name: 'Tom Eriksen',   department: 'Logistics',   xp: 7100,  badge: 'none' as const,        avatarFallback: 'TE' },
];

const ACTIVITIES = [
  {
    id: 'sa1', type: 'social' as const,
    title: 'Coastal cleanup completed',
    description: '82 employees participated in the Q2 coastal cleanup drive in 3 cities.',
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    actor: 'Green Team',
  },
  {
    id: 'sa2', type: 'governance' as const,
    title: 'D&I workshop delivered',
    description: 'Mandatory diversity & inclusion session completed for 4 departments.',
    timestamp: new Date(Date.now() - 20 * 3600000).toISOString(),
    actor: 'HR Team',
  },
  {
    id: 'sa3', type: 'report' as const,
    title: 'CSR quarterly report filed',
    description: 'Q2 2026 CSR report submitted to the corporate governance portal.',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    actor: 'Valery S.',
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const Social: React.FC = () => (
  <motion.div {...fadeIn} className="flex flex-col gap-6">
    <PageHeader
      title="Social Intelligence"
      subtitle="Track employee engagement, CSR participation, diversity metrics and organizational culture."
    />

    {/* ── Row 1: KPI Cards ────────────────────────────────── */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Employee Participation"
        value="82.4"
        unit="%"
        trend={5.2}
        status="positive"
        icon={<Users className="w-4 h-4" />}
      />
      <StatCard
        title="CSR Hours YTD"
        value="9.5k"
        unit="hrs"
        trend={18.3}
        status="positive"
        icon={<Heart className="w-4 h-4" />}
      />
      <StatCard
        title="Training Completion"
        value="87.5"
        unit="%"
        trend={3.1}
        status="positive"
        icon={<GraduationCap className="w-4 h-4" />}
      />
      <StatCard
        title="Engagement Score"
        value="84.1"
        unit="/ 100"
        trend={1.4}
        status="positive"
        icon={<Award className="w-4 h-4" />}
      />
    </div>

    {/* ── Row 2: CSR Trend + Dept Engagement ──────────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CSRTrend />
      <DeptEngagementBar />
    </div>

    {/* ── Row 3: Training + Leaderboard ───────────────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TrainingProgress />
      <Leaderboard entries={LEADERBOARD} />
    </div>

    {/* ── Row 4: Diversity Overview ────────────────────────── */}
    <DiversityOverview />

    {/* ── Row 5: Activity + Events ────────────────────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ActivityFeed events={ACTIVITIES} />
      <UpcomingEvents />
    </div>

    {/* ── Row 6: AI Insight ───────────────────────────────── */}
    <AIInsight
      insight="Marketing department shows the highest CSR participation (91%) but lowest senior-leadership involvement. Introducing a mentorship-led challenge programme could boost cross-level engagement by an estimated 22%. Additionally, Finance department is 19 points below the company average — targeted micro-volunteering events during lunch windows are recommended."
      severity="medium"
      suggestedAction="Launch cross-department mentorship CSR challenge programme"
      confidence={86}
      category="Social Engagement · AI Recommendation"
    />
  </motion.div>
);
