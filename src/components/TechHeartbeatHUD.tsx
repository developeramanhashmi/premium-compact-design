import React, { useEffect, useState } from "react";
import { Activity, Clock, Cpu, ShieldCheck, Wifi } from "lucide-react";

interface TechHeartbeatHUDProps {
  availabilityStatus?: string;
}

export function TechHeartbeatHUD({ availabilityStatus = "Available for High-Impact Projects" }: TechHeartbeatHUDProps) {
  const [timeString, setTimeString] = useState<string>("");

  // Live IST Clock (Asia/Kolkata)
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTimeString(`${formatter.format(now)} IST`);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-primary/40 hover:bg-neutral-900/75">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center md:divide-x md:divide-white/10">
        {/* Module 1: Live Status & Heartbeat ECG */}
        <div className="flex items-center gap-3.5 pr-0 md:pr-4">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-inner">
            <span className="absolute -top-1 -right-1 flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <Activity className="size-5 animate-pulse" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                System Pulse
              </span>
              <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] text-emerald-300">
                100% LIVE
              </span>
            </div>
            
            {/* Animated SVG Heartbeat Line */}
            <div className="mt-1 flex items-center gap-2">
              <svg className="h-5 w-28 shrink-0 text-emerald-400 overflow-visible" viewBox="0 0 120 20" fill="none">
                <path
                  d="M0 10 H35 L42 2 L47 18 L52 7 L57 13 L62 10 H120"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90"
                />
              </svg>
              <span className="font-mono text-[11px] text-neutral-400">~22ms Edge</span>
            </div>
          </div>
        </div>

        {/* Module 2: Current Workstream / Active Architecture */}
        <div className="flex flex-col justify-center px-0 md:px-4">
          <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
            <Cpu className="size-3.5 text-primary" />
            <span>Active Workstream</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm font-medium text-neutral-200 line-clamp-1">
            Full-Stack Systems &amp; AI Architectures
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-neutral-300">
              React 19
            </span>
            <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-neutral-300">
              TypeScript
            </span>
            <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-neutral-300">
              Supabase
            </span>
            <span className="rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary">
              DEVGRONIX
            </span>
          </div>
        </div>

        {/* Module 3: Telemetry, Real-time Clock & Availability */}
        <div className="flex flex-col justify-center pl-0 md:pl-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              <Clock className="size-3.5 text-cyan-400" />
              <span>{timeString || "IST Real-Time"}</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-400">
              <Wifi className="size-3 text-emerald-400" />
              <span>Edge Vercel</span>
            </div>
          </div>
          
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-xs text-neutral-300 font-medium">
              {availabilityStatus}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-primary">
              <ShieldCheck className="size-3 text-primary" />
              <span>Secured</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
