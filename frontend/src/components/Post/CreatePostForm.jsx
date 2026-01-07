import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/usePosts";
import { VALIDATION, SUCCESS_MESSAGES } from "../../utils/constants";
import {
  BiError,
  BiCheck,
  BiEditAlt,
  BiMessageSquareDetail,
} from "react-icons/bi";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const { loading, createPost, success, error, resetCreatePost } =
    useCreatePost();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    resetCreatePost();
  }, [resetCreatePost]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < VALIDATION.POST_TITLE_MIN) {
      newErrors.title = `Title must be at least ${VALIDATION.POST_TITLE_MIN} characters`;
    } else if (formData.title.length > VALIDATION.POST_TITLE_MAX) {
      newErrors.title = `Title cannot exceed ${VALIDATION.POST_TITLE_MAX} characters`;
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.trim().length < VALIDATION.POST_CONTENT_MIN) {
      newErrors.content = `Content must be at least ${VALIDATION.POST_CONTENT_MIN} characters`;
    } else if (formData.content.length > VALIDATION.POST_CONTENT_MAX) {
      newErrors.content = `Content cannot exceed ${VALIDATION.POST_CONTENT_MAX} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    createPost({
      title: formData.title.trim(),
      content: formData.content.trim(),
    });
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        border: "2px solid #fde68a",
        boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* Header with gradient */}
      <div
        style={{
          background: "linear-gradient(135deg, #fef3c7, #fed7aa)",
          padding: "2rem",
          borderBottom: "2px solid #fde68a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(to bottom right, #fbbf24, #fb923c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 6px -1px rgba(251, 146, 60, 0.3)",
            }}
          >
            <BiEditAlt
              style={{ width: "24px", height: "24px", color: "white" }}
            />
          </div>
          <div>
            <h1
              style={{
                fontSize: "1.875rem",
                fontWeight: "800",
                color: "#1f2937",
                lineHeight: "1.2",
              }}
            >
              Create New Discussion
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginTop: "0.25rem",
              }}
            >
              Share your thoughts and start a conversation with the community
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div style={{ padding: "2rem" }}>
        {/* Success Message */}
        {success && (
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "1rem 1.25rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
              border: "2px solid #6ee7b7",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BiCheck
                style={{ width: "20px", height: "20px", color: "white" }}
              />
            </div>
            <span
              style={{
                color: "#065f46",
                fontWeight: "600",
                fontSize: "0.875rem",
              }}
            >
              {SUCCESS_MESSAGES.POST_CREATED}
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "1rem 1.25rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #fee2e2, #fecaca)",
              border: "2px solid #fca5a5",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <BiError
                style={{ width: "20px", height: "20px", color: "white" }}
              />
            </div>
            <span
              style={{
                color: "#991b1b",
                fontSize: "0.875rem",
                lineHeight: "1.5",
              }}
            >
              {error}
            </span>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "0.625rem",
              }}
            >
              <BiMessageSquareDetail
                style={{ width: "16px", height: "16px", color: "#f59e0b" }}
              />
              Discussion Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading || success}
              style={{
                width: "100%",
                padding: "0.875rem 1.125rem",
                borderRadius: "12px",
                background: errors.title ? "#fef2f2" : "#f9fafb",
                border: errors.title
                  ? "2px solid #fca5a5"
                  : "2px solid #e5e7eb",
                fontSize: "1rem",
                color: "#1f2937",
                transition: "all 0.3s ease",
                outline: "none",
              }}
              placeholder="e.g., How to improve React performance?"
              maxLength={VALIDATION.POST_TITLE_MAX}
              onFocus={(e) => {
                if (!errors.title) {
                  e.currentTarget.style.borderColor = "#fbbf24";
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(251, 191, 36, 0.1)";
                }
              }}
              onBlur={(e) => {
                if (!errors.title) {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.background = "#f9fafb";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              {errors.title ? (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#dc2626",
                    fontWeight: "600",
                  }}
                >
                  {errors.title}
                </span>
              ) : (
                <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                  Make it clear and descriptive
                </span>
              )}
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color:
                    formData.title.length > VALIDATION.POST_TITLE_MAX * 0.9
                      ? "#dc2626"
                      : "#9ca3af",
                }}
              >
                {formData.title.length}/{VALIDATION.POST_TITLE_MAX}
              </span>
            </div>
          </div>

          {/* Content Field */}
          <div>
            <label
              htmlFor="content"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "0.625rem",
              }}
            >
              <BiEditAlt
                style={{ width: "16px", height: "16px", color: "#f59e0b" }}
              />
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              disabled={loading || success}
              rows={14}
              style={{
                width: "100%",
                padding: "0.875rem 1.125rem",
                borderRadius: "12px",
                background: errors.content ? "#fef2f2" : "#f9fafb",
                border: errors.content
                  ? "2px solid #fca5a5"
                  : "2px solid #e5e7eb",
                fontSize: "0.9375rem",
                lineHeight: "1.7",
                color: "#1f2937",
                resize: "vertical",
                transition: "all 0.3s ease",
                outline: "none",
                fontFamily: "inherit",
              }}
              placeholder="Share your thoughts, ask questions, or start a discussion..."
              maxLength={VALIDATION.POST_CONTENT_MAX}
              onFocus={(e) => {
                if (!errors.content) {
                  e.currentTarget.style.borderColor = "#fbbf24";
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(251, 191, 36, 0.1)";
                }
              }}
              onBlur={(e) => {
                if (!errors.content) {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.background = "#f9fafb";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              {errors.content ? (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#dc2626",
                    fontWeight: "600",
                  }}
                >
                  {errors.content}
                </span>
              ) : (
                <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                  Be detailed and specific
                </span>
              )}
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color:
                    formData.content.length > VALIDATION.POST_CONTENT_MAX * 0.9
                      ? "#dc2626"
                      : "#9ca3af",
                }}
              >
                {formData.content.length}/{VALIDATION.POST_CONTENT_MAX}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "flex-end",
              paddingTop: "1.5rem",
              borderTop: "2px solid #f3f4f6",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              disabled={loading || success}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "12px",
                background: "white",
                border: "2px solid #e5e7eb",
                color: "#6b7280",
                fontWeight: "600",
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading && !success) {
                  e.currentTarget.style.background = "#f9fafb";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "12px",
                background:
                  "linear-gradient(to right, #fbbf24, #fb923c, #fb7185)",
                color: "white",
                fontWeight: "700",
                fontSize: "0.875rem",
                border: "none",
                cursor: loading || success ? "not-allowed" : "pointer",
                opacity: loading || success ? 0.6 : 1,
                boxShadow: "0 10px 15px -3px rgba(251, 191, 36, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading && !success) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 25px -5px rgba(251, 191, 36, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(251, 191, 36, 0.4)";
              }}
            >
              {loading ? "Creating..." : success ? "Created ✓" : "Create Post"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CreatePostForm;
