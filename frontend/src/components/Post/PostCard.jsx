/**
 * PostCard Component
 * Displays a single post as a clickable card
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { BiMessageSquareDetail, BiTime } from "react-icons/bi";
import { formatRelativeTime } from "../../utils/formatDate";

/**
 * @param {Object} post - Post object with _id, title, content, createdAt, commentCount
 */
const PostCard = ({ post }) => {
  const navigate = useNavigate();

  // Truncate content for preview
  const truncateContent = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const handleClick = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="
        bg-white rounded-lg border border-gray-200
        p-6 cursor-pointer
        hover:shadow-lg hover:border-blue-300
        transition-all duration-200
        group
      "
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Title */}
      <h2
        className="
        text-xl font-semibold text-gray-900 mb-3
        group-hover:text-blue-600 transition-colors
        line-clamp-2
      "
      >
        {post.title}
      </h2>

      {/* Content Preview */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {truncateContent(post.content)}
      </p>

      {/* Meta Information */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        {/* Timestamp */}
        <div className="flex items-center gap-1">
          <BiTime className="w-4 h-4" />
          <time dateTime={post.createdAt}>
            {formatRelativeTime(post.createdAt)}
          </time>
        </div>

        {/* Comment Count */}
        <div className="flex items-center gap-1 text-blue-600 font-medium">
          <BiMessageSquareDetail className="w-4 h-4" />
          <span>{post.commentCount || 0} comments</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
