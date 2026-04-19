import { useState, useEffect } from "react";
import { fetchApprovedPosts } from "../utils/api";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const DSA_TOPICS = [
  "All", "Arrays", "Sorting", "Graphs", "Trees",
  "Dynamic Programming", "Greedy", "Linked Lists", "Strings", "Binary Search",
];

const Categories = () => {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchApprovedPosts()
      .then(setPosts)
      .catch(console.error);
  }, []);

  const filtered = posts.filter((p) => {
    const matchesTopic =
      active === "All" || p.tags?.some((t) => t.toLowerCase() === active.toLowerCase());
    const matchesQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    return matchesTopic && matchesQuery;
  });

  return (
    <section className="min-h-screen bg-black text-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-500 mb-3 font-medium">Browse</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white mb-3">Categories</h1>
          <p className="text-slate-400 text-base leading-7">Filter posts by DSA topic.</p>
          <div className="mt-8 h-px bg-slate-800" />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500 transition-colors duration-200"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Topic chips */}
        <div className="flex flex-wrap gap-2 mb-12">
          {DSA_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setActive(topic)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                ${active === topic
                  ? "bg-sky-500 border-sky-500 text-white"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white bg-transparent"
                }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(query || active !== "All") && (
          <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {active !== "All" && ` in ${active}`}
            {query && ` for "${query}"`}
          </p>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 rounded-2xl border border-slate-800 bg-slate-950 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-600">
            <span className="text-4xl mb-4">∅</span>
            <p className="text-sm uppercase tracking-widest">No posts found</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((post) => (
              <Link to={`/post/${post._id}`} key={post._id}>
                <div className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1">
                  <span className="text-xs font-mono text-slate-600 tracking-widest">{post.question}</span>
                  <h3 className="mt-3 text-base font-semibold text-white group-hover:text-sky-300 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-6">{post.description}</p>
                  {post.tags && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-slate-800 text-slate-400 border border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-sky-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read post
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;