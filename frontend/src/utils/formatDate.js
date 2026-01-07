import { format, formatDistanceToNow } from "date-fns";

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


export const formatShortDate = (date) => {
  return formatDate(date, "PP");
};


export const formatTimeOnly = (date) => {
  return formatDate(date, "p");
};
