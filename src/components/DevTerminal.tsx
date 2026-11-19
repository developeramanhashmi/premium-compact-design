import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles, CheckCircle2, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface DevTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export function DevTerminal({ isOpen, onClose }: DevTerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: "init",
      output: (
        <div className="space-y-1 text-xs text-neutral-300">
          <p className="text-emerald-400 font-bold">🚀 Welcome to Aman Alam's Interactive CLI v1.2.0</p>
          <p className="text-neutral-400">Founder &amp; Full-Stack Architect @ DEVGRONIX | IIT Madras Data Science Scholar</p>
          <p className="text-neutral-400">
            Type <span className="text-emerald-400 font-semibold">'help'</span> or click any quick command below.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-neutral-400">Available commands organized by category:</p>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div>
                <span className="text-emerald-400 font-bold">Identity:</span>{" "}
                <span className="text-neutral-300">whoami, skills, projects, experience, devgronix</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">Services &amp; Action:</span>{" "}
                <span className="text-neutral-300">services, stats, hire, cv, contact</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">System Utilities:</span>{" "}
                <span className="text-neutral-300">clear, matrix, sudo</span>
              </div>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p className="font-semibold text-white">Aman Alam — Founder, Lead Architect &amp; Data Analyst</p>
            <p className="text-neutral-400">
              Pursuing BS in Data Science &amp; Applications @{" "}
              <span className="text-emerald-400 font-medium">IIT Madras</span>.
            </p>
            <p className="text-neutral-400">
              Founder of <span className="text-violet-400 font-medium">DEVGRONIX</span>, engineering web applications,
              analytics pipelines, and client architectures.
            </p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-neutral-400">Core Engineering &amp; Data Stack:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
              {PORTFOLIO_DATA.skills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-emerald-400 text-[10px]">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-neutral-400">Featured Real-World Deployments:</p>
            <div className="space-y-1.5 pt-1">
              {PORTFOLIO_DATA.projects.slice(0, 6).map((p) => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-1 border-b border-white/5 pb-1">
                  <div>
                    <span className="font-semibold text-white">{p.title}</span>
                    <span className="text-neutral-500 ml-2">({p.tag})</span>
                  </div>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 underline hover:text-emerald-300 text-[11px] flex items-center gap-1"
                    >
                      Open <ExternalLink className="size-2.5 inline" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "devgronix":
        outputNode = (
          <div className="space-y-1.5 text-xs text-neutral-300">
            <p className="font-semibold text-violet-400">DEVGRONIX Technologies (devgronix.com)</p>
            <p className="text-neutral-400">
              Digital product studio delivering full-stack web platforms, client dashboards, and custom software systems
              across India, the Middle East, and globally.
            </p>
            <p>
              <a
                href="https://devgronix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline hover:text-emerald-300 inline-flex items-center gap-1"
              >
                Visit devgronix.com <ExternalLink className="size-3" />
              </a>
            </p>
          </div>
        );
        break;

      case "services":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-400 font-semibold">Available Engineering Services:</p>
            <div className="space-y-1.5 font-mono text-[11px] text-neutral-300">
              <div className="border-l-2 border-emerald-400/60 pl-2">
                <span className="text-white font-bold">1. Full-Stack Web Development</span>
                <p className="text-neutral-400">React, TypeScript, Next.js, Node.js, and high-performance SPAs.</p>
              </div>
              <div className="border-l-2 border-violet-400/60 pl-2">
                <span className="text-white font-bold">2. Data Analytics &amp; Dashboards</span>
                <p className="text-neutral-400">Python, SQL, Power BI, exploratory data analysis and reporting pipelines.</p>
              </div>
              <div className="border-l-2 border-cyan-400/60 pl-2">
                <span className="text-white font-bold">3. Database &amp; Cloud Architecture</span>
                <p className="text-neutral-400">PostgreSQL, Supabase RLS, Edge APIs, and secure authentication.</p>
              </div>
              <div className="border-l-2 border-amber-400/60 pl-2">
                <span className="text-white font-bold">4. Agency &amp; Enterprise Solutions</span>
                <p className="text-neutral-400">End-to-end software delivery via DEVGRONIX for startups and businesses.</p>
              </div>
            </div>
          </div>
        );
        break;

      case "stats":
      case "status":
      case "telemetry":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-400" /> Live System Telemetry
            </p>
            <div className="grid grid-cols-2 gap-1.5 border border-white/10 rounded-lg p-2.5 bg-white/[0.02]">
              <div>
                <span className="text-neutral-500">Status:</span>{" "}
                <span className="text-emerald-400 font-bold">ONLINE (100%)</span>
              </div>
              <div>
                <span className="text-neutral-500">Latency:</span>{" "}
                <span className="text-emerald-400">~22ms (Edge)</span>
              </div>
              <div>
                <span className="text-neutral-500">Role:</span>{" "}
                <span className="text-white">Founder @ DEVGRONIX</span>
              </div>
              <div>
                <span className="text-neutral-500">Academic:</span>{" "}
                <span className="text-white">IIT Madras BS</span>
              </div>
              <div>
                <span className="text-neutral-500">Deployments:</span>{" "}
                <span className="text-white">6+ Live Sites</span>
              </div>
              <div>
                <span className="text-neutral-500">Timezone:</span>{" "}
                <span className="text-white">Asia/Kolkata (IST)</span>
              </div>
            </div>
          </div>
        );
        break;

      case "experience":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-neutral-400">Career &amp; Academic Timeline:</p>
            <div className="space-y-1.5 font-mono text-[11px] text-neutral-300">
              <div className="border-b border-white/5 pb-1">
                <span className="text-white font-semibold">Founder &amp; Lead Architect</span> — DEVGRONIX (2024 - Present)
                <p className="text-neutral-500">Enterprise web platforms and data products.</p>
              </div>
              <div className="border-b border-white/5 pb-1">
                <span className="text-emerald-400 font-semibold">BS in Data Science &amp; Applications</span> — IIT Madras
                <p className="text-neutral-500">Machine learning, analytics, and software foundations.</p>
              </div>
              <div className="pb-1">
                <span className="text-neutral-300 font-semibold">Computer Science &amp; Engineering</span> — MANUU
                <p className="text-neutral-500">Core CS algorithms and systems programming.</p>
              </div>
            </div>
          </div>
        );
        break;

      case "hire":
        outputNode = (
          <div className="space-y-1.5 text-xs text-neutral-300">
            <p className="text-emerald-400 font-semibold">🎯 Initializing Direct Collaboration Pipeline...</p>
            <p className="text-neutral-400">Navigating page to Contact Form section. Closing terminal in 1s.</p>
          </div>
        );
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        }, 900);
        break;

      case "cv":
      case "resume":
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p className="font-semibold text-white">📄 Academic &amp; Professional Resume</p>
            <p className="text-neutral-400">
              Aman Alam — Founder @ DEVGRONIX, IIT Madras BS in Data Science &amp; Applications.
            </p>
            <p className="text-neutral-400">
              To request full CV or project dossier, email directly to{" "}
              <a href="mailto:amanalam0353@gmail.com" className="text-emerald-400 underline">
                amanalam0353@gmail.com
              </a>{" "}
              or type <span className="text-emerald-400 font-semibold">'hire'</span>.
            </p>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p>
              Email:{" "}
              <a href="mailto:amanalam0353@gmail.com" className="text-emerald-400 underline">
                amanalam0353@gmail.com
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline"
              >
                {PORTFOLIO_DATA.profile.github}
              </a>
            </p>
            <p>
              Portfolio: <span className="text-emerald-400">founder.devgronix.com</span>
            </p>
            <p>
              Agency:{" "}
              <a href="https://devgronix.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
                devgronix.com
              </a>
            </p>
          </div>
        );
        break;

      case "matrix":
        outputNode = (
          <div className="font-mono text-emerald-400 text-xs space-y-1 animate-pulse">
            <p>&gt; Wake up, Neo...</p>
            <p>&gt; DEVGRONIX has you.</p>
            <p>&gt; Follow the green terminal light. 🐇</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "sudo":
        outputNode = (
          <p className="text-xs text-amber-400 font-mono">
            Permission granted: You are already operating with full root privileges on Aman's public system.
          </p>
        );
        break;

      default:
        outputNode = (
          <p className="text-xs text-rose-400">
            Command not recognized: <span className="font-mono text-white">'{rawCmd}'</span>. Type{" "}
            <span className="text-emerald-400 font-semibold">'help'</span> for the list of commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: outputNode }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  const quickCommands = ["whoami", "skills", "projects", "services", "stats", "hire", "contact", "clear"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/95 shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={onClose} />
              <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="ml-2 font-mono text-xs text-neutral-400 flex items-center gap-1.5">
              <TerminalIcon className="size-3.5 text-emerald-400" />
              aman@devgronix: ~ (zsh)
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-400 hover:bg-white/10 hover:text-white transition"
            aria-label="Close terminal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Quick action chips */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-white/5 bg-neutral-900/40 px-4 py-2 font-mono text-[11px] overflow-x-auto">
          <span className="text-neutral-500 mr-1 flex items-center gap-1 shrink-0">
            <Sparkles className="size-3 text-emerald-400" /> Quick:
          </span>
          {quickCommands.map((qCmd) => (
            <button
              key={qCmd}
              onClick={() => handleCommand(qCmd)}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-neutral-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 transition shrink-0"
            >
              {qCmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3.5 min-h-[220px] max-h-[50vh]">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command !== "init" && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-emerald-400">aman@devgronix:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
              )}
              <div className="pl-0 sm:pl-2">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <div className="border-t border-white/10 bg-neutral-900/60 p-3 flex items-center gap-2 font-mono text-xs">
          <span className="text-emerald-400 font-semibold shrink-0">aman@devgronix:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help', 'services', 'hire'..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-neutral-600"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="rounded p-1 text-emerald-400 hover:bg-emerald-500/20 transition"
            aria-label="Submit command"
          >
            <CornerDownLeft className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
