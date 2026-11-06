"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

export default function Hero3DCanvas() {
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

    const createCoinTexture = (isFront: boolean) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d")!;

      // Radial Gold Gradient Base
      const grad = ctx.createRadialGradient(512, 512, 100, 512, 512, 512);
      grad.addColorStop(0, "#fcd34d");
      grad.addColorStop(0.5, "#f59e0b");
      grad.addColorStop(0.85, "#d97706");
      grad.addColorStop(1, "#78350f");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(512, 512, 500, 0, Math.PI * 2);
      ctx.fill();

      // Outer Beveled Edge Ring
      ctx.lineWidth = 28;
      ctx.strokeStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(512, 512, 475, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Circuit Border Ring
      ctx.lineWidth = 8;
      ctx.strokeStyle = "rgba(120, 53, 15, 0.4)";
      ctx.beginPath();
      ctx.arc(512, 512, 430, 0, Math.PI * 2);
      ctx.stroke();

      // Concentric Decorative Dots
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2;
        const x = 512 + Math.cos(angle) * 452;
        const y = 512 + Math.sin(angle) * 452;
        ctx.fillStyle = "#fef3c7";
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center Bitcoin Symbol (₿)
      ctx.fillStyle = "#fffbeb";
      ctx.shadowColor = "rgba(120, 53, 15, 0.7)";
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = 8;
      ctx.shadowOffsetY = 10;
      ctx.font = "bold 580px 'Segoe UI', Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Mirror the back face so the symbol isn't reversed
      if (!isFront) {
        ctx.save();
        ctx.translate(1024, 0);
        ctx.scale(-1, 1);
        ctx.fillText("₿", 512, 530);
        ctx.restore();
      } else {
        ctx.fillText("₿", 512, 530);
      }

      const texture = new window.THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      return texture;
    };

    const start3D = () => {
      const THREE = window.THREE;
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      camera.position.set(0, 0, 50);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xfff7ed, 3.0);
      dirLight1.position.set(25, 30, 35);
      scene.add(dirLight1);

      const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
      rimLight.position.set(-30, -20, -20);
      scene.add(rimLight);

      // Create 3D Coin Mesh (Cylinder)
      const radius = 9;
      const thickness = 1.3;
      const geometry = new THREE.CylinderGeometry(radius, radius, thickness, 64);
      geometry.rotateX(Math.PI / 2); // Orient coin to face the camera

      // Gold Metallic Edge
      const sideMaterial = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.95,
        roughness: 0.25,
      });

      // Front & Back Faces with ₿ Emblem
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: createCoinTexture(true),
        metalness: 0.85,
        roughness: 0.2,
      });

      const backMaterial = new THREE.MeshStandardMaterial({
        map: createCoinTexture(false),
        metalness: 0.85,
        roughness: 0.2,
      });

      // [0: rim edge, 1: front face, 2: back face]
      const coinMesh = new THREE.Mesh(geometry, [
        sideMaterial,
        frontMaterial,
        backMaterial,
      ]);

      const coinGroup = new THREE.Group();
      coinGroup.add(coinMesh);
      scene.add(coinGroup);

      const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      const coinPos = { x: 0, y: 0, z: 0 };

      const onMouseMove = (e: MouseEvent) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 32;
        mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 20;
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

        // Smooth cursor chase
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        coinPos.x += (mouse.x - coinPos.x) * 0.04;
        coinPos.y += (mouse.y - coinPos.y) * 0.04;

        coinGroup.position.set(coinPos.x, coinPos.y, coinPos.z);

        // Continuous subtle spin + mouse tilt
        const rotY = (mouse.x - coinPos.x) * 0.04;
        const rotX = -(mouse.y - coinPos.y) * 0.04;
        coinGroup.rotation.y += 0.012 + (rotY - coinGroup.rotation.y) * 0.08;
        coinGroup.rotation.x += (rotX - coinGroup.rotation.x) * 0.08;

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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}