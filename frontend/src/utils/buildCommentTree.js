export const buildCommentTree = (comments) => {
  if (!comments || !Array.isArray(comments) || comments.length === 0) {
    return [];
  }

  try {
    // Create a map for O(1) lookup
    const commentMap = new Map();
    const rootComments = [];

    // First pass: Create map entries with children arrays
    comments.forEach((comment) => {
      commentMap.set(comment._id, {
        ...comment,
        children: [],
      });
    });

    // Second pass: Build the tree structure
    comments.forEach((comment) => {
      const commentNode = commentMap.get(comment._id);

      if (comment.parentId && commentMap.has(comment.parentId)) {
        // This is a reply - add to parent's children
        const parentNode = commentMap.get(comment.parentId);
        parentNode.children.push(commentNode);
      } else {
        // This is a root level comment
        rootComments.push(commentNode);
      }
    });

    return rootComments;
  } catch (error) {
    console.error("Error building comment tree:", error);
    return [];
  }
};

export const flattenCommentTree = (commentTree) => {
  const flatArray = [];

  const traverse = (comments) => {
    comments.forEach((comment) => {
      const { children, ...commentData } = comment;
      flatArray.push(commentData);

      if (children && children.length > 0) {
        traverse(children);
      }
    });
  };

  traverse(commentTree);
  return flatArray;
};

export const countComments = (commentTree) => {
  let count = 0;

  const traverse = (comments) => {
    comments.forEach((comment) => {
      count++;
      if (comment.children && comment.children.length > 0) {
        traverse(comment.children);
      }
    });
  };

  traverse(commentTree);
  return count;
};

export const getMaxDepth = (commentTree) => {
  const findDepth = (comments, currentDepth = 0) => {
    if (!comments || comments.length === 0) return currentDepth;

    let maxDepth = currentDepth;

    comments.forEach((comment) => {
      if (comment.children && comment.children.length > 0) {
        const childDepth = findDepth(comment.children, currentDepth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      } else {
        maxDepth = Math.max(maxDepth, currentDepth);
      }
    });

    return maxDepth;
  };

  return findDepth(commentTree);
};

export const findCommentById = (commentTree, commentId) => {
  const search = (comments) => {
    for (const comment of comments) {
      if (comment._id === commentId) {
        return comment;
      }

      if (comment.children && comment.children.length > 0) {
        const found = search(comment.children);
        if (found) return found;
      }
    }
    return null;
  };

  return search(commentTree);
};
