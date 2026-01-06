/**
 * NotFoundPage Component
 * 404 error page for invalid routes
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { BiError, BiHome } from "react-icons/bi";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <BiError className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="
              flex items-center justify-center gap-2
              px-6 py-3 bg-blue-600 hover:bg-blue-700
              text-white rounded-lg font-medium
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
          >
            <BiHome className="w-5 h-5" />
            Go to Homepage
          </button>

          <button
            onClick={() => navigate(-1)}
            className="
              px-6 py-3 border border-gray-300
              text-gray-700 rounded-lg font-medium
              hover:bg-gray-50
              transition-colors
            "
          >
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Need help? Check out our</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            discussion forum
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
