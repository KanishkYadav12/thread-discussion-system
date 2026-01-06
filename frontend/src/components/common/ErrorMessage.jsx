/**
 * ErrorMessage Component
 * Displays error messages with optional retry functionality
 */

import React from "react";
import { BiError } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";

/**
 * @param {string} message - Error message to display
 * @param {Function} onRetry - Optional retry function
 * @param {string} type - Error type: 'error', 'warning', 'info' (default: 'error')
 * @param {boolean} fullWidth - Whether to take full width
 */
const ErrorMessage = ({
  message,
  onRetry,
  type = "error",
  fullWidth = false,
}) => {
  // Color schemes for different types
  const typeStyles = {
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-500",
      text: "text-red-800",
      button: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "text-yellow-500",
      text: "text-yellow-800",
      button: "bg-yellow-600 hover:bg-yellow-700",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-500",
      text: "text-blue-800",
      button: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const styles = typeStyles[type];

  return (
    <div
      className={`flex items-center justify-center py-8 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      <div
        className={`
          ${styles.bg}
          ${styles.border}
          border rounded-lg p-6
          max-w-md w-full
          shadow-sm
        `}
        role="alert"
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <BiError className={`w-6 h-6 ${styles.icon}`} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className={`font-semibold ${styles.text} mb-1`}>
              {type === "error"
                ? "Error"
                : type === "warning"
                ? "Warning"
                : "Information"}
            </h3>
            <p className={`text-sm ${styles.text}`}>
              {message || "An unexpected error occurred."}
            </p>

            {/* Retry button */}
            {onRetry && (
              <button
                onClick={onRetry}
                className={`
                  mt-4 px-4 py-2 rounded-md
                  ${styles.button}
                  text-white text-sm font-medium
                  flex items-center gap-2
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                `}
              >
                <MdRefresh className="w-4 h-4" />
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
