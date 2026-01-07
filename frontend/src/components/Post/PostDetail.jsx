const PostDetail = ({ post }) => {
  if (!post) return null;

  return (
    <article
      className="
      bg-white border border-slate-200 rounded-lg
      px-8 py-10
    "
    >
      {/* Title */}
      <h1
        className="
        text-3xl font-bold text-slate-900
        leading-tight mb-4
      "
      >
        {post.title}
      </h1>

      {/* Meta */}
      <div
        className="
        flex items-center gap-6
        text-sm text-slate-500
        pb-6 mb-8
        border-b border-slate-200
      "
      >
        <div className="flex items-center gap-1.5">
          <BiTime className="w-4 h-4" />
          <time dateTime={post.createdAt}>
            {formatSmartDate(post.createdAt)}
          </time>
        </div>

        <div className="flex items-center gap-1.5">
          <BiMessageSquareDetail className="w-4 h-4" />
          <span>{post.commentCount || 0} comments</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-slate max-w-none">
        <p
          className="
          whitespace-pre-wrap
          text-slate-700 text-lg
          leading-relaxed
        "
        >
          {post.content}
        </p>
      </div>
    </article>
  );
};
export default PostDetail;
