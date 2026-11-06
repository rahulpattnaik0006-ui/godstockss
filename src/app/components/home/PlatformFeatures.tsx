"use client";

import LiveMarket3D from "./LiveMarket3D";

export default function PlatformFeatures() {
  const features = [
    { title: "Real-time Signals", desc: "Instant AI alerts for high-probability setups." },
    { title: "Elite Top 5 Picks", desc: "Curated daily momentum and reversal targets." },
    { title: "Live Index Tracking", desc: "Nifty 50, Bank Nifty, Sensex & VIX monitoring." },
    { title: "Forex Terminal", desc: "XAU/USD and major global pairs intelligence." },
    { title: "Reversal & Expected Move", desc: "Algorithmic levels to define exact structural shifts." },
    { title: "AI Market Chatbot", desc: "24x7 automated query resolution for live data." },
  ];

  return (
    <section className="relative min-h-screen py-24 bg-[#07090e] border-t border-slate-800 overflow-hidden">
      {/* 3D Candlestick Background */}
      <LiveMarket3D />

      {/* Dark Gradient Overlays for readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#07090e] via-transparent to-[#07090e] z-0" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#07090e_85%)] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 tracking-tight">
            Institutional-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Analysis</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
            Bridging the technology gap between retail traders and institutions with proprietary algorithms.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 group-hover:border-emerald-500/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Markets Covered Banner */}
        <div className="mt-20 p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-2xl font-bold text-slate-200">Markets Covered</h4>
            <p className="text-slate-400 mt-2 text-sm">24x7 monitoring across 3 major segments.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Nifty 50", "Nifty Next 50", "Forex", "MCX"].map((market) => (
              <span key={market} className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900 text-slate-300 text-sm font-medium">
                {market}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}