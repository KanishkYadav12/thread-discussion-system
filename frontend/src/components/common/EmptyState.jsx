import React from "react";
import {
  BiMessageSquareDetail,
  BiFileBlank,
  BiSearchAlt,
} from "react-icons/bi";

const EmptyState = ({ type = "posts", title, message, action }) => {
  const configs = {
    posts: {
      icon: BiFileBlank,
      defaultTitle: "No posts yet",
      defaultMessage: "Be the first to create a discussion post!",
      gradientFrom: "#fbbf24",
      gradientTo: "#fb923c",
    },
    comments: {
      icon: BiMessageSquareDetail,
      defaultTitle: "No comments yet",
      defaultMessage: "Start the conversation by adding the first comment.",
      gradientFrom: "#10b981",
      gradientTo: "#059669",
    },
    search: {
      icon: BiSearchAlt,
      defaultTitle: "No results found",
      defaultMessage: "Try adjusting your search terms or filters.",
      gradientFrom: "#6b7280",
      gradientTo: "#4b5563",
    },
  };

  const config = configs[type] || configs.posts;
  const Icon = config.icon;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "28rem" }}>
        {/* Icon */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
            marginBottom: "1.5rem",
            border: `3px solid ${config.gradientFrom}40`,
          }}
        >
          <Icon
            style={{
              width: "48px",
              height: "48px",
              color: config.gradientFrom,
            }}
          />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "0.75rem",
          }}
        >
          {title || config.defaultTitle}
        </h3>

        {/* Message */}
        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            lineHeight: "1.6",
            marginBottom: "2rem",
          }}
        >
          {message || config.defaultMessage}
        </p>

        {/* Action Button */}
        {action && (
          <button
            onClick={action.onClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              background: `linear-gradient(to right, ${config.gradientFrom}, ${config.gradientTo})`,
              color: "white",
              fontSize: "1rem",
              fontWeight: "600",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              boxShadow: `0 10px 15px -3px ${config.gradientFrom}40`,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
              e.currentTarget.style.boxShadow = `0 20px 25px -5px ${config.gradientFrom}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = `0 10px 15px -3px ${config.gradientFrom}40`;
            }}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
