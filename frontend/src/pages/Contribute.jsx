import { useState } from "react";
import { submitPost } from "../utils/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";

const DSA_TOPICS = [
    "Arrays", "Sorting", "Graphs", "Trees",
    "Dynamic Programming", "Greedy", "Linked Lists", "Strings", "Binary Search",
];

function ContributePage() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        question: "",
        submittedBy: "",
        content: "",
        tags: [],
        leetcode: { number: "", name: "", url: "" },
    });
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLeetcode = (e) => {
        setForm({ ...form, leetcode: { ...form.leetcode, [e.target.name]: e.target.value } });
    };

    const toggleTag = (tag) => {
        setForm((prev) => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag)
                : [...prev.tags, tag],
        }));
    };

    const handleSubmit = async () => {
        if (!form.title || !form.description || !form.content) {
            toast.error("Title, description and content are required");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...form,
                leetcode: form.leetcode.url ? form.leetcode : undefined,
            };
            await submitPost(payload);
            toast.success("Post submitted for review!");
            setForm({
                title: "",
                description: "",
                question: "",
                submittedBy: "",
                content: "",
                tags: [],
                leetcode: { number: "", name: "", url: "" },
            });
        } catch {
            toast.error("Submission failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500 transition-colors duration-200";

    return (
        <div className="min-h-screen bg-black text-white px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-12">
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-500 mb-3 font-medium">Contribute</p>
                    <h1 className="text-4xl font-semibold tracking-tight text-white mb-3">Submit a Post</h1>
                    <p className="text-slate-400 text-base leading-7">
                        Write your thought process, not just the solution. All submissions are reviewed before going live.
                    </p>
                    <div className="mt-8 h-px bg-slate-800" />
                </div>

                <div className="space-y-6">

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Question Number</label>
                            <input
                                name="question"
                                value={form.question}
                                onChange={handleChange}
                                placeholder="e.g. Question 10"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Your Email</label>
                            <input
                                name="submittedBy"
                                value={form.submittedBy}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Title *</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="ThinkLikeMusab #10 – Problem Name"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Description *</label>
                        <input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="One line summary of the approach"
                            className={inputClass}
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-500 mb-3">Tags</label>
                        <div className="flex flex-wrap gap-2">
                            {DSA_TOPICS.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
                    ${form.tags.includes(tag)
                                            ? "bg-sky-500 border-sky-500 text-white"
                                            : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* LeetCode */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-500 mb-3">LeetCode (optional)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                                name="number"
                                value={form.leetcode.number}
                                onChange={handleLeetcode}
                                placeholder="Problem number"
                                className={inputClass}
                            />
                            <input
                                name="name"
                                value={form.leetcode.name}
                                onChange={handleLeetcode}
                                placeholder="Problem name"
                                className={inputClass}
                            />
                            <input
                                name="url"
                                value={form.leetcode.url}
                                onChange={handleLeetcode}
                                placeholder="leetcode.com/problems/..."
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Content editor */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-xs uppercase tracking-widest text-slate-500">Content * (Markdown)</label>
                            <button
                                onClick={() => setPreview(!preview)}
                                className="text-xs text-sky-500 hover:text-sky-300 uppercase tracking-widest transition"
                            >
                                {preview ? "← Edit" : "Preview →"}
                            </button>
                        </div>

                        {/* Markdown cheat sheet */}
                        <div className="mb-3 rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
                            <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Markdown Guide</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                                {[
                                    { syntax: "## Heading", result: "Section heading" },
                                    { syntax: "### Sub heading", result: "Sub section" },
                                    { syntax: "**bold text**", result: "Bold" },
                                    { syntax: "`inline code`", result: "Inline code" },
                                    { syntax: "```java ... ```", result: "Code block" },
                                    { syntax: "> your insight", result: "Key Insight box" },
                                    { syntax: "- item", result: "Bullet point" },
                                    { syntax: "1. item", result: "Numbered list" },
                                    { syntax: "---", result: "Divider" },
                                    { syntax: "| col | col |", result: "Table row" },
                                ].map(({ syntax, result }) => (
                                    <div key={syntax} className="flex items-center gap-3">
                                        <code className="text-sky-400 shrink-0">{syntax}</code>
                                        <span className="text-slate-500">→ {result}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {preview ? (
                            <div className="min-h-[400px] rounded-xl border border-slate-700 bg-slate-900 p-6 prose prose-invert max-w-none text-sm text-slate-300">
                                {form.content ? (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.content}</ReactMarkdown>
                                ) : (
                                    <p className="text-slate-600 italic">Nothing to preview yet...</p>
                                )}
                            </div>
                        ) : (
                            <textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                placeholder={`## Problem\n\nDescribe the problem here...\n\n---\n\n## My Approach\n\nHow did you think about it?\n\n\`\`\`java\n// your code\n\`\`\``}
                                rows={20}
                                className={`${inputClass} font-mono text-xs leading-6 resize-y`}
                            />
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full rounded-xl bg-white text-black py-3 text-sm font-semibold hover:bg-sky-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Submitting..." : "Submit for Review →"}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ContributePage;