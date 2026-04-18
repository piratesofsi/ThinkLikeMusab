import React from 'react'

const Footer = () => {
  return (
    <div>
        {/* ── Footer ── */}
        <footer className="border-t border-slate-800 px-6 py-8 mt-auto">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-semibold text-white tracking-tight">ThinkLikeMusab</span>
           
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} ThinkLikeMusab</p>
          </div>
        </footer>
    </div>
  )
}

export default Footer
