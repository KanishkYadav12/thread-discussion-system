/**
 * Application Constants
 * Centralized configuration values for the application
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  TIMEOUT: 10000, // 10 seconds
};

// API Endpoints
export const API_ENDPOINTS = {
  // Post endpoints
  POSTS: "/posts",
  POST_BY_ID: (id) => `/posts/${id}`,

  // Comment endpoints
  COMMENTS: "/comments",
  COMMENTS_BY_POST: (postId) => `/comments/post/${postId}`,
  COMMENT_BY_ID: (id) => `/comments/${id}`,
};

// UI Constants
export const UI_CONFIG = {
  MAX_COMMENT_DEPTH: 5, // Maximum nesting level for comments
  POSTS_PER_PAGE: 10,
  COMMENTS_PER_PAGE: 20,
  POST_TITLE_MAX_LENGTH: 200,
  POST_CONTENT_MAX_LENGTH: 5000,
  COMMENT_TEXT_MAX_LENGTH: 1000,
  DEBOUNCE_DELAY: 300, // milliseconds
};

// Loading States
export const LOADING_STATES = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  NOT_FOUND: "Resource not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNKNOWN_ERROR: "An unexpected error occurred.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  POST_CREATED: "Post created successfully!",
  POST_DELETED: "Post deleted successfully!",
  COMMENT_CREATED: "Comment added successfully!",
  COMMENT_DELETED: "Comment deleted successfully!",
};

// Date Format Patterns
export const DATE_FORMATS = {
  FULL: "PPpp", // Jan 1, 2024 at 3:30 PM
  DATE_ONLY: "PP", // Jan 1, 2024
  TIME_ONLY: "p", // 3:30 PM
  RELATIVE: "relative", // 2 hours ago
};

// Route Paths
export const ROUTES = {
  HOME: "/",
  POST_DETAIL: "/post/:id",
  CREATE_POST: "/create",
  NOT_FOUND: "*",
};

// Validation Rules
export const VALIDATION = {
  POST_TITLE_MIN: 3,
  POST_TITLE_MAX: 200,
  POST_CONTENT_MIN: 10,
  POST_CONTENT_MAX: 5000,
  COMMENT_TEXT_MIN: 1,
  COMMENT_TEXT_MAX: 1000,
};
