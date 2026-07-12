export interface CarbonEmissionData {
  scope1: number; // Direct emissions
  scope2: number; // Indirect emissions
  scope3: number; // Value chain emissions
  unit: 'tCO2e';
  year: number;
}

export interface OffsetProject {
  id: string;
  name: string;
  type: string;
  verifiedAmount: number;
  status: 'active' | 'completed';
}
