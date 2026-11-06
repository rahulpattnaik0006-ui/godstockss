"use client";

import { useEffect, useState, useRef } from "react";

interface Signal {
  id: string;
  time: string;
  asset: string;
  bias: "LONG" | "SHORT";
  entry: string;
  target: string;
  sl: string;
  status: "ACTIVE" | "TARGET HIT";
  confidence: number;
}

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: string;
  up: boolean;
  currency: string;
}

const assets: Asset[] = [
  { symbol: "NIFTY 50", name: "NSE Benchmark", price: 24218.45, change: "+0.64%", up: true, currency: "₹" },
  { symbol: "BANK NIFTY", name: "Banking Index", price: 51862.10, change: "+0.82%", up: true, currency: "₹" },
  { symbol: "SENSEX", name: "BSE Benchmark", price: 79840.30, change: "+0.51%", up: true, currency: "₹" },
  { symbol: "XAU/USD", name: "Spot Gold", price: 2683.85, change: "-0.38%", up: false, currency: "$" },
];

const signals: Signal[] = [
  { id: "SIG-904", time: "14:38", asset: "NIFTY 50", bias: "LONG", entry: "24,195.00", target: "24,310.00", sl: "24,140.00", status: "ACTIVE", confidence: 91.4 },
  { id: "SIG-903", time: "14:21", asset: "BANK NIFTY", bias: "LONG", entry: "51,780.00", target: "52,150.00", sl: "51,550.00", status: "TARGET HIT", confidence: 88.2 },
  { id: "SIG-902", time: "13:54", asset: "XAU/USD", bias: "SHORT", entry: "2,689.10", target: "2,664.00", sl: "2,702.50", status: "ACTIVE", confidence: 85.7 },
];

export default function TradingTerminal() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);
  const [currentPrice, setCurrentPrice] = useState<number>(assets[0].price);
  const [timeframe, setTimeframe] = useState<string>("5M");
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<{ role: "sys" | "user" | "ai"; text: string }[]>([
    { role: "sys", text: "GodStocks Quant Core active. Connected to NSE/Forex high-frequency feeds." },
    { role: "ai", text: "Quant Desk ready. Query any institutional setup, key pivot level, or imbalance zone." },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Micro-tick price engine
  useEffect(() => {
    setCurrentPrice(selectedAsset.price);
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const delta = (Math.random() - 0.49) * (selectedAsset.price * 0.0004);
        return Number((prev + delta).toFixed(2));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [selectedAsset]);

  // Canvas Candlestick chart simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      for (let x = 0; x < w; x += 55) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Candlesticks
      const spacing = 22;
      const total = Math.floor(w / spacing);
      let seed = 38;

      for (let i = 0; i < total; i++) {
        const x = i * spacing + 10;
        seed = (seed * 9301 + 49297) % 233280;
        const rand = seed / 233280;
        const midY = h * 0.5 + Math.sin((i + offset) * 0.15) * (h * 0.22) + (rand - 0.5) * 35;
        const bodyH = Math.max(8, rand * 30);
        const isBull = i % 2 === 0;

        ctx.strokeStyle = isBull ? "#10b981" : "#ef4444";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 6, midY - bodyH / 2 - 12);
        ctx.lineTo(x + 6, midY + bodyH / 2 + 12);
        ctx.stroke();

        ctx.fillStyle = isBull ? "#10b981" : "#ef4444";
        ctx.fillRect(x, midY - bodyH / 2, 12, bodyH);
      }

      // Golden Target Level
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(197, 160, 89, 0.7)";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.48);
      ctx.lineTo(w, h * 0.48);
      ctx.stroke();
      ctx.setLineDash([]);

      offset += 0.015;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [timeframe]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    const q = inputQuery;
    setMessages((p) => [
      ...p,
      { role: "user", text: q },
      { role: "ai", text: `[QUANT DESK] ${selectedAsset.symbol} order flow indicates strong institutional bid absorption near ${selectedAsset.currency}${currentPrice.toFixed(2)}. Asymmetric target aligned with 1:3.2 R/R.` },
    ]);
    setInputQuery("");
  };

  return (
    <section id="terminal" className="relative bg-[#07080a] border-b border-[#1e232d] py-20 px-4 md:px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Terminal Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 mb-6 border-b border-[#1e232d] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#c5a059]/30 bg-[#12151c] mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider">
                LIVE QUANTITATIVE TERMINAL
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Institutional Execution Desk
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {assets.map((a) => (
              <button
                key={a.symbol}
                onClick={() => setSelectedAsset(a)}
                className={`px-3 py-1.5 rounded border text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedAsset.symbol === a.symbol
                    ? "bg-[#c5a059] text-black border-[#c5a059]"
                    : "bg-[#0f1218] border-[#1e232d] text-slate-400 hover:text-white"
                }`}
              >
                {a.symbol}: {a.currency}{a.symbol === selectedAsset.symbol ? currentPrice.toFixed(2) : a.price.toFixed(2)}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Grid */}
        <div className="rounded-lg border border-[#1e232d] bg-[#090a0c] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Chart Section (8 cols) */}
          <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[#1e232d] flex flex-col">
            <div className="h-11 border-b border-[#1e232d] bg-[#0c0e14] px-4 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white">{selectedAsset.symbol}</span>
                <span className="text-[#c5a059] font-bold">
                  {selectedAsset.currency}{currentPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-1">
                {["1M", "5M", "15M", "1H"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                      timeframe === tf ? "bg-[#c5a059] text-black font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-[340px] bg-[#050607]">
              <canvas ref={canvasRef} width={800} height={340} className="w-full h-full object-cover" />
            </div>

            {/* Signal Stream */}
            <div className="p-4 border-t border-[#1e232d] bg-[#0c0e14]">
              <span className="text-[11px] font-mono text-[#c5a059] font-bold uppercase block mb-2">
                Active Algorithmic Signals
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-slate-500 border-b border-[#1e232d]">
                      <th className="pb-1">ASSET</th>
                      <th className="pb-1">BIAS</th>
                      <th className="pb-1">ENTRY</th>
                      <th className="pb-1">TARGET</th>
                      <th className="pb-1">STOP</th>
                      <th className="pb-1">CONVICTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#141822]">
                    {signals.map((s) => (
                      <tr key={s.id} className="text-slate-300 hover:bg-[#12151c]">
                        <td className="py-2 text-white font-bold">{s.asset}</td>
                        <td>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            s.bias === "LONG" ? "bg-emerald-950/60 text-emerald-400" : "bg-rose-950/60 text-rose-400"
                          }`}>
                            {s.bias}
                          </span>
                        </td>
                        <td>₹{s.entry}</td>
                        <td className="text-emerald-400">₹{s.target}</td>
                        <td className="text-rose-400">₹{s.sl}</td>
                        <td className="text-[#c5a059] font-bold">{s.confidence}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* AI Quant Desk (4 cols) */}
          <div className="lg:col-span-4 p-4 flex flex-col justify-between bg-[#08090d]">
            <div>
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#1e232d]">
                <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Quant Intelligence Desk
                </h3>
              </div>
              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1 text-xs font-mono">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded border ${
                      m.role === "user"
                        ? "bg-[#141822] border-[#222938] text-slate-200"
                        : m.role === "ai"
                        ? "bg-[#10131a] border-[#c5a059]/30 text-[#e4caa0]"
                        : "bg-[#090a0c] border-[#1e232d] text-slate-500 text-[10px]"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSend} className="mt-4 flex gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Query Nifty / Gold levels..."
                className="flex-1 bg-[#0c0e14] border border-[#1e232d] text-xs font-mono px-3 py-2 rounded text-slate-200 outline-none focus:border-[#c5a059]"
              />
              <button
                type="submit"
                className="px-4 bg-[#c5a059] hover:bg-[#d4b26f] text-black font-bold text-xs font-mono rounded cursor-pointer transition-colors"
              >
                EXEC
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}