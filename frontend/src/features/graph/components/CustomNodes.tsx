import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Building2, Truck, Users, Leaf, ClipboardCheck, Scale, ShoppingCart, BookOpen } from 'lucide-react';

type NodeData = {
  label: string;
  [key: string]: unknown;
};

interface StyledNodeProps extends NodeProps {
  data: NodeData;
}

const NODE_BASE = 'px-4 py-3 rounded-xl border-2 text-center min-w-[110px] cursor-pointer transition-all duration-150';

export const DepartmentNode: React.FC<StyledNodeProps> = ({ data, selected }) => (
  <div className={`${NODE_BASE} bg-sky-500/10 ${selected ? 'border-sky-400' : 'border-sky-500/30'}`}>
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <Building2 className="w-4 h-4 text-sky-400 mx-auto mb-1" />
    <span className="text-xs font-semibold text-sky-300">{data.label}</span>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

export const SupplierNode: React.FC<StyledNodeProps> = ({ data, selected }) => (
  <div className={`${NODE_BASE} bg-amber-500/10 ${selected ? 'border-amber-400' : 'border-amber-500/30'}`}>
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <Truck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
    <span className="text-xs font-semibold text-amber-300">{data.label}</span>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

export const EmployeeNode: React.FC<StyledNodeProps> = ({ data, selected }) => (
  <div className={`${NODE_BASE} bg-violet-500/10 ${selected ? 'border-violet-400' : 'border-violet-500/30'}`}>
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <Users className="w-4 h-4 text-violet-400 mx-auto mb-1" />
    <span className="text-xs font-semibold text-violet-300">{data.label}</span>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

export const EmissionNode: React.FC<StyledNodeProps> = ({ data, selected }) => (
  <div className={`${NODE_BASE} bg-emerald-500/10 ${selected ? 'border-emerald-400' : 'border-emerald-500/30'}`}>
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <Leaf className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
    <span className="text-xs font-semibold text-emerald-300">{data.label}</span>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

export const AuditNode: React.FC<StyledNodeProps> = ({ data, selected }) => (
  <div className={`${NODE_BASE} bg-rose-500/10 ${selected ? 'border-rose-400' : 'border-rose-500/30'}`}>
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <ClipboardCheck className="w-4 h-4 text-rose-400 mx-auto mb-1" />
    <span className="text-xs font-semibold text-rose-300">{data.label}</span>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

export const PurchaseNode: React.FC<StyledNodeProps> = ({ data, selected }) => (
  <div className={`${NODE_BASE} bg-orange-500/10 ${selected ? 'border-orange-400' : 'border-orange-500/30'}`}>
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <ShoppingCart className="w-4 h-4 text-orange-400 mx-auto mb-1" />
    <span className="text-xs font-semibold text-orange-300">{data.label}</span>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

export const PolicyNode: React.FC<StyledNodeProps> = ({ data, selected }) => (
  <div className={`${NODE_BASE} bg-slate-500/10 ${selected ? 'border-slate-400' : 'border-slate-500/30'}`}>
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <BookOpen className="w-4 h-4 text-slate-400 mx-auto mb-1" />
    <span className="text-xs font-semibold text-slate-300">{data.label}</span>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

export const ChallengeNode: React.FC<StyledNodeProps> = ({ data, selected }) => (
  <div className={`${NODE_BASE} bg-red-500/10 ${selected ? 'border-red-400' : 'border-red-500/30'}`}>
    <Handle type="target" position={Position.Top} className="opacity-0" />
    <Scale className="w-4 h-4 text-red-400 mx-auto mb-1" />
    <span className="text-xs font-semibold text-red-300">{data.label}</span>
    <Handle type="source" position={Position.Bottom} className="opacity-0" />
  </div>
);

export const NODE_TYPES = {
  department: DepartmentNode,
  supplier: SupplierNode,
  employee: EmployeeNode,
  emission: EmissionNode,
  audit: AuditNode,
  purchase: PurchaseNode,
  policy: PolicyNode,
  challenge: ChallengeNode,
};
