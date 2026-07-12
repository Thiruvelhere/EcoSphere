import { httpClient } from './http';

export const reportsService = {
  listReports: async () => {
    const response = await httpClient.get('/reports');
    return response.data;
  },
  generateReport: async (format: string) => {
    const response = await httpClient.post('/reports/generate', { format });
    return response.data;
  },
};
