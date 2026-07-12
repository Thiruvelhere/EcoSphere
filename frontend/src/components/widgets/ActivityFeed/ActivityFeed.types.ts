export type ActivityEventType =
  | 'carbon'
  | 'compliance'
  | 'social'
  | 'governance'
  | 'report'
  | 'ai';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  title: string;
  description: string;
  timestamp: string; // ISO string
  actor?: string;
}

export interface ActivityFeedProps {
  events: ActivityEvent[];
  className?: string;
}
