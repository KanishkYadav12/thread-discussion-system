import CommentItem from "./CommentItem";

const CommentTree = ({ commentTree, postId, depth = 0, onCommentSuccess }) => {
  const MAX_DEPTH = 5;

  if (!commentTree || commentTree.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {commentTree.map((comment) => (
        <div key={comment._id}>
          <CommentItem
            comment={comment}
            postId={postId}
            depth={depth}
            onCommentSuccess={onCommentSuccess}
          />

          {comment.children &&
            comment.children.length > 0 &&
            depth < MAX_DEPTH && (
              <div
                style={{
                  marginLeft: depth < 3 ? "1.5rem" : "1rem",
                  marginTop: "1rem",
                }}
              >
                <CommentTree
                  commentTree={comment.children}
                  postId={postId}
                  depth={depth + 1}
                  onCommentSuccess={onCommentSuccess}
                />
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default CommentTree;
