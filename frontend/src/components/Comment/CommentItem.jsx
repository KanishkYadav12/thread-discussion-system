/**
 * CommentItem Component
 * Renders a single comment with recursive nested replies
 * This is the CORE component for nested comment threading
 */

import React, { useState } from "react";
import { BiReply, BiTime, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { formatRelativeTime } from "../../utils/formatDate";
import CommentForm from "./CommentForm";
import { UI_CONFIG } from "../../utils/constants";

/**
 * @param {Object} comment - Comment object with _id, text, createdAt, children
 * @param {number} depth - Current nesting depth (0 for top-level)
 * @param {string} postId - Post ID for creating replies
 */
const CommentItem = ({ comment, depth = 0, postId }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const hasChildren = comment.children && comment.children.length > 0;
  const canReply = depth < UI_CONFIG.MAX_COMMENT_DEPTH;

  // Border color gets lighter as depth increases
  const borderColors = [
    "#fbbf24", // amber
    "#10b981", // green
    "#8b5cf6", // purple
    "#f97316", // orange
    "#ec4899", // pink
  ];
  const borderColor = borderColors[depth % borderColors.length];

  // Handle reply button click
  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  // Handle successful reply
  const handleReplySuccess = () => {
    setIsReplying(false);
    setShowReplies(true);
  };

  // Toggle replies visibility
  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div style={{ marginLeft: depth > 0 ? "clamp(1.5rem, 4vw, 3rem)" : "0" }}>
      <div
        style={{
          borderLeft: `3px solid ${borderColor}`,
          paddingLeft: "1rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      >
        {/* Comment Card */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
            border: "1px solid #f3f4f6",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.07)";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
            e.currentTarget.style.borderColor = "#f3f4f6";
          }}
        >
          {/* Comment Text */}
          <p
            style={{
              color: "#374151",
              marginBottom: "0.875rem",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: "0.9375rem",
              lineHeight: "1.6",
            }}
          >
            {comment.text}
          </p>

          {/* Comment Meta & Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {/* Timestamp */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.75rem",
                color: "#9ca3af",
              }}
            >
              <BiTime style={{ width: "14px", height: "14px" }} />
              <time dateTime={comment.createdAt}>
                {formatRelativeTime(comment.createdAt)}
              </time>
            </div>

            {/* Actions */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              {/* Reply Button */}
              {canReply && (
                <button
                  onClick={handleReplyClick}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontSize: "0.8125rem",
                    color: isReplying ? "#dc2626" : borderColor,
                    fontWeight: "600",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "6px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isReplying
                      ? "#fee2e2"
                      : `${borderColor}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                  }}
                >
                  <BiReply style={{ width: "16px", height: "16px" }} />
                  {isReplying ? "Cancel" : "Reply"}
                </button>
              )}

              {/* Show/Hide Replies Button */}
              {hasChildren && (
                <button
                  onClick={toggleReplies}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontSize: "0.8125rem",
                    color: "#6b7280",
                    fontWeight: "600",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "6px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f3f4f6";
                    e.currentTarget.style.color = "#374151";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.color = "#6b7280";
                  }}
                >
                  {showReplies ? (
                    <BiChevronUp style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <BiChevronDown style={{ width: "16px", height: "16px" }} />
                  )}
                  {comment.children.length}{" "}
                  {comment.children.length === 1 ? "reply" : "replies"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reply Form */}
        {isReplying && (
          <div style={{ marginTop: "0.75rem" }}>
            <CommentForm
              postId={postId}
              parentId={comment._id}
              onSuccess={handleReplySuccess}
              onCancel={() => setIsReplying(false)}
              placeholder="Write your reply..."
              borderColor={borderColor}
            />
          </div>
        )}

        {/* Nested Replies */}
        {hasChildren && showReplies && (
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {comment.children.map((childComment) => (
              <CommentItem
                key={childComment._id}
                comment={childComment}
                depth={depth + 1}
                postId={postId}
              />
            ))}
          </div>
        )}

        {/* Max Depth Warning */}
        {!canReply && depth === UI_CONFIG.MAX_COMMENT_DEPTH && (
          <div
            style={{
              marginTop: "0.75rem",
              fontSize: "0.75rem",
              color: "#9ca3af",
              fontStyle: "italic",
              padding: "0.5rem 0.75rem",
              background: "#f9fafb",
              borderRadius: "8px",
            }}
          >
            Maximum nesting level reached
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
