import React, { useEffect } from "react";
import { Project } from "@/data/portfolioData";
import { 
  X, 
  ArrowUpRight, 
  Github, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Sparkles, 
  ExternalLink,
  Code2
} from "lucide-react";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isDevgronix = project.tag === "DEVGRONIX Work";
  const isDataAnalysis = project.tag === "Data Analysis" || project.tag === "Dashboards";
  const isGithub = project.href.includes("github.com") || project.cta?.toLowerCase().includes("github");

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-neutral-900/95 p-6 sm:p-8 text-neutral-100 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div 
          className={`pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-80 rounded-full blur-3xl opacity-30 ${
            isDevgronix 
              ? "bg-violet-500" 
              : isDataAnalysis 
              ? "bg-emerald-500" 
              : "bg-primary"
          }`} 
        />

        {/* Top Bar: Tag & Close Button */}
        <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
              isDevgronix 
                ? "bg-violet-500/10 border-violet-500/30 text-violet-300"
                : isDataAnalysis
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-primary/10 border-primary/30 text-primary"
            }`}>
              <Sparkles className="size-3" />
              <span>{project.tag}</span>
            </span>
            <span className="text-xs font-mono text-neutral-400">#{project.id}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-neutral-400 hover:border-white/30 hover:bg-white/10 hover:text-white transition"
            aria-label="Close dialog"
          >
            <span>Close</span>
            <kbd className="text-[10px] text-neutral-400 group-hover:text-white">Esc</kbd>
            <X className="size-3.5" />
          </button>
        </div>

        {/* Project Header */}
        <div className="relative mt-5">
          <h2 id="modal-project-title" className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
            {project.desc}
          </p>
        </div>

        {/* Key Highlights & Features */}
        {project.features && project.features.length > 0 && (
          <div className="relative mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-semibold uppercase tracking-wider text-primary">
              <Layers className="size-3.5" />
              <span>Key Architectural Deliverables</span>
            </div>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Matrix */}
        <div className="relative mt-6">
          <div className="flex items-center gap-2 mb-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
            <Cpu className="size-3.5" />
            <span>Technologies &amp; Frameworks</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span 
                key={t} 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-200 hover:border-primary/40 transition"
              >
                <Code2 className="size-3 text-primary/80" />
                <span>{t}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="relative mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-neutral-400 font-mono">
            {isDevgronix ? "Client / Agency Ecosystem" : "Open Source & Architecture"}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-medium border border-white/10 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition"
            >
              Back to Portfolio
            </button>

            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-primary text-neutral-950 hover:bg-primary/90 transition shadow-md hover:shadow-primary/20"
            >
              {isGithub ? (
                <>
                  <Github className="size-3.5" />
                  <span>Inspect Repository</span>
                </>
              ) : (
                <>
                  <span>{project.cta || "Open Live Demo"}</span>
                  <ArrowUpRight className="size-3.5" />
                </>
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
