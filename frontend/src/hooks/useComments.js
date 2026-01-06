import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentsByPost,
  createComment,
} from "../redux/actions/commentActions";
import { commentActions } from "../redux/slices/commentSlice";
import { buildCommentTree } from "../utils/buildCommentTree";

/**
 * Hook for fetching comments by post
 */
export const useFetchComments = (postId) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.comment.getCommentsByPost
  );

  const [comments, setComments] = useState(data);
  const [commentTree, setCommentTree] = useState([]);

  const fetchComments = useCallback(() => {
    if (postId && (!comments || refresh)) {
      dispatch(getCommentsByPost(postId));
      setRefresh(false);
    }
  }, [dispatch, postId, comments, refresh]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setComments(data);
      setCommentTree(buildCommentTree(data));
      setLoading(false);
      dispatch(commentActions.clearGetCommentsByPostStatus());
    } else if (status === "failed") {
      setLoading(false);
      console.error("useFetchComments error:", error);
      dispatch(commentActions.clearGetCommentsByPostStatus());
      dispatch(commentActions.clearGetCommentsByPostError());
    }
  }, [dispatch, status, data, error]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(commentActions.clearGetCommentsByPostData());
    };
  }, [dispatch]);

  return {
    loading,
    comments,
    commentTree,
    error,
    setRefresh,
    refetch: fetchComments,
  };
};

/**
 * Hook for creating comment
 */
export const useCreateComment = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.comment.createComment
  );

  const handleCreateComment = useCallback(
    (commentData) => {
      dispatch(createComment(commentData));
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
      console.error("useCreateComment error:", error);
    }
  }, [status, error]);

  const resetCreateComment = useCallback(() => {
    dispatch(commentActions.clearCreateCommentStatus());
    dispatch(commentActions.clearCreateCommentError());
    dispatch(commentActions.clearCreateCommentData());
  }, [dispatch]);

  return {
    loading,
    createComment: handleCreateComment,
    success: status === "success",
    error,
    createdComment: data,
    resetCreateComment,
  };
};
