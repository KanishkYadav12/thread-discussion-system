/**
 * usePosts Hook
 * Custom hook for managing posts with Redux
 * Pattern: Similar to useFetchClients architecture
 */

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPost, createPost } from "../redux/actions/postActions";
import { postActions } from "../redux/slices/postSlice";

/**
 * Hook for fetching all posts
 */
export const useFetchPosts = ({ currentPage = 1, pageSize = 10 } = {}) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.post.getAllPosts
  );

  const [posts, setPosts] = useState(data);

  const fetchAllPosts = useCallback(() => {
    if (!posts || refresh) {
      dispatch(getAllPosts({ page: currentPage, limit: pageSize }));
      setRefresh(false);
    }
  }, [dispatch, posts, currentPage, pageSize, refresh]);

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setPosts(data);
      setLoading(false);
      dispatch(postActions.clearGetAllPostsStatus());
    } else if (status === "failed") {
      setLoading(false);
      console.error("useFetchPosts error:", error);
      dispatch(postActions.clearGetAllPostsStatus());
      dispatch(postActions.clearGetAllPostsError());
    }
  }, [dispatch, status, data, error]);

  return {
    loading,
    posts,
    error,
    setRefresh,
    refetch: fetchAllPosts,
  };
};

/**
 * Hook for fetching single post
 */
export const useFetchPost = (postId) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector((state) => state.post.getPost);

  const fetchPost = useCallback(() => {
    if (postId) {
      dispatch(getPost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      dispatch(postActions.clearGetPostStatus());
    } else if (status === "failed") {
      setLoading(false);
      console.error("useFetchPost error:", error);
      dispatch(postActions.clearGetPostStatus());
      dispatch(postActions.clearGetPostError());
    }
  }, [dispatch, status, error]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(postActions.clearGetPostData());
    };
  }, [dispatch]);

  return {
    loading,
    post: data,
    error,
    refetch: fetchPost,
  };
};

/**
 * Hook for creating post
 */
export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector((state) => state.post.createPost);

  const handleCreatePost = useCallback(
    (postData) => {
      dispatch(createPost(postData));
    },
    [dispatch]
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      // Keep status for UI feedback
    } else if (status === "failed") {
      setLoading(false);
      console.error("useCreatePost error:", error);
    }
  }, [status, error]);

  const resetCreatePost = useCallback(() => {
    dispatch(postActions.clearCreatePostStatus());
    dispatch(postActions.clearCreatePostError());
    dispatch(postActions.clearCreatePostData());
  }, [dispatch]);

  return {
    loading,
    createPost: handleCreatePost,
    success: status === "success",
    error,
    createdPost: data,
    resetCreatePost,
  };
};
