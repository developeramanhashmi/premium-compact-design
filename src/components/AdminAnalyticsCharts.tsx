import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Monitor, Share2, Compass } from "lucide-react";

export interface VisitorAnalyticsEntry {
  id?: string | number;
  page_path?: string | null;
  referrer?: string | null;
  device_type?: string | null;
  browser?: string | null;
  screen_resolution?: string | null;
  created_at?: string | null;
}

interface AdminAnalyticsChartsProps {
  logs: VisitorAnalyticsEntry[];
}

export function AdminAnalyticsCharts({ logs }: AdminAnalyticsChartsProps) {
  // 1. Daily Trend
  const dailyData = useMemo(() => {
    const counts: Record<string, number> = {};
    const sorted = [...logs].sort((a, b) => {
      const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
      const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
      return ta - tb;
    });

    sorted.forEach((entry) => {
      if (!entry.created_at) return;
      const d = new Date(entry.created_at);
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      counts[label] = (counts[label] || 0) + 1;
    });

    return Object.entries(counts).map(([date, visits]) => ({ date, visits }));
  }, [logs]);

  // 2. Device Breakdown
  const deviceData = useMemo(() => {
    let desktop = 0;
    let mobile = 0;
    let other = 0;

    logs.forEach((entry) => {
      const dt = entry.device_type?.toLowerCase() || "";
      if (dt.includes("mobile") || dt.includes("phone")) mobile++;
      else if (dt.includes("desktop") || dt.includes("laptop")) desktop++;
      else other++;
    });

    const res = [];
    if (desktop > 0) res.push({ name: "Desktop", value: desktop, color: "#38bdf8" });
    if (mobile > 0) res.push({ name: "Mobile", value: mobile, color: "#34d399" });
    if (other > 0) res.push({ name: "Other", value: other, color: "#a855f7" });
    return res;
  }, [logs]);

  // 3. Top Referrers
  const referrerData = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach((entry) => {
      let ref = entry.referrer?.trim() || "Direct / None";
      try {
        if (ref.startsWith("http")) {
          ref = new URL(ref).hostname.replace("www.", "");
        }
      } catch {
        // use raw string
      }
      counts[ref] = (counts[ref] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [logs]);

  // 4. Top Pages
  const pageData = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach((entry) => {
      const p = entry.page_path?.trim() || "/";
      counts[p] = (counts[p] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }, [logs]);

  if (!logs || logs.length === 0) return null;

  return (
    <div className="space-y-6 my-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Visitors Trend Area Chart */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Daily Visitors Trend</h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">{dailyData.length} active days</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#737373" fontSize={11} tickLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderColor: "#333333",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#ffffff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown Donut Chart */}
        <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="size-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Device Breakdown</h3>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderColor: "#333333",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#ffffff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            {deviceData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-neutral-400">{d.name}:</span>
                <span className="font-semibold text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referrers & Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="size-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Top Referrers</h3>
          </div>
          <div className="space-y-2">
            {referrerData.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-white/5 border border-white/5">
                <span className="truncate text-neutral-300 font-mono">{r.source}</span>
                <span className="font-semibold text-white">{r.count} visits</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="size-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Most Visited Pages</h3>
          </div>
          <div className="space-y-2">
            {pageData.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-white/5 border border-white/5">
                <span className="truncate text-neutral-300 font-mono">{p.page}</span>
                <span className="font-semibold text-white">{p.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
