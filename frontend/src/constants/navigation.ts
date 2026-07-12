export interface SidebarItem {
  name: string;
  path: string;
  iconName: string; // The Lucide icon component name to render
}

export const NAVIGATION_ITEMS: SidebarItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    iconName: 'LayoutDashboard',
  },
  {
    name: 'Environmental',
    path: '/environment',
    iconName: 'Leaf',
  },
  {
    name: 'Social',
    path: '/social',
    iconName: 'Users',
  },
  {
    name: 'Governance',
    path: '/governance',
    iconName: 'ShieldAlert',
  },
  {
    name: 'Analytics',
    path: '/analytics',
    iconName: 'BarChart3',
  },
  {
    name: 'Knowledge Graph',
    path: '/knowledge-graph',
    iconName: 'Network',
  },
  {
    name: 'AI Copilot',
    path: '/copilot',
    iconName: 'Cpu',
  },
  {
    name: 'Reports',
    path: '/reports',
    iconName: 'FileText',
  },
  {
    name: 'Settings',
    path: '/settings',
    iconName: 'Settings',
  },
];
