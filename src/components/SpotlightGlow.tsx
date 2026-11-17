import React, { useEffect, useState } from "react";

export function SpotlightGlow() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoverDevice, setIsHoverDevice] = useState(true);

  useEffect(() => {
    // Check if device supports mouse/cursor
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsHoverDevice(mediaQuery.matches);

    const handlePointerMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <>
      {/* Desktop Spotlight: Crisp 580px luminous cursor beam */}
      {isHoverDevice && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-200"
          style={{
            opacity: isVisible ? 1 : 0,
            background: `radial-gradient(580px circle at ${pos.x}px ${pos.y}px, rgba(16, 185, 129, 0.18), rgba(139, 92, 246, 0.10), transparent 68%)`,
          }}
        />
      )}

      {/* Mobile / Touch Fallback: Soft top-center ambient halo */}
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
