import { httpClient } from './http';

export const governanceService = {
  getBoardComposition: async () => {
    const response = await httpClient.get('/governance/board');
    return response.data;
  },
  getComplianceStatus: async () => {
    const response = await httpClient.get('/governance/compliance');
    return response.data;
  },
};
