import React from 'react';
import { motion } from 'framer-motion';

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  description,
  onClick,
}) => (
  <motion.button
    whileHover={{ y: -2 }}
    transition={{ duration: 0.15 }}
    onClick={onClick}
    className="w-full text-left bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3.5 flex items-start gap-3 hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
    aria-label={title}
  >
    <div className="w-8 h-8 rounded-lg bg-[#1E293B] flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-slate-100">{title}</p>
      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{description}</p>
    </div>
  </motion.button>
);
