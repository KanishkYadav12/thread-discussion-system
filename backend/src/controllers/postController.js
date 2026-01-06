import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and content",
      });
    }

    const post = await Post.create({ title, content });

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ postId: post._id });
        return {
          ...post.toObject(),
          commentCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: posts.length,
      data: postsWithCommentCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const commentCount = await Comment.countDocuments({ postId: post._id });

    res.status(200).json({
      success: true,
      data: {
        ...post.toObject(),
        commentCount,
      },
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

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    await Comment.deleteMany({ postId: req.params.id });

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Post and associated comments deleted successfully",
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
