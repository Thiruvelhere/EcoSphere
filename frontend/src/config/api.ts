import env from './env';

export const API_BASE_URL = env.API_BASE_URL;

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;
