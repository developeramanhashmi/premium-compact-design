import React, { useState, useEffect } from "react";
import { Project } from "@/data/portfolioData";
import { ThreeDProjectCard } from "./ThreeDProjectCard";
import { ChevronLeft, ChevronRight, Play, Pause, LayoutGrid, SlidersHorizontal } from "lucide-react";

interface ThreeDProjectShowcaseProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export function ThreeDProjectShowcase({ projects, onOpenProject }: ThreeDProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"reel" | "grid">("reel");

  const categories = ["All", "DEVGRONIX Work", "Data Analysis", "Dashboards", "Web Development"];

  const filtered = activeFilter === "All" 
    ? projects 
    : projects.filter((p) => p.tag === activeFilter);

  // Reset index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  // Smooth Auto-slide timer (every 3.8s) - pauses on hover or manual pause
  useEffect(() => {
    if (viewMode !== "reel" || isPaused || isHovered || filtered.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [viewMode, isPaused, isHovered, filtered.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filtered.length);
  };

  // Card transform math for 3D Arc & Center Elevation
  const getCardPositionStyle = (index: number) => {
    const total = filtered.length;
    if (total === 0) return {};

    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const isActive = offset === 0;
    const isImmediate = Math.abs(offset) === 1;
    const isSecondary = Math.abs(offset) === 2;
    const isHidden = Math.abs(offset) > 2;

    // Spacing
    const translateX = offset * 255;
    // Center card elevated UP (like reference image)
    const translateY = isActive ? -26 : isImmediate ? 8 : 20;
    const scale = isActive ? 1.08 : isImmediate ? 0.88 : 0.72;
    const rotateY = offset * -14;
    const zIndex = 30 - Math.abs(offset) * 10;
    const opacity = isHidden ? 0 : isActive ? 1 : isImmediate ? 0.75 : 0.35;

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      pointerEvents: isHidden ? ("none" as const) : ("auto" as const),
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, z-index 0.5s step-start",
    };
  };

  return (
    <div className="relative">
      {/* Top Header & Interactive Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">
              Interactive 3D Showcase
            </span>
            <span className="flex size-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight mt-1 text-white">
            Featured Projects &amp; Systems
          </h2>
        </div>

        {/* View Toggle & Play/Pause Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setViewMode("reel")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition ${
                viewMode === "reel" 
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <SlidersHorizontal className="size-3" />
              <span>3D Reel</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition ${
                viewMode === "grid" 
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="size-3" />
              <span>3D Grid</span>
            </button>
          </div>

          {viewMode === "reel" && (
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:border-white/30 transition backdrop-blur-md"
              title={isPaused ? "Resume auto slide" : "Pause auto slide"}
            >
              {isPaused ? <Play className="size-3 text-cyan-400" /> : <Pause className="size-3 text-cyan-400" />}
              <span>{isPaused ? "Play" : "Pause"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 text-xs rounded-full font-medium transition-all duration-200 border ${
              activeFilter === cat
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/60 text-cyan-200 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                : "border-white/10 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-white/20 active:scale-95 backdrop-blur-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* VIEW 1: 3D Elevated Coverflow Reel */}
      {viewMode === "reel" ? (
        <div 
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/60 backdrop-blur-xl pt-14 pb-8 px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ambient Center Glow */}
          <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 size-72 rounded-full bg-cyan-500/15 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 size-80 rounded-full bg-violet-600/15 blur-[100px]" />

          {/* Cards Stage Container */}
          <div 
            className="relative h-[380px] sm:h-[400px] w-full flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {filtered.map((p, index) => {
              const total = filtered.length;
              let offset = index - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;
              const isActive = offset === 0;

              return (
                <div
                  key={p.id}
                  style={getCardPositionStyle(index)}
                  className="absolute w-[285px] sm:w-[315px] cursor-pointer"
                  onClick={() => {
                    if (isActive) {
                      onOpenProject(p);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <ThreeDProjectCard
                    project={p}
                    isActive={isActive}
                    onOpen={() => {
                      if (isActive) onOpenProject(p);
                      else setActiveIndex(index);
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Reference Navigation Bar (Prev Arrow, Indicator Dots, Next Arrow) */}
          <div className="relative mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="size-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition active:scale-90 hover:border-cyan-400/50 shadow-md backdrop-blur-md"
              aria-label="Previous project"
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              {filtered.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === activeIndex
                      ? "w-6 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                      : "size-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="size-9 rounded-full border border-white/20 bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center transition active:scale-90 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] shadow-md backdrop-blur-md"
              aria-label="Next project"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      ) : (
        /* VIEW 2: Compact 3D Grid */
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((project) => (
            <ThreeDProjectCard
              key={project.id}
              project={project}
              isActive={false}
              onOpen={onOpenProject}
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
