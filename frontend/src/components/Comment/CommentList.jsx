/**
 * CommentList Component
 * Container for displaying all comments with nested structure
 */

import React from "react";
import { useFetchComments } from "../../hooks/useComments";
import CommentTree from "./CommentTree";
import CommentForm from "./CommentForm";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import { BiMessageSquareDetail } from "react-icons/bi";

const CommentList = ({ postId }) => {
  // Use custom hook
  const { loading, commentTree, error, setRefresh } = useFetchComments(postId);

  const handleRetry = () => {
    setRefresh(true);
  };

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
        <BiMessageSquareDetail className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">
          Comments {commentTree.length > 0 && `(${commentTree.length})`}
        </h2>
      </div>

      {/* Add Comment Form (Top Level) */}
      <div className="mb-6">
        <CommentForm postId={postId} placeholder="Add a comment..." />
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        {loading && <Loader size="md" text="Loading comments..." />}

        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {!loading && !error && commentTree.length === 0 && (
          <EmptyState
            type="comments"
            title="No comments yet"
            message="Be the first to share your thoughts on this post!"
          />
        )}

        {!loading && !error && commentTree.length > 0 && (
          <CommentTree commentTree={commentTree} postId={postId} />
        )}
      </div>
    </section>
  );
};

export default CommentList;
