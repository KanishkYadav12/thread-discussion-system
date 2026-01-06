/**
 * Comment Tree Builder
 * Converts flat array of comments into nested tree structure
 * Implements efficient O(n) algorithm using hash map
 */

/**
 * Build a nested comment tree from flat array
 * @param {Array} comments - Flat array of comment objects
 * @returns {Array} Nested array of comments with children property
 */
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

/**
 * Flatten a comment tree back to a flat array
 * Useful for processing or counting total comments
 * @param {Array} commentTree - Nested comment tree
 * @returns {Array} Flat array of all comments
 */
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

/**
 * Count total comments including nested replies
 * @param {Array} commentTree - Nested comment tree
 * @returns {number} Total number of comments
 */
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

/**
 * Find maximum depth of comment nesting
 * @param {Array} commentTree - Nested comment tree
 * @returns {number} Maximum nesting depth
 */
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

/**
 * Find a specific comment by ID in the tree
 * @param {Array} commentTree - Nested comment tree
 * @param {string} commentId - Comment ID to find
 * @returns {Object|null} Comment object or null if not found
 */
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
