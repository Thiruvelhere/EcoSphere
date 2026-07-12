export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface ComplianceAlertItem {
  id: string;
  title: string;
  framework: string; // e.g. "GRI", "CSRD", "TCFD"
  severity: AlertSeverity;
  dueDate: string; // ISO date
  owner: string;
  status: 'open' | 'in-progress' | 'overdue';
}

export interface ComplianceAlertProps {
  alerts: ComplianceAlertItem[];
  className?: string;
}
