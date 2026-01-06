/**
 * PostList Component
 * Displays a list/grid of post cards
 * Uses custom hook pattern like your ClientMaster
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchPosts } from "../../hooks/usePosts";
import PostCard from "./PostCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";

const PostList = () => {
  const navigate = useNavigate();

  // Use custom hook - similar to useFetchClients pattern
  const { loading, posts, error, setRefresh } = useFetchPosts({
    currentPage: 1,
    pageSize: 20,
  });

  // Handle retry
  const handleRetry = () => {
    setRefresh(true);
  };

  // Loading state
  if (loading) {
    return <Loader size="lg" text="Loading discussions..." />;
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} fullWidth />;
  }

  // Empty state
  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        type="posts"
        action={{
          label: "Create First Post",
          onClick: () => navigate("/create"),
        }}
      />
    );
  }

  // Success state - display posts
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Discussions
          </h2>
          <p className="text-gray-600 mt-1">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
