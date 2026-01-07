export const buildCommentTree = (comments) => {
  const commentMap = {};
  const tree = [];

  comments.forEach((comment) => {
    commentMap[comment._id.toString()] = {
      ...comment.toObject(),
      children: [],
    };
  });

  comments.forEach((comment) => {
    const commentId = comment._id.toString();
    const parentId = comment.parentId ? comment.parentId.toString() : null;

    if (parentId && commentMap[parentId]) {
      commentMap[parentId].children.push(commentMap[commentId]);
    } else {
      tree.push(commentMap[commentId]);
    }
  });

  return tree;
};
