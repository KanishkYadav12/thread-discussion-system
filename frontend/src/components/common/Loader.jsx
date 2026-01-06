/**
 * Loader Component
 * Reusable loading spinner with different sizes
 */

import React from "react";

/**
 * @param {string} size - Size of loader: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} text - Optional loading text to display
 * @param {boolean} fullScreen - Whether to show full screen overlay
 */
const Loader = ({ size = "md", text = "", fullScreen = false }) => {
  // Size configurations
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
  };

  const spinnerClass = `
    inline-block
    ${sizeClasses[size]}
    border-blue-600
    border-t-transparent
    rounded-full
    animate-spin
  `;

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={spinnerClass} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      {text && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  // Full screen overlay version
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  // Inline version
  return <div className="flex items-center justify-center py-8">{content}</div>;
};

export default Loader;
