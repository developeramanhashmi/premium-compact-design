import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles } from "lucide-react";
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
          <p className="text-emerald-400 font-bold">🚀 Welcome to Aman Alam's Interactive CLI v1.0.0</p>
          <p className="text-neutral-400">Founder &amp; Full-Stack Architect @ DEVGRONIX | IIT Madras BS Scholar</p>
          <p className="text-neutral-400">Type <span className="text-emerald-400 font-semibold">'help'</span> or tap any quick command below.</p>
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
          <div className="space-y-1 text-xs">
            <p className="text-neutral-400">Available commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pt-1 font-mono">
              <div><span className="text-emerald-400 font-semibold">whoami</span> - About me</div>
              <div><span className="text-emerald-400 font-semibold">skills</span> - Tech stack</div>
              <div><span className="text-emerald-400 font-semibold">projects</span> - Live work</div>
              <div><span className="text-emerald-400 font-semibold">devgronix</span> - Agency info</div>
              <div><span className="text-emerald-400 font-semibold">contact</span> - Get in touch</div>
              <div><span className="text-emerald-400 font-semibold">clear</span> - Clear screen</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p className="font-semibold text-white">Aman Alam — Founder, Software Developer &amp; Data Analyst</p>
            <p className="text-neutral-400">Studying BS in Data Science &amp; Applications @ <span className="text-emerald-400 font-medium">IIT Madras</span>.</p>
            <p className="text-neutral-400">Founder of <span className="text-violet-400 font-medium">DEVGRONIX</span>, building enterprise web software and data pipelines.</p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {PORTFOLIO_DATA.skills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-emerald-400 font-mono text-[10px]">{skill.level}%</span>
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
              {PORTFOLIO_DATA.projects.slice(0, 5).map((p) => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-1 border-b border-white/5 pb-1">
                  <div>
                    <span className="font-semibold text-white">{p.title}</span>
                    <span className="text-neutral-500 ml-2">({p.tag})</span>
                  </div>
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">
                      Open ↗
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
          <div className="space-y-1 text-xs text-neutral-300">
            <p className="font-semibold text-violet-400">DEVGRONIX Technologies (devgronix.com)</p>
            <p className="text-neutral-400">Full-Stack Digital Engineering &amp; Data Analytics Agency delivering software across India, UAE, Saudi Arabia, and worldwide.</p>
            <p><a href="https://devgronix.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Visit devgronix.com ↗</a></p>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p>Email: <a href="mailto:amanalam0353@gmail.com" className="text-emerald-400 underline">amanalam0353@gmail.com</a></p>
            <p>GitHub: <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{PORTFOLIO_DATA.profile.github}</a></p>
            <p>Portfolio: <span className="text-emerald-400">founder.devgronix.com</span></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "sudo":
        outputNode = <p className="text-xs text-amber-400">Permission granted. You already have root access to Aman's public system!</p>;
        break;

      default:
        outputNode = (
          <p className="text-xs text-rose-400">
            Command not recognized: <span className="font-mono text-white">'{rawCmd}'</span>. Type <span className="text-emerald-400 font-semibold">'help'</span> for list.
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

  const quickCommands = ["whoami", "skills", "projects", "devgronix", "contact", "clear"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
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
        <div className="flex flex-wrap items-center gap-1.5 border-b border-white/5 bg-neutral-900/40 px-4 py-2 font-mono text-[11px]">
          <span className="text-neutral-500 mr-1 flex items-center gap-1">
            <Sparkles className="size-3 text-emerald-400" /> Quick:
          </span>
          {quickCommands.map((qCmd) => (
            <button
              key={qCmd}
              onClick={() => handleCommand(qCmd)}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-neutral-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 transition"
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
            placeholder="type 'help' or command..."
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
