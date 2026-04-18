import React from "react";
import { Link } from "react-router-dom";

const skills = ["React", "Node.js", "Express", "MongoDB", "Java", "DSA",];

const values = [
  {
    label: "Intuition First",
    desc: "Every post starts with how I actually thought about the problem — not the clean solution I found after.",
  },
  {
    label: "No Fluff",
    desc: "No padding, no filler. Just the core idea, the insight, and the code.",
  },
  {
    label: "Real Progress",
    desc: "I document problems as I solve them. This is a learning journal, not a tutorial channel.",
  },
];

function About() {
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

      <div className="relative z-10 flex-1 px-4 sm:px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500 mb-4 font-medium">About</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              The person behind<br />
              <span
                style={{ WebkitTextStroke: "1.5px #38bdf8", color: "transparent" }}
              >
                ThinkLikeMusab.
              </span>
            </h1>
            <div className="h-px bg-slate-800 mt-8" />
          </div>

          {/* Bio */}
          <div className="mb-16 space-y-5">
            <p className="text-slate-300 text-base sm:text-lg leading-8">
              Hey — I'm <span className="text-white font-semibold">Musab</span>, a 3rd year Computer Engineering student and MERN stack developer. I built ThinkLikeMusab because most DSA content skips the part that actually matters — <span className="text-white font-semibold">how you think</span> before you code.
            </p>
            <p className="text-slate-400 text-base leading-8">
              Every post here documents my actual thought process — the wrong attempts, the realizations, and finally the clean solution. If you've ever solved a problem by copying an approach without understanding it, this is built for you.
            </p>
            <p className="text-slate-400 text-base leading-8">
              I'm currently grinding DSA alongside building full-stack projects. This blog is where both worlds meet.
            </p>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-5 font-medium">Stack & Tools</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-sm bg-slate-900 text-slate-300 border border-slate-700 hover:border-sky-500/50 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600">What this blog is about</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          {/* Values */}
          <div className="mb-16 space-y-4">
            {values.map((v) => (
              <div key={v.label} className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <p className="text-sm font-semibold text-white mb-2">{v.label}</p>
                <p className="text-sm text-slate-400 leading-7">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-sky-500/20 bg-sky-950/20 p-8 text-center">
            <p className="text-white font-semibold text-lg mb-2">Ready to start thinking differently?</p>
            <p className="text-slate-400 text-sm mb-6">Browse all posts sorted by DSA topic.</p>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-6 py-2.5 text-sm font-semibold hover:bg-sky-100 transition-colors"
            >
              Explore Posts →
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

export default About;