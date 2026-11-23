import React, { useState } from "react";
import { GraduationCap, Briefcase, Calendar, Award, CheckCircle2, Sparkles, Building2, MapPin } from "lucide-react";

export interface TimelineItem {
  id: string;
  type: "education" | "experience";
  title: string;
  organization: string;
  period: string;
  desc: string;
  grade?: string;
  location?: string;
  tags?: string[];
  isCurrent?: boolean;
}

interface Props {
  items: TimelineItem[];
}

// Fallback tags for predefined education & experience items if tags aren't in database
const DEFAULT_TAGS: Record<string, string[]> = {
  "B.S. in Data Science & Applications": ["Machine Learning", "Statistical Modeling", "Algorithms", "Python"],
  "Diploma in Computer Science Engineering": ["Data Structures", "SQL & Relational DBs", "C / C++", "Web Systems"],
  "Data Science Intern": ["Exploratory Data Analysis", "Model Evaluation", "Visualization", "Pandas"],
  "UI/UX Design Intern": ["Design Systems", "Figma", "User Flows", "Responsive Layouts"],
};

export function EducationExperienceTimeline({ items }: Props) {
  const [activeFilter, setActiveFilter] = useState<"all" | "experience" | "education">("all");

  const filteredItems = items.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  const eduCount = items.filter((i) => i.type === "education").length;
  const expCount = items.filter((i) => i.type === "experience").length;

  return (
    <div className="space-y-10">
      {/* Category Filter Pills (Mobile Responsive) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="grid grid-cols-3 w-full sm:w-auto sm:flex sm:items-center gap-1 sm:gap-2 p-1 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all ${
              activeFilter === "all"
                ? "bg-primary text-neutral-950 font-bold shadow-lg shadow-primary/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="hidden sm:inline">All Milestones</span>
            <span className="sm:hidden inline">All</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeFilter === "all" ? "bg-neutral-950/30 text-neutral-950" : "bg-white/10 text-neutral-300"
            }`}>
              {items.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("education")}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all ${
              activeFilter === "education"
                ? "bg-primary text-neutral-950 font-bold shadow-lg shadow-primary/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GraduationCap className="size-3 sm:size-3.5 shrink-0" />
            <span className="truncate">Academic ({eduCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("experience")}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all ${
              activeFilter === "experience"
                ? "bg-primary text-neutral-950 font-bold shadow-lg shadow-primary/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Briefcase className="size-3 sm:size-3.5 shrink-0" />
            <span className="truncate">Industry ({expCount})</span>
          </button>
        </div>

        {/* Executive credential badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Sparkles className="size-3.5 text-primary" />
          <span>IIT Madras &amp; Engineering Pedigree</span>
        </div>
      </div>

      {/* Modern Circuit Timeline Stream */}
      <div className="relative">
        {/* Glowing vertical circuit line */}
        <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-primary via-violet-500/50 to-emerald-500/20" />

        <div className="space-y-8 pl-12 sm:pl-20">
          {filteredItems.map((item, idx) => {
            const isEdu = item.type === "education";
            const isOngoing = item.period.includes("2028") || item.period.toLowerCase().includes("present");
            const tags = item.tags || DEFAULT_TAGS[item.title] || [];

            return (
              <div key={item.id || idx} className="relative group">
                {/* Timeline Node Point on Circuit */}
                <div className={`absolute -left-12 sm:-left-20 top-6 flex size-8 sm:size-9 items-center justify-center rounded-xl border transition-all duration-300 ${
                  isEdu
                    ? "border-primary/40 bg-neutral-950 text-primary shadow-lg shadow-primary/10 group-hover:scale-110 group-hover:border-primary"
                    : "border-cyan-500/40 bg-neutral-950 text-cyan-400 shadow-lg shadow-cyan-500/10 group-hover:scale-110 group-hover:border-cyan-400"
                }`}>
                  {isEdu ? <GraduationCap className="size-4" /> : <Briefcase className="size-4" />}
                </div>

                {/* Milestone Glass Card */}
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/70 via-neutral-900/40 to-neutral-950/80 p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
                  {/* Subtle ambient light */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />

                  {/* Header Row: Type, Period & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                        isEdu
                          ? "border border-primary/30 bg-primary/10 text-primary"
                          : "border border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                      }`}>
                        {isEdu ? "Formal Degree" : "Industry Practice"}
                      </span>

                      {/* Period Badge */}
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-neutral-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                        <Calendar className="size-3 text-neutral-400" />
                        {item.period}
                      </span>
                    </div>

                    {/* Status / Grade Badge */}
                    <div className="flex items-center gap-2">
                      {isOngoing && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Active / In Progress
                        </span>
                      )}

                      {item.grade && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-200">
                          <Award className="size-3 text-amber-400" />
                          {item.grade}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Degree or Role Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  {/* Organization & Location */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-300 font-medium mt-1.5 mb-3.5">
                    <span className="inline-flex items-center gap-1.5 text-neutral-200">
                      <Building2 className="size-3.5 text-primary" />
                      {item.organization}
                    </span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1 text-neutral-400">
                        <MapPin className="size-3" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* Narrative description */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                    {item.desc}
                  </p>

                  {/* Technical Focus Chips */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3.5 border-t border-white/5">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mr-1">
                        Core Focus:
                      </span>
                      {tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-neutral-300 transition-colors group-hover:border-white/10"
                        >
                          <CheckCircle2 className="size-2.5 text-primary" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
