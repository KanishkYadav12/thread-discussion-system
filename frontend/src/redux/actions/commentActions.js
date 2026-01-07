import * as commentAPI from "../api/commentAPI";
import { commentActions } from "../slices/commentSlice";

/**
 * Get comments by post ID
 */
export const getCommentsByPost = (postId) => async (dispatch) => {
  try {
    console.log("getCommentsByPost-request", postId);
    dispatch(commentActions.getCommentsByPostRequest());

    const response = await commentAPI.fetchCommentsByPostId(postId);

    console.log("getCommentsByPost-response", response);
    dispatch(commentActions.getCommentsByPostSuccess(response));
  } catch (error) {
    console.log("getCommentsByPost-error", error);
    dispatch(
      commentActions.getCommentsByPostFailure(
        error.userMessage || error.message || "Failed to fetch comments"
      )
    );
  }
};

/**
 * Create new comment
 */
export const createComment = (commentData) => async (dispatch) => {
  try {
    console.log("createComment-request", commentData);
    dispatch(commentActions.createCommentRequest());

    const response = await commentAPI.createComment(commentData);

    console.log("createComment-response", response);
    dispatch(commentActions.createCommentSuccess(response));

    // Update comment list
    dispatch(
      commentActions.updateCommentList({
        type: "add",
        payload: response,
      })
    );
  } catch (error) {
    console.log("createComment-error", error);
    dispatch(
      commentActions.createCommentFailure(
        error.userMessage || error.message || "Failed to create comment"
      )
    );
  }
};

/**
 * Delete comment
 */
export const deleteComment = (commentId) => async (dispatch) => {
  try {
    console.log("deleteComment-request", commentId);
    dispatch(commentActions.deleteCommentRequest());

    const response = await commentAPI.deleteComment(commentId);

    console.log("deleteComment-response", response);
    dispatch(commentActions.deleteCommentSuccess(response));

    // Update comment list
    dispatch(
      commentActions.updateCommentList({
        type: "delete",
        payload: { _id: commentId },
      })
    );
  } catch (error) {
    console.log("deleteComment-error", error);
    dispatch(
      commentActions.deleteCommentFailure(
        error.userMessage || error.message || "Failed to delete comment"
      )
    );
  }
};
