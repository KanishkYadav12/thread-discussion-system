/**
 * ErrorMessage Component
 * Displays error messages with optional retry functionality
 */

import React from "react";
import { BiError } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";

const ErrorMessage = ({
  message,
  onRetry,
  type = "error",
  fullWidth = false,
}) => {
  const typeStyles = {
    error: {
      bg: "#fef2f2",
      border: "#fecaca",
      icon: "#ef4444",
      text: "#991b1b",
      button: "linear-gradient(to right, #ef4444, #dc2626)",
    },
    warning: {
      bg: "#fffbeb",
      border: "#fde68a",
      icon: "#f59e0b",
      text: "#92400e",
      button: "linear-gradient(to right, #f59e0b, #d97706)",
    },
    info: {
      bg: "#eff6ff",
      border: "#bfdbfe",
      icon: "#3b82f6",
      text: "#1e40af",
      button: "linear-gradient(to right, #3b82f6, #2563eb)",
    },
  };

  const styles = typeStyles[type];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 0",
        width: fullWidth ? "100%" : "auto",
      }}
    >
      <div
        style={{
          background: styles.bg,
          border: `2px solid ${styles.border}`,
          borderRadius: "16px",
          padding: "1.5rem",
          maxWidth: "28rem",
          width: "100%",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        }}
        role="alert"
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Icon */}
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BiError
                style={{
                  width: "24px",
                  height: "24px",
                  color: styles.icon,
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1rem",
                color: styles.text,
                marginBottom: "0.5rem",
              }}
            >
              {type === "error"
                ? "Error Occurred"
                : type === "warning"
                ? "Warning"
                : "Information"}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: styles.text,
                lineHeight: "1.5",
              }}
            >
              {message || "An unexpected error occurred. Please try again."}
            </p>

            {/* Retry button */}
            {onRetry && (
              <button
                onClick={onRetry}
                style={{
                  marginTop: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  background: styles.button,
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px -3px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <MdRefresh style={{ width: "16px", height: "16px" }} />
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
