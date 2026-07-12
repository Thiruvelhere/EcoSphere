import { httpClient } from './http';

export const environmentService = {
  getCarbonFootprint: async () => {
    const response = await httpClient.get('/environment/carbon');
    return response.data;
  },
  getEnergyUsage: async () => {
    const response = await httpClient.get('/environment/energy');
    return response.data;
  },
};
