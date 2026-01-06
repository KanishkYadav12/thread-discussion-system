import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Post ID is required"],
  },
  text: {
    type: String,
    required: [true, "Comment text is required"],
    trim: true,
    minlength: [1, "Comment must be at least 1 character"],
    maxlength: [1000, "Comment cannot exceed 1000 characters"],
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
