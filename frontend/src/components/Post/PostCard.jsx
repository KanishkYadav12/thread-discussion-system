import React from "react";
import { useNavigate } from "react-router-dom";
import { BiMessageSquareDetail, BiTime, BiUser } from "react-icons/bi";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <article
      onClick={() => navigate(`/post/${post._id}`)}
      style={{
        background: "white",
        borderRadius: "16px",
        border: "2px solid #fef3c7",
        padding: "1.5rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#fbbf24";
        e.currentTarget.style.boxShadow =
          "0 20px 25px -5px rgba(251, 191, 36, 0.15)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#fef3c7";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(to right, #fbbf24, #fb923c, #fb7185)",
        }}
      />

      {/* Title */}
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: "700",
          color: "#1f2937",
          lineHeight: "1.5",
          marginBottom: "0.75rem",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.title}
      </h3>

      {/* Content */}
      {post.content && (
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            lineHeight: "1.6",
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.content}
        </p>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "1rem",
          borderTop: "1px solid #f3f4f6",
        }}
      >
        {/* Author */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fef3c7, #fed7aa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BiUser
              style={{ width: "16px", height: "16px", color: "#f59e0b" }}
            />
          </div>
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#4b5563",
            }}
          >
            {post.author || "Anonymous"}
          </span>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            <BiMessageSquareDetail
              style={{ width: "16px", height: "16px", color: "#9ca3af" }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#6b7280",
              }}
            >
              {post.commentCount || 0}
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            <BiTime
              style={{ width: "16px", height: "16px", color: "#9ca3af" }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#6b7280",
              }}
            >
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
