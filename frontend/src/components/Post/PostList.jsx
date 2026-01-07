import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchPosts } from "../../hooks/usePosts";
import PostCard from "./PostCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import { BiPlus } from "react-icons/bi";

const PostList = ({ showHeader = true }) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5rem 0",
        }}
      >
        <Loader size="lg" text="Loading discussions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
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
      {showHeader && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "0.5rem",
                }}
              >
                Recent Discussions
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                {posts.length} active{" "}
                {posts.length === 1 ? "discussion" : "discussions"}
              </p>
            </div>

            <button
              onClick={() => navigate("/create")}
              style={{
                display: "none", // Hidden by default, shown via media query
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                background: "linear-gradient(to right, #fbbf24, #fb923c)",
                color: "white",
                borderRadius: "9999px",
                fontWeight: "600",
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 15px -3px rgba(251, 191, 36, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(251, 191, 36, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(251, 191, 36, 0.4)";
              }}
            >
              <BiPlus style={{ width: "20px", height: "20px" }} />
              New Post
            </button>
          </div>
        </div>
      )}

      {/* Post Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <style>{`
        @media (min-width: 640px) {
          button[style*="display: none"] {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PostList;
