"use client";

export default function Footer() {
  return (
    <footer className="bg-[#050607] border-t border-[#1e232d] pt-16 pb-8 px-6 text-sm text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full border border-[#c5a059]/40 bg-black flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold tracking-tight text-white text-lg">
              GOD<span className="text-[#c5a059]">STOCKSS</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed mb-6">
            An elite institutional trading-intelligence platform bridging the gap between retail execution and quantitative market data.
          </p>
          <div className="text-[10px] font-mono tracking-widest text-[#c5a059]">
            FOUNDED BY CHIRAG BHAVNANI
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-bold mb-4 tracking-widest text-xs uppercase">Terminal</h4>
          <ul className="space-y-3 text-xs">
            <li><a href="#" className="hover:text-[#c5a059] transition-colors">Launch Platform</a></li>
            <li><a href="#" className="hover:text-[#c5a059] transition-colors">Pricing & Access</a></li>
            <li><a href="#" className="hover:text-[#c5a059] transition-colors">Live Telemetry</a></li>
            <li><a href="#" className="hover:text-[#c5a059] transition-colors">Refer & Earn Yield</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 tracking-widest text-xs uppercase">Legal & Risk</h4>
          <ul className="space-y-3 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Regulatory Compliance</a></li>
          </ul>
        </div>

        {/* Contact & Status */}
        <div>
          <h4 className="text-white font-bold mb-4 tracking-widest text-xs uppercase">Systems</h4>
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-[#090a0c] border border-[#1e232d] rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">All Systems Operational</span>
          </div>
          <p className="text-xs">Support: support@godstocks.in</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#1e232d] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest font-mono">
        <p>© 2026 GODSTOCKSS. ALL RIGHTS RESERVED.</p>
        <p>EDUCATIONAL PURPOSES ONLY. CAPITAL IS AT RISK.</p>
      </div>
    </footer>
  );
}