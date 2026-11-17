import React, { useEffect, useRef, useState } from "react";

export function SpotlightGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoverDevice, setIsHoverDevice] = useState(true);

  useEffect(() => {
    // Check if device supports cursor/mouse hover
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsHoverDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsHoverDevice(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    const el = containerRef.current;
    if (!el) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";
    };

    const onPointerLeave = () => {
      el.style.opacity = "0";
    };

    const animate = () => {
      // Smooth interpolation (lerp) for fluid cursor physics
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      el.style.setProperty("--spotlight-x", `${currentX.toFixed(1)}px`);
      el.style.setProperty("--spotlight-y", `${currentY.toFixed(1)}px`);

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Desktop / Cursor-following ambient radial spotlight */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: 0,
          background: `radial-gradient(650px circle at var(--spotlight-x, -1000px) var(--spotlight-y, -1000px), rgba(16, 185, 129, 0.08), rgba(139, 92, 246, 0.045), transparent 75%)`,
        }}
      />

      {/* Mobile / Touch subtle ambient top glow fallback */}
      {!isHoverDevice && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-10 h-80 opacity-50 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.12), rgba(139, 92, 246, 0.06), transparent 70%)`,
          }}
        />
      )}
    </>
  );
}
