"use client";

import { useEffect, useRef } from "react";

export default function LiveMarket3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    let frameId: number;
    let renderer: any;
    let cleanupListeners: (() => void) | null = null;

    const checkThree = setInterval(() => {
      if (window.THREE) {
        clearInterval(checkThree);
        start3D();
      }
    }, 50);

    const start3D = () => {
      const THREE = window.THREE;
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 15, 60);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const spotLight = new THREE.SpotLight(0x38bdf8, 3.0);
      spotLight.position.set(0, 40, 20);
      spotLight.angle = Math.PI / 4;
      spotLight.penumbra = 0.5;
      scene.add(spotLight);

      // Materials for Bullish (Emerald) and Bearish (Rose) candles
      const bullMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x059669,
        emissiveIntensity: 0.4,
      });

      const bearMat = new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0xe11d48,
        emissiveIntensity: 0.2,
      });

      const candlesticks: any[] = [];
      const chartGroup = new THREE.Group();
      
      const numCandles = 35;
      const spacing = 2.5;
      const startX = -((numCandles * spacing) / 2);

      // Generate the 3D Candlesticks
      for (let i = 0; i < numCandles; i++) {
        const isBull = Math.random() > 0.4; // Slightly more bullish for a positive vibe
        const bodyHeight = 2 + Math.random() * 8;
        const wickHeight = bodyHeight + 2 + Math.random() * 4;

        // The thick body
        const bodyGeo = new THREE.BoxGeometry(1.2, bodyHeight, 1.2);
        const body = new THREE.Mesh(bodyGeo, isBull ? bullMat : bearMat);
        
        // The thin wick
        const wickGeo = new THREE.CylinderGeometry(0.15, 0.15, wickHeight, 8);
        const wick = new THREE.Mesh(wickGeo, isBull ? bullMat : bearMat);

        const candleGroup = new THREE.Group();
        candleGroup.add(body);
        candleGroup.add(wick);

        candleGroup.position.x = startX + i * spacing;
        
        // Store base data for physics animation
        candlesticks.push({
          mesh: candleGroup,
          baseY: (Math.random() - 0.5) * 10,
          speed: 0.01 + Math.random() * 0.02,
          offset: Math.random() * Math.PI * 2,
        });

        chartGroup.add(candleGroup);
      }

      scene.add(chartGroup);

      const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

      const onMouseMove = (e: MouseEvent) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 60;
        mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 40;
      };

      const onResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onResize);

      cleanupListeners = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
      };

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = Date.now() * 0.001;

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Wave effect + Mouse interaction
        candlesticks.forEach((candle, index) => {
          // Base algorithmic wave
          let targetY = candle.baseY + Math.sin(time * 2 + candle.offset) * 3;

          // Mouse proximity reaction (candles surge when mouse is near)
          const distToMouse = Math.abs(candle.mesh.position.x - mouse.x);
          if (distToMouse < 8) {
            const surge = (8 - distToMouse) * 1.5;
            targetY += surge;
          }

          candle.mesh.position.y += (targetY - candle.mesh.position.y) * 0.1;
        });

        // Slight overall rotation tracking the mouse
        chartGroup.rotation.y = mouse.x * 0.01;
        chartGroup.rotation.x = -mouse.y * 0.005;

        renderer.render(scene, camera);
      };

      animate();
    };

    return () => {
      clearInterval(checkThree);
      cancelAnimationFrame(frameId);
      if (cleanupListeners) cleanupListeners();
      if (renderer && renderer.domElement && containerRef.current) {
        containerRef.current.innerHTML = "";
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-40"
    />
  );
}