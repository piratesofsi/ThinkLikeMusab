import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchApprovedPosts } from "../utils/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const components = {
  h2: ({ children }) => (
    <h2 className="text-xl md:text-2xl font-semibold text-white mt-10 md:mt-14 mb-4 tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base md:text-lg font-semibold text-slate-200 mt-6 md:mt-8 mb-3 tracking-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-slate-300 leading-7 md:leading-8 tracking-wide my-4 md:my-5 text-sm md:text-[1.05rem]">
      {children}
    </p>
  ),
  ul: ({ children }) => <ul className="my-4 space-y-2 pl-1">{children}</ul>,
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-slate-300 leading-6 md:leading-7 text-sm md:text-[1.05rem]">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
      <span>{children}</span>
    </li>
  ),
  ol: ({ children }) => <ol className="my-4 space-y-4 pl-1 list-none">{children}</ol>,
  blockquote: ({ children }) => (
    <div className="my-6 rounded-xl border border-sky-500/30 bg-sky-950/30 px-4 md:px-6 py-4 text-slate-200 leading-7 md:leading-8">
      <span className="block text-xs uppercase tracking-widest text-sky-400 mb-2 font-medium">Key Insight</span>
      {children}
    </div>
  ),
  hr: () => (
    <div className="my-8 md:my-10 flex items-center gap-4">
      <div className="h-px flex-1 bg-slate-800" />
      <div className="flex gap-1.5">
        <span className="h-1 w-1 rounded-full bg-slate-700" />
        <span className="h-1 w-1 rounded-full bg-slate-700" />
        <span className="h-1 w-1 rounded-full bg-slate-700" />
      </div>
      <div className="h-px flex-1 bg-slate-800" />
    </div>
  ),
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-700/60">
      <table className="w-full text-sm text-slate-300">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-slate-800/80 text-xs uppercase tracking-widest text-slate-400">{children}</thead>
  ),
  th: ({ children }) => <th className="px-5 py-3 text-left font-medium">{children}</th>,
  tbody: ({ children }) => <tbody className="divide-y divide-slate-800">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-slate-800/40 transition-colors">{children}</tr>,
  td: ({ children }) => <td className="px-5 py-3">{children}</td>,
  code: ({ inline, className, children }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");

    const handleCopy = () => {
      navigator.clipboard.writeText(codeString)
        .then(() => toast.success("Copied"))
        .catch(() => toast.error("Failed"));
    };

    if (!inline && match) {
      return (
        <pre className="my-6 overflow-x-auto rounded-2xl border border-slate-700/60 bg-gray-800 p-4 md:p-6 text-sm leading-6 md:leading-7 text-slate-100">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-400 uppercase tracking-widest">
            <span>{match[1]}</span>
            <div className="flex items-center gap-1.5">
              <div className="flex pr-4">
                <button className="cursor-pointer hover:text-white transition-all duration-200" onClick={handleCopy}>
                  <Copy size={14} />
                </button>
              </div>
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
            </div>
          </div>
          <code className="block whitespace-pre-wrap font-mono">{codeString}</code>
        </pre>
      );
    }
    return (
      <code className="bg-slate-800 text-sky-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
};

function Posts() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedPosts()
      .then((data) => {
        const found = data.find((p) => p._id === id || p.id === id);
        setPost(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-slate-500 text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
        <p className="text-slate-500 text-lg">Post not found.</p>
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-500 mb-4 font-medium">
            {post.question}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight mb-4 md:mb-5">
            {post.title}
          </h1>
          <p className="text-base md:text-lg text-slate-400 leading-7 md:leading-8">
            {post.description}
          </p>

          {post.leetcode?.url && (
            <a
              href={post.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-400 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-orange-400 shrink-0">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
              LC {post.leetcode.number} · {post.leetcode.name}
            </a>
          )}

          <div className="mt-6 md:mt-8 h-px bg-slate-800" />
        </div>

        {/* Content */}
        <article>
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Footer */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-slate-600 font-medium">ThinkLikeMusab</span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-slate-700" />
          <span className="text-xs text-slate-600">{post.question}</span>
        </div>

      </div>
    </main >
  );
}

export default Posts;