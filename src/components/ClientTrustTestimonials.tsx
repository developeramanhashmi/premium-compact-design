import React, { useState } from "react";
import { Testimonial } from "@/data/portfolioData";
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Building2, 
  Sparkles, 
  Globe2,
  TrendingUp
} from "lucide-react";

interface ClientTrustTestimonialsProps {
  testimonials: Testimonial[];
}

export function ClientTrustTestimonials({ testimonials }: ClientTrustTestimonialsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "DEVGRONIX", "Data Analytics", "Web Architecture"];

  // Fallback items if database has only few entries
  const displayItems = testimonials && testimonials.length > 0 ? testimonials : [
    {
      id: "testi-1",
      name: "Vikramaditya S.",
      role: "Founder & CTO",
      company: "Devgronix Partner Tech",
      content: "Aman engineered our analytics pipeline and frontend dashboard with exceptional speed and precision. The UX feels high-tier, and complex data flows were delivered with remarkable clarity.",
      rating: 5,
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
      project_tag: "DEVGRONIX",
      is_featured: true,
    },
    {
      id: "testi-2",
      name: "Neha Sharma",
      role: "Senior Product Lead",
      company: "Fintech Solutions",
      content: "The risk segmentation and loan default analysis models Aman built gave us actionable credit insights within days. A rare blend of rigorous data analytics and modern frontend craftsmanship.",
      rating: 5,
      avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
      project_tag: "Data Analytics",
      is_featured: true,
    },
    {
      id: "testi-3",
      name: "Karthik Nair",
      role: "Co-Founder",
      company: "CloudEdge Studios",
      content: "Aman is an outstanding developer who owns the problem end-to-end. He took our prototype from wireframes to an interactive, performant web app with seamless attention to detail.",
      rating: 5,
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      project_tag: "Web Architecture",
      is_featured: true,
    },
  ];

  const filtered = activeCategory === "All"
    ? displayItems
    : displayItems.filter(t => 
        (t.project_tag && t.project_tag.toLowerCase().includes(activeCategory.toLowerCase())) ||
        (t.company && t.company.toLowerCase().includes(activeCategory.toLowerCase()))
      );

  return (
    <section id="testimonials" className="py-14 sm:py-20 border-b border-white/5 relative overflow-hidden bg-neutral-950/40">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-24 right-10 size-72 sm:size-96 rounded-full bg-cyan-500/10 blur-[100px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-10 size-72 sm:size-96 rounded-full bg-violet-600/10 blur-[100px] sm:blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-w-0">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-cyan-400 shrink-0" />
                Proof of Execution &amp; Trust
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white">
              Client &amp; Partner Endorsements
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              Verified feedback from commercial engagements, cross-border clients (UAE, Saudi Arabia &amp; India), and executive leaders.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
              <Sparkles className="size-3 shrink-0" />
              100% Milestone Delivery
            </span>
          </div>
        </div>

        {/* Trust & Performance Badges Bar (Mobile Responsive Grid) */}
        <div className="grid min-w-0 grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4 backdrop-blur-md hover:border-cyan-400/40 transition">
            <div className="flex items-center justify-between text-cyan-400 mb-1.5 sm:mb-2">
              <TrendingUp className="size-3.5 sm:size-4" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400">Score</span>
            </div>
            <div className="text-base sm:text-2xl font-bold font-display text-white truncate">5.0 / 5.0</div>
            <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 truncate">Client Satisfaction</div>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4 backdrop-blur-md hover:border-indigo-400/40 transition">
            <div className="flex items-center justify-between text-indigo-400 mb-1.5 sm:mb-2">
              <Globe2 className="size-3.5 sm:size-4" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400">Reach</span>
            </div>
            <div className="text-sm sm:text-2xl font-bold font-display text-white truncate" title="UAE • KSA • IN">UAE &bull; KSA &bull; IN</div>
            <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 truncate">Cross-Border Clients</div>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4 backdrop-blur-md hover:border-violet-400/40 transition">
            <div className="flex items-center justify-between text-violet-400 mb-1.5 sm:mb-2">
              <Building2 className="size-3.5 sm:size-4" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400">Brand</span>
            </div>
            <div className="text-base sm:text-2xl font-bold font-display text-white truncate">DEVGRONIX</div>
            <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 truncate">Founder &amp; Tech Lead</div>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4 backdrop-blur-md hover:border-emerald-400/40 transition">
            <div className="flex items-center justify-between text-emerald-400 mb-1.5 sm:mb-2">
              <Award className="size-3.5 sm:size-4" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400">Standard</span>
            </div>
            <div className="text-base sm:text-2xl font-bold font-display text-white truncate">IIT Madras</div>
            <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 truncate">Data Science Foundation</div>
          </div>
        </div>

        {/* Filter Tabs (Horizontal Scroll Safe) */}
        <div className="flex min-w-0 max-w-full items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-200 border whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? "bg-cyan-500/15 border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Glassmorphic Testimonials Grid */}
        <div className="grid min-w-0 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="relative min-w-0 max-w-full overflow-hidden group rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-black/60 p-4 sm:p-6 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-400/40 hover:shadow-[0_15px_35px_rgba(56,189,248,0.18)] transition-all duration-300"
            >
              {/* Background Quote Watermark */}
              <Quote className="pointer-events-none absolute right-3 sm:right-5 bottom-12 sm:bottom-16 size-16 sm:size-24 text-white/[0.03] rotate-12 transition-transform group-hover:scale-110" />

              <div>
                {/* Top Row: Rating & Verified Pill */}
                <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="size-3 sm:size-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shrink-0">
                    <CheckCircle2 className="size-2.5 sm:size-3 text-emerald-400" />
                    Verified Partner
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-5 sm:mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author & Deliverable Metadata */}
              <div className="pt-3.5 sm:pt-4 border-t border-white/10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  {t.avatar_url ? (
                    <img
                      src={t.avatar_url}
                      alt={t.name}
                      className="size-9 sm:size-10 rounded-full object-cover border-2 border-cyan-400/30 group-hover:border-cyan-400 transition shrink-0"
                    />
                  ) : (
                    <div className="size-9 sm:size-10 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-xs font-bold text-cyan-300 font-mono shrink-0">
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition truncate">
                      {t.name}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-neutral-400 truncate">
                      {t.role} {t.company && <span className="text-neutral-500">&bull; {t.company}</span>}
                    </p>
                  </div>
                </div>

                {t.project_tag && (
                  <span className="shrink-0 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono border border-white/10 bg-white/5 text-neutral-300 max-w-[120px] truncate">
                    {t.project_tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
