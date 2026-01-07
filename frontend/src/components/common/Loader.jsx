/**
 * Loader Component
 * Reusable loading spinner with different sizes
 */

import React from "react";

const Loader = ({ size = "md", text = "", fullScreen = false }) => {
  const sizeConfig = {
    sm: { width: "24px", height: "24px", borderWidth: "2px" },
    md: { width: "48px", height: "48px", borderWidth: "3px" },
    lg: { width: "64px", height: "64px", borderWidth: "4px" },
  };

  const config = sizeConfig[size];

  const spinnerStyle = {
    width: config.width,
    height: config.height,
    border: `${config.borderWidth} solid #fef3c7`,
    borderTop: `${config.borderWidth} solid #f59e0b`,
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  };

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div style={spinnerStyle} role="status" aria-label="Loading" />
      {text && (
        <p
          style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#6b7280",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        >
          {text}
        </p>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 0",
      }}
    >
      {content}
    </div>
  );
};

export default Loader;
