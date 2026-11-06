"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

export default function IntroSplash() {
  const geoRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState("/logo.png");

  useEffect(() => {
    if (!geoRef.current || typeof window === "undefined") return;
    let frameId: number;
    let renderer: any;

    const timer = setInterval(() => {
      if (window.THREE) {
        clearInterval(timer);
        initScene();
      }
    }, 50);

    const initScene = () => {
      const THREE = window.THREE;
      const el = geoRef.current;
      if (!el) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000);
      camera.position.z = 45;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dLight = new THREE.DirectionalLight(0xc5a059, 1.5);
      dLight.position.set(15, 25, 20);
      scene.add(dLight);

      const goldMat = new THREE.MeshStandardMaterial({ color: 0xc5a059, metalness: 0.6, roughness: 0.4 });
      const slateMat = new THREE.MeshBasicMaterial({ color: 0x475569, wireframe: true, transparent: true, opacity: 0.25 });

      const geos = [
        new THREE.OctahedronGeometry(0.5, 0),
        new THREE.TetrahedronGeometry(0.55, 0),
        new THREE.BoxGeometry(0.55, 0.55, 0.55),
      ];

      const items: any[] = [];
      for (let i = 0; i < 45; i++) {
        const mesh = new THREE.Mesh(geos[i % 3], i % 2 === 0 ? goldMat : slateMat);
        mesh.position.set((Math.random() - 0.5) * 75, (Math.random() - 0.5) * 45, (Math.random() - 0.5) * 20);
        mesh.userData = {
          vx: (Math.random() - 0.5) * 0.015,
          vy: (Math.random() - 0.5) * 0.015,
          rx: (Math.random() - 0.5) * 0.01,
          ry: (Math.random() - 0.5) * 0.01,
        };
        scene.add(mesh);
        items.push(mesh);
      }

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        items.forEach((m) => {
          m.position.x += m.userData.vx;
          m.position.y += m.userData.vy;
          m.rotation.x += m.userData.rx;
          m.rotation.y += m.userData.ry;
          if (m.position.x > 40) m.position.x = -40;
          if (m.position.x < -40) m.position.x = 40;
          if (m.position.y > 25) m.position.y = -25;
          if (m.position.y < -25) m.position.y = 25;
        });
        renderer.render(scene, camera);
      };
      animate();
    };

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(frameId);
      if (renderer && geoRef.current) {
        geoRef.current.innerHTML = "";
        renderer.dispose();
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#090a0c] border-b border-[#1e232d] overflow-hidden">
      <div ref={geoRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 py-12 text-center">
        <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border border-[#c5a059]/40 bg-[#050607] p-2 shadow-2xl flex items-center justify-center mb-8 overflow-hidden">
          <img
            src={imgSrc}
            alt="GodStockss Logo"
            onError={() => setImgSrc("/logo.jfif.jfif")}
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        <div className="inline-flex items-center gap-3 px-4 py-1 rounded border border-[#c5a059]/30 bg-[#12151c] mb-5">
          <span className="text-[#c5a059] text-[11px] font-semibold tracking-[0.25em] uppercase">Live</span>
          <span className="w-1 h-1 rounded-full bg-slate-500" />
          <span className="text-[#c5a059] text-[11px] font-semibold tracking-[0.25em] uppercase">Predict</span>
          <span className="w-1 h-1 rounded-full bg-slate-500" />
          <span className="text-[#c5a059] text-[11px] font-semibold tracking-[0.25em] uppercase">Profit</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase mb-5">
          GOD<span className="text-[#c5a059]">STOCKSS</span>
        </h1>

        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Founded by Chirag Bhavnani, GodStocks is an institutional-grade quantitative trading intelligence platform engineered to bridge the analytical gap between retail traders and capital markets.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-mono text-slate-400">
          <span className="px-3.5 py-1.5 rounded bg-[#12151c] border border-[#1e232d]">NIFTY 50 & BANK NIFTY</span>
          <span className="px-3.5 py-1.5 rounded bg-[#12151c] border border-[#1e232d]">FOREX & XAU/USD</span>
          <span className="px-3.5 py-1.5 rounded bg-[#12151c] border border-[#c5a059]/30 text-[#c5a059]">EST. 2026</span>
        </div>
      </div>
    </section>
  );
}