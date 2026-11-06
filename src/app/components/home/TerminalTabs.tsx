"use client";

import { useState } from "react";

export default function TerminalTabs() {
  const [activeTab, setActiveTab] = useState("YIELD");

  return (
    <section className="relative bg-[#050607] border-b border-[#1e232d] py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1e232d]">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="w-2 h-2 bg-[#c5a059] rounded-sm animate-pulse" />
            CLIENT TERMINAL
          </h2>
          <div className="flex gap-2 text-[10px] font-mono text-slate-400">
            <span className="px-2 py-1 bg-[#12151c] border border-[#1e232d] rounded">LATENCY: 14ms</span>
            <span className="px-2 py-1 bg-[#12151c] border border-[#1e232d] rounded text-emerald-400">SERVER: SECURE</span>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded border border-[#1e232d] bg-[#090a0c] shadow-2xl flex flex-col md:flex-row min-h-[500px]">
          
          {/* Left Sidebar Tabs */}
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-[#1e232d] bg-[#0d0f14] p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("YIELD")}
              className={`text-left px-4 py-3 rounded text-xs font-bold tracking-widest uppercase transition-all flex-shrink-0 ${
                activeTab === "YIELD"
                  ? "bg-[#c5a059] text-black shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                  : "text-slate-400 hover:bg-[#12151c] hover:text-white"
              }`}
            >
              Partner Yield
            </button>
            <button
              onClick={() => setActiveTab("TIERS")}
              className={`text-left px-4 py-3 rounded text-xs font-bold tracking-widest uppercase transition-all flex-shrink-0 ${
                activeTab === "TIERS"
                  ? "bg-[#c5a059] text-black shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                  : "text-slate-400 hover:bg-[#12151c] hover:text-white"
              }`}
            >
              Access Levels
            </button>
            <button
              onClick={() => setActiveTab("LEDGER")}
              className={`text-left px-4 py-3 rounded text-xs font-bold tracking-widest uppercase transition-all flex-shrink-0 ${
                activeTab === "LEDGER"
                  ? "bg-[#c5a059] text-black shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                  : "text-slate-400 hover:bg-[#12151c] hover:text-white"
              }`}
            >
              Verified Ledger
            </button>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-6 md:p-10 relative overflow-hidden">
            
            {/* Background Chart Grid */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage: `linear-gradient(to right, #c5a059 1px, transparent 1px), linear-gradient(to bottom, #c5a059 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* 1. REFER & EARN (Partner Yield) */}
            {activeTab === "YIELD" && (
              <div className="relative z-10 animate-fade-in">
                <div className="inline-block px-3 py-1 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono tracking-widest mb-6 rounded">
                  UPI AUTO-ROUTE ACTIVE
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Referral Dividend Program</h3>
                <p className="text-slate-400 mb-8 text-sm max-w-lg">
                  Generate algorithmic yield. Share your unique terminal access link and earn instant cash dividends settled directly to your UPI ID for every verified onboarding.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border border-[#1e232d] bg-[#12151c] rounded flex flex-col justify-center items-center text-center">
                    <span className="text-slate-500 text-xs font-mono mb-2">CURRENT DIVIDEND RATE</span>
                    <span className="text-5xl font-bold text-[#c5a059]">₹15.00</span>
                    <span className="text-slate-400 text-xs mt-2">PER VERIFIED CLIENT</span>
                  </div>
                  <div className="p-6 border border-[#1e232d] bg-[#12151c] rounded flex flex-col justify-center">
                    <label className="text-xs font-mono text-slate-500 mb-2">YOUR ACCESS NODE LINK</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value="godstocks.in/node/ref=GDS882" 
                        className="flex-1 bg-[#090a0c] border border-[#1e232d] text-slate-300 text-xs p-3 rounded outline-none"
                      />
                      <button className="px-4 bg-[#c5a059] text-black font-bold text-xs rounded hover:bg-[#d4b26f] transition-colors">
                        COPY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PRICING TIERS (Access Levels) */}
            {activeTab === "TIERS" && (
              <div className="relative z-10 animate-fade-in">
                <h3 className="text-3xl font-bold text-white mb-2">Data Feed & Execution Tiers</h3>
                <p className="text-slate-400 mb-8 text-sm">Select your quantitative data tier. Upgrades are processed instantly via smart routing.</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Basic Tier */}
                  <div className="border border-[#1e232d] bg-[#12151c] rounded p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-white">L1 Retail Feed</h4>
                        <p className="text-[10px] font-mono text-slate-500">DELAYED TELEMETRY</p>
                      </div>
                      <span className="text-xl font-bold text-white">₹0<span className="text-sm text-slate-500 font-normal">/mo</span></span>
                    </div>
                    <ul className="text-sm text-slate-400 space-y-3 mb-8">
                      <li className="flex gap-2 items-center"><span className="text-[#c5a059]">✓</span> End of day market recap</li>
                      <li className="flex gap-2 items-center"><span className="text-[#c5a059]">✓</span> 15-min delayed Nifty signals</li>
                      <li className="flex gap-2 items-center text-slate-600"><span className="text-slate-600">✕</span> Live Telegram Alerts</li>
                    </ul>
                    <button className="w-full py-2.5 border border-[#1e232d] text-slate-300 text-xs font-bold rounded hover:bg-[#1e232d] transition-colors">
                      CURRENT NODE
                    </button>
                  </div>

                  {/* Pro Tier */}
                  <div className="border border-[#c5a059]/50 bg-[#12151c] rounded p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#c5a059] text-black text-[9px] font-bold px-3 py-1 rounded-bl-lg">
                      INSTITUTIONAL EDGE
                    </div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-[#c5a059]">L2 Quant Feed</h4>
                        <p className="text-[10px] font-mono text-[#c5a059]/60">ZERO LATENCY EXECUTION</p>
                      </div>
                      <span className="text-xl font-bold text-white">₹1,499<span className="text-sm text-slate-500 font-normal">/mo</span></span>
                    </div>
                    <ul className="text-sm text-slate-300 space-y-3 mb-8">
                      <li className="flex gap-2 items-center"><span className="text-[#c5a059]">✓</span> Real-time Nifty & Bank Nifty signals</li>
                      <li className="flex gap-2 items-center"><span className="text-[#c5a059]">✓</span> Exact Entry, Stop-Loss & Targets</li>
                      <li className="flex gap-2 items-center"><span className="text-[#c5a059]">✓</span> Priority WhatsApp / Telegram routing</li>
                    </ul>
                    <button className="w-full py-2.5 bg-[#c5a059] text-black text-xs font-bold rounded hover:bg-[#d4b26f] shadow-[0_0_15px_rgba(197,160,89,0.2)] transition-colors">
                      UPGRADE ACCESS VIA UPI
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. TESTIMONIALS (Verified Ledger) */}
            {activeTab === "LEDGER" && (
              <div className="relative z-10 animate-fade-in h-full flex flex-col">
                <h3 className="text-3xl font-bold text-white mb-2">Verified Execution Logs</h3>
                <p className="text-slate-400 mb-6 text-sm">Real market feedback logged directly from our terminal users.</p>
                
                <div className="flex-1 border border-[#1e232d] bg-[#090a0c] rounded overflow-hidden flex flex-col">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-3 border-b border-[#1e232d] bg-[#12151c] text-[10px] font-mono text-slate-500 tracking-wider">
                    <div className="col-span-3">TRADER ID</div>
                    <div className="col-span-2">ASSET</div>
                    <div className="col-span-2">RESULT</div>
                    <div className="col-span-5">EXECUTION NOTES</div>
                  </div>
                  
                  {/* Ledger Rows */}
                  <div className="overflow-y-auto p-2 space-y-1">
                    <LedgerRow id="USR_8892" asset="BANKNIFTY" result="PROFIT" note="The reversal zone calculation is insane. Caught the exact bottom today." />
                    <LedgerRow id="USR_4110" asset="XAU/USD" result="PROFIT" note="Finally an algorithm that filters out the chop. Clean gold signals." />
                    <LedgerRow id="USR_9921" asset="NIFTY 50" result="STOP HIT" note="Hit SL but the risk management rules saved my capital. Respect." />
                    <LedgerRow id="USR_7334" asset="BANKNIFTY" result="PROFIT" note="Been using the L2 Quant feed for a month. 14 wins, 3 losses. Flawless." />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

// Helper component for the Testimonial Table
function LedgerRow({ id, asset, result, note }: { id: string, asset: string, result: string, note: string }) {
  const isProfit = result === "PROFIT";
  return (
    <div className="grid grid-cols-12 gap-4 p-3 border border-transparent hover:border-[#1e232d] hover:bg-[#12151c] rounded transition-colors text-xs items-center">
      <div className="col-span-3 font-mono text-slate-300">{id}</div>
      <div className="col-span-2 font-mono text-slate-400">{asset}</div>
      <div className="col-span-2">
        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${isProfit ? 'bg-emerald-950/50 text-emerald-400' : 'bg-rose-950/50 text-rose-400'}`}>
          {result}
        </span>
      </div>
      <div className="col-span-5 text-slate-400 italic">"{note}"</div>
    </div>
  );
}