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
    <section
      style={{
        background: "white",
        borderRadius: "20px",
        border: "2px solid #fde68a",
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(251, 191, 36, 0.1)",
      }}
    >
      {/* Section Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #fef3c7, #fed7aa)",
          padding: "1.5rem 2rem",
          borderBottom: "2px solid #fde68a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(to bottom right, #fbbf24, #fb923c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 6px -1px rgba(251, 146, 60, 0.3)",
            }}
          >
            <BiMessageSquareDetail
              style={{ width: "20px", height: "20px", color: "white" }}
            />
          </div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#1f2937",
            }}
          >
            Comments {commentTree.length > 0 && `(${commentTree.length})`}
          </h2>
        </div>
      </div>

      <div style={{ padding: "2rem" }}>
        {/* Add Comment Form */}
        <div style={{ marginBottom: "2rem" }}>
          <CommentForm postId={postId} placeholder="Share your thoughts..." />
        </div>

        {/* Comments Section */}
        <div>
          {loading && (
            <div style={{ padding: "2rem 0" }}>
              <Loader size="md" text="Loading comments..." />
            </div>
          )}

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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <CommentTree commentTree={commentTree} postId={postId} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentList;
