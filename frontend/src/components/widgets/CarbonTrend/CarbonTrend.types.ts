export interface CarbonDataPoint {
  month: string;
  scope1: number;
  scope2: number;
  scope3: number;
  target?: number;
}

export interface CarbonTrendProps {
  data: CarbonDataPoint[];
  className?: string;
}
