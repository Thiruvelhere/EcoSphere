import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ReportCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  count: number;
  lastGenerated: string;
  onClick?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  count,
  lastGenerated,
  onClick,
}) => (
  <motion.button
    whileHover={{ y: -2 }}
    transition={{ duration: 0.15 }}
    onClick={onClick}
    className="w-full text-left bg-[#1E293B] border border-[#334155] rounded-2xl p-5 flex flex-col gap-4 hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
    aria-label={`Open ${title}`}
  >
    <div className="flex items-start justify-between">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <span className="text-xs text-slate-500 font-medium">{count} reports</span>
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-50">{title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
    </div>
    <p className="text-[10px] text-slate-600">Last: {lastGenerated}</p>
  </motion.button>
);
