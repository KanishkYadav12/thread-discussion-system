import React from "react";
import { BiTime, BiMessageSquareDetail, BiUser } from "react-icons/bi";

const PostDetail = ({ post }) => {
  console.log("PostDetail received post:", post);

  if (!post) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article
      style={{
        background: "white",
        borderRadius: "20px",
        border: "2px solid #fde68a",
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(251, 191, 36, 0.1)",
      }}
    >
      {/* Gradient header */}
      <div
        style={{
          height: "6px",
          background: "linear-gradient(to right, #fbbf24, #fb923c, #fb7185)",
        }}
      />

      <div style={{ padding: "2rem" }}>
        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: "800",
            color: "#1f2937",
            lineHeight: "1.3",
            marginBottom: "1.5rem",
          }}
        >
          {post.title}
        </h1>

        {/* Meta Information */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1.5rem",
            paddingBottom: "1.5rem",
            marginBottom: "2rem",
            borderBottom: "2px solid #fef3c7",
          }}
        >
          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #fef3c7, #fed7aa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #fde68a",
              }}
            >
              <BiUser
                style={{ width: "20px", height: "20px", color: "#f59e0b" }}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  fontWeight: "500",
                }}
              >
                Posted by
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#4b5563",
                }}
              >
                {post.author || "Anonymous"}
              </p>
            </div>
          </div>

          {/* Date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BiTime
                style={{ width: "16px", height: "16px", color: "#f59e0b" }}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  fontWeight: "500",
                }}
              >
                Published
              </p>
              <time
                dateTime={post.createdAt}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#4b5563",
                }}
              >
                {formatDate(post.createdAt)}
              </time>
            </div>
          </div>

          {/* Comment Count */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BiMessageSquareDetail
                style={{ width: "16px", height: "16px", color: "#f59e0b" }}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  fontWeight: "500",
                }}
              >
                Comments
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#4b5563",
                }}
              >
                {post.commentCount || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            fontSize: "1.0625rem",
            lineHeight: "1.8",
            color: "#374151",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {post.content}
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
