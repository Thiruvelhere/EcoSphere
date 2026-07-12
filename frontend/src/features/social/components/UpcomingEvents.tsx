import React from 'react';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface ESGEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  category: string;
  categoryColor: string;
}

const EVENTS: ESGEvent[] = [
  {
    id: 'ev1',
    title: 'Green Week Volunteer Drive',
    date: 'Jul 20, 2026',
    location: 'All Offices',
    attendees: 240,
    category: 'Environment',
    categoryColor: '#22C55E',
  },
  {
    id: 'ev2',
    title: 'ESG Training Workshop',
    date: 'Jul 22, 2026',
    location: 'Engineering Hub',
    attendees: 80,
    category: 'Training',
    categoryColor: '#38BDF8',
  },
  {
    id: 'ev3',
    title: 'Board Diversity Session',
    date: 'Jul 28, 2026',
    location: 'HQ — Board Room',
    attendees: 18,
    category: 'Governance',
    categoryColor: '#A78BFA',
  },
  {
    id: 'ev4',
    title: 'Supplier ESG Onboarding',
    date: 'Aug 4, 2026',
    location: 'Virtual',
    attendees: 45,
    category: 'Supply Chain',
    categoryColor: '#F59E0B',
  },
];

export const UpcomingEvents: React.FC = () => (
  <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden">
    <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <CalendarDays className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-semibold text-slate-50">Upcoming Events</span>
      </div>
      <span className="text-xs text-slate-500">{EVENTS.length} scheduled</span>
    </div>
    <div className="flex flex-col gap-3 p-4">
      {EVENTS.map((event) => (
        <motion.div
          key={event.id}
          whileHover={{ y: -1 }}
          transition={{ duration: 0.15 }}
          className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3.5 flex flex-col gap-2 hover:border-slate-500 transition-colors cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-medium text-slate-200">{event.title}</span>
            <span
              className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0"
              style={{ color: event.categoryColor, backgroundColor: `${event.categoryColor}18` }}
            >
              {event.category}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3 h-3" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <Users className="w-3 h-3" />
              <span>{event.attendees} attendees</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
