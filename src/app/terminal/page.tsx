"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Signal {
  id: string;
  time: string;
  asset: string;
  bias: "LONG" | "SHORT";
  entry: string;
  target: string;
  sl: string;
  status: "ACTIVE" | "TARGET HIT" | "MONITORING";
  confidence: number;
}

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: string;
  up: boolean;
  currency: string;
  vol: string;
}

const assets: Asset[] = [
  { symbol: "NIFTY 50", name: "NSE Benchmark", price: 24218.45, change: "+0.64%", up: true, currency: "₹", vol: "₹4,812 Cr" },
  { symbol: "BANK NIFTY", name: "Banking Index", price: 51862.10, change: "+0.82%", up: true, currency: "₹", vol: "₹3,140 Cr" },
  { symbol: "SENSEX", name: "BSE Benchmark", price: 79840.30, change: "+0.51%", up: true, currency: "₹", vol: "₹2,210 Cr" },
  { symbol: "XAU/USD", name: "Spot Gold", price: 2683.85, change: "-0.38%", up: false, currency: "$", vol: "$14.2B" },
  { symbol: "USD/INR", name: "Currency Pair", price: 84.38, change: "+0.04%", up: true, currency: "₹", vol: "₹1,850 Cr" },
];

const initialSignals: Signal[] = [
  { id: "SIG-904", time: "14:38:12", asset: "NIFTY 50", bias: "LONG", entry: "24,195.00", target: "24,310.00", sl: "24,140.00", status: "ACTIVE", confidence: 91.4 },
  { id: "SIG-903", time: "14:21:05", asset: "BANK NIFTY", bias: "LONG", entry: "51,780.00", target: "52,150.00", sl: "51,550.00", status: "TARGET HIT", confidence: 88.2 },
  { id: "SIG-902", time: "13:54:19", asset: "XAU/USD", bias: "SHORT", entry: "2,689.10", target: "2,664.00", sl: "2,702.50", status: "ACTIVE", confidence: 85.7 },
  { id: "SIG-901", time: "13:16:40", asset: "NIFTY 50", bias: "LONG", entry: "24,120.00", target: "24,200.00", sl: "24,080.00", status: "TARGET HIT", confidence: 84.5 },
];

export default function TerminalPage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);
  const [currentPrice, setCurrentPrice] = useState<number>(assets[0].price);
  const [priceFlash, setPriceFlash] = useState<"up" | "down" | null>(null);
  const [timeframe, setTimeframe] = useState<string>("5M");
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<{ role: "sys" | "user" | "ai"; text: string; time: string }[]>([
    { role: "sys", text: "GodStocks Quant Core v4.8 online. High-frequency websocket stream secured via low-latency Mumbai relay.", time: "14:30" },
    { role: "ai", text: "Terminal desk ready. Active scanning across Nifty 50, Bank Nifty, and XAU/USD order blocks. Query any setup or request instant level validation.", time: "14:31" },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Micro-Tick Price Engine
  useEffect(() => {
    setCurrentPrice(selectedAsset.price);
    if (!isLive) return;

    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const variance = (Math.random() - 0.49) * (selectedAsset.price * 0.0004);
        const nextPrice = Number((prev + variance).toFixed(2));
        setPriceFlash(variance >= 0 ? "up" : "down");
        setTimeout(() => setPriceFlash(null), 400);
        return nextPrice;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [selectedAsset, isLive]);

  // Procedural Canvas Candlestick Chart Engine
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

      // Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 45) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Candlesticks
      const candleWidth = 14;
      const spacing = 24;
      const totalCandles = Math.floor(w / spacing);
      let seed = 42;

      for (let i = 0; i < totalCandles; i++) {
        const x = i * spacing + 12;
        seed = (seed * 9301 + 49297) % 233280;
        const rand = seed / 233280;
        const trend = Math.sin((i + offset) * 0.14) * (h * 0.22);
        const midY = h * 0.5 + trend + (rand - 0.5) * 40;
        const bodyHeight = Math.max(8, rand * 32);
        const isBull = i % 2 === 0;

        const bodyColor = isBull ? "#10b981" : "#ef4444";
        const wickColor = isBull ? "#059669" : "#dc2626";

        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, midY - bodyHeight / 2 - 14);
        ctx.lineTo(x + candleWidth / 2, midY + bodyHeight / 2 + 14);
        ctx.stroke();

        ctx.fillStyle = bodyColor;
        ctx.fillRect(x, midY - bodyHeight / 2, candleWidth, bodyHeight);
      }

      // Live Golden Crosshair Level
      const currentLevelY = h * 0.48;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(197, 160, 89, 0.65)";
      ctx.beginPath();
      ctx.moveTo(0, currentLevelY);
      ctx.lineTo(w, currentLevelY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Level Price Tag
      ctx.fillStyle = "#c5a059";
      ctx.fillRect(w - 95, currentLevelY - 10, 90, 20);
      ctx.fillStyle = "#000000";
      ctx.font = "bold 11px monospace";
      ctx.fillText(`${selectedAsset.currency}${currentPrice.toFixed(2)}`, w - 88, currentLevelY + 4);

      offset += 0.015;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [timeframe, currentPrice, selectedAsset]);

  // Scroll AI chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

    setChatMessages((prev) => [...prev, { role: "user", text: userText, time: now }]);
    setInputQuery("");

    setTimeout(() => {
      let reply = `[QUANT RADAR] ${selectedAsset.symbol} structural scan complete. High-probability institutional bid support detected around ${selectedAsset.currency}${(currentPrice * 0.997).toFixed(2)}. Invalidation level placed at ${selectedAsset.currency}${(currentPrice * 0.993).toFixed(2)}. Target zone aligns with 1:3.4 risk/reward expansion.`;

      if (userText.toLowerCase().includes("gold") || userText.toLowerCase().includes("xau")) {
        reply = `[XAU/USD RADAR] Gold spot rejected the $2,688.50 liquidity sweep. Bearish imbalance active on the 15-minute frame targeting $2,662.00.`;
      } else if (userText.toLowerCase().includes("bank")) {
        reply = `[BANK NIFTY] Private bank heavyweight index displaying heavy absorption at 51,750 VWAP. Bullish continuation favored into the closing session.`;
      }

      setChatMessages((prev) => [...prev, { role: "ai", text: reply, time: now }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-slate-200 flex flex-col font-sans selection:bg-[#c5a059] selection:text-black">
      {/* Top Fixed Terminal Header */}
      <header className="h-14 border-b border-[#1e232d] bg-[#090a0c] px-4 md:px-6 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />
            <span className="text-white font-bold tracking-tight text-sm">
              GOD<span className="text-[#c5a059]">STOCKSS</span>
            </span>
            <span className="text-[10px] text-slate-500 hidden sm:inline ml-1 font-mono">
              QUANT TERMINAL 01
            </span>
          </Link>

          <div className="h-4 w-[1px] bg-[#1e232d] hidden sm:block" />

          <button
            onClick={() => setIsLive(!isLive)}
            className={`hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded border text-[10px] cursor-pointer transition-colors ${
              isLive
                ? "bg-[#12151c] border-emerald-500/30 text-emerald-400"
                : "bg-[#12151c] border-amber-500/30 text-amber-400"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`} />
            <span>{isLive ? "LIVE TICK ENGINE (14ms)" : "FEED PAUSED"}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-[#12151c] border border-[#1e232d] text-slate-400 text-xs">
            <span>WALLET:</span>
            <span className="text-[#c5a059] font-bold font-mono">₹15.00</span>
          </div>

          <Link
            href="/"
            className="px-3.5 py-1.5 rounded border border-[#1e232d] bg-[#12151c] hover:bg-[#1a1f29] text-slate-300 text-xs font-mono transition-colors"
          >
            ← EXIT TO OVERVIEW
          </Link>
        </div>
      </header>

      {/* Asset Ticker Strip */}
      <div className="h-12 border-b border-[#1e232d] bg-[#0c0e14] px-4 md:px-6 flex items-center gap-2 overflow-x-auto text-xs font-mono scrollbar-none">
        {assets.map((asset) => {
          const isSelected = selectedAsset.symbol === asset.symbol;
          const displayPrice = isSelected ? currentPrice : asset.price;

          return (
            <button
              key={asset.symbol}
              onClick={() => setSelectedAsset(asset)}
              className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded border transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-[#161a22] border-[#c5a059]/60 text-white shadow-sm"
                  : "bg-[#090a0c] border-[#1e232d] text-slate-400 hover:border-slate-700"
              }`}
            >
              <span className="font-bold">{asset.symbol}</span>
              <span className="text-slate-200">
                {asset.currency}
                {displayPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
              <span className={asset.up ? "text-emerald-400 text-[11px]" : "text-rose-400 text-[11px]"}>
                {asset.change}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Trading Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
        {/* Left Column: Interactive Candlestick Chart & Signal Stream (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col border-b lg:border-b-0 lg:border-r border-[#1e232d]">
          {/* Chart Header Bar */}
          <div className="h-12 border-b border-[#1e232d] bg-[#090a0c] px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white text-sm">{selectedAsset.symbol}</span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded transition-colors ${
                  priceFlash === "up"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : priceFlash === "down"
                    ? "bg-rose-500/20 text-rose-400"
                    : "text-[#c5a059]"
                }`}
              >
                {selectedAsset.currency}
                {currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
              <span className="hidden sm:inline text-[10px] font-mono text-slate-500">
                VOL: {selectedAsset.vol}
              </span>
            </div>

            {/* Timeframe Toggles */}
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {["1M", "5M", "15M", "1H", "1D"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    timeframe === tf
                      ? "bg-[#c5a059] text-black font-bold"
                      : "text-slate-400 hover:text-white hover:bg-[#12151c]"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Candlestick Display */}
          <div className="relative flex-1 bg-[#050607] min-h-[380px] flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} width={960} height={420} className="w-full h-full object-cover" />
            
            {/* Top Overlay Stats */}
            <div className="absolute top-3 left-4 pointer-events-none text-[10px] font-mono text-slate-500 flex gap-4">
              <span>OPEN: {(currentPrice * 0.998).toFixed(2)}</span>
              <span>HIGH: {(currentPrice * 1.004).toFixed(2)}</span>
              <span>LOW: {(currentPrice * 0.995).toFixed(2)}</span>
              <span className="text-[#c5a059]">VWAP: {(currentPrice * 0.999).toFixed(2)}</span>
            </div>
          </div>

          {/* Live Algorithmic Execution Signal Table */}
          <div className="border-t border-[#1e232d] bg-[#090a0c] p-4">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-[#c5a059] font-bold uppercase tracking-wider">
                Algorithmic Execution Stream
              </span>
              <span className="text-slate-500 text-[10px]">REAL-TIME REVENUE PROTOCOL</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-slate-500 border-b border-[#1e232d] pb-1">
                    <th className="py-1">TIME</th>
                    <th>ASSET</th>
                    <th>BIAS</th>
                    <th>ENTRY</th>
                    <th>TARGET</th>
                    <th>STOP LOSS</th>
                    <th>CONVICTION</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#141822]">
                  {signals.map((sig) => (
                    <tr key={sig.id} className="hover:bg-[#12151c] text-slate-300">
                      <td className="py-2 text-slate-500">{sig.time}</td>
                      <td className="font-bold text-white">{sig.asset}</td>
                      <td>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sig.bias === "LONG"
                              ? "bg-emerald-950/60 text-emerald-400"
                              : "bg-rose-950/60 text-rose-400"
                          }`}
                        >
                          {sig.bias}
                        </span>
                      </td>
                      <td>₹{sig.entry}</td>
                      <td className="text-emerald-400">₹{sig.target}</td>
                      <td className="text-rose-400">₹{sig.sl}</td>
                      <td className="text-[#c5a059]">{sig.confidence}%</td>
                      <td>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#161a22] border border-[#232936] text-slate-300">
                          {sig.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Institutional Depth Ladder & AI Quant Desk (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col bg-[#07080a]">
          {/* Depth Ladder */}
          <div className="border-b border-[#1e232d] p-4 bg-[#090a0c]">
            <div className="flex justify-between text-xs font-mono mb-3">
              <span className="text-slate-300 font-semibold tracking-wider uppercase">
                Institutional Depth
              </span>
              <span className="text-emerald-400 text-[10px]">SPREAD: 0.05</span>
            </div>

            <div className="grid grid-cols-3 text-[10px] font-mono text-slate-500 pb-1 border-b border-[#141822]">
              <span>PRICE</span>
              <span className="text-right">SIZE</span>
              <span className="text-right">TOTAL</span>
            </div>

            {/* Asks (Sell Pressure) */}
            <div className="space-y-1 py-2 text-[11px] font-mono">
              {[
                { p: currentPrice + 4.5, s: 240, t: "₹5.8L", pct: 60 },
                { p: currentPrice + 2.0, s: 180, t: "₹4.3L", pct: 45 },
                { p: currentPrice + 0.5, s: 95, t: "₹2.3L", pct: 25 },
              ].map((row, i) => (
                <div key={i} className="relative grid grid-cols-3 text-rose-400 hover:bg-rose-950/20 px-1 py-0.5 rounded">
                  <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10 -z-0" style={{ width: `${row.pct}%` }} />
                  <span className="relative z-10">{row.p.toFixed(2)}</span>
                  <span className="relative z-10 text-right text-slate-400">{row.s}</span>
                  <span className="relative z-10 text-right text-slate-400">{row.t}</span>
                </div>
              ))}
            </div>

            {/* Mid Price Divider */}
            <div className="py-1 px-2 my-1 bg-[#12151c] border border-[#1e232d] rounded flex justify-between font-mono text-xs text-white">
              <span className="text-slate-400">LAST TRADED:</span>
              <span className="text-[#c5a059] font-bold">
                {selectedAsset.currency}{currentPrice.toFixed(2)}
              </span>
            </div>

            {/* Bids (Buy Support) */}
            <div className="space-y-1 py-2 text-[11px] font-mono">
              {[
                { p: currentPrice - 0.5, s: 120, t: "₹2.9L", pct: 30 },
                { p: currentPrice - 2.5, s: 310, t: "₹7.5L", pct: 75 },
                { p: currentPrice - 5.0, s: 450, t: "₹10.8L", pct: 90 },
              ].map((row, i) => (
                <div key={i} className="relative grid grid-cols-3 text-emerald-400 hover:bg-emerald-950/20 px-1 py-0.5 rounded">
                  <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 -z-0" style={{ width: `${row.pct}%` }} />
                  <span className="relative z-10">{row.p.toFixed(2)}</span>
                  <span className="relative z-10 text-right text-slate-400">{row.s}</span>
                  <span className="relative z-10 text-right text-slate-400">{row.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Quant Query Desk */}
          <div className="flex-1 flex flex-col p-4 min-h-[320px] bg-[#07080a]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Quant Intelligence Desk
              </h3>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs font-mono max-h-[280px]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded border leading-relaxed ${
                    msg.role === "sys"
                      ? "bg-[#090a0c] border-[#1e232d] text-slate-500 text-[10px]"
                      : msg.role === "user"
                      ? "bg-[#12151c] border-[#222834] text-slate-200"
                      : "bg-[#0d1017] border-[#c5a059]/30 text-[#e5caa0]"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1">
                    <span>{msg.role === "user" ? "CLIENT TRADER" : msg.role === "ai" ? "QUANT ENGINE" : "SYSTEM"}</span>
                    <span>{msg.time}</span>
                  </div>
                  {msg.text}
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompt Filter Buttons */}
            <div className="flex gap-2 my-3 overflow-x-auto text-[10px] font-mono scrollbar-none">
              <button
                type="button"
                onClick={() => setInputQuery("Scan Nifty 50 Liquidity Pool")}
                className="px-2 py-1 rounded border border-[#1e232d] bg-[#0c0e14] text-slate-400 hover:text-white whitespace-nowrap cursor-pointer"
              >
                Nifty Pools
              </button>
              <button
                type="button"
                onClick={() => setInputQuery("Validate Bank Nifty VWAP absorption")}
                className="px-2 py-1 rounded border border-[#1e232d] bg-[#0c0e14] text-slate-400 hover:text-white whitespace-nowrap cursor-pointer"
              >
                Bank Nifty VWAP
              </button>
              <button
                type="button"
                onClick={() => setInputQuery("Validate XAU/USD Gold Reversal")}
                className="px-2 py-1 rounded border border-[#1e232d] bg-[#0c0e14] text-slate-400 hover:text-white whitespace-nowrap cursor-pointer"
              >
                Gold Setup
              </button>
            </div>

            {/* Query Form Input */}
            <form onSubmit={handleSendQuery} className="flex gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask Quant Desk..."
                className="flex-1 bg-[#090a0c] border border-[#1e232d] text-xs font-mono px-3 py-2 rounded text-slate-200 outline-none focus:border-[#c5a059]"
              />
              <button
                type="submit"
                className="px-4 bg-[#c5a059] hover:bg-[#d4b26f] text-black font-bold text-xs font-mono rounded transition-colors cursor-pointer"
              >
                EXEC
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}