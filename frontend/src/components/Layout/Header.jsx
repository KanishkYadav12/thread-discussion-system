/**
 * Header Component
 * Main navigation header with logo and primary actions
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageSquareDetail, BiPlus, BiHome } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BiMessageSquareDetail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ThreadTalk</h1>
              <p className="text-xs text-gray-500">Discussion Forum</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3">
            {/* Home Button */}
            <Link
              to="/"
              className="
                flex items-center gap-2 px-4 py-2
                text-gray-700 hover:text-blue-600 hover:bg-blue-50
                rounded-lg transition-colors duration-200
                font-medium
              "
            >
              <BiHome className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {/* Create Post Button */}
            <button
              onClick={() => navigate("/create")}
              className="
                flex items-center gap-2 px-4 py-2
                bg-blue-600 hover:bg-blue-700
                text-white rounded-lg
                font-medium transition-colors duration-200
                shadow-sm hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
            >
              <BiPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Create Post</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
