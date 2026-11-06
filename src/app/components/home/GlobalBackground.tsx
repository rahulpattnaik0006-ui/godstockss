"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

export default function GlobalBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === "undefined") return;
    let frameId: number;
    let renderer: any;
    let cleanup: (() => void) | null = null;

    const timer = setInterval(() => {
      if (window.THREE) {
        clearInterval(timer);
        initScene();
      }
    }, 50);

    const initScene = () => {
      const THREE = window.THREE;
      const el = mountRef.current;
      if (!el) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 55;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xfde5d4, 0.9));
      const dLight = new THREE.DirectionalLight(0xd6cc99, 1.8);
      dLight.position.set(20, 30, 25);
      scene.add(dLight);

      const sageMat = new THREE.MeshStandardMaterial({ color: 0x445d48, metalness: 0.4, roughness: 0.6 });
      const sandMat = new THREE.MeshBasicMaterial({ color: 0xd6cc99, wireframe: true, transparent: true, opacity: 0.25 });
      const brownMat = new THREE.MeshStandardMaterial({ color: 0x5e3023, metalness: 0.5, roughness: 0.5 });

      const geos = [
        new THREE.OctahedronGeometry(0.55, 0),
        new THREE.TetrahedronGeometry(0.6, 0),
        new THREE.BoxGeometry(0.6, 0.6, 0.6),
        new THREE.IcosahedronGeometry(0.5, 0),
      ];

      const mats = [sageMat, sandMat, brownMat];
      const items: any[] = [];

      for (let i = 0; i < 65; i++) {
        const mesh = new THREE.Mesh(geos[i % geos.length], mats[i % mats.length]);
        mesh.position.set(
          (Math.random() - 0.5) * 95,
          (Math.random() - 0.5) * 65,
          (Math.random() - 0.5) * 30
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mesh.userData = {
          vx: (Math.random() - 0.5) * 0.018,
          vy: (Math.random() - 0.5) * 0.018,
          rx: (Math.random() - 0.5) * 0.01,
          ry: (Math.random() - 0.5) * 0.01,
        };
        scene.add(mesh);
        items.push(mesh);
      }

      const mouse = { x: 0, y: 0 };
      const onMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 3;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 3;
      };

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("resize", onResize);
      cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
      };

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        camera.position.x += (mouse.x - camera.position.x) * 0.03;
        camera.position.y += (mouse.y - camera.position.y) * 0.03;

        items.forEach((m) => {
          m.position.x += m.userData.vx;
          m.position.y += m.userData.vy;
          m.rotation.x += m.userData.rx;
          m.rotation.y += m.userData.ry;
          if (m.position.x > 50) m.position.x = -50;
          if (m.position.x < -50) m.position.x = 50;
          if (m.position.y > 35) m.position.y = -35;
          if (m.position.y < -35) m.position.y = 35;
        });

        renderer.render(scene, camera);
      };
      animate();
    };

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(frameId);
      if (cleanup) cleanup();
      if (renderer && mountRef.current) {
        mountRef.current.innerHTML = "";
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#001524]">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #D6CC99 1px, transparent 1px), linear-gradient(to bottom, #D6CC99 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}