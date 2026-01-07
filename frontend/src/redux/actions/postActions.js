import * as postAPI from "../api/postAPI";
import { postActions } from "../slices/postSlice";

export const getAllPosts =
  ({ page = null, limit = null } = {}) =>
  async (dispatch) => {
    try {
      console.log("getAllPosts-request", { page, limit });
      dispatch(postActions.getAllPostsRequest());

      const response = await postAPI.fetchPosts({ page, limit });

      console.log("getAllPosts-response", response);
      dispatch(postActions.getAllPostsSuccess(response));
    } catch (error) {
      console.log("getAllPosts-error", error);
      dispatch(
        postActions.getAllPostsFailure(
          error.userMessage || error.message || "Failed to fetch posts"
        )
      );
    }
  };

export const getPost = (postId) => async (dispatch) => {
  try {
    console.log("getPost-request", postId);
    dispatch(postActions.getPostRequest());

    const response = await postAPI.fetchPostById(postId);

    console.log("getPost-response", response);
    dispatch(postActions.getPostSuccess(response));
  } catch (error) {
    console.log("getPost-error", error);
    dispatch(
      postActions.getPostFailure(
        error.userMessage || error.message || "Failed to fetch post"
      )
    );
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    console.log("createPost-request", postData);
    dispatch(postActions.createPostRequest());

    const response = await postAPI.createPost(postData);

    console.log("createPost-response", response);
    dispatch(postActions.createPostSuccess(response));

    // Update post list
    dispatch(
      postActions.updatePostList({
        type: "add",
        payload: response,
      })
    );
  } catch (error) {
    console.log("createPost-error", error);
    dispatch(
      postActions.createPostFailure(
        error.userMessage || error.message || "Failed to create post"
      )
    );
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    console.log("deletePost-request", postId);
    dispatch(postActions.deletePostRequest());

    const response = await postAPI.deletePost(postId);

    console.log("deletePost-response", response);
    dispatch(postActions.deletePostSuccess(response));

    // Update post list
    dispatch(
      postActions.updatePostList({
        type: "delete",
        payload: { _id: postId },
      })
    );
  } catch (error) {
    console.log("deletePost-error", error);
    dispatch(
      postActions.deletePostFailure(
        error.userMessage || error.message || "Failed to delete post"
      )
    );
  }
};
