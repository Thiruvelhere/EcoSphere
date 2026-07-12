import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { ChartContainer } from '../../../components/widgets/ChartContainer';

const DATA = [
  { name: 'Scope 1', value: 35, color: '#22C55E', description: 'Direct emissions' },
  { name: 'Scope 2', value: 25, color: '#38BDF8', description: 'Purchased energy' },
  { name: 'Scope 3', value: 40, color: '#A78BFA', description: 'Value chain' },
];

export const EmissionBreakdown: React.FC = () => {
  return (
    <ChartContainer
      title="Emission Breakdown"
      subtitle="By GHG protocol scope"
      icon={<PieIcon className="w-4 h-4 text-violet-400" />}
    >
      <div className="flex flex-col gap-4">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={DATA}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={70}
              dataKey="value"
            >
              {DATA.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex flex-col gap-2">
          {DATA.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-400">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">{item.description}</span>
                <span className="text-xs font-semibold text-slate-100">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  );
};
