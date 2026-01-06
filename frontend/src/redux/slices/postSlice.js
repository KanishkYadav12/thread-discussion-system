/**
 * Post Slice
 * Manages post-related state with separate states for each operation
 * Pattern: Similar to clientSlice architecture
 */

import { createSlice } from "@reduxjs/toolkit";

const initialPostState = {
  getAllPosts: {
    status: "idle",
    error: null,
    data: null,
  },
  getPost: {
    status: "idle",
    error: null,
    data: null,
  },
  createPost: {
    status: "idle",
    error: null,
    data: null,
  },
  deletePost: {
    status: "idle",
    error: null,
    data: null,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    // Get All Posts
    getAllPostsRequest: (state) => {
      state.getAllPosts.status = "pending";
    },
    getAllPostsSuccess: (state, action) => {
      state.getAllPosts.status = "success";
      state.getAllPosts.data = action.payload;
    },
    getAllPostsFailure: (state, action) => {
      state.getAllPosts.status = "failed";
      state.getAllPosts.error = action.payload;
    },

    // Get Single Post
    getPostRequest: (state) => {
      state.getPost.status = "pending";
    },
    getPostSuccess: (state, action) => {
      state.getPost.status = "success";
      state.getPost.data = action.payload;
    },
    getPostFailure: (state, action) => {
      state.getPost.status = "failed";
      state.getPost.error = action.payload;
    },

    // Create Post
    createPostRequest: (state) => {
      state.createPost.status = "pending";
    },
    createPostSuccess: (state, action) => {
      state.createPost.status = "success";
      state.createPost.data = action.payload;
    },
    createPostFailure: (state, action) => {
      state.createPost.status = "failed";
      state.createPost.data = null;
      state.createPost.error = action.payload;
    },

    // Delete Post
    deletePostRequest: (state) => {
      state.deletePost.status = "pending";
    },
    deletePostSuccess: (state, action) => {
      state.deletePost.status = "success";
      state.deletePost.data = action.payload;
    },
    deletePostFailure: (state, action) => {
      state.deletePost.status = "failed";
      state.deletePost.error = action.payload;
    },

    // Clear Get All Posts
    clearGetAllPostsStatus: (state) => {
      state.getAllPosts.status = "idle";
    },
    clearGetAllPostsData: (state) => {
      state.getAllPosts.data = null;
    },
    clearGetAllPostsError: (state) => {
      state.getAllPosts.error = null;
    },

    // Clear Get Post
    clearGetPostStatus: (state) => {
      state.getPost.status = "idle";
    },
    clearGetPostData: (state) => {
      state.getPost.data = null;
    },
    clearGetPostError: (state) => {
      state.getPost.error = null;
    },

    // Clear Create Post
    clearCreatePostStatus: (state) => {
      state.createPost.status = "idle";
    },
    clearCreatePostData: (state) => {
      state.createPost.data = null;
    },
    clearCreatePostError: (state) => {
      state.createPost.error = null;
    },

    // Clear Delete Post
    clearDeletePostStatus: (state) => {
      state.deletePost.status = "idle";
    },
    clearDeletePostData: (state) => {
      state.deletePost.data = null;
    },
    clearDeletePostError: (state) => {
      state.deletePost.error = null;
    },

    // Update Post List (for optimistic updates)
    updatePostList: (state, action) => {
      const { type, payload } = action.payload;

      // Ensure data exists
      if (!Array.isArray(state.getAllPosts?.data)) {
        state.getAllPosts.data = [];
      }

      switch (type) {
        case "add": {
          state.getAllPosts.data = [payload, ...state.getAllPosts.data];
          break;
        }

        case "update": {
          const index = state.getAllPosts.data.findIndex(
            (post) => post._id.toString() === payload?._id.toString()
          );
          if (index !== -1) {
            state.getAllPosts.data[index] = payload;
          }
          break;
        }

        case "delete": {
          state.getAllPosts.data = state.getAllPosts.data.filter(
            (post) => post._id.toString() !== payload._id.toString()
          );
          break;
        }

        default:
          console.warn(`Unhandled type: ${type}`);
      }
    },
  },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
