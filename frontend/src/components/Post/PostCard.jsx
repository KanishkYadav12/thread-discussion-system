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
      className="bg-white rounded-2xl border border-amber-100 hover:border-amber-300 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-amber-100/50 hover:-translate-y-1"
    >
      <h3 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2 hover:text-amber-600 transition-colors mb-3">
        {post.title}
      </h3>

      {post.content && (
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
          {post.content}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
            <BiUser className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {post.author || "Anonymous"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-1.5">
            <BiMessageSquareDetail className="w-4 h-4" />
            <span className="text-xs font-medium">
              {post.commentCount || 0}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BiTime className="w-4 h-4" />
            <span className="text-xs font-medium">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
