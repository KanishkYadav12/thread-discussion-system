import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res, next) => {
  try {
    const { postId, text, parentId } = req.body;

    if (!postId || !text) {
      return res.status(400).json({
        success: false,
        message: "Please provide postId and text",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        return res.status(404).json({
          success: false,
          message: "Parent comment not found",
        });
      }

      if (parentComment.postId.toString() !== postId) {
        return res.status(400).json({
          success: false,
          message: "Parent comment does not belong to this post",
        });
      }
    }

    const comment = await Comment.create({
      postId,
      text,
      parentId: parentId || null,
    });

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};
export const getCommentsByPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comments = await Comment.find({ postId }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID format",
      });
    }
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    await Comment.deleteMany({ parentId: req.params.id });

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Comment and its replies deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID format",
      });
    }
    next(error);
  }
};
