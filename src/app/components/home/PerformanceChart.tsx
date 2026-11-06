"use client";

import { useState } from "react";

const metrics = [
  {
    id: 0,
    type: "bull",
    title: "Algorithmic Win Rate",
    value: "78.4%",
    desc: "Verified strike rate across Nifty 50 and Bank Nifty structural setups.",
    bodyHeight: "h-64",
    yOffset: "translate-y-12",
    wickTop: "h-16 -top-16",
    wickBottom: "h-24 -bottom-24",
  },
  {
    id: 1,
    type: "bear",
    title: "Maximum Drawdown",
    value: "-4.2%",
    desc: "Strict institutional stop-losses ensure absolute capital preservation.",
    bodyHeight: "h-32",
    yOffset: "translate-y-40",
    wickTop: "h-12 -top-12",
    wickBottom: "h-32 -bottom-32",
  },
  {
    id: 2,
    type: "bull",
    title: "Risk to Reward",
    value: "1 : 3.5",
    desc: "Asymmetric upside capturing. One winning trade covers three losses.",
    bodyHeight: "h-80",
    yOffset: "-translate-y-4",
    wickTop: "h-20 -top-20",
    wickBottom: "h-12 -bottom-12",
  },
  {
    id: 3,
    type: "gold",
    title: "Execution Latency",
    value: "14 ms",
    desc: "Zero-lag institutional telemetry delivered directly to your terminal.",
    bodyHeight: "h-56",
    yOffset: "translate-y-16",
    wickTop: "h-24 -top-24",
    wickBottom: "h-16 -bottom-16",
  },
];

export default function PerformanceChart() {
  const [activeCandle, setActiveCandle] = useState<number | null>(null);

  return (
    <section className="relative bg-[#090a0c] border-b border-[#1e232d] py-32 px-6 overflow-hidden">
      {/* Chart Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #1e232d 1px, transparent 1px), linear-gradient(to bottom, #1e232d 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The Quantitative <span className="text-[#c5a059]">Edge</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Interact with the market structure below to unpack our algorithmic performance metrics and risk architecture.
          </p>
        </div>

        {/* Interactive Candlestick Chart Area */}
        <div className="relative h-[500px] flex items-center justify-center gap-4 md:gap-8 border-b-2 border-dashed border-[#1e232d]">
          {metrics.map((candle) => {
            const isHovered = activeCandle === candle.id;
            const isBull = candle.type === "bull";
            const isBear = candle.type === "bear";
            
            // Theme colors based on candle type
            const bodyColor = isBull 
              ? "bg-emerald-950/80 border-emerald-500" 
              : isBear 
              ? "bg-rose-950/80 border-rose-500" 
              : "bg-[#1a150b] border-[#c5a059]";
              
            const wickColor = isBull ? "bg-emerald-500" : isBear ? "bg-rose-500" : "bg-[#c5a059]";
            const textColor = isBull ? "text-emerald-400" : isBear ? "text-rose-400" : "text-[#c5a059]";

            return (
              <div 
                key={candle.id}
                onMouseEnter={() => setActiveCandle(candle.id)}
                onMouseLeave={() => setActiveCandle(null)}
                className={`relative flex flex-col items-center cursor-pointer transition-transform duration-500 ${candle.yOffset} ${isHovered ? 'z-20 scale-105' : 'z-10'}`}
              >
                {/* Top Wick */}
                <div className={`absolute w-1 rounded-t-full transition-all duration-300 ${candle.wickTop} ${wickColor} ${isHovered ? 'shadow-[0_0_15px_currentColor]' : 'opacity-50'}`} />
                
                {/* Candlestick Body (Expands on Hover) */}
                <div 
                  className={`relative flex items-center overflow-hidden border-2 rounded-sm backdrop-blur-md transition-all duration-500 ease-out ${candle.bodyHeight} ${bodyColor} ${isHovered ? 'w-64 md:w-80 shadow-2xl shadow-black/50' : 'w-12 md:w-16'}`}
                >
                  {/* Content Inside Candlestick */}
                  <div 
                    className={`absolute left-0 w-full px-6 transition-opacity duration-300 delay-100 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-4xl font-bold tracking-tighter ${textColor}`}>
                        {candle.value}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-lg tracking-tight mb-1 whitespace-nowrap">
                      {candle.title}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed border-t border-white/10 pt-2 mt-2">
                      {candle.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Wick */}
                <div className={`absolute w-1 rounded-b-full transition-all duration-300 ${candle.wickBottom} ${wickColor} ${isHovered ? 'shadow-[0_0_15px_currentColor]' : 'opacity-50'}`} />
              </div>
            );
          })}

          {/* Institutional Baseline Indicator */}
          <div className="absolute w-full h-[1px] bg-[#c5a059]/30 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="absolute -top-4 right-0 text-[9px] font-mono text-[#c5a059] tracking-widest">
              BASE LIQUIDITY LEVEL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}