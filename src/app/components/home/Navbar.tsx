"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090a0c]/85 backdrop-blur-md border-b border-[#1e232d]">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand & Telemetry Badge */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full border border-[#c5a059]/40 bg-[#050607] p-0.5 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="GodStocks"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.jfif.jfif";
                }}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <span className="font-bold tracking-tight text-white text-lg">
              GOD<span className="text-[#c5a059]">STOCKSS</span>
            </span>
          </a>

          <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#12151c] border border-[#1e232d] text-[10px] font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>TICK ENGINE ONLINE</span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-slate-300 uppercase">
          <a href="#telemetry" className="hover:text-[#c5a059] transition-colors">
            Live Telemetry
          </a>
          <a href="#modules" className="hover:text-[#c5a059] transition-colors">
            Modules
          </a>
          <a href="#pipeline" className="hover:text-[#c5a059] transition-colors">
            Pipeline
          </a>
          <a href="#desk" className="hover:text-[#c5a059] transition-colors">
            Refer & Earn
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/terminal"
            className="px-5 py-2 rounded bg-[#c5a059] hover:bg-[#d4b26f] text-black text-xs font-bold tracking-wider uppercase transition-colors inline-block cursor-pointer"
          >
            Launch Terminal ↗
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-400 hover:text-white p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[#1e232d] bg-[#0c0e14] px-6 py-6 flex flex-col gap-4 text-sm font-semibold text-slate-300">
          <a
            href="#telemetry"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#c5a059] transition-colors"
          >
            Live Telemetry
          </a>
          <a
            href="#modules"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#c5a059] transition-colors"
          >
            Modules
          </a>
          <a
            href="#pipeline"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#c5a059] transition-colors"
          >
            Pipeline
          </a>
          <a
            href="#desk"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#c5a059] transition-colors"
          >
            Refer & Earn
          </a>
          <div className="pt-4 border-t border-[#1e232d] flex flex-col gap-2">
            <a
              href="/terminal"
              onClick={() => setMobileOpen(false)}
              className="w-full py-2.5 rounded bg-[#c5a059] hover:bg-[#d4b26f] text-black font-bold uppercase text-xs text-center block transition-colors cursor-pointer"
            >
              Launch Terminal ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}