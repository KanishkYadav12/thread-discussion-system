import express from "express";
import {
  createComment,
  getCommentsByPostId,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment);

router.get("/post/:postId", getCommentsByPostId);

router.delete("/:id", deleteComment);

export default router;
