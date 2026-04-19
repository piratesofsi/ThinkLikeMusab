import { useState, useEffect } from "react";
import { adminLogin, fetchAllPosts, approvePost, rejectPost, deletePost } from "../utils/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";

function Admin() {
    const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [posts, setPosts] = useState([]);
    const [selected, setSelected] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [filter, setFilter] = useState("pending");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) loadPosts();
    }, [token]);

    const loadPosts = async () => {
        try {
            const data = await fetchAllPosts(token);
            setPosts(data);
        } catch {
            setToken("");
            localStorage.removeItem("admin_token");
            toast.error("Session expired. Please login again.");
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const data = await adminLogin(email, password);
            setToken(data.token);
            localStorage.setItem("admin_token", data.token);
            toast.success("Logged in");
        } catch {
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await approvePost(id, token);
            toast.success("Post approved");
            loadPosts();
            setSelected(null);
        } catch {
            toast.error("Failed to approve");
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectPost(id, token, rejectReason);
            toast.success("Post rejected");
            setRejectReason("");
            loadPosts();
            setSelected(null);
        } catch {
            toast.error("Failed to reject");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePost(id, token);
            toast.success("Post deleted");
            loadPosts();
            setSelected(null);
        } catch {
            toast.error("Failed to delete");
        }
    };

    const handleLogout = () => {
        setToken("");
        localStorage.removeItem("admin_token");
        setPosts([]);
    };

    const filtered = posts.filter((p) => p.status === filter);

    const statusColor = {
        pending: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
        approved: "text-green-400 border-green-400/30 bg-green-400/10",
        rejected: "text-red-400 border-red-400/30 bg-red-400/10",
    };

    const inputClass = "w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500 transition-colors";

    // ── Login screen ──
    if (!token) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    <div className="mb-8 text-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-sky-500 mb-3">Admin</p>
                        <h1 className="text-3xl font-semibold text-white">Sign in</h1>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className={inputClass}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            className={inputClass}
                        />
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full rounded-xl bg-white text-black py-3 text-sm font-semibold hover:bg-sky-100 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign in →"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Post detail view ──
    if (selected) {
        return (
            <div className="min-h-screen bg-black text-white px-4 py-16 sm:px-6">
                <div className="mx-auto max-w-3xl">

                    <button
                        onClick={() => setSelected(null)}
                        className="mb-8 text-xs text-slate-500 hover:text-white uppercase tracking-widest transition"
                    >
                        ← Back
                    </button>

                    <div className="mb-6 flex items-center gap-3">
                        <span className={`text-xs px-3 py-1 rounded-full border font-medium uppercase tracking-widest ${statusColor[selected.status]}`}>
                            {selected.status}
                        </span>
                        <span className="text-xs text-slate-500">{new Date(selected.createdAt).toLocaleDateString()}</span>
                        {selected.submittedBy && (
                            <span className="text-xs text-slate-500">by {selected.submittedBy}</span>
                        )}
                    </div>

                    <h1 className="text-3xl font-semibold text-white mb-2">{selected.title}</h1>
                    <p className="text-slate-400 mb-8">{selected.description}</p>

                    {/* Tags */}
                    {selected.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {selected.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-slate-800 text-slate-400 border border-slate-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Content preview */}
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 mb-8 prose prose-invert max-w-none text-sm">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{selected.content}</ReactMarkdown>
                    </div>

                    {/* Actions */}
                    {selected.status === "pending" && (
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleApprove(selected._id)}
                                    className="flex-1 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 py-3 text-sm font-medium hover:bg-green-500/30 transition-colors"
                                >
                                    ✓ Approve
                                </button>
                                <button
                                    onClick={() => handleDelete(selected._id)}
                                    className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 text-sm font-medium hover:bg-red-500/20 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <input
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Rejection reason (optional)"
                                    className={`${inputClass} flex-1`}
                                />
                                <button
                                    onClick={() => handleReject(selected._id)}
                                    className="rounded-xl bg-slate-800 border border-slate-700 text-slate-300 px-6 py-3 text-sm font-medium hover:bg-slate-700 transition-colors"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    )}

                    {selected.status !== "pending" && (
                        <button
                            onClick={() => handleDelete(selected._id)}
                            className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 text-sm font-medium hover:bg-red-500/20 transition-colors"
                        >
                            Delete post
                        </button>
                    )}

                </div>
            </div>
        );
    }

    // ── Main admin panel ──
    return (
        <div className="min-h-screen bg-black text-white px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-sky-500 mb-1">Admin</p>
                        <h1 className="text-3xl font-semibold text-white">Panel</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-xs text-slate-500 hover:text-white uppercase tracking-widest transition"
                    >
                        Logout →
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {["pending", "approved", "rejected"].map((s) => (
                        <div key={s} className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center">
                            <p className="text-2xl font-bold text-white">{posts.filter((p) => p.status === s).length}</p>
                            <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">{s}</p>
                        </div>
                    ))}
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-6">
                    {["pending", "approved", "rejected"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 uppercase tracking-widest
                ${filter === s
                                    ? "bg-sky-500 border-sky-500 text-white"
                                    : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Posts list */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-600">
                        <span className="text-4xl mb-4">∅</span>
                        <p className="text-sm uppercase tracking-widest">No {filter} posts</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((post) => (
                            <div
                                key={post._id}
                                onClick={() => setSelected(post)}
                                className="group rounded-2xl border border-slate-800 bg-slate-950 p-5 hover:border-slate-600 cursor-pointer transition-all duration-200"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-mono text-slate-600 tracking-widest mb-1">{post.question}</p>
                                        <h3 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors truncate">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1 truncate">{post.description}</p>
                                        {post.submittedBy && (
                                            <p className="text-xs text-slate-600 mt-1">by {post.submittedBy}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-widest ${statusColor[post.status]}`}>
                                            {post.status}
                                        </span>
                                        <span className="text-[10px] text-slate-600">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Admin;