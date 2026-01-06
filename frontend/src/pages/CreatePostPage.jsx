/**
 * CreatePostPage Component
 * Page for creating a new discussion post
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import CreatePostForm from "../components/Post/CreatePostForm";
import { BiArrowBack } from "react-icons/bi";

const CreatePostPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="
            flex items-center gap-2 mb-6
            text-gray-600 hover:text-gray-900
            font-medium transition-colors
          "
        >
          <BiArrowBack className="w-5 h-5" />
          Back to discussions
        </button>

        {/* Create Post Form */}
        <CreatePostForm />
      </div>
    </div>
  );
};

export default CreatePostPage;
