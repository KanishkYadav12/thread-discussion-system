/**
 * CommentItem Component
 * Renders a single comment with recursive nested replies
 * This is the CORE component for nested comment threading
 */

import React, { useState } from "react";
import { BiReply, BiTime } from "react-icons/bi";
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

  // Calculate indentation based on depth
  const indentationClass = depth > 0 ? "ml-6 sm:ml-8 md:ml-12" : "";

  // Border color gets lighter as depth increases
  const borderColors = [
    "border-blue-200",
    "border-green-200",
    "border-purple-200",
    "border-orange-200",
    "border-pink-200",
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
    <div className={`${indentationClass}`}>
      {/* Comment Container */}
      <div className={`border-l-2 ${borderColor} pl-4 py-2`}>
        {/* Comment Content */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          {/* Comment Text */}
          <p className="text-gray-800 mb-3 whitespace-pre-wrap break-words">
            {comment.text}
          </p>

          {/* Comment Meta & Actions */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* Timestamp */}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <BiTime className="w-3.5 h-3.5" />
              <time dateTime={comment.createdAt}>
                {formatRelativeTime(comment.createdAt)}
              </time>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Reply Button */}
              {canReply && (
                <button
                  onClick={handleReplyClick}
                  className="
                    flex items-center gap-1 text-sm
                    text-blue-600 hover:text-blue-700
                    font-medium transition-colors
                  "
                >
                  <BiReply className="w-4 h-4" />
                  {isReplying ? "Cancel" : "Reply"}
                </button>
              )}

              {/* Show/Hide Replies Button */}
              {hasChildren && (
                <button
                  onClick={toggleReplies}
                  className="
                    text-sm text-gray-600 hover:text-gray-800
                    font-medium transition-colors
                  "
                >
                  {showReplies ? "Hide" : "Show"} {comment.children.length}{" "}
                  {comment.children.length === 1 ? "reply" : "replies"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reply Form */}
        {isReplying && (
          <div className="mt-3">
            <CommentForm
              postId={postId}
              parentId={comment._id}
              onSuccess={handleReplySuccess}
              onCancel={() => setIsReplying(false)}
              placeholder="Write your reply..."
            />
          </div>
        )}

        {/* Nested Replies - RECURSIVE RENDERING */}
        {hasChildren && showReplies && (
          <div className="mt-3 space-y-3">
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
          <div className="mt-3 text-xs text-gray-500 italic">
            Maximum nesting level reached
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
