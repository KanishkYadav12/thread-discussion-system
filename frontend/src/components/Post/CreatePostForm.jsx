/**
 * CreatePostForm Component
 * Form for creating new discussion posts
 * Uses custom hook pattern for state management
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/usePosts";
import { VALIDATION, SUCCESS_MESSAGES } from "../../utils/constants";
import { BiError, BiCheck } from "react-icons/bi";

const CreatePostForm = () => {
  const navigate = useNavigate();

  // Use custom hook
  const { loading, createPost, success, error, resetCreatePost } =
    useCreatePost();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  // Reset on mount
  useEffect(() => {
    resetCreatePost();
  }, [resetCreatePost]);

  // Handle successful creation
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [success, navigate]);

  // Handle input change
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

  // Validate form
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

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    createPost({
      title: formData.title.trim(),
      content: formData.content.trim(),
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create New Discussion
          </h1>
          <p className="text-gray-600">
            Share your thoughts and start a conversation
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <BiCheck className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              {SUCCESS_MESSAGES.POST_CREATED}
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <BiError className="w-5 h-5 text-red-600 mt-0.5" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading || success}
              className={`
                w-full px-4 py-3 rounded-lg border
                ${errors.title ? "border-red-300" : "border-gray-300"}
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:bg-gray-50 disabled:text-gray-500
                transition-colors
              `}
              placeholder="Enter a descriptive title..."
              maxLength={VALIDATION.POST_TITLE_MAX}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.title && (
                <span className="text-sm text-red-600">{errors.title}</span>
              )}
              <span className="text-xs text-gray-500 ml-auto">
                {formData.title.length}/{VALIDATION.POST_TITLE_MAX}
              </span>
            </div>
          </div>

          {/* Content Field */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              disabled={loading || success}
              rows={12}
              className={`
                w-full px-4 py-3 rounded-lg border
                ${errors.content ? "border-red-300" : "border-gray-300"}
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:bg-gray-50 disabled:text-gray-500
                transition-colors resize-none
              `}
              placeholder="Share your thoughts in detail..."
              maxLength={VALIDATION.POST_CONTENT_MAX}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.content && (
                <span className="text-sm text-red-600">{errors.content}</span>
              )}
              <span className="text-xs text-gray-500 ml-auto">
                {formData.content.length}/{VALIDATION.POST_CONTENT_MAX}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              disabled={loading || success}
              className="
                px-6 py-3 rounded-lg
                border border-gray-300
                text-gray-700 font-medium
                hover:bg-gray-50
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="
                px-6 py-3 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-white font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
            >
              {loading ? "Creating..." : success ? "Created!" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
