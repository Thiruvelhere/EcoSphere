import React from 'react';
import { Cpu } from 'lucide-react';
import { ConfidenceBadge } from './ConfidenceBadge';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  confidence?: number;
}

export const AIMessage: React.FC<{ message: Message }> = ({ message }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
      <Cpu className="w-4 h-4 text-emerald-400" />
    </div>
    <div className="flex-1 min-w-0 max-w-2xl">
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl rounded-tl-sm px-4 py-3">
        <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
      <div className="flex items-center gap-2 mt-1.5 ml-1">
        <span className="text-[10px] text-slate-600">
          {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </span>
        {message.confidence !== undefined && (
          <ConfidenceBadge score={message.confidence} />
        )}
      </div>
    </div>
  </div>
);

export const UserMessage: React.FC<{ message: Message }> = ({ message }) => (
  <div className="flex items-start justify-end gap-3">
    <div className="flex-1 min-w-0 max-w-xl flex flex-col items-end">
      <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl rounded-tr-sm px-4 py-3">
        <p className="text-sm text-slate-100 leading-relaxed">{message.content}</p>
      </div>
      <span className="text-[10px] text-slate-600 mt-1 mr-1">
        {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
    <div className="w-8 h-8 rounded-xl bg-[#334155] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-slate-300">
      VS
    </div>
  </div>
);

export const TypingIndicator: React.FC = () => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
      <Cpu className="w-4 h-4 text-emerald-400" />
    </div>
    <div className="bg-[#1E293B] border border-[#334155] rounded-2xl rounded-tl-sm px-4 py-3">
      <div className="flex items-center gap-1.5" aria-label="AI is typing">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);
