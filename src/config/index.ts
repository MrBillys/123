
/**
 * Application configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10 seconds
};

// Feature Flags
export const FEATURES = {
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true',
};
