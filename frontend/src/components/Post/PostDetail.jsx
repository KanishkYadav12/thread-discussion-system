/**
 * PostDetail Component
 * Displays full post details with formatting
 */

import React from "react";
import { BiTime, BiMessageSquareDetail } from "react-icons/bi";
import { formatSmartDate } from "../../utils/formatDate";

/**
 * @param {Object} post - Post object with _id, title, content, createdAt, commentCount
 */
const PostDetail = ({ post }) => {
  if (!post) return null;

  return (
    <article className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

      {/* Meta Information */}
      <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 mb-6 border-b border-gray-200">
        {/* Timestamp */}
        <div className="flex items-center gap-1.5">
          <BiTime className="w-4 h-4" />
          <time dateTime={post.createdAt}>
            {formatSmartDate(post.createdAt)}
          </time>
        </div>

        {/* Comment Count */}
        <div className="flex items-center gap-1.5">
          <BiMessageSquareDetail className="w-4 h-4" />
          <span>{post.commentCount || 0} comments</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
    </article>
  );
};

export default PostDetail;
