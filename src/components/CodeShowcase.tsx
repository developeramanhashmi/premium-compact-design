import React, { useState } from "react";
import { Copy, Check, FileCode, Terminal, Sparkles, Code2 } from "lucide-react";

interface CodeFile {
  filename: string;
  lang: string;
  desc: string;
  code: string[];
}

const FILES: CodeFile[] = [
  {
    filename: "aman.config.ts",
    lang: "TypeScript",
    desc: "Core developer configuration & engineering profile",
    code: [
      `// Aman Alam — Systems & Data Engineering Profile`,
      `import { Architect, Foundation } from "@devgronix/core";`,
      ``,
      `export const amanAlam: Architect = {`,
      `  name: "Aman Alam",`,
      `  title: "Founder & Full-Stack Architect",`,
      `  venture: "DEVGRONIX (Enterprise Web & AI Solutions)",`,
      `  education: "IIT Madras — BS in Data Science & Applications",`,
      `  credentials: "MANUU — Diploma in Computer Science & Engineering",`,
      `  coreStack: ["TypeScript", "React", "Python", "SQL", "TailwindCSS"],`,
      `  architecture: ["Edge Runtimes", "PostgreSQL", "Realtime Webhooks", "REST/GraphQL"],`,
      `  availability: "Open for High-Impact Enterprise Projects",`,
      `  philosophy: "Clean architecture, sub-second latency, accessible UI.",`,
      `};`,
    ],
  },
  {
    filename: "data_pipeline.py",
    lang: "Python",
    desc: "High-throughput business telemetry & analysis engine",
    code: [
      `# Scalable Data Ingestion & Analytics Pipeline`,
      `import pandas as pd`,
      `import numpy as np`,
      ``,
      `def run_telemetry_pipeline(telemetry_stream: pd.DataFrame) -> dict:`,
      `    """Processes enterprise telemetry & generates growth vectors"""`,
      `    cleaned = telemetry_stream.dropna(subset=["revenue", "retention"]).copy()`,
      `    growth = np.diff(cleaned["revenue"]) / cleaned["revenue"][:-1]`,
      `    `,
      `    return {`,
      `        "status": "HEALTHY",`,
      `        "records_processed": len(cleaned),`,
      `        "growth_velocity": round(float(growth.mean()), 4),`,
      `        "p99_latency_ms": 11.8,`,
      `        "automated_alerting": True`,
      `    }`,
    ],
  },
  {
    filename: "devgronix.arch.ts",
    lang: "TypeScript",
    desc: "Distributed client architecture & resilient edge gateway",
    code: [
      `// DEVGRONIX Distributed Infrastructure Blueprint`,
      `export interface SystemArchitecture {`,
      `  frontend: "React + TanStack Start (SSR, Edge Caching, Zero CLS)";`,
      `  apiGateway: "Resilient Microservices with Sub-100ms Global Latency";`,
      `  database: "High-Availability PostgreSQL with Row-Level Security";`,
      `  intelligence: "Automated ETL Pipelines, Realtime Event Sinks";`,
      `  security: "Zero-Trust Tokens, Strict Runtime Validation";`,
      `}`,
      ``,
      `export const SLA_TARGET = "99.98% Uptime | Global CDN Distribution";`,
    ],
  },
];

export function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentFile = FILES[activeTab];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.code.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section className="py-20 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-mono font-semibold mb-1">
              <Code2 className="size-3.5 text-primary" />
              <span>Engineering Craft</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white">
              Code &amp; Architecture
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-sm">
            Live snippets showcasing clean TypeScript paradigms, telemetry pipelines, and scalable cloud blueprints.
          </p>
        </div>

        {/* IDE Container */}
        <div className="rounded-2xl border border-white/10 bg-neutral-950/90 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-neutral-900/70 px-4 py-2.5 gap-2">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500/80 inline-block" />
              <span className="size-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-neutral-400 hidden sm:inline">
                AmanAlam/Workspace — {currentFile.desc}
              </span>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-neutral-800/80 px-2.5 py-1 text-xs font-mono text-neutral-300 transition hover:border-primary/50 hover:text-white active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* File Tabs */}
          <div className="flex items-center overflow-x-auto border-b border-white/5 bg-neutral-900/40 px-2 no-scrollbar">
            {FILES.map((file, idx) => (
              <button
                key={file.filename}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 border-b-2 px-3.5 py-2 text-xs font-mono transition-all whitespace-nowrap ${
                  activeTab === idx
                    ? "border-primary bg-white/[0.04] text-white font-medium"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <FileCode className={`size-3.5 ${activeTab === idx ? "text-primary" : "text-neutral-500"}`} />
                <span>{file.filename}</span>
              </button>
            ))}
          </div>

          {/* Code Body with Line Numbers */}
          <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed bg-black/40">
            <div className="min-w-[500px] space-y-1">
              {currentFile.code.map((line, i) => (
                <div key={i} className="flex gap-4 group hover:bg-white/[0.02] -mx-4 sm:-mx-6 px-4 sm:px-6 py-0.5 rounded">
                  <span className="w-8 shrink-0 text-right text-neutral-600 select-none text-xs">
                    {i + 1}
                  </span>
                  <span className="flex-1 whitespace-pre">
                    {line.startsWith("//") || line.startsWith("#") ? (
                      <span className="text-neutral-500 italic">{line}</span>
                    ) : line.includes("export") || line.includes("import") || line.includes("def ") || line.includes("return") ? (
                      <span className="text-violet-400">{line}</span>
                    ) : line.includes(":") ? (
                      <span>
                        <span className="text-cyan-300">{line.split(":")[0]}:</span>
                        <span className="text-emerald-300">{line.slice(line.indexOf(":") + 1)}</span>
                      </span>
                    ) : (
                      <span className="text-neutral-200">{line}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom IDE Status Bar */}
          <div className="flex items-center justify-between border-t border-white/5 bg-neutral-900/60 px-4 py-1.5 text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span>Operational</span>
              </span>
              <span className="hidden sm:inline">UTF-8</span>
              <span>{currentFile.lang}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500">
              <Sparkles className="size-3 text-primary/70" />
              <span>Strict Mode · 0 Errors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
