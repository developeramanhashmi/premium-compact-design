import React, { useState } from "react";
import { Project } from "@/data/portfolioData";
import { ThreeDProjectCard } from "./ThreeDProjectCard";
import { Play, Pause, LayoutGrid, SlidersVertical } from "lucide-react";

interface ThreeDProjectShowcaseProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export function ThreeDProjectShowcase({ projects, onOpenProject }: ThreeDProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"stream" | "grid">("stream");

  const categories = ["All", "DEVGRONIX Work", "Data Analysis", "Dashboards", "Web Development"];

  const filtered = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.tag === activeFilter);

  // Divide into two parallel vertical streams for smooth staggered flow
  const col1 = filtered.filter((_, idx) => idx % 2 === 0);
  const col2 = filtered.filter((_, idx) => idx % 2 !== 0);

  // Fallback if odd items
  const stream1 = col1.length > 0 ? col1 : filtered;
  const stream2 = col2.length > 0 ? col2 : filtered;

  return (
    <div className="relative">
      <style>{`
        @keyframes slideUpContinuous {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-slide-up-slow {
          animation: slideUpContinuous 32s linear infinite;
        }
        .animate-slide-up-offset {
          animation: slideUpContinuous 38s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Top Header & Interactive Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">
              Interactive 3D Portfolio
            </span>
            <span className="flex size-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
            Featured Projects &amp; Systems
          </h2>
        </div>

        {/* View Toggle & Play/Pause Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setViewMode("stream")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition ${
                viewMode === "stream" 
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <SlidersVertical className="size-3" />
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

          {viewMode === "stream" && (
            <button
              type="button"
              onClick={() => setIsPaused(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:border-white/30 transition backdrop-blur-md"
              title={isPaused ? "Resume slide" : "Pause slide"}
            >
              {isPaused ? <Play className="size-3 text-cyan-400" /> : <Pause className="size-3 text-cyan-400" />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
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
            className={`shrink-0 whitespace-nowrap px-4 py-2 text-xs rounded-full font-medium transition-all duration-200 border ${
              activeFilter === cat
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/60 text-cyan-200 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                : "border-white/10 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-white/20 active:scale-95 backdrop-blur-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* VIEW MODE 1: Upward Continuous 3D Sliding Reel */}
      {viewMode === "stream" ? (
        <div 
          className="relative h-[650px] sm:h-[720px] overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/60 backdrop-blur-xl p-4 sm:p-6"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)"
          }}
        >
          {/* Subtle Ambient Cosmic Background Lights */}
          <div className="pointer-events-none absolute -top-24 left-1/4 size-72 rounded-full bg-cyan-500/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 size-80 rounded-full bg-violet-600/15 blur-[100px]" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {/* Column 1 Upward Stream */}
            <div 
              className="animate-slide-up-slow pause-on-hover flex flex-col gap-6"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {[...stream1, ...stream1].map((p, index) => (
                <ThreeDProjectCard
                  key={`col1-${p.id}-${index}`}
                  project={p}
                  onOpen={onOpenProject}
                />
              ))}
            </div>

            {/* Column 2 Upward Stream (Hidden on small mobile, shown on md+) */}
            <div 
              className="hidden md:flex animate-slide-up-offset pause-on-hover flex-col gap-6"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {[...stream2, ...stream2].map((p, index) => (
                <ThreeDProjectCard
                  key={`col2-${p.id}-${index}`}
                  project={p}
                  onOpen={onOpenProject}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: Static 3D Grid */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ThreeDProjectCard
              key={project.id}
              project={project}
              onOpen={onOpenProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
