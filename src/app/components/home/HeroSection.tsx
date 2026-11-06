"use client";

import Hero3DCanvas from "./Hero3DCanvas";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#090a0c] border-b border-[#1e232d] overflow-hidden px-6">
      <Hero3DCanvas />

      <div className="relative z-10 max-w-4xl mx-auto text-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-[#1e232d] bg-[#12151c] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
          <span className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
            Quantitative Signal Architecture
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          Precision Market Signals &{" "}
          <span className="text-[#c5a059]">Institutional Execution</span>
        </h2>

        <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Real-time algorithmic tracking for Nifty 50, Nifty Next 50, and Global Forex pairs with structured risk-reward levels.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <a
  href="/terminal"
  className="px-7 py-3.5 rounded bg-[#c5a059] hover:bg-[#d4b26f] text-black font-bold text-sm tracking-wide transition-colors inline-block cursor-pointer"
>
  LAUNCH TERMINAL ↗
</a>
        </div>
      </div>
    </section>
  );
}