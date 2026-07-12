export interface EmployeeDemographics {
  totalCount: number;
  genderRatio: {
    male: number;
    female: number;
    other: number;
  };
  turnoverRate: number;
  diversityPercentage: number;
}

export interface IncidentReport {
  id: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
  description: string;
}
