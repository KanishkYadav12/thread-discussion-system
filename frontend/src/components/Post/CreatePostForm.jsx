import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/usePosts";
import { VALIDATION, SUCCESS_MESSAGES } from "../../utils/constants";
import { BiError, BiCheck } from "react-icons/bi";

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
    <div className="bg-white rounded-xl border-2 border-slate-200 shadow-lg p-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Create New Discussion
        </h1>
        <p className="text-slate-600">
          Share your thoughts and start a conversation
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 border-2 border-green-200 flex items-center gap-3">
          <BiCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
          <span className="text-green-800 font-semibold">
            {SUCCESS_MESSAGES.POST_CREATED}
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border-2 border-red-200 flex items-start gap-3">
          <BiError className="w-6 h-6 text-red-600 flex-shrink-0" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-bold text-slate-700 mb-2"
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
            className={`w-full px-4 py-3 rounded-lg bg-white border-2 ${
              errors.title
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-indigo-500"
            } focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-400 transition-all text-base placeholder:text-slate-400`}
            placeholder="Enter a descriptive title..."
            maxLength={VALIDATION.POST_TITLE_MAX}
          />
          <div className="flex justify-between items-center mt-2">
            {errors.title ? (
              <span className="text-sm text-red-600 font-medium">
                {errors.title}
              </span>
            ) : (
              <span></span>
            )}
            <span
              className={`text-sm font-medium ${
                formData.title.length > VALIDATION.POST_TITLE_MAX * 0.9
                  ? "text-red-600"
                  : "text-slate-500"
              }`}
            >
              {formData.title.length}/{VALIDATION.POST_TITLE_MAX}
            </span>
          </div>
        </div>

        {/* Content Field */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-bold text-slate-700 mb-2"
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
            className={`w-full px-4 py-3 rounded-lg bg-white border-2 ${
              errors.content
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-indigo-500"
            } focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-400 transition-all text-base leading-relaxed resize-none placeholder:text-slate-400`}
            placeholder="Share your thoughts in detail..."
            maxLength={VALIDATION.POST_CONTENT_MAX}
          />
          <div className="flex justify-between items-center mt-2">
            {errors.content ? (
              <span className="text-sm text-red-600 font-medium">
                {errors.content}
              </span>
            ) : (
              <span></span>
            )}
            <span
              className={`text-sm font-medium ${
                formData.content.length > VALIDATION.POST_CONTENT_MAX * 0.9
                  ? "text-red-600"
                  : "text-slate-500"
              }`}
            >
              {formData.content.length}/{VALIDATION.POST_CONTENT_MAX}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end pt-6 border-t-2 border-slate-100">
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={loading || success}
            className="px-6 py-3 rounded-lg bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || success}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
          >
            {loading ? "Creating..." : success ? "Created ✓" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
