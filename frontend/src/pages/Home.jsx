import Contribute from "../components/Contribute";
import Footer from "../components/Footer";
import { posts } from "../data/Post";
import { Link } from "react-router-dom";

const recentPosts = posts.slice(-2).reverse();

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">

      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div
        className="pointer-events-none fixed top-[-100px] left-1/2 -translate-x-1/2 z-0"
        style={{
          width: "min(600px, 100vw)",
          height: "300px",
          background: "radial-gradient(ellipse at center, #38bdf820 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">

        {/* ── Hero ── */}
        <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 sm:pt-40 pb-20 sm:pb-32">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs text-slate-400 tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
            <span>DSA · Problem Solving · Intuition</span>
          </div>

          {/* Heading — mobile first */}
          <h1 className="mt-2 text-[2.6rem] leading-tight sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
            Think
            <span
              className="mx-2 sm:mx-3"
              style={{ WebkitTextStroke: "1.5px #38bdf8", color: "transparent" }}
            >
              Like
            </span>
            Musab.
          </h1>

          <p className="mt-6 sm:mt-8 max-w-sm sm:max-w-lg text-sm sm:text-base md:text-lg text-slate-400 leading-7 sm:leading-8 px-2">
            Not just solutions — learn the intuition behind every problem.
            From confusion → clarity → code.
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
            <Link
              to="/categories"
              className="w-full sm:w-auto text-center rounded-lg bg-white text-black px-7 py-3 text-sm font-semibold hover:bg-sky-100 transition-colors"
            >
              Explore Posts
            </Link>
            <Link
              to="/post/wiggle-sort"
              className="w-full sm:w-auto text-center rounded-lg border border-slate-700 px-7 py-3 text-sm text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
            >
              Start Learning →
            </Link>
          </div>

        </section>

        {/* ── Divider ── */}
        <div className="px-4 sm:px-6">
          <div className="mx-auto max-w-3xl flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-slate-600 whitespace-nowrap">
              Recent Posts
            </span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
        </div>

        {/* ── Recent Posts ── */}
        <section className="px-4 sm:px-6 pt-10 sm:pt-12 pb-20 sm:pb-24">
          <div className="mx-auto max-w-3xl">

            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm text-slate-500">Latest from the blog</p>
              <Link
                to="/categories"
                className="text-[10px] sm:text-xs text-sky-500 hover:text-sky-300 uppercase tracking-widest transition"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentPosts.map((post) => (
                <Link to={`/post/${post.id}`} key={post.id}>
                  <div className="group h-full rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-6 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1">
                    <span className="text-[10px] sm:text-xs font-mono text-slate-600 tracking-widest">
                      {post.question}
                    </span>
                    <h3 className="mt-2 sm:mt-3 text-sm sm:text-base font-semibold text-white group-hover:text-sky-300 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-6">
                      {post.description}
                    </p>
                    {post.tags && (
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs bg-slate-800 text-slate-400 border border-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 sm:mt-5 flex items-center gap-1.5 text-[10px] sm:text-xs text-sky-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Read post
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
          
        </section>

          
            <Contribute/>
        <Footer />

        

      </div>
    </div>
  );
}

export default Home;