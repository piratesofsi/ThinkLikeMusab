import { useParams } from "react-router-dom";
import { posts } from "../data/Post.js";
import ReactMarkdown from "react-markdown";
import { Copy, HandCoins } from "lucide-react";
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
    ul: ({ children }) => (
        <ul className="my-4 space-y-2 pl-1">{children}</ul>
    ),
    li: ({ children }) => (
        <li className="flex items-start gap-3 text-slate-300 leading-6 md:leading-7 text-sm md:text-[1.05rem]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
            <span>{children}</span>
        </li>
    ),
    ol: ({ children }) => (
        <ol className="my-4 space-y-4 pl-1 list-none counter-reset-[step]">{children}</ol>
    ),
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
    strong: ({ children }) => (
        <strong className="text-white font-semibold">{children}</strong>
    ),
    code: ({ inline, className, children }) => {
        const match = /language-(\w+)/.exec(className || "");
        const codeString = String(children).replace(/\n$/, "");

        const handleCopy = (code) => {
            navigator.clipboard.writeText(codeString)
                .then(() => toast.success("Copied"))
                .catch(() => toast.error("Failed"));
        };

        if (!inline && match) {
            return (
                <pre className="my-6 overflow-x-auto rounded-2xl border border-slate-700/60 bg-gray-800 p-4 md:p-6 text-sm leading-6 md:leading-7 text-slate-100">
                    <div className="mb-3 flex items-center justify-between text-xs text-slate-400 uppercase tracking-widest">
                        <span>{match[1]}</span>


                        <div className="flex justify-center items-center gap-1.5">
                            {/* clipboard button  */}
                            <div className="flex pr-4">
                                <button className="cursor-pointer hover:text-white transition-all duration-200" onClick={handleCopy}><Copy /></button>
                            </div>
                            <span className="h-3 w-3 rounded-full bg-red-500/60" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                            <span className="h-3 w-3 rounded-full bg-green-500/60" />
                        </div>
                    </div>
                    <code className="block whitespace-pre-wrap font-mono">{String(children).replace(/\n$/, "")}</code>
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
    const post = posts.find((p) => p.id === id);



    if (!post) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
                <p className="text-slate-500 text-lg">Post not found.</p>
            </div>
        );
    }

    return (
        <main className="bg-black text-white min-h-screen px-4 py-16 md:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

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
                    <div className="mt-6 md:mt-8 h-px bg-slate-800" />
                </div>

                {/* Content */}
                <article>
                    <ReactMarkdown components={components}>
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* Footer tag */}
                <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                    <span className="text-xs uppercase tracking-widest text-slate-600 font-medium">ThinkLikeMusab</span>
                    <span className="hidden sm:block h-1 w-1 rounded-full bg-slate-700" />
                    <span className="text-xs text-slate-600">{post.question}</span>
                </div>

            </div>
        </main>
    );
}

export default Posts;