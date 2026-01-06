/**
 * CommentForm Component
 * Form for adding new comments or replies
 */

import React, { useState, useEffect } from "react";
import { useCreateComment } from "../../hooks/useComments";
import { VALIDATION } from "../../utils/constants";
import { BiError } from "react-icons/bi";

const CommentForm = ({
  postId,
  parentId = null,
  onSuccess,
  onCancel,
  placeholder = "Share your thoughts...",
}) => {
  // Use custom hook
  const { loading, createComment, success, error, resetCreateComment } =
    useCreateComment();

  const [text, setText] = useState("");
  const [validationError, setValidationError] = useState("");

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
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      {isReply && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 font-medium">
            Replying to comment
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={text}
          onChange={handleChange}
          disabled={loading}
          rows={isReply ? 3 : 4}
          className={`
            w-full px-4 py-3 rounded-lg border
            ${validationError || error ? "border-red-300" : "border-gray-300"}
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:text-gray-500
            transition-colors resize-none
          `}
          placeholder={placeholder}
          maxLength={VALIDATION.COMMENT_TEXT_MAX}
        />

        <div className="flex justify-between items-start">
          <div className="flex-1">
            {validationError && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <BiError className="w-4 h-4" />
                <span>{validationError}</span>
              </div>
            )}
            {error && !validationError && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <BiError className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <span className="text-xs text-gray-500">
            {text.length}/{VALIDATION.COMMENT_TEXT_MAX}
          </span>
        </div>

        <div className="flex gap-2 justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="
                px-4 py-2 rounded-lg
                border border-gray-300
                text-gray-700 font-medium text-sm
                hover:bg-gray-100
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="
              px-4 py-2 rounded-lg
              bg-blue-600 hover:bg-blue-700
              text-white font-medium text-sm
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
          >
            {loading ? "Posting..." : isReply ? "Reply" : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
