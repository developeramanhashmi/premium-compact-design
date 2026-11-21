import React, { useState, useRef } from "react";
import { Project } from "@/data/portfolioData";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface ThreeDProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  className?: string;
}

export function ThreeDProjectCard({ project, onOpen, className = "" }: ThreeDProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isDevgronix = project.tag === "DEVGRONIX Work";
  const isDataAnalysis = project.tag === "Data Analysis" || project.tag === "Dashboards";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth tilt (up to 12 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className={`select-none cursor-pointer py-1 ${className}`}
      onClick={() => onOpen(project)}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
        }}
        className="relative group rounded-2xl border border-white/20 bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-black/75 p-5 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(56,189,248,0.35)] hover:border-white/40 overflow-hidden flex flex-col justify-between"
      >
        {/* Specular Glare Reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle 200px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}), transparent 80%)`,
          }}
        />

        {/* Ambient Glow */}
        <div
          className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 size-36 rounded-full blur-2xl opacity-35 transition-all duration-500 group-hover:scale-125 group-hover:opacity-60 ${
            isDevgronix
              ? "bg-violet-500"
              : isDataAnalysis
              ? "bg-emerald-400"
              : "bg-cyan-400"
          }`}
          style={{ transform: "translateZ(-15px)" }}
        />

        <div>
          {/* Header: Tag & ID */}
          <div
            className="relative flex items-center justify-between pb-2.5 border-b border-white/10"
            style={{ transform: "translateZ(25px)" }}
          >
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide border shadow-xs backdrop-blur-md ${
                isDevgronix
                  ? "bg-violet-500/15 border-violet-400/40 text-violet-300"
                  : isDataAnalysis
                  ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
                  : "bg-cyan-500/15 border-cyan-400/40 text-cyan-300"
              }`}
            >
              <Sparkles className="size-2.5" />
              <span>{project.tag}</span>
            </span>

            <span className="text-[11px] font-mono font-medium text-neutral-400">
              #{project.id}
            </span>
          </div>

          {/* Compact 3D Gem Icon */}
          <div
            className="relative mt-3.5 mb-2.5 flex items-center justify-center"
            style={{ transform: "translateZ(35px)" }}
          >
            <div className="relative size-12 rounded-xl p-0.5 bg-gradient-to-tr from-cyan-400 via-indigo-400 to-fuchsia-400 shadow-[0_0_20px_rgba(56,189,248,0.5)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.75)] transition-shadow">
              <div className="size-full rounded-[10px] bg-black/70 backdrop-blur-xl flex items-center justify-center border border-white/30">
                <div className="relative flex items-center justify-center">
                  <div className="size-5 rotate-45 border-2 border-cyan-300 bg-gradient-to-br from-cyan-200/90 via-blue-400/70 to-purple-600/80 shadow-inner" />
                  <Sparkles className="absolute size-3 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div
            className="relative text-center"
            style={{ transform: "translateZ(28px)" }}
          >
            <h3 className="font-display text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors truncate">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-neutral-300/85 leading-relaxed line-clamp-2">
              {project.desc}
            </p>
          </div>

          {/* Compact Tech Chips */}
          <div
            className="relative mt-3 flex flex-wrap justify-center gap-1"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-neutral-200 backdrop-blur-md"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Compact Glossy "Explore Now" Pill */}
        <div
          className="relative mt-4 pt-1 flex items-center justify-center"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="group/btn relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-semibold text-white tracking-wide border border-white/40 bg-gradient-to-r from-cyan-500/80 via-blue-600/80 to-indigo-600/80 shadow-[0_6px_15px_rgba(56,189,248,0.35)] hover:shadow-[0_8px_20px_rgba(56,189,248,0.55)] hover:scale-105 active:scale-95 transition-all duration-200">
            <span>Explore Now</span>
            <ArrowUpRight className="size-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
