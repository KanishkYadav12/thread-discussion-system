/**
 * Date Formatting Utilities
 * Provides various date formatting functions using date-fns
 */

import { format, formatDistanceToNow } from "date-fns";

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} pattern - Format pattern (default: 'PPpp')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, pattern = "PPpp") => {
  try {
    if (!date) return "Unknown date";
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "Invalid date";
    }

    return format(dateObj, pattern);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  try {
    if (!date) return "Unknown time";
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "Invalid time";
    }

    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "Invalid time";
  }
};

/**
 * Format date for display in UI (Smart formatting)
 * Shows relative time for recent dates, full date for older ones
 * @param {string|Date} date - Date to format
 * @param {number} hoursThreshold - Hours threshold for relative vs absolute (default: 24)
 * @returns {string} Formatted date string
 */
export const formatSmartDate = (date, hoursThreshold = 24) => {
  try {
    if (!date) return "Unknown date";
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "Invalid date";
    }

    const hoursDiff = (Date.now() - dateObj.getTime()) / (1000 * 60 * 60);

    // If within threshold, show relative time
    if (hoursDiff < hoursThreshold) {
      return formatRelativeTime(dateObj);
    }

    // Otherwise show full date
    return format(dateObj, "PPp");
  } catch (error) {
    console.error("Error formatting smart date:", error);
    return "Invalid date";
  }
};

/**
 * Format date to short format (e.g., "Jan 6, 2024")
 * @param {string|Date} date - Date to format
 * @returns {string} Short date string
 */
export const formatShortDate = (date) => {
  return formatDate(date, "PP");
};

/**
 * Format date to time only (e.g., "3:30 PM")
 * @param {string|Date} date - Date to format
 * @returns {string} Time string
 */
export const formatTimeOnly = (date) => {
  return formatDate(date, "p");
};
