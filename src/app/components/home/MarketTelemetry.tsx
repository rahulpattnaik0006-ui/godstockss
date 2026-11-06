"use client";

import { useEffect, useState } from "react";

interface AssetCard {
  symbol: string;
  name: string;
  basePrice: number;
  bias: "LONG" | "SHORT" | "ACCUMULATE";
  confidence: number;
  entry: string;
  target: string;
  stopLoss: string;
  volumeStatus: string;
  currency: string;
}

const initialAssets: AssetCard[] = [
  {
    symbol: "NIFTY 50",
    name: "NSE Index Benchmark",
    basePrice: 24215.35,
    bias: "LONG",
    confidence: 89.2,
    entry: "24,190.00",
    target: "24,340.00",
    stopLoss: "24,120.00",
    volumeStatus: "+18.4% Inst. Block Flow",
    currency: "₹",
  },
  {
    symbol: "BANK NIFTY",
    name: "Banking Sector Index",
    basePrice: 51840.6,
    bias: "ACCUMULATE",
    confidence: 84.7,
    entry: "51,750.00",
    target: "52,200.00",
    stopLoss: "51,520.00",
    volumeStatus: "Liquidity Sweep Active",
    currency: "₹",
  },
  {
    symbol: "SENSEX",
    name: "BSE Benchmark 30",
    basePrice: 79820.15,
    bias: "LONG",
    confidence: 81.5,
    entry: "79,700.00",
    target: "80,300.00",
    stopLoss: "79,480.00",
    volumeStatus: "Above 20-EMA",
    currency: "₹",
  },
  {
    symbol: "XAU / USD",
    name: "Spot Gold / US Dollar",
    basePrice: 2684.4,
    bias: "SHORT",
    confidence: 86.8,
    entry: "2,688.50",
    target: "2,662.00",
    stopLoss: "2,701.00",
    volumeStatus: "Order Block Rejection",
    currency: "$",
  },
];

export default function MarketTelemetry() {
  const [assets, setAssets] = useState(initialAssets);
  const [ticks, setTicks] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.49) * (item.basePrice * 0.0006);
          const newPrice = Number((item.basePrice + delta).toFixed(2));
          setTicks((t) => ({ ...t, [item.symbol]: delta >= 0 ? 1 : -1 }));
          return { ...item, basePrice: newPrice };
        })
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="telemetry" className="relative bg-[#090a0c] border-b border-[#1e232d] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1e232d]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#c5a059]/30 bg-[#12151c] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-semibold text-[#c5a059] tracking-widest uppercase">
                Active Quantitative Feed
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Institutional Order-Flow Radar
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-400 text-sm md:text-base max-w-md">
            Algorithmic buy/sell pressure calculated through volume-weighted structural imbalance scanning.
          </p>
        </div>

        {/* 4 Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map((asset) => {
            const isUp = (ticks[asset.symbol] ?? 1) >= 0;
            return (
              <div
                key={asset.symbol}
                className="rounded-lg border border-[#1e232d] bg-[#0e1117] p-6 hover:border-[#c5a059]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Symbol & Bias Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {asset.symbol}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">
                        {asset.name}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-1 rounded border ${
                        asset.bias === "LONG"
                          ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-400"
                          : asset.bias === "SHORT"
                          ? "border-rose-500/40 bg-rose-950/30 text-rose-400"
                          : "border-amber-500/40 bg-amber-950/30 text-amber-400"
                      }`}
                    >
                      {asset.bias}
                    </span>
                  </div>

                  {/* Live Price Readout */}
                  <div className="my-5 pb-5 border-b border-[#1e232d]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-mono text-white">
                        {asset.currency}
                        {asset.basePrice.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          isUp ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {isUp ? "▲" : "▼"}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block mt-1">
                      {asset.volumeStatus}
                    </span>
                  </div>

                  {/* Quantitative Levels */}
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Model Conviction:</span>
                      <span className="text-[#c5a059] font-bold">{asset.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Execution Entry:</span>
                      <span className="text-slate-200">{asset.entry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Terminal Target:</span>
                      <span className="text-emerald-400 font-semibold">{asset.target}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hard Invalidation:</span>
                      <span className="text-rose-400">{asset.stopLoss}</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <button className="mt-6 w-full py-2.5 rounded bg-[#12151c] hover:bg-[#181d26] border border-[#1e232d] hover:border-[#c5a059]/40 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer">
                  Inspect Order Flow ↗
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}