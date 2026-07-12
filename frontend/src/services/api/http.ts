import axios from 'axios';
import { API_CONFIG } from '../../config/api';

// Create a configured axios instance
export const httpClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Request Interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Inject auth token from memory/localStorage if necessary
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global responses e.g. 401 Unauthorized, 403 Forbidden
    if (error.response && error.response.status === 401) {
      // Global redirect or store dispatch
    }
    return Promise.reject(error);
  }
);

export default httpClient;
