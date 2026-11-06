"use client";

const steps = [
  {
    step: "01",
    title: "Algorithmic Ingestion",
    subtitle: "High-Frequency Telemetry",
    desc: "Ingests raw tick-level order book data across Nifty 50, Bank Nifty, and global Forex pairs (XAU/USD). Scans for volume spikes and institutional liquidity blocks in real time.",
    tag: "Sub-Second Ingestion",
  },
  {
    step: "02",
    title: "Mathematical Validation",
    subtitle: "Structural Imbalance Models",
    desc: "Filters out false breakouts using quantitative mean-reversion algorithms and institutional order-flow imbalances. Confirms entries strictly with predetermined risk-reward ratios.",
    tag: "Risk-Calibrated",
  },
  {
    step: "03",
    title: "Terminal Execution",
    subtitle: "Actionable Intelligence",
    desc: "Delivers precision alerts directly to your trading desk with designated entry prices, multi-target profit zones, and strict stop-loss levels. Zero ambiguity, zero discretionary bias.",
    tag: "Direct Alert Relay",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-[#090a0c] border-b border-[#1e232d] py-28 px-6 overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1e232d]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#c5a059]/30 bg-[#12151c] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span className="text-[11px] font-semibold text-[#c5a059] tracking-widest uppercase">
                Execution Architecture
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              How GodStocks Operates
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-400 text-sm md:text-base max-w-md">
            A systematic, non-discretionary pipeline transforming volatile market telemetry into structured trading execution.
          </p>
        </div>

        {/* 3-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-lg border border-[#1e232d] bg-[#0e1117] p-8 flex flex-col justify-between hover:border-[#c5a059]/50 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-mono font-bold text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded border border-[#1e232d] bg-[#12151c] text-slate-400">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#c5a059] mb-4">
                  {item.subtitle}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1e232d]/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>STATUS: OPERATIONAL</span>
                <span className="text-emerald-500">● 99.98% UPTIME</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}