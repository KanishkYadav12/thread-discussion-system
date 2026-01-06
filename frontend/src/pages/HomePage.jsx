/**
 * HomePage Component
 * Main landing page displaying all discussion posts
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../components/Post/PostList";
import { BiPlus } from "react-icons/bi";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Discussion Forum
              </h1>
              <p className="text-gray-600 mt-2">
                Join the conversation and share your thoughts
              </p>
            </div>

            {/* Mobile Create Button */}
            <button
              onClick={() => navigate("/create")}
              className="
                sm:hidden
                w-12 h-12 rounded-full
                bg-blue-600 hover:bg-blue-700
                text-white
                flex items-center justify-center
                shadow-lg hover:shadow-xl
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
              aria-label="Create new post"
            >
              <BiPlus className="w-6 h-6" />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-6"></div>
        </div>

        {/* Post List */}
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
