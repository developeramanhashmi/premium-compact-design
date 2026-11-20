import React from "react";
import { Eye, TrendingUp, Users } from "lucide-react";
import { useVisitorTracker } from "@/hooks/useVisitorTracker";

interface Props {
  className?: string;
}

export function VisitorCounterBadge({ className = "" }: Props) {
  const { totalViews, todayViews, loading } = useVisitorTracker();

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-neutral-900/80 px-3.5 py-1.5 backdrop-blur-md transition-all hover:border-primary/40 ${className}`}
    >
      <div className="relative flex size-2 items-center justify-center">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
      </div>

      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="text-neutral-400">Total Views:</span>
        <span className="font-bold text-white tracking-tight">
          {loading ? "..." : totalViews.toLocaleString()}
        </span>
      </div>

      <span className="h-3 w-[1px] bg-white/10" />

      <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
        <TrendingUp className="size-3" />
        <span>+{todayViews} today</span>
      </div>
    </div>
  );
}
