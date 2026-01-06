import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../../utils/constants";

/**
 * Fetch all posts
 * @returns {Promise<Array>} Array of post objects
 */
export const fetchPosts = async () => {
  const response = await apiClient.get(API_ENDPOINTS.POSTS);
  return response.data.data;
};

/**
 * Fetch a single post by ID
 * @param {string} postId - Post ID
 * @returns {Promise<Object>} Post object
 */
export const fetchPostById = async (postId) => {
  const response = await apiClient.get(API_ENDPOINTS.POST_BY_ID(postId));
  return response.data.data;
};

/**
 * Create a new post
 * @param {Object} postData - Post data (title, content)
 * @returns {Promise<Object>} Created post object
 */
export const createPost = async (postData) => {
  const response = await apiClient.post(API_ENDPOINTS.POSTS, postData);
  return response.data.data;
};

/**
 * Delete a post by ID
 * @param {string} postId - Post ID to delete
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deletePost = async (postId) => {
  const response = await apiClient.delete(API_ENDPOINTS.POST_BY_ID(postId));
  return response.data;
};
