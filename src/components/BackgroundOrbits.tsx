import { useEffect, useRef } from "react";

export default function BackgroundOrbits() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cosmic starfield with depth layers
    const starCount = Math.min(width > 768 ? 95 : 45, 120);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      baseAlpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.008,
      color: Math.random() > 0.5 ? "255, 255, 255" : Math.random() > 0.3 ? "192, 132, 252" : "251, 191, 36",
    }));

    // Floating gold/purple energy particles
    const particleCount = Math.min(width > 768 ? 40 : 20, 50);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.45 ? "168, 85, 247" : "245, 158, 11",
      pulseSpeed: Math.random() * 0.02 + 0.006,
    }));

    // Occasional cosmic gold energy streak
    let shootingStar = {
      active: false,
      x: 0,
      y: 0,
      length: 120,
      speed: 12,
      opacity: 0,
    };

    const triggerShootingStar = () => {
      if (!shootingStar.active && Math.random() < 0.008) {
        shootingStar.active = true;
        shootingStar.x = Math.random() * width * 0.7;
        shootingStar.y = Math.random() * height * 0.3;
        shootingStar.opacity = 1;
      }
    };

    let step = 0;
    const render = () => {
      step++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const currentAlpha = Math.max(0.1, s.baseAlpha + Math.sin(step * s.twinkleSpeed) * 0.4);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${Math.min(1, currentAlpha)})`;
        ctx.shadowBlur = s.size > 1.2 ? 6 : 0;
        ctx.shadowColor = `rgba(${s.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Draw Floating Gold & Purple Energy Dust
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pAlpha = p.alpha + Math.sin(step * p.pulseSpeed) * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.08, Math.min(0.9, pAlpha))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.color}, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Draw Cosmic Gold Shooting Star Streaks
      triggerShootingStar();
      if (shootingStar.active) {
        shootingStar.x += shootingStar.speed;
        shootingStar.y += shootingStar.speed * 0.55;
        shootingStar.opacity -= 0.015;

        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.length,
          shootingStar.y - shootingStar.length * 0.55
        );
        grad.addColorStop(0, `rgba(251, 191, 36, ${shootingStar.opacity})`);
        grad.addColorStop(0.4, `rgba(168, 85, 247, ${shootingStar.opacity * 0.7})`);
        grad.addColorStop(1, "rgba(245, 158, 11, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.length,
          shootingStar.y - shootingStar.length * 0.55
        );
        ctx.stroke();

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar.active = false;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Deep Cosmos Radial Glows & Cosmic Nebulas */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] bg-amber-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-20 -left-32 w-[700px] h-[700px] bg-purple-950/25 rounded-full blur-[160px] pointer-events-none" />

      {/* 3D Celestial Glowing Planet with Atmospheric Corona (Upper Right Horizon) */}
      <div className="absolute -top-24 -right-24 sm:top-12 sm:right-16 w-72 sm:w-96 h-72 sm:h-96 rounded-full pointer-events-none opacity-40 sm:opacity-50">
        {/* Planet Sphere */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2c0e4c] via-[#120524] to-[#030108] border border-purple-500/20 shadow-[inset_0_0_60px_rgba(168,85,247,0.4),0_0_80px_rgba(168,85,247,0.25)] relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid opacity-25" />
          <div className="absolute -top-1/4 -right-1/4 w-full h-full rounded-full bg-amber-500/20 blur-2xl" />
        </div>

        {/* Planet Concentric Orbit Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[540px] h-[120px] sm:h-[150px] rounded-full border border-purple-500/30 border-dashed animate-spin-slow rotate-[20deg]" />
      </div>

      {/* Central Rotating Universe Orbital Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1150px] h-[1150px] rounded-full border border-purple-500/10 animate-spin-slow pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-dashed border-amber-500/10 animate-spin-reverse-slow pointer-events-none" />
    </div>
  );
}
