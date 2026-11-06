"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { id: 0, title: "Real-Time Signals", desc: "Algorithmic execution levels delivered directly to your terminal." },
  { id: 1, title: "Elite Top 5 Picks", desc: "High-conviction daily momentum and institutional reversal setups." },
  { id: 2, title: "Live Index Tracking", desc: "Tick-by-tick telemetry for Nifty 50, Bank Nifty, Sensex & India VIX." },
  { id: 3, title: "Forex & Commodities", desc: "Precision macro tracking for XAU/USD (Gold) and major currency pairs." },
  { id: 4, title: "Reversal Zones", desc: "Mathematical supply and demand zones defining structural market shifts." },
  { id: 5, title: "Quantitative Desk AI", desc: "24×7 automated technical and derivative data resolution." },
];

declare global {
  interface Window {
    THREE: any;
  }
}

export default function KineticMarketUI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    let frameId: number;
    let renderer: any;
    let cleanup: (() => void) | null = null;

    const timer = setInterval(() => {
      if (window.THREE) {
        clearInterval(timer);
        start3D();
      }
    }, 50);

    const start3D = () => {
      const THREE = window.THREE;
      const container = containerRef.current;
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 60);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dLight = new THREE.DirectionalLight(0xc5a059, 2.2);
      dLight.position.set(20, 30, 30);
      scene.add(dLight);

      const lineGeo = new THREE.BufferGeometry();
      const linePos = new Float32Array(6);
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
      const lineMat = new THREE.LineBasicMaterial({ color: 0xc5a059, transparent: true, opacity: 0.6 });
      const tether = new THREE.Line(lineGeo, lineMat);
      scene.add(tether);

      const nodes: any[] = [];
      const hitboxes: any[] = [];
      const raycaster = new THREE.Raycaster();
      const mouse2D = new THREE.Vector2(-100, -100);

      const coords = [
        { x: -24, y: 12, z: -5 },
        { x: 0, y: 16, z: -10 },
        { x: 24, y: 12, z: -5 },
        { x: -22, y: -12, z: 0 },
        { x: 0, y: -16, z: -5 },
        { x: 22, y: -12, z: 0 },
      ];

      coords.forEach((pos, idx) => {
        const group = new THREE.Group();
        group.position.set(pos.x, pos.y, pos.z);
        group.userData = { id: idx, baseY: pos.y, baseZ: pos.z, targetZ: pos.z, targetScale: 1 };

        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(3.2, 0),
          new THREE.MeshStandardMaterial({ color: 0x161922, metalness: 0.7, roughness: 0.3 })
        );
        core.name = "core";

        const shell = new THREE.Mesh(
          new THREE.IcosahedronGeometry(4.2, 1),
          new THREE.MeshBasicMaterial({ color: 0xc5a059, wireframe: true, transparent: true, opacity: 0.25 })
        );
        shell.name = "shell";

        group.add(core);
        group.add(shell);
        scene.add(group);
        nodes.push(group);

        const hit = new THREE.Mesh(
          new THREE.SphereGeometry(6, 12, 12),
          new THREE.MeshBasicMaterial({ visible: false })
        );
        hit.position.set(pos.x, pos.y, pos.z);
        hit.userData = { id: idx };
        scene.add(hit);
        hitboxes.push(hit);
      });

      const onMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };

      const onResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("resize", onResize);
      cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
      };

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = Date.now() * 0.001;

        const vec = new THREE.Vector3(mouse2D.x, mouse2D.y, 0.5).unproject(camera);
        const dir = vec.sub(camera.position).normalize();
        const mouse3D = camera.position.clone().add(dir.multiplyScalar(-camera.position.z / dir.z));

        let closest: any = null;
        let minDist = Infinity;
        nodes.forEach((n) => {
          const d = n.position.distanceTo(mouse3D);
          if (d < minDist) {
            minDist = d;
            closest = n;
          }
        });

        if (closest) {
          linePos[0] = mouse3D.x;
          linePos[1] = mouse3D.y;
          linePos[2] = mouse3D.z;
          linePos[3] = closest.position.x;
          linePos[4] = closest.position.y;
          linePos[5] = closest.position.z;
          tether.geometry.attributes.position.needsUpdate = true;
          tether.material.opacity = Math.max(0, 0.7 - minDist / 55);
        }

        raycaster.setFromCamera(mouse2D, camera);
        const hits = raycaster.intersectObjects(hitboxes);
        const hoveredId = hits.length > 0 ? hits[0].object.userData.id : null;
        setActiveFeature(hoveredId);

        nodes.forEach((n) => {
          const isHovered = hoveredId === n.userData.id;
          const anyHovered = hoveredId !== null;
          const core = n.children[0];
          const shell = n.children[1];

          if (isHovered) {
            n.userData.targetZ = 22;
            n.userData.targetScale = 1.35;
            core.material.color.setHex(0x262b38);
            shell.material.opacity = 0.75;
            shell.rotation.y += 0.03;
          } else if (anyHovered) {
            n.userData.targetZ = n.userData.baseZ - 15;
            n.userData.targetScale = 0.55;
            core.material.color.setHex(0x0d0f14);
            shell.material.opacity = 0.1;
          } else {
            n.userData.targetZ = n.userData.baseZ;
            n.userData.targetScale = 1.0;
            core.material.color.setHex(0x161922);
            shell.material.opacity = 0.25;
          }

          n.position.z += (n.userData.targetZ - n.position.z) * 0.08;
          n.scale.lerp(new THREE.Vector3().setScalar(n.userData.targetScale), 0.08);
          n.rotation.y += 0.008;
          n.rotation.x += 0.005;

          if (!isHovered) {
            n.position.y = n.userData.baseY + Math.sin(time * 2 + n.userData.id) * 1.2;
          }
        });

        renderer.render(scene, camera);
      };
      animate();
    };

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(frameId);
      if (cleanup) cleanup();
      if (renderer && containerRef.current) {
        containerRef.current.innerHTML = "";
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#090a0c] overflow-hidden flex items-center justify-center border-t border-[#1e232d]">
      <div ref={containerRef} className="absolute inset-0 z-10 cursor-crosshair" />

      <div className="relative z-20 pointer-events-none flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-6 text-center">
        <div className={`transition-all duration-500 absolute ${activeFeature === null ? "opacity-100" : "opacity-0 -translate-y-6"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-[#c5a059]/30 bg-[#12151c] mb-5 text-xs font-semibold text-[#c5a059] uppercase tracking-widest">
            Interactive Terminal Modules
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Core Capabilities
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            Hover over any geometric node to inspect our institutional market modules.
          </p>
        </div>

        {features.map((f) => (
          <div
            key={f.id}
            className={`absolute flex flex-col items-center transition-all duration-300 ${
              activeFeature === f.id ? "opacity-100 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="px-4 py-1 rounded border border-[#c5a059]/40 bg-[#12151c] mb-5 text-[#c5a059] text-xs font-bold tracking-widest uppercase">
              Module Active
            </div>
            <h3 className="text-4xl md:text-7xl font-bold text-white tracking-tight">
              {f.title}
            </h3>
            <p className="mt-5 text-lg md:text-2xl text-slate-300 max-w-3xl leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}