import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Scale, Globe, FileText, Download, FileSpreadsheet } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { ReportCard } from '../../features/reports/components/ReportCard';
import { ReportTable } from '../../features/reports/components/ReportTable';
import { FilterPanel } from '../../features/reports/components/FilterPanel';
import type { ReportRow } from '../../features/reports/components/ReportTable';

// ── Placeholder Data ─────────────────────────────────────

const REPORT_CARDS = [
  { title: 'Environmental Report',  subtitle: 'Emissions, energy, water, waste', icon: Leaf,     iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10', count: 14, lastGenerated: 'Jul 10, 2026' },
  { title: 'Social Report',         subtitle: 'Workforce, safety, community',     icon: Users,    iconColor: 'text-sky-400',     iconBg: 'bg-sky-500/10',     count: 8,  lastGenerated: 'Jul 8, 2026' },
  { title: 'Governance Report',     subtitle: 'Board, compliance, ethics',        icon: Scale,    iconColor: 'text-violet-400',  iconBg: 'bg-violet-500/10',  count: 6,  lastGenerated: 'Jul 5, 2026' },
  { title: 'ESG Summary',           subtitle: 'Full integrated ESG disclosure',   icon: Globe,    iconColor: 'text-amber-400',   iconBg: 'bg-amber-500/10',   count: 3,  lastGenerated: 'Jul 1, 2026' },
];

const RECENT_REPORTS: ReportRow[] = [
  { id: 'r1', name: 'Q2 2026 ESG Summary',              category: 'ESG',           generatedBy: 'Valery S.',  date: 'Jul 10, 2026', status: 'ready',      size: '2.4 MB' },
  { id: 'r2', name: 'H1 Carbon Emissions Report',       category: 'Environmental', generatedBy: 'James L.',   date: 'Jul 8, 2026',  status: 'ready',      size: '1.8 MB' },
  { id: 'r3', name: 'TCFD Climate Risk Disclosure',     category: 'Governance',    generatedBy: 'Priya M.',   date: 'Jul 5, 2026',  status: 'scheduled',  size: undefined },
  { id: 'r4', name: 'GRI Social Performance Report',    category: 'Social',        generatedBy: 'Tom E.',     date: 'Jul 3, 2026',  status: 'ready',      size: '3.1 MB' },
  { id: 'r5', name: 'Supplier ESG Audit Summary',       category: 'Environmental', generatedBy: 'Aisha N.',   date: 'Jul 1, 2026',  status: 'ready',      size: '980 KB' },
  { id: 'r6', name: 'Annual Board Diversity Analysis',  category: 'Governance',    generatedBy: 'Marco F.',   date: 'Jun 28, 2026', status: 'generating', size: undefined },
];

const DEPT_OPTIONS = [
  { label: 'All Departments', value: '' },
  { label: 'Engineering',    value: 'engineering' },
  { label: 'Operations',     value: 'operations' },
  { label: 'Finance',        value: 'finance' },
  { label: 'Logistics',      value: 'logistics' },
  { label: 'Marketing',      value: 'marketing' },
];

const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: '' },
  { label: 'Environmental', value: 'environmental' },
  { label: 'Social',        value: 'social' },
  { label: 'Governance',    value: 'governance' },
  { label: 'ESG Summary',   value: 'esg' },
];

const MODULE_OPTIONS = [
  { label: 'All Modules', value: '' },
  { label: 'TCFD',  value: 'tcfd' },
  { label: 'GRI',   value: 'gri' },
  { label: 'CSRD',  value: 'csrd' },
  { label: 'SASB',  value: 'sasb' },
];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const Reports: React.FC = () => {
  const [dept, setDept]         = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo]     = useState('');
  const [category, setCategory] = useState('');
  const [module, setModule]     = useState('');

  const handleReset = () => {
    setDept(''); setDateFrom(''); setDateTo('');
    setCategory(''); setModule('');
  };

  return (
    <motion.div {...fadeIn} className="flex flex-col gap-6">
      <PageHeader
        title="Reports"
        subtitle="Generate, manage, and export ESG reports and sustainability disclosures."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Export Excel
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </Button>
            <Button variant="primary" size="sm" className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Generate Report
            </Button>
          </div>
        }
      />

      {/* ── Row 1: Report Type Cards ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {REPORT_CARDS.map((card) => (
          <ReportCard key={card.title} {...card} />
        ))}
      </div>

      {/* ── Row 2: Report Builder ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

        {/* Left: Filter Panel */}
        <div className="lg:col-span-1">
          <FilterPanel
            onReset={handleReset}
            fields={[
              { id: 'dept',     label: 'Department', type: 'select',     options: DEPT_OPTIONS,     value: dept,     onChange: setDept },
              { id: 'dateFrom', label: 'Date From',  type: 'date-range',                            value: dateFrom, onChange: setDateFrom },
              { id: 'dateTo',   label: 'Date To',    type: 'date-range',                            value: dateTo,   onChange: setDateTo },
              { id: 'category', label: 'Category',   type: 'select',     options: CATEGORY_OPTIONS, value: category, onChange: setCategory },
              { id: 'module',   label: 'Framework',  type: 'select',     options: MODULE_OPTIONS,   value: module,   onChange: setModule },
            ]}
          />
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-3 bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4 min-h-[320px]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-50">Report Preview</span>
            <span className="text-xs text-slate-500">Configure filters and click Generate</span>
          </div>

          {/* Preview Placeholder */}
          <div className="flex-1 bg-[#0F172A] rounded-xl border border-[#334155] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Report` : 'ESG Report'}
                </p>
                <p className="text-xs text-slate-500">
                  {dept || 'All Departments'} · {module?.toUpperCase() || 'All Frameworks'}
                </p>
              </div>
            </div>

            {/* Skeleton preview lines */}
            <div className="flex flex-col gap-3">
              {[90, 75, 60, 45, 80].map((w, i) => (
                <div key={i} className="h-2 rounded-full bg-[#1E293B]" style={{ width: `${w}%` }} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mt-2">
              {['Environmental', 'Social', 'Governance'].map((label) => (
                <div key={label} className="bg-[#1E293B] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-slate-500 mb-1">{label}</p>
                  <div className="h-6 w-12 mx-auto rounded bg-[#334155]" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm" className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Generate
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Export Excel
            </Button>
          </div>
        </div>
      </div>

      {/* ── Row 3: Recent Reports Table ─────────────────────── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-50">Recent Reports</span>
          <span className="text-xs text-slate-500">{RECENT_REPORTS.length} reports</span>
        </div>
        <ReportTable rows={RECENT_REPORTS} onExport={(id) => console.log('Export', id)} />
      </div>
    </motion.div>
  );
};
