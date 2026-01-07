/**
 * CommentTree Component
 * Renders the nested comment tree structure
 * Acts as a wrapper between CommentList and CommentItem
 */

import React from "react";
import CommentItem from "./CommentItem";

/**
 * @param {Array} commentTree - Nested array of comments with children
 * @param {string} postId - Post ID for creating replies
 */
const CommentTree = ({ commentTree, postId }) => {
  if (!commentTree || commentTree.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {commentTree.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          depth={0}
          postId={postId}
        />
      ))}
    </div>
  );
};

export default CommentTree;
