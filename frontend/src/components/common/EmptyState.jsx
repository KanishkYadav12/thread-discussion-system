/**
 * EmptyState Component
 * Displays empty state with icon and optional action button
 */

import React from "react";
import {
  BiMessageSquareDetail,
  BiFileBlank,
  BiSearchAlt,
} from "react-icons/bi";

/**
 * @param {string} type - Type of empty state: 'posts', 'comments', 'search' (default: 'posts')
 * @param {string} title - Custom title (optional)
 * @param {string} message - Custom message (optional)
 * @param {Object} action - Action button config { label, onClick }
 */
const EmptyState = ({ type = "posts", title, message, action }) => {
  // Predefined configurations for different types
  const configs = {
    posts: {
      icon: BiFileBlank,
      defaultTitle: "No posts yet",
      defaultMessage: "Be the first to create a discussion post!",
      iconColor: "text-blue-400",
    },
    comments: {
      icon: BiMessageSquareDetail,
      defaultTitle: "No comments yet",
      defaultMessage: "Start the conversation by adding the first comment.",
      iconColor: "text-green-400",
    },
    search: {
      icon: BiSearchAlt,
      defaultTitle: "No results found",
      defaultMessage: "Try adjusting your search terms or filters.",
      iconColor: "text-gray-400",
    },
  };

  const config = configs[type] || configs.posts;
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <Icon className={`w-10 h-10 ${config.iconColor}`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {title || config.defaultTitle}
        </h3>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message || config.defaultMessage}</p>

        {/* Action Button */}
        {action && (
          <button
            onClick={action.onClick}
            className="
              px-6 py-3 
              bg-blue-600 hover:bg-blue-700 
              text-white font-medium rounded-lg
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              shadow-sm hover:shadow-md
            "
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
