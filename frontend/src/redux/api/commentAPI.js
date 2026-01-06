/**
 * Comment API Functions
 * Handles all HTTP requests related to comments
 */

import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../../utils/constants";

/**
 * Fetch all comments for a specific post
 * @param {string} postId - Post ID
 * @returns {Promise<Array>} Array of comment objects
 */
export const fetchCommentsByPostId = async (postId) => {
  const response = await apiClient.get(API_ENDPOINTS.COMMENTS_BY_POST(postId));
  return response.data.data;
};

/**
 * Create a new comment or reply
 * @param {Object} commentData - Comment data (postId, text, parentId?)
 * @returns {Promise<Object>} Created comment object
 */
export const createComment = async (commentData) => {
  const response = await apiClient.post(API_ENDPOINTS.COMMENTS, commentData);
  return response.data.data;
};

/**
 * Delete a comment by ID
 * @param {string} commentId - Comment ID to delete
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteComment = async (commentId) => {
  const response = await apiClient.delete(
    API_ENDPOINTS.COMMENT_BY_ID(commentId)
  );
  return response.data;
};
