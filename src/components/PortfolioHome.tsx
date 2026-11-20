import { EducationExperienceTimeline } from "./EducationExperienceTimeline";
import { VisitorCounterBadge } from "./VisitorCounterBadge";
import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NetworkNodesCanvas } from "./NetworkNodesCanvas";
import { DevTerminal } from "./DevTerminal";
import { SpotlightGlow } from "./SpotlightGlow";
import { CodeShowcase } from "./CodeShowcase";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { TechHeartbeatHUD } from "./TechHeartbeatHUD";
import { PORTFOLIO_DATA, Project, Testimonial } from "@/data/portfolioData";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { Star, Quote, MessageSquareQuote, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  ArrowUpRight, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  CheckCircle2,
  Loader2,
  Terminal
} from "lucide-react";

export function PortfolioHome() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeRole, setActiveRole] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);


  // Dynamic state loaded from Supabase with instant static fallback
  const [profile, setProfile] = useState(PORTFOLIO_DATA.profile);
  const [projects, setProjects] = useState<Project[]>(PORTFOLIO_DATA.projects);
  const [skills, setSkills] = useState(PORTFOLIO_DATA.skills);
  const [educationAndExperience, setEducationAndExperience] = useState(PORTFOLIO_DATA.educationAndExperience);
  const [certificates, setCertificates] = useState(PORTFOLIO_DATA.certificates);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(PORTFOLIO_DATA.testimonials || []);

  // Contact form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState("");

  const categories = ["All", "DEVGRONIX Work", "Data Analysis", "Dashboards", "Web Development"];
  const roles = ["Data Analyst", "Software Developer", "Frontend Developer", "Founder at DEVGRONIX"];

  // 1. Fetch live DB content on load (Admin updates instantly sync here)
  useEffect(() => {
    async function loadDynamicContent() {
      try {
        const [profRes, projRes, skillRes, eduRes, certRes, testiRes] = await Promise.all([
          supabase.from("profile").select("*").limit(1).maybeSingle(),
          supabase.from("projects").select("*").order("display_order", { ascending: true }),
          supabase.from("skills").select("*").order("display_order", { ascending: true }),
          supabase.from("education_experience").select("*").order("display_order", { ascending: true }),
          supabase.from("certificates").select("*").order("display_order", { ascending: true }),
          supabase.from("testimonials").select("*").order("display_order", { ascending: true }),
        ]);

        if (profRes.data) {
          setProfile((prev) => ({
            ...prev,
            name: profRes.data.name || prev.name,
            title: profRes.data.title || prev.title,
            badge: profRes.data.badge || prev.badge,
            bio: profRes.data.bio || prev.bio,
            github: profRes.data.github || prev.github,
            email: profRes.data.email || prev.email,
          }));
        }

        if (projRes.data && projRes.data.length > 0) {
          const mapped: Project[] = projRes.data.map((p: any) => ({
            id: String(p.id),
            tag: p.tag || "Web Development",
            title: p.title,
            desc: p.description || p.desc || "",
            tech: Array.isArray(p.tech) ? p.tech : (p.tech ? String(p.tech).split(",").map((s: string) => s.trim()) : []),
            features: Array.isArray(p.features) ? p.features : [],
            cta: p.cta || "Live Demo",
            href: p.href || "#",
          }));
          setProjects(mapped);
        }

        if (skillRes.data && skillRes.data.length > 0) {
          setSkills(skillRes.data);
        }

        if (eduRes.data) {
          setEducationAndExperience(eduRes.data.map((item: any) => ({
            id: String(item.id),
            type: item.type,
            title: item.title,
            organization: item.organization,
            period: item.period,
            desc: item.description || item.desc || "",
            grade: item.grade || undefined,
          })));
        }

        if (certRes.data) {
          setCertificates(certRes.data.map((c: any) => ({
            id: String(c.id),
            tag: c.tag,
            name: c.name,
            desc: c.description || c.desc || "",
            href: c.href,
          })));
        }

        if (profRes.data && (profRes.data as any).whatsapp) {
          setProfile((prev: any) => ({
            ...prev,
            whatsapp: (profRes.data as any).whatsapp,
          }));
        }

        if (testiRes.data && testiRes.data.length > 0) {
          setTestimonials(testiRes.data.map((t: any) => ({
            id: String(t.id),
            name: t.name,
            role: t.role,
            company: t.company,
            content: t.content,
            rating: Number(t.rating) || 5,
            avatar_url: t.avatar_url || undefined,
            project_tag: t.project_tag || undefined,
            display_order: t.display_order,
            is_featured: t.is_featured ?? true,
          })));
        }
      } catch (err) {
        console.warn("Retaining static portfolio data fallback:", err);
      }
    }

    loadDynamicContent();
  }, []);

  // Global shortcut: Cmd+K / Ctrl+K to toggle CLI Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveRole((role) => (role + 1) % roles.length), 2800);
    return () => window.clearInterval(timer);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = ((formData.get("name") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const message = ((formData.get("message") as string) || "").trim();

    // 1. Direct save to Supabase Inbox (appears inside /admin)
    try {
      await supabase.from("inbox").insert({
        name,
        email,
        subject: "New Lead from founder.devgronix.com",
        message,
      });
    } catch (dbErr) {
      console.warn("Supabase inbox save error:", dbErr);
    }

    // 2. Email alert via Web3Forms
    formData.append("access_key", "384e156b-939c-4dfc-b5bb-8bf538941572");
    formData.append("subject", "New Lead from founder.devgronix.com");
    formData.append("from_name", "Aman Portfolio Lead");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setFormSent(true);
      } else {
        // Agar Web3Forms quota issue ho, tab bhi Supabase me message safely save ho chuka hai
        setFormSent(true);
      }
    } catch {
      // Supabase insertion already completed
      setFormSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.tag === activeFilter);

  return (
    <div id="top" className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-primary/20 selection:text-primary">
      <SpotlightGlow />
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-border/50 bg-background pt-24 pb-10 sm:pt-28 md:pt-28 md:pb-12">
        <NetworkNodesCanvas />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-violet-soft/15" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.78fr)] md:gap-12 lg:px-8">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 font-mono text-xs font-medium text-primary">
              <span className="size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{profile.badge}</span>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl md:text-6xl">
              Hi, I’m <span className="text-primary">{profile.name}</span>
            </h1>
            <div className="mt-1 flex h-[3.2rem] items-center sm:h-[4rem]" aria-live="polite" aria-atomic="true">
              <span key={roles[activeRole]} className="role-fade block font-display text-2xl font-semibold text-foreground sm:text-4xl">
                {roles[activeRole]}
              </span>
            </div>
            <a href="https://devgronix.com" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-violet/30 bg-violet-soft/30 px-3 py-2 text-xs font-medium text-foreground transition hover:border-violet/60">
              <span className="min-w-0">Founder &amp; Lead Full-Stack Architect @ <strong className="text-violet">DEVGRONIX</strong></span>
              <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
            </a>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {profile.bio}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Button asChild size="sm" className="rounded-full px-4">
                <a href="#projects">Explore Work <ArrowUpRight /></a>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full px-4">
                <a href="#contact"><Mail /> Let’s Talk</a>
              </Button>
              <button 
                type="button" 
                onClick={() => setIsTerminalOpen(true)} 
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-neutral-900/80 px-3.5 py-1.5 font-mono text-xs font-medium text-primary transition hover:border-primary hover:bg-primary/15 shadow-sm"
              >
                <Terminal className="size-3.5" />
                <span>&gt;_ CLI Terminal</span>
                <kbd className="hidden sm:inline-flex items-center rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono text-primary/90">
                  ⌘K
                </kbd>
              </button>

              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground transition hover:border-primary/50 hover:text-foreground" aria-label="GitHub">
                <Github className="size-4" />
              </a>
              <Button asChild variant="secondary" size="sm" className="rounded-full px-4">
                <a href="https://devgronix.com" target="_blank" rel="noopener noreferrer">DEVGRONIX <ArrowUpRight /></a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/70 pt-4 font-mono text-[11px] text-muted-foreground">
              <span>IIT Madras · BS Data Science</span>
              <span>MANUU · CS Diploma</span>
              <span>Python · SQL · Power BI</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[360px] md:ml-auto md:mr-6">
            <div className="pointer-events-none absolute inset-x-5 top-8 bottom-2 bg-gradient-to-br from-primary/25 via-violet/20 to-accent/25 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-background to-surface-raised/80 shadow-2xl">
              <div className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
              <img src="/favicon.png" alt="Aman Alam, founder of DEVGRONIX" className="relative z-0 h-full w-full object-contain object-bottom" />
              <div className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-2 text-xs font-medium text-foreground backdrop-blur-md">
                <span className="size-2 rounded-full bg-primary" /> Founder @ DEVGRONIX
              </div>
            </div>
          </div>
        </div>
        {/* Live Tech Heartbeat & Status HUD */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <TechHeartbeatHUD availabilityStatus={profile.badge} />
        </div>
      </section>

      {/* ================= ABOUT & EDUCATION / EXPERIENCE ================= */}
      <section id="about" className="py-20 border-b border-white/5 relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
                Academic &amp; Industry Track
              </p>
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
                Education &amp; Professional Journey
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl">
                Rigorous mathematical and computational foundations at IIT Madras paired with practical engineering, systems architecture, and product design.
              </p>
            </div>

            <VisitorCounterBadge className="shrink-0" />
          </div>

          <EducationExperienceTimeline items={educationAndExperience} />
        </div>
      </section>

      {/* ================= PROJECTS GRID ================= */}
      <section id="projects" className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Portfolio</p>
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
                Featured Projects
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 text-xs rounded-full font-medium transition-all duration-200 border ${
                    activeFilter === cat 
                      ? "bg-primary border-primary text-neutral-950 font-semibold shadow-xs" 
                      : "border-white/10 bg-neutral-900/80 text-neutral-400 hover:text-white hover:border-white/20 active:scale-95"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="group rounded-2xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-md hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                      {project.tag}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">#{project.id}</span>
                  </div>
                  <h3 onClick={() => setSelectedProject(project)} className="text-lg font-bold text-white mt-2 group-hover:text-primary transition-colors cursor-pointer">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition cursor-pointer active:scale-95"
                  >
                    <span>Quick View</span>
                    <span className="text-[10px] font-mono text-primary/90 bg-primary/10 px-1.5 py-0.2 rounded border border-primary/25">Details</span>
                  </button>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-primary transition"
                  >
                    <span>{project.cta}</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Capabilities</p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
              Skills &amp; Tech Stack
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(skill => (
              <div key={skill.name} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 backdrop-blur-sm hover:border-white/20 transition">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-white">{skill.name}</span>
                  <span className="text-xs font-mono text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {skill.category}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-1 text-neutral-400 font-mono">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-primary via-indigo-500 to-cyan-400"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE CODE SHOWCASE ================= */}
      <CodeShowcase />

      {/* ================= CERTIFICATES ================= */}
      <section id="certificates" className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Credentials</p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
              Certifications
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map(cert => (
              <a
                key={cert.id}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-neutral-900/40 p-5 backdrop-blur-sm hover:border-primary/40 transition flex items-start gap-3.5"
              >
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Award className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                    {cert.tag}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5 group-hover:text-primary transition truncate">
                    {cert.name}
                  </h4>
                  {cert.desc && (
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{cert.desc}</p>
                  )}
                </div>
                <ArrowUpRight className="size-4 text-neutral-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      
      {/* ================= CLIENT TESTIMONIALS ================= */}
      {testimonials && testimonials.length > 0 && (
        <section id="testimonials" className="py-20 border-b border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">Social Proof</p>
                <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mt-1 text-white">
                  Client & Partner Endorsements
                </h2>
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Verified Feedback & Delivery Reviews
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-sm flex flex-col justify-between hover:border-primary/40 hover:bg-neutral-900/80 transition group"
                >
                  <div>
                    {/* Stars & Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <Star key={i} className="size-3.5 fill-amber-400" />
                        ))}
                      </div>
                      {t.project_tag && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-neutral-300">
                          {t.project_tag}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6">
                      "{t.content}"
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    {t.avatar_url ? (
                      <img
                        src={t.avatar_url}
                        alt={t.name}
                        className="size-10 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary font-mono">
                        {t.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-primary transition">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        {t.role} {t.company && `• ${t.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

{/* ================= CONTACT SECTION (COMPACT & PREMIUM) ================= */}
      <section id="contact" className="py-14 sm:py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8 md:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-gradient-to-bl from-primary/20 via-cyan-500/10 to-transparent blur-3xl" />

            <div className="relative z-10 grid gap-8 md:grid-cols-5 items-center">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Q1/Q2</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white leading-tight">
                  Let’s build something scalable.
                </h2>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  Direct line for full-stack engineering, AI data telemetry, or agency partnerships via{" "}
                  <strong className="text-white">DEVGRONIX</strong>.
                </p>

                <div className="pt-1">
                  <a
                    href="mailto:amanalam0353@gmail.com"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-neutral-950/60 px-3 py-1.5 font-mono text-xs text-neutral-300 hover:border-primary/40 hover:text-white transition"
                  >
                    <Mail className="size-3 text-primary" />
                    <span>{profile.email}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="md:col-span-3">
                {formSent ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                    <CheckCircle2 className="size-8 text-emerald-400 mx-auto mb-2" />
                    <h3 className="text-sm font-bold text-white">Message Transmitted!</h3>
                    <p className="text-xs text-neutral-300 mt-1">
                      Aman will review your note and respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name / Org"
                        className="w-full rounded-lg border border-white/10 bg-neutral-950/80 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden transition"
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Work Email"
                        className="w-full rounded-lg border border-white/10 bg-neutral-950/80 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden transition"
                      />
                    </div>

                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="Project details, timeline, or data goals..."
                      className="w-full rounded-lg border border-white/10 bg-neutral-950/80 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden transition resize-none"
                    />

                    {formError && (
                      <p className="text-xs text-red-400">{formError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-cyan-400 to-sky-300 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-md shadow-primary/20 hover:shadow-primary/40 active:scale-95 disabled:opacity-50 transition"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-3.5 animate-spin" />
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="size-3.5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <DevTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <FloatingWhatsApp phoneNumber={profile.whatsapp} />
    </div>
  );
}
