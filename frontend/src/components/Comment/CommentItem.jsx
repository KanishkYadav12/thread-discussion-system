import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { formatRelativeTime } from "../../utils/formatDate";
import { BiReply, BiUser, BiTime } from "react-icons/bi";

const CommentItem = ({ comment, postId, depth = 0, onCommentSuccess }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Border colors based on depth
  const borderColors = [
    "#8b5cf6", // Purple - depth 0
    "#3b82f6", // Blue - depth 1
    "#10b981", // Green - depth 2
    "#f59e0b", // Orange - depth 3
    "#ec4899", // Pink - depth 4
  ];

  // Background colors (lighter versions)
  const bgColors = [
    "#f5f3ff", // Purple bg
    "#eff6ff", // Blue bg
    "#ecfdf5", // Green bg
    "#fffbeb", // Orange bg
    "#fdf2f8", // Pink bg
  ];

  const currentBorderColor = borderColors[depth % 5];
  const currentBgColor = bgColors[depth % 5];

  // Get user initials (placeholder since we don't have user data)
  const getUserInitials = () => {
    return "U"; // Default to 'U' for User
  };

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplySuccess = () => {
    setShowReplyForm(false);
    if (onCommentSuccess) {
      onCommentSuccess(); // ✅ Trigger parent refetch
    }
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        border: `2px solid ${currentBorderColor}20`,
        borderLeft: `4px solid ${currentBorderColor}`,
        padding: "1.25rem",
        transition: "all 0.3s ease",
        boxShadow: `0 2px 8px ${currentBorderColor}10`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 12px ${currentBorderColor}20`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 2px 8px ${currentBorderColor}10`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Comment Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          marginBottom: "0.75rem",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: `linear-gradient(135deg, ${currentBorderColor}, ${currentBorderColor}dd)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: `0 4px 8px ${currentBorderColor}30`,
          }}
        >
          <BiUser style={{ width: "20px", height: "20px", color: "white" }} />
        </div>

        {/* User Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontWeight: "700",
                fontSize: "0.9375rem",
                color: "#1f2937",
              }}
            >
              Anonymous User
            </span>
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#d1d5db",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              <BiTime
                style={{ width: "14px", height: "14px", color: "#9ca3af" }}
              />
              <time
                style={{
                  fontSize: "0.8125rem",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
                dateTime={comment.createdAt}
              >
                {formatRelativeTime(comment.createdAt)}
              </time>
            </div>
          </div>

          {/* Depth Badge (optional, shows nesting level) */}
          {depth > 0 && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                marginTop: "0.25rem",
                padding: "0.125rem 0.5rem",
                borderRadius: "6px",
                background: currentBgColor,
                fontSize: "0.6875rem",
                fontWeight: "600",
                color: currentBorderColor,
              }}
            >
              Reply Level {depth}
            </div>
          )}
        </div>
      </div>

      {/* Comment Text */}
      <div
        style={{
          marginLeft: "3.25rem", // Align with avatar
          marginBottom: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "0.9375rem",
            lineHeight: "1.6",
            color: "#374151",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {comment.text}
        </p>
      </div>

      {/* Comment Actions */}
      <div
        style={{
          marginLeft: "3.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <button
          onClick={handleReplyClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            background: showReplyForm ? currentBorderColor : "transparent",
            color: showReplyForm ? "white" : currentBorderColor,
            fontSize: "0.8125rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (!showReplyForm) {
              e.currentTarget.style.background = `${currentBorderColor}15`;
            }
          }}
          onMouseLeave={(e) => {
            if (!showReplyForm) {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <BiReply style={{ width: "16px", height: "16px" }} />
          <span>{showReplyForm ? "Cancel Reply" : "Reply"}</span>
        </button>

        {comment.replies && comment.replies.length > 0 && (
          <div
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              background: `${currentBorderColor}10`,
              fontSize: "0.75rem",
              fontWeight: "600",
              color: currentBorderColor,
            }}
          >
            {comment.replies.length}{" "}
            {comment.replies.length === 1 ? "reply" : "replies"}
          </div>
        )}
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div
          style={{
            marginLeft: "3.25rem",
            marginTop: "1rem",
            animation: "slideDown 0.3s ease-out",
          }}
        >
          <CommentForm
            postId={postId}
            parentId={comment._id}
            onSuccess={handleReplySuccess}
            onCancel={handleCancelReply}
            placeholder="Write your reply..."
            borderColor={currentBorderColor}
          />
        </div>
      )}
    </div>
  );
};

export default CommentItem;
