import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchPosts } from "../../hooks/usePosts";
import PostCard from "./PostCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import { BiPlus } from "react-icons/bi";

const PostList = () => {
  const navigate = useNavigate();

  const { loading, posts, error, setRefresh } = useFetchPosts({
    currentPage: 1,
    pageSize: 20,
  });

  const handleRetry = () => {
    setRefresh(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader size="lg" text="Loading discussions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

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

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Recent Discussions
          </h2>
          <p className="text-gray-500">
            {posts.length} active{" "}
            {posts.length === 1 ? "discussion" : "discussions"}
          </p>
        </div>

        <button
          onClick={() => navigate("/create")}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full font-semibold text-sm shadow-lg shadow-amber-200/40 hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <BiPlus className="w-5 h-5" />
          New Post
        </button>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
