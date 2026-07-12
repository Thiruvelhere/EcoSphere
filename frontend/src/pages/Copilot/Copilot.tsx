import React from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  FileText,
  BarChart3,
  Search,
  TrendingUp,
  Cpu,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { AIMessage, UserMessage, TypingIndicator } from '../../features/copilot/components/ConversationBubble';
import { QuickActionCard } from '../../features/copilot/components/QuickActionCard';
import { useCopilot } from '../../features/copilot/hooks/useCopilot';

const SUGGESTED_QUESTIONS = [
  'Why did emissions increase in Q2?',
  'Predict next month\'s ESG score.',
  'Show risky suppliers.',
  'Summarize compliance issues.',
  'Which department needs attention?',
];

const QUICK_ACTIONS = [
  { icon: <FileText className="w-4 h-4 text-emerald-400" />, title: 'Generate ESG Report', description: 'Auto-generate a full ESG disclosure document.' },
  { icon: <BarChart3 className="w-4 h-4 text-sky-400" />, title: 'Run Carbon Simulation', description: 'Model emission scenarios for next 12 months.' },
  { icon: <Search className="w-4 h-4 text-violet-400" />, title: 'Analyze Supplier', description: 'Deep-dive ESG audit on a specific vendor.' },
  { icon: <TrendingUp className="w-4 h-4 text-amber-400" />, title: 'Forecast ESG Score', description: 'Predict score trajectory with current data.' },
];

const RECENT_INSIGHTS = [
  { label: 'Scope 3 spike in Q2', severity: 'high' },
  { label: 'CSRD deadline approaching', severity: 'critical' },
  { label: 'Fleet EV milestone reached', severity: 'low' },
];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const Copilot: React.FC = () => {
  const { messages, isTyping, input, setInput, sendMessage, bottomRef } = useCopilot();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <motion.div {...fadeIn} className="flex flex-col gap-6">
      <PageHeader
        title="EcoSphere Intelligence"
        subtitle="Your enterprise AI assistant for ESG analysis, reporting, and strategic insights."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* ── LEFT: Conversation ──────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Chat Window */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl flex flex-col overflow-hidden" style={{ height: '560px' }}>

            {/* Header */}
            <div className="px-5 py-4 border-b border-[#334155] flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-50">AI Copilot</span>
                <p className="text-[10px] text-slate-500">Powered by EcoSphere Intelligence Engine</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5 scroll-smooth">
              {messages.map((msg) =>
                msg.role === 'ai'
                  ? <AIMessage key={msg.id} message={msg} />
                  : <UserMessage key={msg.id} message={msg} />
              )}
              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-[#334155] shrink-0">
              <div className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about emissions, compliance, suppliers, ESG scores…"
                  rows={2}
                  aria-label="Chat input"
                  className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition-colors"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-[#0F172A] hover:bg-emerald-400 disabled:opacity-40 disabled:pointer-events-none transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-600 mt-2">
                Press Enter to send · Shift+Enter for new line
              </p>
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-slate-50">Suggested Questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 bg-[#0F172A] border border-[#334155] rounded-lg text-xs text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Sidebar ──────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Capabilities */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-slate-50">AI Capabilities</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Carbon Analysis', score: 97 },
                { label: 'Compliance Mapping', score: 94 },
                { label: 'Supplier Risk', score: 89 },
                { label: 'ESG Forecasting', score: 91 },
              ].map(({ label, score }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">{label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-[#334155] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 w-7 text-right tabular-nums">{score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5">
            <span className="text-sm font-semibold text-slate-50 block mb-3">Quick Actions</span>
            <div className="flex flex-col gap-2">
              {QUICK_ACTIONS.map((action) => (
                <QuickActionCard
                  key={action.title}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  onClick={() => sendMessage(action.title)}
                />
              ))}
            </div>
          </div>

          {/* Recent Insights */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5">
            <span className="text-sm font-semibold text-slate-50 block mb-3">Recent Insights</span>
            <div className="flex flex-col gap-2">
              {RECENT_INSIGHTS.map(({ label, severity }) => {
                const color =
                  severity === 'critical' ? 'bg-red-400' :
                  severity === 'high' ? 'bg-amber-400' : 'bg-emerald-400';
                return (
                  <div key={label} className="flex items-center gap-2.5 py-2 border-b border-[#334155] last:border-0">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />
                    <span className="text-xs text-slate-400">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
