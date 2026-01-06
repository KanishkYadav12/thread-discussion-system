/**
 * Comment Slice
 * Manages comment-related state with separate states for each operation
 */

import { createSlice } from "@reduxjs/toolkit";

const initialCommentState = {
  getCommentsByPost: {
    status: "idle",
    error: null,
    data: null,
  },
  createComment: {
    status: "idle",
    error: null,
    data: null,
  },
  deleteComment: {
    status: "idle",
    error: null,
    data: null,
  },
};

const commentSlice = createSlice({
  name: "comment",
  initialState: initialCommentState,
  reducers: {
    // Get Comments By Post
    getCommentsByPostRequest: (state) => {
      state.getCommentsByPost.status = "pending";
    },
    getCommentsByPostSuccess: (state, action) => {
      state.getCommentsByPost.status = "success";
      state.getCommentsByPost.data = action.payload;
    },
    getCommentsByPostFailure: (state, action) => {
      state.getCommentsByPost.status = "failed";
      state.getCommentsByPost.error = action.payload;
    },

    // Create Comment
    createCommentRequest: (state) => {
      state.createComment.status = "pending";
    },
    createCommentSuccess: (state, action) => {
      state.createComment.status = "success";
      state.createComment.data = action.payload;
    },
    createCommentFailure: (state, action) => {
      state.createComment.status = "failed";
      state.createComment.data = null;
      state.createComment.error = action.payload;
    },

    // Delete Comment
    deleteCommentRequest: (state) => {
      state.deleteComment.status = "pending";
    },
    deleteCommentSuccess: (state, action) => {
      state.deleteComment.status = "success";
      state.deleteComment.data = action.payload;
    },
    deleteCommentFailure: (state, action) => {
      state.deleteComment.status = "failed";
      state.deleteComment.error = action.payload;
    },

    // Clear Get Comments
    clearGetCommentsByPostStatus: (state) => {
      state.getCommentsByPost.status = "idle";
    },
    clearGetCommentsByPostData: (state) => {
      state.getCommentsByPost.data = null;
    },
    clearGetCommentsByPostError: (state) => {
      state.getCommentsByPost.error = null;
    },

    // Clear Create Comment
    clearCreateCommentStatus: (state) => {
      state.createComment.status = "idle";
    },
    clearCreateCommentData: (state) => {
      state.createComment.data = null;
    },
    clearCreateCommentError: (state) => {
      state.createComment.error = null;
    },

    // Clear Delete Comment
    clearDeleteCommentStatus: (state) => {
      state.deleteComment.status = "idle";
    },
    clearDeleteCommentData: (state) => {
      state.deleteComment.data = null;
    },
    clearDeleteCommentError: (state) => {
      state.deleteComment.error = null;
    },

    // Update Comment List (for optimistic updates)
    updateCommentList: (state, action) => {
      const { type, payload } = action.payload;

      // Ensure data exists
      if (!Array.isArray(state.getCommentsByPost?.data)) {
        state.getCommentsByPost.data = [];
      }

      switch (type) {
        case "add": {
          state.getCommentsByPost.data = [
            ...state.getCommentsByPost.data,
            payload,
          ];
          break;
        }

        case "delete": {
          // Remove comment and its children
          const removeCommentAndChildren = (commentId, comments) => {
            return comments.filter((comment) => {
              if (comment._id.toString() === commentId.toString()) {
                return false;
              }
              if (comment.parentId?.toString() === commentId.toString()) {
                return false;
              }
              return true;
            });
          };

          state.getCommentsByPost.data = removeCommentAndChildren(
            payload._id,
            state.getCommentsByPost.data
          );
          break;
        }

        default:
          console.warn(`Unhandled type: ${type}`);
      }
    },
  },
});

export const commentActions = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
