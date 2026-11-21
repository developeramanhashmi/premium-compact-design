import React, { useState, useRef } from "react";
import { Project } from "@/data/portfolioData";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface ThreeDProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ThreeDProjectCard({ project, onOpen }: ThreeDProjectCardProps) {
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

    // Smooth tilt (up to 14 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

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
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className="w-full select-none cursor-pointer py-3"
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
        className="relative group rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-black/70 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(56,189,248,0.35)] hover:border-white/40 overflow-hidden"
      >
        {/* Specular Glare Reflection following Cursor */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle 240px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}), transparent 80%)`,
          }}
        />

        {/* Ambient Nebula Glow Behind Card */}
        <div
          className={`pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 size-48 rounded-full blur-3xl opacity-35 transition-all duration-500 group-hover:scale-125 group-hover:opacity-60 ${
            isDevgronix
              ? "bg-violet-500"
              : isDataAnalysis
              ? "bg-emerald-400"
              : "bg-cyan-400"
          }`}
          style={{ transform: "translateZ(-20px)" }}
        />

        {/* Card Header: Tag & ID */}
        <div
          className="relative flex items-center justify-between pb-3 border-b border-white/10"
          style={{ transform: "translateZ(30px)" }}
        >
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide border shadow-sm backdrop-blur-md ${
              isDevgronix
                ? "bg-violet-500/15 border-violet-400/40 text-violet-300"
                : isDataAnalysis
                ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
                : "bg-cyan-500/15 border-cyan-400/40 text-cyan-300"
            }`}
          >
            <Sparkles className="size-3" />
            <span>{project.tag}</span>
          </span>

          <span className="text-xs font-mono font-semibold text-neutral-400">
            #{project.id}
          </span>
        </div>

        {/* 3D Floating Diamond Gem Centerpiece (Reference image style) */}
        <div
          className="relative mt-6 mb-4 flex items-center justify-center"
          style={{ transform: "translateZ(45px)" }}
        >
          <div className="relative size-16 sm:size-18 rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-400 via-indigo-400 to-fuchsia-400 shadow-[0_0_30px_rgba(56,189,248,0.5)] group-hover:shadow-[0_0_45px_rgba(56,189,248,0.8)] transition-shadow">
            <div className="size-full rounded-[14px] bg-black/60 backdrop-blur-xl flex items-center justify-center border border-white/30">
              <div className="relative flex items-center justify-center">
                <div className="size-7 rotate-45 border-2 border-cyan-300 bg-gradient-to-br from-cyan-200/90 via-blue-400/70 to-purple-600/80 shadow-inner" />
                <Sparkles className="absolute size-4 text-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div
          className="relative text-center mt-2"
          style={{ transform: "translateZ(32px)" }}
        >
          <h3 className="font-display text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-neutral-300/90 leading-relaxed line-clamp-2 px-1">
            {project.desc}
          </p>
        </div>

        {/* Tech Chips */}
        <div
          className="relative mt-4 flex flex-wrap justify-center gap-1.5"
          style={{ transform: "translateZ(24px)" }}
        >
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-neutral-200 backdrop-blur-md"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/10">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* 3D Glossy "Explore Now" Pill Button */}
        <div
          className="relative mt-6 pt-2 flex items-center justify-center"
          style={{ transform: "translateZ(38px)" }}
        >
          <div className="group/btn relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white tracking-wide border border-white/40 bg-gradient-to-r from-cyan-500/80 via-blue-600/80 to-indigo-600/80 shadow-[0_8px_20px_rgba(56,189,248,0.4)] hover:shadow-[0_12px_28px_rgba(56,189,248,0.6)] hover:scale-105 active:scale-95 transition-all duration-200">
            <span>Explore Now</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </div>
        </div>

        {/* Specular Bottom Inner Edge */}
        <div className="pointer-events-none absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
}
