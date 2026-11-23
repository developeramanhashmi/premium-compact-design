import React, { useEffect, useRef, useState } from "react";

export function SpotlightGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [isHoverDevice, setIsHoverDevice] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsHoverDevice(mediaQuery.matches);

    const glowEl = glowRef.current;
    if (!glowEl || !mediaQuery.matches) return;

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;

    const updateGlow = () => {
      if (glowEl) {
        glowEl.style.opacity = "1";
        glowEl.style.background = `radial-gradient(580px circle at ${targetX}px ${targetY}px, rgba(16, 185, 129, 0.18), rgba(139, 92, 246, 0.10), transparent 68%)`;
      }
      rafId = null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateGlow);
      }
    };

    const handlePointerLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (glowEl) {
        glowEl.style.opacity = "0";
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [isHoverDevice]);

  return (
    <>
      {/* Desktop Spotlight: Zero React re-renders */}
      {isHoverDevice && (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-200"
        />
      )}

      {/* Mobile / Touch Fallback */}
      {!isHoverDevice && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-10 h-72 opacity-60 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15), rgba(139, 92, 246, 0.08), transparent 70%)`,
          }}
        />
      )}
    </>
  );
}
