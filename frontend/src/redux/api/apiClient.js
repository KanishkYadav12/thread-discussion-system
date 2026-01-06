/**
 * API Client Configuration
 * Centralized Axios instance with interceptors for request/response handling
 */

import axios from "axios";
import { API_CONFIG, ERROR_MESSAGES } from "../../utils/constants";

/**
 * Create configured Axios instance
 */
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Add authentication tokens, logging, etc.
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add timestamp to request for debugging
    config.metadata = { startTime: new Date() };

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle responses, errors, and logging
 */
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata.startTime;

    // Log response in development
    if (import.meta.env.DEV) {
      console.log(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${
          response.config.url
        } (${duration}ms)`,
        response.data
      );
    }

    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      console.error(`❌ API Error [${status}]:`, data);

      // Customize error message based on status code
      switch (status) {
        case 400:
          error.userMessage = data.message || ERROR_MESSAGES.VALIDATION_ERROR;
          break;
        case 404:
          error.userMessage = ERROR_MESSAGES.NOT_FOUND;
          break;
        case 500:
          error.userMessage = ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          error.userMessage = data.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("❌ Network Error:", error.message);
      error.userMessage = ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      // Something else happened
      console.error("❌ Error:", error.message);
      error.userMessage = ERROR_MESSAGES.UNKNOWN_ERROR;
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to extract error message
 * @param {Error} error - Error object from API call
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  return error.userMessage || error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
};

export default apiClient;
