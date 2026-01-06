/**
 * PostDetailPage Component
 * Displays a single post with all its comments
 */

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchPost } from "../hooks/usePosts";
import PostDetail from "../components/Post/PostDetail";
import CommentList from "../components/Comment/CommentList";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { BiArrowBack } from "react-icons/bi";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use custom hook
  const { loading, post, error, refetch } = useFetchPost(id);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="
            flex items-center gap-2 mb-6
            text-gray-600 hover:text-gray-900
            font-medium transition-colors
          "
        >
          <BiArrowBack className="w-5 h-5" />
          Back to discussions
        </button>

        {/* Loading State */}
        {loading && <Loader size="lg" text="Loading post..." fullScreen />}

        {/* Error State */}
        {error && !loading && (
          <div className="py-12">
            <ErrorMessage message={error} onRetry={refetch} fullWidth />
          </div>
        )}

        {/* Success State */}
        {!loading && !error && post && (
          <div className="space-y-6">
            <PostDetail post={post} />
            <CommentList postId={post._id} />
          </div>
        )}

        {/* Post Not Found */}
        {!loading && !error && !post && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Post Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={handleBack}
              className="
                px-6 py-3 bg-blue-600 hover:bg-blue-700
                text-white rounded-lg font-medium
                transition-colors
              "
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
