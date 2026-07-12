import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react';
import type { Node, Edge, NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { PageHeader } from '../../components/common/PageHeader';
import { GraphToolbar } from '../../features/graph/components/GraphToolbar';
import { GraphSidePanel } from '../../features/graph/components/GraphSidePanel';
import type { NodeDetail } from '../../features/graph/components/GraphSidePanel';
import { NODE_TYPES } from '../../features/graph/components/CustomNodes';

// ── Placeholder Graph Data ──────────────────────────────────────────

const INITIAL_NODES: Node[] = [
  { id: 'dept-1', type: 'department', position: { x: 180, y: 60 },  data: { label: 'Engineering', score: 92 } },
  { id: 'dept-2', type: 'department', position: { x: 420, y: 60 },  data: { label: 'Operations', score: 88 } },
  { id: 'dept-3', type: 'department', position: { x: 660, y: 60 },  data: { label: 'Logistics', score: 76 } },
  { id: 'sup-1',  type: 'supplier',   position: { x: 60,  y: 240 }, data: { label: 'TechParts Ltd', risk: 'Low' } },
  { id: 'sup-2',  type: 'supplier',   position: { x: 320, y: 240 }, data: { label: 'GreenShip Co.', risk: 'Medium' } },
  { id: 'sup-3',  type: 'supplier',   position: { x: 580, y: 240 }, data: { label: 'AsiaTrade', risk: 'High' } },
  { id: 'em-1',   type: 'emission',   position: { x: 140, y: 420 }, data: { label: 'Scope 1', value: '4.2k tCO₂e' } },
  { id: 'em-2',   type: 'emission',   position: { x: 400, y: 420 }, data: { label: 'Scope 2', value: '2.8k tCO₂e' } },
  { id: 'em-3',   type: 'emission',   position: { x: 660, y: 420 }, data: { label: 'Scope 3', value: '8.1k tCO₂e' } },
  { id: 'audit-1',type: 'audit',      position: { x: 260, y: 580 }, data: { label: 'Q1 Audit 2025', status: 'Passed' } },
  { id: 'pol-1',  type: 'policy',     position: { x: 560, y: 580 }, data: { label: 'CSRD Policy', framework: 'EU' } },
  { id: 'emp-1',  type: 'employee',   position: { x: 800, y: 300 }, data: { label: 'ESG Team Lead', dept: 'Governance' } },
  { id: 'purch-1',type: 'purchase',   position: { x: 760, y: 150 }, data: { label: 'Renewable PPA', value: '€2.4M' } },
  { id: 'chal-1', type: 'challenge',  position: { x: 80,  y: 580 }, data: { label: 'Carbon Target', year: 2030 } },
];

const INITIAL_EDGES: Edge[] = [
  { id: 'e1',  source: 'dept-1',  target: 'sup-1',   animated: true,  style: { stroke: '#38BDF8', strokeWidth: 1.5 } },
  { id: 'e2',  source: 'dept-2',  target: 'sup-2',   style: { stroke: '#F59E0B', strokeWidth: 1.5 } },
  { id: 'e3',  source: 'dept-3',  target: 'sup-3',   style: { stroke: '#EF4444', strokeWidth: 1.5 } },
  { id: 'e4',  source: 'sup-1',   target: 'em-1',    style: { stroke: '#22C55E', strokeWidth: 1.5 } },
  { id: 'e5',  source: 'sup-2',   target: 'em-2',    style: { stroke: '#22C55E', strokeWidth: 1.5 } },
  { id: 'e6',  source: 'sup-3',   target: 'em-3',    style: { stroke: '#22C55E', strokeWidth: 1.5 } },
  { id: 'e7',  source: 'dept-1',  target: 'audit-1', style: { stroke: '#A78BFA', strokeWidth: 1.5 } },
  { id: 'e8',  source: 'em-2',    target: 'audit-1', style: { stroke: '#A78BFA', strokeWidth: 1.5 } },
  { id: 'e9',  source: 'dept-2',  target: 'pol-1',   style: { stroke: '#64748B', strokeWidth: 1.5 } },
  { id: 'e10', source: 'em-3',    target: 'pol-1',   style: { stroke: '#64748B', strokeWidth: 1.5 } },
  { id: 'e11', source: 'emp-1',   target: 'dept-3',  style: { stroke: '#A78BFA', strokeWidth: 1.5 } },
  { id: 'e12', source: 'dept-1',  target: 'purch-1', style: { stroke: '#F59E0B', strokeWidth: 1.5 } },
  { id: 'e13', source: 'em-1',    target: 'chal-1',  style: { stroke: '#EF4444', strokeWidth: 1.5 } },
];

const NODE_DETAILS: Record<string, NodeDetail> = {
  'dept-1':  { id: 'dept-1',  type: 'Department', label: 'Engineering',    connections: 3, properties: { score: 92, employees: 240, location: 'HQ' }, metrics: [{ label: 'ESG Score', value: '92/100' }, { label: 'Emissions', value: '1.2k tCO₂e' }] },
  'dept-2':  { id: 'dept-2',  type: 'Department', label: 'Operations',     connections: 3, properties: { score: 88, employees: 410, location: 'Global' }, metrics: [{ label: 'ESG Score', value: '88/100' }, { label: 'Emissions', value: '3.4k tCO₂e' }] },
  'dept-3':  { id: 'dept-3',  type: 'Department', label: 'Logistics',      connections: 3, properties: { score: 76, employees: 180, location: 'Regional' }, metrics: [{ label: 'ESG Score', value: '76/100' }, { label: 'Emissions', value: '2.8k tCO₂e' }] },
  'sup-1':   { id: 'sup-1',   type: 'Supplier',   label: 'TechParts Ltd',  connections: 2, properties: { risk: 'Low', country: 'Germany', tier: 1 }, metrics: [{ label: 'ESG Rating', value: 'A' }, { label: 'Audit Status', value: 'Passed' }] },
  'sup-2':   { id: 'sup-2',   type: 'Supplier',   label: 'GreenShip Co.',  connections: 2, properties: { risk: 'Medium', country: 'Netherlands', tier: 1 }, metrics: [{ label: 'ESG Rating', value: 'B+' }, { label: 'Audit Status', value: 'Pending' }] },
  'sup-3':   { id: 'sup-3',   type: 'Supplier',   label: 'AsiaTrade',      connections: 2, properties: { risk: 'High', country: 'Vietnam', tier: 2 }, metrics: [{ label: 'ESG Rating', value: 'C' }, { label: 'Audit Status', value: 'Overdue' }] },
  'em-1':    { id: 'em-1',    type: 'Emission',   label: 'Scope 1',        connections: 2, properties: { value: '4.2k tCO₂e', type: 'Direct', yoy: '−5.7%' } },
  'em-2':    { id: 'em-2',    type: 'Emission',   label: 'Scope 2',        connections: 3, properties: { value: '2.8k tCO₂e', type: 'Indirect Energy', yoy: '−8.3%' } },
  'em-3':    { id: 'em-3',    type: 'Emission',   label: 'Scope 3',        connections: 2, properties: { value: '8.1k tCO₂e', type: 'Value Chain', yoy: '+4.2%' } },
  'audit-1': { id: 'audit-1', type: 'Audit',      label: 'Q1 Audit 2025',  connections: 3, properties: { status: 'Passed', date: 'Mar 2025', auditor: 'PwC' } },
  'pol-1':   { id: 'pol-1',   type: 'Policy',     label: 'CSRD Policy',    connections: 2, properties: { framework: 'EU CSRD', effectiveDate: 'Jan 2025', deadline: 'Dec 2025' } },
  'emp-1':   { id: 'emp-1',   type: 'Employee',   label: 'ESG Team Lead',  connections: 1, properties: { department: 'Governance', role: 'Lead', xp: '12,480' } },
  'purch-1': { id: 'purch-1', type: 'Purchase',   label: 'Renewable PPA',  connections: 1, properties: { value: '€2.4M', type: 'Renewable Energy', period: '12 months' } },
  'chal-1':  { id: 'chal-1',  type: 'Challenge',  label: 'Carbon Target',  connections: 1, properties: { year: 2030, reduction: '−50%', baseline: 2020 } },
};

// ── Legend ─────────────────────────────────────────────────────────

const LEGEND = [
  { type: 'Department', color: 'bg-sky-400' },
  { type: 'Supplier', color: 'bg-amber-400' },
  { type: 'Employee', color: 'bg-violet-400' },
  { type: 'Emission', color: 'bg-emerald-400' },
  { type: 'Audit', color: 'bg-rose-400' },
  { type: 'Purchase', color: 'bg-orange-400' },
  { type: 'Policy', color: 'bg-slate-400' },
  { type: 'Challenge', color: 'bg-red-400' },
];

// ── Inner Component (needs ReactFlowProvider context) ──────────────

const KnowledgeGraphInner: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<NodeDetail | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setSelectedNode(NODE_DETAILS[node.id] ?? null);
  }, []);

  const visibleNodes = nodes.filter((n) => {
    const matchesSearch = n.data.label
      ? String(n.data.label).toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesFilter =
      filter === 'All' || n.type?.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-5"
    >
      <PageHeader
        title="ESG Knowledge Graph"
        subtitle="Visualize relationships between suppliers, departments, emissions, audits, and employees."
      />

      {/* Toolbar */}
      <GraphToolbar
        searchValue={search}
        onSearchChange={setSearch}
        activeFilter={filter}
        onFilterChange={setFilter}
        onExpand={() => fitView({ padding: 0.2 })}
        onCollapse={() => fitView({ padding: 0.05 })}
        onReset={() => { setSearch(''); setFilter('All'); fitView(); }}
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
      />

      {/* Main Layout */}
      <div className="flex gap-5 items-start">
        {/* Graph Canvas */}
        <div className="flex-1 min-w-0 bg-[#0F172A] border border-[#334155] rounded-2xl overflow-hidden" style={{ height: '580px' }}>
          <ReactFlow
            nodes={visibleNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={NODE_TYPES}
            colorMode="dark"
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.3}
            maxZoom={2}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="#1E293B"
            />
            <Controls
              className="[&>button]:bg-[#1E293B] [&>button]:border-[#334155] [&>button]:text-slate-400"
            />
            <MiniMap
              nodeColor={(n) => {
                const type = n.type;
                const colors: Record<string, string> = {
                  department: '#38BDF8', supplier: '#F59E0B', employee: '#A78BFA',
                  emission: '#22C55E', audit: '#F43F5E', purchase: '#FB923C',
                  policy: '#64748B', challenge: '#EF4444',
                };
                return colors[type ?? ''] ?? '#334155';
              }}
              style={{ background: '#111827', border: '1px solid #334155' }}
            />
          </ReactFlow>
        </div>

        {/* Side Panel */}
        <div className="w-72 shrink-0">
          <GraphSidePanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl px-5 py-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest mr-1">Node Types</span>
        {LEGEND.map(({ type, color }) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[10px] text-slate-400">{type}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const KnowledgeGraph: React.FC = () => (
  <ReactFlowProvider>
    <KnowledgeGraphInner />
  </ReactFlowProvider>
);
