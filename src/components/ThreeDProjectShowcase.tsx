import React, { useState } from "react";
import { Project } from "@/data/portfolioData";
import { ThreeDProjectCard } from "./ThreeDProjectCard";
import { Play, Pause, LayoutGrid, SlidersHorizontal } from "lucide-react";

interface ThreeDProjectShowcaseProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export function ThreeDProjectShowcase({ projects, onOpenProject }: ThreeDProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"reel" | "grid">("reel");

  const categories = ["All", "DEVGRONIX Work", "Data Analysis", "Dashboards", "Web Development"];

  const filtered = activeFilter === "All" 
    ? projects 
    : projects.filter((p) => p.tag === activeFilter);

  // Repeat items so the horizontal marquee loops smoothly
  const repeatedProjects = filtered.length > 0 
    ? [...filtered, ...filtered, ...filtered] 
    : [];

  return (
    <div className="relative">
      <style>{`
        @keyframes slideLeftContinuous {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide-left-reel {
          display: flex;
          width: max-content;
          animation: slideLeftContinuous 35s linear infinite;
        }
        .animate-slide-left-reel:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Top Header & Interactive Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">
              Interactive 3D Portfolio
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:border-white/30 transition backdrop-blur-md"
              title={isPaused ? "Resume slide" : "Pause slide"}
            >
              {isPaused ? <Play className="size-3 text-cyan-400" /> : <Pause className="size-3 text-cyan-400" />}
              <span>{isPaused ? "Play" : "Pause"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
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

      {/* VIEW 1: Horizontal Single-Line Right-to-Left Reel */}
      {viewMode === "reel" ? (
        <div 
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/60 backdrop-blur-xl py-4"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)"
          }}
        >
          {/* Ambient Cosmic Lighting */}
          <div className="pointer-events-none absolute -top-16 left-1/3 size-64 rounded-full bg-cyan-500/15 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-16 right-1/3 size-64 rounded-full bg-violet-600/15 blur-[90px]" />

          <div 
            className="animate-slide-left-reel items-center gap-5 px-4"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {repeatedProjects.map((p, index) => (
              <ThreeDProjectCard
                key={`reel-${p.id}-${index}`}
                project={p}
                onOpen={onOpenProject}
                className="w-[285px] sm:w-[315px] shrink-0"
              />
            ))}
          </div>
        </div>
      ) : (
        /* VIEW 2: Compact 3D Grid */
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((project) => (
            <ThreeDProjectCard
              key={project.id}
              project={project}
              onOpen={onOpenProject}
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
