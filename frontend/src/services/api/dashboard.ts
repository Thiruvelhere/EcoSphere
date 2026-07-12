import { httpClient } from './http';

export const dashboardService = {
  getOverviewMetrics: async () => {
    const response = await httpClient.get('/dashboard/metrics');
    return response.data;
  },
  getRecentActivity: async () => {
    const response = await httpClient.get('/dashboard/activity');
    return response.data;
  },
};
