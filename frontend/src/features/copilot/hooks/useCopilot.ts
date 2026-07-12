import { useState, useCallback, useRef, useEffect } from 'react';
import type { Message } from '../components/ConversationBubble';

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'ai',
  content:
    'Hello! I\'m EcoSphere Intelligence — your AI ESG Copilot.\n\nI can analyze your environmental footprint, generate compliance reports, predict ESG score trends, and surface hidden risks across your supply chain.\n\nWhat would you like to explore today?',
  timestamp: new Date(),
  confidence: 97,
};

const DEMO_RESPONSES: Record<string, string> = {
  default:
    'I\'ve analyzed your ESG data corpus. Based on current trajectory models, I can provide detailed insights on this topic. Would you like me to generate a full report or surface the key data points?',
  emission:
    'Your Scope 3 emissions increased by 12.4% in Q2, primarily driven by Tier 2 logistics suppliers in Southeast Asia. Three vendors — TechParts Ltd, AsiaTrade Co., and Maritime Express — account for 67% of the anomaly. I recommend initiating a supplier ESG audit within the next 30 days.',
  predict:
    'Based on current performance vectors and your planned EV fleet transition, I project your ESG score will reach 84.2 by next month — up from 78.4 today. Accelerating the CSRD disclosure by 2 weeks could push this to 86.1.',
  supplier:
    'I\'ve identified 3 high-risk suppliers based on cross-referencing shipment data, audit scores, and public ESG filings:\n\n1. AsiaTrade Co. — Risk: High (missing Q1 audit, elevated Scope 3)\n2. Maritime Express — Risk: Medium (shipping route through unregulated zones)\n3. GlobalParts Inc. — Risk: Medium (sub-threshold social score)\n\nShall I generate a supplier risk report?',
  compliance:
    'You have 2 open compliance issues requiring immediate attention:\n\n1. TCFD Climate Risk Disclosure — due in 7 days, status: Open\n2. SASB Supply Chain Disclosure — due date passed 2 days ago, status: Overdue\n\nI recommend prioritizing the SASB disclosure to avoid regulatory penalties.',
  department:
    'Operations department shows the most critical ESG gap: 3,400 tCO2e this quarter vs. a target of 2,800. Contributing factors include a 22% increase in production volume without corresponding efficiency gains. Recommended intervention: deploy process heat recovery systems (estimated −380 tCO2e).',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('emission') || lower.includes('carbon') || lower.includes('increase')) return DEMO_RESPONSES.emission;
  if (lower.includes('predict') || lower.includes('forecast') || lower.includes('next month')) return DEMO_RESPONSES.predict;
  if (lower.includes('supplier') || lower.includes('risk')) return DEMO_RESPONSES.supplier;
  if (lower.includes('compliance')) return DEMO_RESPONSES.compliance;
  if (lower.includes('department') || lower.includes('attention')) return DEMO_RESPONSES.department;
  return DEMO_RESPONSES.default;
}

export function useCopilot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim()) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          role: 'ai',
          content: getResponse(content),
          timestamp: new Date(),
          confidence: Math.floor(Math.random() * 15) + 82,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 1200 + Math.random() * 800);
    },
    []
  );

  return { messages, isTyping, input, setInput, sendMessage, bottomRef };
}
