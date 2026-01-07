import React, { useState, useEffect } from "react";
import { useCreateComment } from "../../hooks/useComments";
import { VALIDATION } from "../../utils/constants";
import { BiError, BiSend } from "react-icons/bi";

const CommentForm = ({
  postId,
  parentId = null,
  onSuccess,
  onCancel,
  placeholder = "Share your thoughts...",
  borderColor = "#fbbf24",
}) => {
  // Use custom hook
  const { loading, createComment, success, error, resetCreateComment } =
    useCreateComment();

  const [text, setText] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isReply = parentId !== null;

  // Reset on mount
  useEffect(() => {
    resetCreateComment();
  }, [resetCreateComment]);

  // Handle successful creation
  useEffect(() => {
    if (success) {
      setText("");
      setValidationError("");
      if (onSuccess) {
        onSuccess();
      }
      resetCreateComment();
    }
  }, [success, onSuccess, resetCreateComment]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (validationError) setValidationError("");
  };

  const validateComment = () => {
    if (!text.trim()) {
      setValidationError("Comment cannot be empty");
      return false;
    }
    if (text.trim().length < VALIDATION.COMMENT_TEXT_MIN) {
      setValidationError(
        `Comment must be at least ${VALIDATION.COMMENT_TEXT_MIN} character`
      );
      return false;
    }
    if (text.length > VALIDATION.COMMENT_TEXT_MAX) {
      setValidationError(
        `Comment cannot exceed ${VALIDATION.COMMENT_TEXT_MAX} characters`
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateComment()) return;

    const commentData = {
      postId,
      text: text.trim(),
    };

    if (parentId) {
      commentData.parentId = parentId;
    }

    createComment(commentData);
  };

  return (
    <div
      style={{
        background: "#fafaf9",
        borderRadius: "12px",
        padding: "1rem",
        border: `2px solid ${isFocused ? borderColor : "#f3f4f6"}`,
        transition: "all 0.3s ease",
      }}
    >
      {isReply && (
        <div style={{ marginBottom: "0.75rem" }}>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "#6b7280",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: borderColor,
              }}
            />
            Replying to comment
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <textarea
          value={text}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={loading}
          rows={isReply ? 3 : 4}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border:
              validationError || error
                ? "2px solid #fca5a5"
                : "2px solid #e5e7eb",
            fontSize: "0.9375rem",
            color: "#374151",
            background: loading ? "#f9fafb" : "white",
            transition: "all 0.3s ease",
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
            lineHeight: "1.6",
          }}
          placeholder={placeholder}
          maxLength={VALIDATION.COMMENT_TEXT_MAX}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "0.75rem",
          }}
        >
          <div style={{ flex: 1 }}>
            {validationError && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.8125rem",
                  color: "#dc2626",
                  fontWeight: "500",
                }}
              >
                <BiError style={{ width: "14px", height: "14px" }} />
                <span>{validationError}</span>
              </div>
            )}
            {error && !validationError && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.8125rem",
                  color: "#dc2626",
                  fontWeight: "500",
                }}
              >
                <BiError style={{ width: "14px", height: "14px" }} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <span
            style={{
              fontSize: "0.6875rem",
              color:
                text.length > VALIDATION.COMMENT_TEXT_MAX * 0.9
                  ? "#dc2626"
                  : "#9ca3af",
              fontWeight: "600",
            }}
          >
            {text.length}/{VALIDATION.COMMENT_TEXT_MAX}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "flex-end",
          }}
        >
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              style={{
                padding: "0.625rem 1.25rem",
                borderRadius: "8px",
                border: "2px solid #e5e7eb",
                color: "#6b7280",
                fontWeight: "600",
                fontSize: "0.8125rem",
                background: "white",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
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
          )}
          <button
            type="submit"
            disabled={loading || !text.trim()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.5rem",
              borderRadius: "8px",
              background: `linear-gradient(to right, ${borderColor}, ${borderColor}dd)`,
              color: "white",
              fontWeight: "700",
              fontSize: "0.8125rem",
              border: "none",
              cursor: loading || !text.trim() ? "not-allowed" : "pointer",
              opacity: loading || !text.trim() ? 0.5 : 1,
              transition: "all 0.3s ease",
              boxShadow: `0 4px 6px -1px ${borderColor}40`,
            }}
            onMouseEnter={(e) => {
              if (!loading && text.trim()) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = `0 10px 15px -3px ${borderColor}40`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 6px -1px ${borderColor}40`;
            }}
          >
            <BiSend style={{ width: "16px", height: "16px" }} />
            {loading ? "Posting..." : isReply ? "Reply" : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
