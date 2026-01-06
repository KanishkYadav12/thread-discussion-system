import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [200, "Title cannot exceed 200 characters"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    minlength: [10, "Content must be at least 10 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
