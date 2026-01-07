/**
 * CreatePostPage Component
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import CreatePostForm from "../components/Post/CreatePostForm";
import { BiArrowBack } from "react-icons/bi";

const CreatePostPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-white font-medium transition-all border-2 border-transparent hover:border-slate-200"
        >
          <BiArrowBack className="w-5 h-5" />
          <span>Back to discussions</span>
        </button>

        {/* Create Post Form */}
        <CreatePostForm />
      </div>
    </div>
  );
};

export default CreatePostPage;
