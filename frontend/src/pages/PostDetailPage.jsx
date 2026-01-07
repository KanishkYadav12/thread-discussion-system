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

  const { loading, post, error, refetch } = useFetchPost(id);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fffbf5, #fef3c7)",
      }}
    >
      <div
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "2rem 1.5rem",
        }}
      >
        {/* Back Button */}
        <button
          onClick={handleBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "9999px",
            color: "#6b7280",
            fontWeight: "500",
            fontSize: "0.875rem",
            background: "white",
            border: "2px solid #e5e7eb",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f59e0b";
            e.currentTarget.style.borderColor = "#fbbf24";
            e.currentTarget.style.transform = "translateX(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6b7280";
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <BiArrowBack style={{ width: "18px", height: "18px" }} />
          <span>Back to discussions</span>
        </button>

        {/* Loading State */}
        {loading && <Loader size="lg" text="Loading post..." fullScreen />}

        {/* Error State */}
        {error && !loading && (
          <div style={{ padding: "3rem 0" }}>
            <ErrorMessage message={error} onRetry={refetch} fullWidth />
          </div>
        )}

        {/* Success State */}
        {!loading && !error && post && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <PostDetail post={post} />
            <CommentList postId={post._id} />
          </div>
        )}

        {/* Post Not Found */}
        {!loading && !error && !post && (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Post Not Found
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              The post you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={handleBack}
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(to right, #fbbf24, #fb923c)",
                color: "white",
                borderRadius: "9999px",
                fontWeight: "600",
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
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
