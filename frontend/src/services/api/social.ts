import { httpClient } from './http';

export const socialService = {
  getEmployeeDemographics: async () => {
    const response = await httpClient.get('/social/demographics');
    return response.data;
  },
  getSafetyMetrics: async () => {
    const response = await httpClient.get('/social/safety');
    return response.data;
  },
};
