import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Leaf, Bell, Cpu, Zap, ShieldCheck, Palette,
  Monitor, Key, Lock, Sun, Moon,
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';

// ── Reusable primitives ─────────────────────────────────────────

const ConfigSection: React.FC<{
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, icon, children }) => (
  <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden">
    <div className="px-5 py-4 border-b border-[#334155] flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-slate-400">
        {icon}
      </div>
      <div>
        <span className="text-sm font-semibold text-slate-50">{title}</span>
        {description && <p className="text-[10px] text-slate-500 mt-0.5">{description}</p>}
      </div>
    </div>
    <div className="flex flex-col divide-y divide-[#334155]">{children}</div>
  </div>
);

const SettingsRow: React.FC<{
  label: string;
  description?: string;
  children: React.ReactNode;
}> = ({ label, description, children }) => (
  <div className="px-5 py-4 flex items-center justify-between gap-6">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-slate-200">{label}</p>
      {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string }> = ({
  checked, onChange, label,
}) => (
  <button
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex w-9 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/40 ${
      checked ? 'bg-emerald-500' : 'bg-[#334155]'
    }`}
  >
    <span
      className={`inline-block w-3.5 h-3.5 bg-white rounded-full shadow transition-transform mt-[3px] ${
        checked ? 'translate-x-[18px]' : 'translate-x-[3px]'
      }`}
    />
  </button>
);

const InputField: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  id: string;
}> = ({ value, onChange, placeholder, type = 'text', id }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 min-w-[200px]"
  />
);

const SelectField: React.FC<{
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  id: string;
}> = ({ value, onChange, options, id }) => (
  <select
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 min-w-[180px] appearance-none"
  >
    {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

const RangeInput: React.FC<{
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  label: string;
  unit?: string;
}> = ({ value, min, max, step = 1, onChange, label, unit }) => (
  <div className="flex items-center gap-3 min-w-[220px]">
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label={label}
      onChange={(e) => onChange(Number(e.target.value))}
      className="flex-1 h-1 bg-[#334155] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:cursor-pointer"
    />
    <span className="text-xs font-semibold text-slate-200 w-14 text-right tabular-nums">
      {value}{unit}
    </span>
  </div>
);

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

// ── Settings Page ───────────────────────────────────────────────

export const Settings: React.FC = () => {
  // Org
  const [orgName, setOrgName] = useState('EcoSphere Corp.');
  const [industry, setIndustry] = useState('technology');
  const [country, setCountry] = useState('US');

  // ESG Weights
  const [envWeight, setEnvWeight] = useState(40);
  const [socWeight, setSocWeight] = useState(35);
  const [govWeight, setGovWeight] = useState(25);

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [slackNotif, setSlackNotif] = useState(true);
  const [teamsNotif, setTeamsNotif] = useState(false);

  // AI Settings
  const [llmProvider, setLlmProvider] = useState('gemini');
  const [confidence, setConfidence] = useState(80);
  const [recFreq, setRecFreq] = useState('weekly');

  // Carbon
  const [autoCalc, setAutoCalc] = useState(true);
  const [carbonBudget, setCarbonBudget] = useState('15000');
  const [emFactor, setEmFactor] = useState('ghg-protocol');

  // Security
  const [twoFa, setTwoFa] = useState(true);

  // Appearance
  const [lang, setLang] = useState('en');
  const [tz, setTz] = useState('UTC+5:30');

  const totalWeight = envWeight + socWeight + govWeight;

  const INDUSTRIES = [
    { value: 'technology',    label: 'Technology' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'finance',       label: 'Financial Services' },
    { value: 'energy',        label: 'Energy & Utilities' },
    { value: 'healthcare',    label: 'Healthcare' },
    { value: 'retail',        label: 'Retail & Consumer' },
  ];

  const COUNTRIES = [
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IN', label: 'India' },
    { value: 'SG', label: 'Singapore' },
  ];

  const LLM_PROVIDERS = [
    { value: 'gemini',    label: 'Google Gemini' },
    { value: 'openai',    label: 'OpenAI GPT-4' },
    { value: 'claude',    label: 'Anthropic Claude' },
    { value: 'azure-oai', label: 'Azure OpenAI' },
  ];

  const FREQS = [
    { value: 'daily',   label: 'Daily' },
    { value: 'weekly',  label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  const EM_FACTORS = [
    { value: 'ghg-protocol', label: 'GHG Protocol' },
    { value: 'ipcc',         label: 'IPCC AR6' },
    { value: 'epa',          label: 'US EPA' },
    { value: 'defra',        label: 'UK DEFRA' },
  ];

  const LANGUAGES = [
    { value: 'en', label: 'English (US)' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' },
    { value: 'es', label: 'Español' },
    { value: 'ja', label: '日本語' },
  ];

  const TIMEZONES = [
    { value: 'UTC+0',    label: 'UTC+0 (London)' },
    { value: 'UTC+1',    label: 'UTC+1 (Paris)' },
    { value: 'UTC+5:30', label: 'UTC+5:30 (Mumbai)' },
    { value: 'UTC-5',    label: 'UTC-5 (New York)' },
    { value: 'UTC-8',    label: 'UTC-8 (Los Angeles)' },
    { value: 'UTC+9',    label: 'UTC+9 (Tokyo)' },
  ];

  return (
    <motion.div {...fadeIn} className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        subtitle="Configure organisation preferences and ESG platform behaviour."
        action={
          <Button variant="primary" size="sm">
            Save Changes
          </Button>
        }
      />

      {/* ── Organization ───────────────────────────────────── */}
      <ConfigSection
        title="Organisation"
        description="Basic company information"
        icon={<Building2 className="w-4 h-4" />}
      >
        <SettingsRow label="Company Name" description="Displayed across all reports and exports">
          <InputField id="org-name" value={orgName} onChange={setOrgName} placeholder="Company name" />
        </SettingsRow>
        <SettingsRow label="Industry" description="Used to apply industry-specific ESG benchmarks">
          <SelectField id="industry" value={industry} onChange={setIndustry} options={INDUSTRIES} />
        </SettingsRow>
        <SettingsRow label="Country / Region" description="Primary operating jurisdiction">
          <SelectField id="country" value={country} onChange={setCountry} options={COUNTRIES} />
        </SettingsRow>
      </ConfigSection>

      {/* ── ESG Weights ─────────────────────────────────────── */}
      <ConfigSection
        title="ESG Score Configuration"
        description={`Pillar weighting — Total: ${totalWeight}% ${totalWeight !== 100 ? '⚠ must equal 100%' : '✓'}`}
        icon={<Leaf className="w-4 h-4" />}
      >
        <SettingsRow label="Environmental Weight" description="Carbon, energy, water, biodiversity">
          <RangeInput value={envWeight} min={10} max={80} onChange={setEnvWeight} label="Environmental weight" unit="%" />
        </SettingsRow>
        <SettingsRow label="Social Weight" description="Workforce, safety, community, D&I">
          <RangeInput value={socWeight} min={10} max={80} onChange={setSocWeight} label="Social weight" unit="%" />
        </SettingsRow>
        <SettingsRow label="Governance Weight" description="Board, compliance, ethics, risk">
          <RangeInput value={govWeight} min={10} max={80} onChange={setGovWeight} label="Governance weight" unit="%" />
        </SettingsRow>
      </ConfigSection>

      {/* ── Notifications ───────────────────────────────────── */}
      <ConfigSection
        title="Notification Settings"
        description="Where ESG alerts are delivered"
        icon={<Bell className="w-4 h-4" />}
      >
        <SettingsRow label="Email Notifications" description="Receive alerts and reports by email">
          <Toggle checked={emailNotif} onChange={setEmailNotif} label="Email notifications" />
        </SettingsRow>
        <SettingsRow label="Push Notifications" description="Browser and mobile push alerts">
          <Toggle checked={pushNotif} onChange={setPushNotif} label="Push notifications" />
        </SettingsRow>
        <SettingsRow label="Slack Integration" description="Post alerts to a configured Slack channel">
          <Toggle checked={slackNotif} onChange={setSlackNotif} label="Slack notifications" />
        </SettingsRow>
        <SettingsRow label="Microsoft Teams" description="Send alerts to a Teams webhook">
          <Toggle checked={teamsNotif} onChange={setTeamsNotif} label="Teams notifications" />
        </SettingsRow>
      </ConfigSection>

      {/* ── AI Settings ─────────────────────────────────────── */}
      <ConfigSection
        title="AI Copilot Settings"
        description="Configure the intelligence engine"
        icon={<Cpu className="w-4 h-4" />}
      >
        <SettingsRow label="LLM Provider" description="Underlying model powering EcoSphere Intelligence">
          <SelectField id="llm" value={llmProvider} onChange={setLlmProvider} options={LLM_PROVIDERS} />
        </SettingsRow>
        <SettingsRow label="Confidence Threshold" description="Minimum confidence before an insight is surfaced">
          <RangeInput value={confidence} min={50} max={99} onChange={setConfidence} label="Confidence threshold" unit="%" />
        </SettingsRow>
        <SettingsRow label="Recommendation Frequency" description="How often AI recommendations are regenerated">
          <SelectField id="rec-freq" value={recFreq} onChange={setRecFreq} options={FREQS} />
        </SettingsRow>
      </ConfigSection>

      {/* ── Carbon Engine ───────────────────────────────────── */}
      <ConfigSection
        title="Carbon Engine"
        description="Emission calculation configuration"
        icon={<Zap className="w-4 h-4" />}
      >
        <SettingsRow label="Emission Factor Standard" description="Reference dataset used for tCO₂e calculations">
          <SelectField id="em-factor" value={emFactor} onChange={setEmFactor} options={EM_FACTORS} />
        </SettingsRow>
        <SettingsRow label="Auto-Calculation" description="Automatically recalculate emissions when data updates">
          <Toggle checked={autoCalc} onChange={setAutoCalc} label="Auto-calculation" />
        </SettingsRow>
        <SettingsRow label="Annual Carbon Budget" description="Total tCO₂e budget for the fiscal year">
          <div className="flex items-center gap-2">
            <InputField id="carbon-budget" value={carbonBudget} onChange={setCarbonBudget} type="number" placeholder="15000" />
            <span className="text-xs text-slate-500">tCO₂e</span>
          </div>
        </SettingsRow>
      </ConfigSection>

      {/* ── Security ────────────────────────────────────────── */}
      <ConfigSection
        title="Security"
        description="Account and access security"
        icon={<ShieldCheck className="w-4 h-4" />}
      >
        <SettingsRow label="Password" description="Last changed 45 days ago">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            Change Password
          </Button>
        </SettingsRow>
        <SettingsRow label="Two-Factor Authentication" description="Add an extra layer of sign-in security">
          <Toggle checked={twoFa} onChange={setTwoFa} label="Two-factor authentication" />
        </SettingsRow>
        <SettingsRow label="Active Sessions" description="Manage where you're signed in">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Monitor className="w-3.5 h-3.5" />
            View Sessions
          </Button>
        </SettingsRow>
        <SettingsRow label="API Keys" description="Generate keys for external integrations">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Key className="w-3.5 h-3.5" />
            Manage API Keys
          </Button>
        </SettingsRow>
      </ConfigSection>

      {/* ── Appearance ──────────────────────────────────────── */}
      <ConfigSection
        title="Appearance"
        description="Display and localisation preferences"
        icon={<Palette className="w-4 h-4" />}
      >
        <SettingsRow label="Theme" description="Interface colour scheme">
          <div className="flex items-center gap-2">
            <button
              aria-label="Dark mode"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium"
            >
              <Moon className="w-3.5 h-3.5" />
              Dark
            </button>
            <button
              aria-label="Light mode"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#334155] text-slate-500 text-xs hover:text-slate-300 transition-colors"
            >
              <Sun className="w-3.5 h-3.5" />
              Light
            </button>
          </div>
        </SettingsRow>
        <SettingsRow label="Language" description="Interface and report language">
          <SelectField id="language" value={lang} onChange={setLang} options={LANGUAGES} />
        </SettingsRow>
        <SettingsRow label="Timezone" description="Used for date/time display and report scheduling">
          <SelectField id="timezone" value={tz} onChange={setTz} options={TIMEZONES} />
        </SettingsRow>
      </ConfigSection>

      {/* ── Save Bar ────────────────────────────────────────── */}
      <div className="flex items-center justify-between p-5 bg-[#1E293B] border border-[#334155] rounded-2xl">
        <p className="text-sm text-slate-500">Changes are saved to your organisation profile and take effect immediately.</p>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Discard</Button>
          <Button variant="primary" size="sm">Save Changes</Button>
        </div>
      </div>
    </motion.div>
  );
};
