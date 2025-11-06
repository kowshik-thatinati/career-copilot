// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  GEMINI: `${API_BASE_URL}/api/gemini`,
  GENERATE_TITLE: `${API_BASE_URL}/api/generate-title`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
